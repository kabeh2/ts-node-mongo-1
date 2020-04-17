import axios from "axios";
import { call, all, put, takeLatest } from "redux-saga/effects";
import { fetchRequest, fetchError, fetchSuccess } from "../actions";
import { apiUrl, setToken, axiosAuth } from "../../services/auth.service";
import { LOGIN, LoginAction, LOGOUT, GET_USER } from "../actions/types/actions";
import { UserCredentials } from "../actions/types/UserCredentials";
import { User } from "../actions/types/User";
import { toggleAuth } from "../actions/actionCreators";

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
    yield call(setToken(data.token));
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

// LOGOUT fetch call
const fetchLogout = async () => {
  const { data } = await axiosAuth().post(`${apiUrl}/users/logout`);
  return data;
};

// LOGOUT worker
function* tryLogout() {
  try {
    yield put(fetchRequest());
    const data = yield call(fetchLogout);

    console.log(data);
    yield put(toggleAuth());
  } catch (error) {
    yield put(fetchError(error));
  }
}

// LOGOUT watcher
function* onLogout() {
  yield takeLatest(LOGOUT, tryLogout);
}

// GET USER FETCH
const fetchGetUser = async () => {
  const { data } = await axiosAuth().get(`${apiUrl}/users/me`);
  return data;
};

// GET USER WORKER
function* tryGetUser() {
  try {
    yield put(fetchRequest());
    const data = yield call(fetchGetUser);
    console.log("GET DATA: ", data);
  } catch (error) {
    yield put(fetchError(error));
  }
}

// GET USER WATCHER
function* onGetUser() {
  yield takeLatest(GET_USER, tryGetUser);
}

export default function* appSaga() {
  yield all([call(onLogin), call(onLogout), call(onGetUser)]);
}
