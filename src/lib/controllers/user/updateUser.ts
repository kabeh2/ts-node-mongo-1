import { Request, Response } from 'express';

export const updateUser: (
  req: Request,
  res: Response,
) => Promise<void | Response> = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['username', 'email', 'password'];
  const isValidUpdate = updates.every((update) =>
    allowedUpdates.includes(update),
  );

  if (!isValidUpdate) {
    return res
      .status(400)
      .send('Field you are trying to update does not exist.');
  }

  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));

    await req.user.save();

    res.status(201).send(req.user);
  } catch (error) {
    res.status(500).send(error);
  }
};
