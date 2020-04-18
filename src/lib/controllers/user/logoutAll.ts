import { Request, Response } from 'express';

export const logoutAll: (
  req: Request,
  res: Response,
) => Promise<void | Response> = async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();

    res.send('All user sessions have been logged out.');
  } catch (error) {
    res.status(500).send(error);
  }
};
