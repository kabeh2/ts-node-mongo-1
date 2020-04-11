import { Request, Response } from "express";
import User from "../db/models/user/user.model";

export const addUser: (
  req: Request,
  res: Response
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

export const loginUser: (
  req: Request,
  res: Response
) => Promise<void | Response> = async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.password,
      req.body.username || undefined,
      req.body.email || undefined
    );

    const token = await user.generateToken();

    res.status(201).send({ user, token });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const logoutUser: (
  req: Request,
  res: Response
) => Promise<void | Response> = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();

    res.send("User has been logged out.");
  } catch (error) {
    res.status(500).send(error);
  }
};

export const logoutAll: (
  req: Request,
  res: Response
) => Promise<void | Response> = async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();

    res.send("All user sessions have been logged out.");
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getUser: (
  req: Request,
  res: Response
) => Promise<void | Response> = async (req, res) => {
  try {
    res.status(200).send(req.user);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const deleteUser: (
  req: Request,
  res: Response
) => Promise<void | Response> = async (req, res) => {
  try {
    await req.user.remove();

    res.send({ userRemove: req.user });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updateUser: (
  req: Request,
  res: Response
) => Promise<void | Response> = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["username", "email", "password"];
  const isValidUpdate = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidUpdate) {
    return res
      .status(400)
      .send("Field you are trying to update does not exist.");
  }

  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));

    await req.user.save();

    res.status(201).send(req.user);
  } catch (error) {
    res.status(500).send(error);
  }
};
