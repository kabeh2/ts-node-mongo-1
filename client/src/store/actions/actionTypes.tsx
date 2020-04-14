interface IActionTypes {
  [key: string]: string;
}

export const actionTypes: IActionTypes = {
  FETCH_REQUEST: "FETCH_REQUEST",
  FETCH_SUCCESS: "FETCH_SUCCESS",
  FETCH_ERROR: "FETCH_ERROR",
  LOGIN: "LOGIN",
  TOGGLE_AUTH: "TOGGLE_AUTH",
};
