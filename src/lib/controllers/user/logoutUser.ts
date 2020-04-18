import { Request, Response } from 'express';

export const logoutUser: (
  req: Request,
  res: Response,
) => Promise<void | Response> = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token,
    );
    await req.user.save();

    res.send('User has been logged out.');
  } catch (error) {
    res.status(500).send(error);
  }
};
