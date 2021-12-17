import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { BadRequestError } from '../common/errors';

import { currentUser, validateRequest, withAuth } from '../common/middlewares';
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
    body('shortUrl').isLength({ min: 5 }).withMessage('Custom url suffix must contain 5 characters'),
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

export { router as urlRoutes };
