import { Request, Response } from 'express';
import User from '../../db/models/user/user.model';

export const loginUser: (
  req: Request,
  res: Response,
) => Promise<void | Response> = async ({ body }, res) => {
  const { password, username, email } = body;
  try {
    const user = await User.findByCredentials(password, username, email);

    if (!user) {
      return res.status(400).send('Node Incorrect username/password.');
    }

    const token = await user.generateToken();

    res.status(201).send({ user, token });
  } catch (error) {
    res
      .status(400)
      .send({ error, errorMessage: 'Incorrect username/password.' });
  }
};
