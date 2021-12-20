import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { DeviceDetails, ILocation } from '../interfaces';
import axios from 'axios';
import short from 'short-uuid';
import { body } from 'express-validator';
import { BadRequestError, NotAuthorizedError, NotFoundError } from '../common/errors';
import { currentUser, validateRequest, withAuth } from '../common/middlewares';
import { LOCATION_KEY, SHORT_URL_SUFFIX_LENGTH } from '../configs';
import { Url } from '../models/urls';
import { Visits } from '../models/visits';

const router = express.Router();

/**
 * @route /api/url/generate
 * @method GET
 * @action Generates a unique UUID for logged in user
 */
router.get('/generate', currentUser, withAuth, async (req: Request, res: Response) => {
  let count = 0;
  // @ts-ignore
  const recursiveQuery = async (): Promise<string> => {
    const uuid = short.generate().slice(0, SHORT_URL_SUFFIX_LENGTH) as string;
    // const exists = await Url.findOne({ user: req.currentUser!.id, shortUrl: uuid });
    const exists = await Url.findOne({ shortUrl: uuid });
    if (exists && count < 11) {
      count++;
      recursiveQuery();
    } else if (count > 10) {
      throw new BadRequestError('Server timeout, try again later');
    } else {
      return uuid;
    }
  };
  const uuid = await recursiveQuery();
  return res.status(200).send(uuid);
});

/**
 * @route /api/url/
 * @method POST
 * @action Creates a new shortened url
 */
router.post(
  '/',
  currentUser,
  withAuth,
  [
    body('url').isURL().withMessage('URL must be valid'),
    body('shortUrl').isLength({ min: SHORT_URL_SUFFIX_LENGTH }).withMessage('Custom url suffix must contain 5 characters'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { url, shortUrl } = req.body;
    // check if the shortURL already exists or not for the logged in user
    // const exists = await Url.findOne({ user: req.currentUser!.id, shortUrl });
    // check if the shortURL already exits
    const exists = await Url.findOne({ shortUrl });
    if (exists) {
      throw new BadRequestError('URL suffix already in use', 'shortUrl');
    }
    const newUrl = Url.build({
      url,
      shortUrl,
      user: req.currentUser!.id,
    });
    await newUrl.save();
    return res.status(201).send(newUrl);
  }
);

/**
 * @route /api/url/:id
 * @method PUT
 * @action Updates the route
 */
router.put(
  '/:id',
  currentUser,
  withAuth,
  [body('shortUrl').isLength({ min: SHORT_URL_SUFFIX_LENGTH })],
  validateRequest,
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const url = await Url.findById(id);
    const exists = await Url.findOne({ shortUrl: req.body.shortUrl });
    if (exists) {
      throw new BadRequestError('Short URL already taken', 'shortUrl');
    }
    if (!url) throw new NotFoundError();
    if (url.user.toString() !== req.currentUser!.id) throw new NotAuthorizedError();
    url.shortUrl = req.body.shortUrl;
    const updatedUrl = await url.save();
    return res.status(201).send(updatedUrl);
  }
);

/**
 * @route /api/url/:id
 * @method DELTE
 * @action Updates the route
 */
router.delete('/:id', currentUser, withAuth, async (req: Request, res: Response) => {
  const url = await Url.findById(req.params.id);
  if (!url) throw new NotFoundError();
  if (url.user.toString() !== req.currentUser!.id) throw new NotAuthorizedError();
  else {
    await Url.findByIdAndRemove(req.params.id);
    return res.status(200).send();
  }
});

/**
 * @route /api/url/
 * @method GET
 * @action Returns users urls owned by the user
 */

router.get('/', currentUser, withAuth, async (req: Request, res: Response) => {
  let data;
  try {
    data = await Url.aggregate([
      // @ts-ignore
      { $match: { user: mongoose.Types.ObjectId(req.currentUser!.id) } },
      { $project: { _id: 0, id: '$_id', views: 1, createdAt: 1, url: 1, shortUrl: 1 } },
      {
        $lookup: {
          from: 'visits',
          localField: 'id',
          foreignField: 'url',
          as: 'visits',
        },
      },
    ]);
  } catch (error) {
    console.log(error, '😎😎😎😎😎😎');
  }
  return res.status(200).send(data || []);
});

/**
 * @route /api/url/:short
 * @method GET
 * @action Returns full mapped url details for the provided short url
 */
router.get('/:short', currentUser, withAuth, async (req: Request, res: Response) => {
  // const url = await Url.findOne({ user: req.currentUser!.id, shortUrl: req.params.short });
  const url = await Url.findOne({ shortUrl: req.params.short });
  if (!url) throw new NotFoundError();
  return res.status(200).send(url);
});

const DeviceDetector = require('node-device-detector');
const deviceDetector = new DeviceDetector();
// const hasBotResult = (result: any) => {
//   return result && result.name;
// };
// const userAgent =
//   'Mozilla/5.0 (Linux; Android 5.0; NX505J Build/KVT49L) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.78 Mobile Safari/537.36';
// const result = detector.detect(userAgent);
// console.log('result parse', result);

// router.get('/device/details', currentUser, withAuth, (req: Request, res: Response) => {

//   // const bot = deviceDetector.parseBot(useragent);
//   res.status(200).send({ ...device });
// });

/**
 * / test ==> amazn user1
 * / test ==> googl user2
 */

// increment unique
router.put('/visits/:id', currentUser, withAuth, async (req: Request, res: Response) => {
  const url = await Url.findById(req.params.id);
  if (!url) throw new NotFoundError();
  // total page count
  url.views = url.views + 1;
  await url.save();

  // create unique visit for the logged in user
  // find is already visited by the logged in user
  const visited = await Visits.findOne({ user: req.currentUser!.id, url: req.params.id });
  let device: DeviceDetails | undefined;
  let useragent: string | undefined;
  try {
    useragent = req.headers['user-agent'];
    device = deviceDetector.detect(useragent);
  } catch (error) {
    console.log(error);
  }

  if (visited) return res.status(201).send(); // return early if the website is already visited

  const { latitude, longitude }: { latitude: string; longitude: string } = req.body.coordinates || {};
  let info: ILocation | null = null;
  if (latitude && longitude) {
    try {
      const { data } = await axios.get(`http://api.positionstack.com/v1/reverse?access_key=${LOCATION_KEY}&query=${latitude},${longitude}`);
      if (data && data.data && data.data.length) {
        info = data.data[0];
      }
    } catch (error) {
      console.log(error, 'Unable to get location at the moment');
    }
  }

  const visit = Visits.build({
    url: url.id,
    user: req.currentUser!.id,
    analytics: device || {},
    location: info ? `${info.locality}, ${info.county}, ${info.country}` : '',
  });
  await visit.save();
  return res.status(201).send();
});

// only for testing
router.get('/test/details/:id', currentUser, withAuth, async (req: Request, res: Response) => {
  const url = await Url.findById(req.params.id);
  return res.send(url);
});

export { router as urlRoutes };
