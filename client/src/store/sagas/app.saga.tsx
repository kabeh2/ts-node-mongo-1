import axios from "axios";
import { call, all, put, takeLatest } from "redux-saga/effects";
import { fetchRequest, fetchError, fetchSuccess } from "../actions";
import { apiUrl, setToken } from "../../services/auth.service";
import { LOGIN, LoginAction } from "../actions/types/actions";
import { UserCredentials } from "../actions/types/UserCredentials";
import { User } from "../actions/types/User";

// fetch call
const fetchLogin = async (payload: UserCredentials) => {
  const { data } = await axios.post(`${apiUrl}/users/login`, payload);
  return data;
};

// worker
function* tryLogin(action: LoginAction) {
  try {
    yield put(fetchRequest());
    const data: User = yield call(fetchLogin, action.payload);
    console.log(data);
    yield put(fetchSuccess(data));
    setToken(data.token);
  } catch (error) {
    yield put(
      fetchError(
        error.message.includes("500")
          ? "Issue logging into server. Try again in a few minutes."
          : "Incorrect username/password."
      )
    );
  }
}

// watcher

function* onLogin() {
  yield takeLatest(LOGIN, tryLogin);
}

export default function* appSaga() {
  yield all([call(onLogin)]);
}
