import { UserCredentials } from "./UserCredentials";
import { User } from "./User";

export const FETCH_REQUEST = "FETCH_REQUEST";
export const FETCH_SUCCESS = "FETCH_SUCCESS";
export const FETCH_ERROR = "FETCH_ERROR";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const TOGGLE_AUTH = "TOGGLE_AUTH";

export interface FetchRequestAction {
  type: typeof FETCH_REQUEST;
}

export interface FetchSuccessAction {
  type: typeof FETCH_SUCCESS;
  payload: User;
}

export interface FetchErrorAction {
  type: typeof FETCH_ERROR;
  payload: string;
}

export interface LoginAction {
  type: typeof LOGIN;
  payload: UserCredentials;
}

export interface LogoutAction {
  type: typeof LOGOUT;
}

export interface ToggleAuthAction {
  type: typeof TOGGLE_AUTH;
}

export type UserActionTypes =
  | FetchRequestAction
  | FetchSuccessAction
  | FetchErrorAction
  | LoginAction
  | LogoutAction
  | ToggleAuthAction;

export type AppActions = UserActionTypes;
