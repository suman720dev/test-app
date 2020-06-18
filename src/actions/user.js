import userService from '../userService';

import { history } from "../helper";
import { alertActions } from "./alert";

export const REGISTER_REQUEST = 'USERS_REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'USERS_REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'USERS_REGISTER_FAILURE';

export const LOGIN_REQUEST = 'USERS_LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'USERS_LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'USERS_LOGIN_FAILURE';
export const LOGOUT = "LOGOUT";

export function register(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.register(user).then(
      user => {
        dispatch(success(user));
        history.push("/login");
        dispatch(alertActions.success("Registration successful"));
      },
      error => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
    
    function request(user) {
      return { type: REGISTER_REQUEST, user };
    }
    function success(user) {
      return { type: REGISTER_SUCCESS, user };
    }
    function failure(error) {
      return { type: REGISTER_FAILURE, error };
    }
  };
  
}

export function login(username, password) {
  return (dispatch) => {
    dispatch(request({ username }));
    userService.login(username, password).then(
      user => {
        dispatch(success(user));
        history.push("/");
      },
      error => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
    function request(user) {
      return { type: LOGIN_REQUEST, user };
    }
    function success(user) {
      return { type: LOGIN_SUCCESS, user };
    }
    function failure(error) {
      return { type: LOGIN_FAILURE, error };
    }
}

export function logout() {
    userService.logout();
    return { type: LOGOUT }
}
