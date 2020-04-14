export interface User {
  user: {
    _id: string;
    username: string;
    email: string;
    __v: number;
  };
  token: string;
}
