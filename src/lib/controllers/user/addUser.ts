import { Request, Response } from 'express';
import User from '../../db/models/user/user.model';

export const addUser: (
  req: Request,
  res: Response,
) => Promise<void | Response> = async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();

    const token = await user.generateToken();

    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
};
