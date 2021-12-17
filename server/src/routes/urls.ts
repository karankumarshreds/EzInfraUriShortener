import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { BadRequestError, NotAuthorizedError, NotFoundError } from '../common/errors';

import { currentUser, validateRequest, withAuth } from '../common/middlewares';
import { SHORT_URL_SUFFIX_LENGTH } from '../configs';
import { Url } from '../models/urls';

const router = express.Router();

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
    const exists = await Url.findOne({ user: req.currentUser!.id, shortUrl });
    if (exists) {
      throw new BadRequestError('URL suffix already in use', shortUrl);
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
    if (!url) throw new NotFoundError();
    if (url.user.toString() !== req.currentUser!.id) throw new NotAuthorizedError();
    url.shortUrl = req.body.shortUrl;
    const updatedUrl = await url.save();
    return res.status(201).send(updatedUrl);
  }
);

/**
 * @route /api/url/
 * @method GET
 * @action Returns users urls
 */

router.get('/', currentUser, withAuth, async (req: Request, res: Response) => {
  const urls = await Url.find({ user: req.currentUser!.id });
  return res.status(200).send(urls || []);
});

export { router as urlRoutes };
