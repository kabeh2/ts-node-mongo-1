import {
  AppActions,
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_ERROR,
  TOGGLE_AUTH,
  LOGIN,
} from "./types/actions";
import { User } from "./types/User";
import { UserCredentials } from "./types/UserCredentials";

export const fetchRequest = (): AppActions => ({
  type: FETCH_REQUEST,
});

export const fetchSuccess = (data: User): AppActions => ({
  type: FETCH_SUCCESS,
  payload: data,
});

export const fetchError = (error: string): AppActions => ({
  type: FETCH_ERROR,
  payload: error,
});

export const toggleAuth = (): AppActions => ({
  type: TOGGLE_AUTH,
});

export const login = (credentials: UserCredentials): AppActions => ({
  type: LOGIN,
  payload: credentials,
});
