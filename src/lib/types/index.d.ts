declare namespace Express {
  type NewType = import("../db/models/user/IUserDocument.interface").IUserDocument;

  interface Request {
    token: string;
    user: NewType;
  }
}
