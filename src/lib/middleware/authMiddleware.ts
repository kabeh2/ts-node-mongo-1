import config from 'config';
import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import User from '../db/models/user/user.model';

// you can prob put this in another file or keep it here
interface IDataToken {
  _id: number;
}

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const secret: any = config.get('token-secret');

  try {
    //added the ? syntax which means
    //if req.header('Authorization') does not have a value, the replace part
    //will never happen and token will be set to null
    //but if there is a value (which will be a string if there is)
    //then, the replace function will be called
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token?.length) {
      throw new Error('no token');
    }

    const user = await User.findOne({
      _id: (jwt.verify(token, secret) as IDataToken)._id,
      'tokens.token': token,
    });

    if (!user) {
      throw new Error('Unable to login.');
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send();
  }
};

export default authMiddleware;
