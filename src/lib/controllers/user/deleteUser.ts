import { Request, Response } from 'express';

export const deleteUser: (
  req: Request,
  res: Response,
) => Promise<void | Response> = async (req, res) => {
  try {
    await req.user.remove();

    res.send({ userRemove: req.user });
  } catch (error) {
    res.status(500).send(error);
  }
};
