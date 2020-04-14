import { User } from "../actions/types/User";
import {
  UserActionTypes,
  FETCH_ERROR,
  FETCH_SUCCESS,
  FETCH_REQUEST,
  TOGGLE_AUTH,
} from "../actions/types/actions";

interface IinitialState {
  loading: boolean;
  user: User;
  errors: string;
  loggedIn: boolean;
}

const initialState: IinitialState = {
  loading: false,
  user: { user: { _id: "", username: "", email: "", __v: 0 }, token: "" },
  errors: "",
  loggedIn: false,
};

const fetchReducer = (
  state = initialState,
  action: UserActionTypes
): IinitialState => {
  switch (action.type) {
    case FETCH_REQUEST:
      return {
        ...state,
        loading: true,
        errors: "",
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case FETCH_ERROR:
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };
    case TOGGLE_AUTH:
      return {
        ...state,
        loggedIn: !state.loggedIn,
      };
    default:
      return state;
  }
};

export default fetchReducer;
