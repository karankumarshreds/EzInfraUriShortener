import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

// custom
import { NotAuthorizedError, BadRequestError } from '../common/errors';
import { currentUser, validateRequest, withAuth } from '../common/middlewares';
import { validatePassword, hashPassword } from '../common/password';
import { User } from '../models/user';

const router = express.Router();

/**
 * @route  /api/auth/current-user
 * @method GET
 * @action Returns the currentUser object extracted by the middlewares from the cookies
 */

router.get('/current-user', currentUser, async (req: Request, res: Response) => {
  if (!req.currentUser) {
    throw new NotAuthorizedError();
  } else {
    const user = await User.findById(req.currentUser!.id);
    if (!user) {
      return res.send({ currentUser: null });
    } else {
      return res.send({ currentUser: req.currentUser });
    }
  }
});

/**
 * @route   /api/auth/signin
 * @method  POST
 */
router.post(
  '/signin',
  [
    body('email').trim().isEmail().toLowerCase().withMessage('Email must be valid'),
    body('password').trim().isLength({ min: 8 }).withMessage('Password must be valid'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    console.log('hjeer');

    if (!user) {
      console.log('hjeer !!!!!');
      throw new NotAuthorizedError();
    }

    const validPassword = await validatePassword(user.password, password);
    if (!validPassword) {
      console.log('hjeer !!!!!!!!!!!!!!!!!!!!!');
      throw new NotAuthorizedError();
    }

    const userJWT = jwt.sign(
      {
        email: user.email,
        id: user.id,
        owner: user.owner,
        name: `${user.firstName}`,
      },
      process.env.JWT_KEY!
    );

    req.session = {
      jwt: userJWT,
    };

    res.status(201).send(user);
  }
);

/**
 * @route  /api/auth/signup
 * @method POST
 */

router.post(
  '/signup',
  [
    body('firstName').toLowerCase().trim().isLength({ min: 1 }).withMessage('Firstname must be provided'),
    body('lastName').toLowerCase().trim().isLength({ min: 1 }).withMessage('Lastname must be provided'),
    body('email').isEmail().toLowerCase().trim().withMessage('Email must be valid'),
    body('password').toLowerCase().trim().isLength({ min: 8 }).withMessage('Password must at least 8 characters'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { firstName, lastName, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError('Email already in use');
    }

    const hashed = await hashPassword(password);
    const user = User.build({
      firstName,
      lastName,
      email,
      password: hashed,
    });

    try {
      await user.save();
    } catch (error) {
      console.error(error);
    }

    const userJWT = jwt.sign(
      {
        id: user.id,
        email: user.email,
        owner: user.owner,
        name: `${user.firstName}`,
      },
      process.env.JWT_KEY!
    );
    req.session = {
      jwt: userJWT,
    };

    res.status(201).send(user);
  }
);

/**
 * @route  /api/auth/signout
 * @method POST
 * @action Returns the currentUser object extracted by the middlewares from the cookies
 */

router.post('/signout', currentUser, withAuth, async (req: Request, res: Response) => {
  try {
    req.session = null;
    res.send({});
  } catch (error) {
    throw new NotAuthorizedError();
  }
});

export { router as authenticationRoutes };
