import { Request, Response } from 'express';

export const getUser: (
  req: Request,
  res: Response,
) => Promise<void | Response> = async (req, res) => {
  try {
    res.status(200).send(req.user);
  } catch (error) {
    res.status(500).send(error);
  }
};
