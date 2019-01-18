import http from '../service/NetworkService';
import * as TYPE from './actionTypes';

export const logIn = (log, pass) => async (dispatch, getState) => {
  const { isFetching } = getState().services;

  if (isFetching.login) {
    return Promise.resolve();
  }

  const username = log;
  const password = pass;
  await http('/login', 'POST', { username, password })
    .then(r => r.json())
    .then((r) => {
      if (r.success) {
        dispatch({
          type: TYPE.AUTH_FULFILLED,
          payload: {
            user: r.user,
            token: r.token,
          },
        });
        localStorage.setItem('token', r.token);
      } else {
        dispatch({
          type: TYPE.AUTH_REJECT,
          payload: r.message,
        });
      }
    })
    .catch((e) => {
      dispatch({
        type: TYPE.AUTH_REJECT,
        payload: e,
      });
    });
};

export const logout = () => async (dispatch, getState) => {
  const { isFetching } = getState().services;

  if (isFetching.logout) {
    return Promise.resolve();
  }
  const { token } = getState().auth;

  return await http('/logout', 'GET', null, token)
    .then(r => r.json())
    .then((r) => {
      if (r.success) {
        dispatch({
          type: TYPE.LOGOUT_FULFILLED,
        });
        localStorage.removeItem('token');
      }
    })
    .catch(e =>
      dispatch({
        type: TYPE.LOGOUT_FULFILLED,
        payload: e,
      }),
    );
};

export const register = (log, pass) => async (dispatch, getState) => {
  const { isFetching } = getState().services;

  if (isFetching.redister) {
    return Promise.resolve();
  }
  const username = log;
  const password = pass;
  return await http('/signup', 'POST', { username, password })
    .then(r => r.json())
    .then((r) => {
      if (r.success) {
        dispatch({
          type: TYPE.AUTH_FULFILLED,
          payload: {
            user: r.user,
            token: r.token,
          },
        });
        localStorage.setItem('token', r.token);
      } else {
        dispatch({
          type: TYPE.AUTH_REJECT,
          payload: r.message,
        });
      }
    })
    .catch((e) => {
      dispatch({
        type: TYPE.AUTH_REJECT,
        payload: e,
      });
    });
};

export function recieveAuth() {
  return (dispatch, getState) => {
    const { token } = getState().auth;

    if (!token) {
      dispatch({
        type: TYPE.RECIEVE_AUTH_REJECT,
      });
      return;
    }
    return http('/users/me', 'GET', null, token)
      .then(r => r.json())
      .then((r) => {
        dispatch({
          type: TYPE.RECIEVE_AUTH_FULFILLED,
          payload: r.user,
        });
      })
      .catch((e) => {
        dispatch({
          type: TYPE.RECIEVE_AUTH_REJECT,
          payload: e,
        });
      });
  };
}

export function editUser(username, firstName, lastName) {
  return (dispatch, getState) => {
    const { isFetching } = getState().services;
    const { token } = getState().auth;

    if (isFetching.editUser) {
      return Promise.resolve();
    }

    dispatch({
      type: TYPE.EDIT_USER_REQUEST,
    });

    return http(
      '/users/me',
      'POST',
      { data: { username, firstName, lastName } },
      token,
    )
      .then(r => r.json())
      .then((r) => {
        dispatch({
          type: TYPE.EDIT_USER_FULFILLED,
          payload: r,
        });
      })
      .catch((e) => {
        dispatch({
          type: TYPE.EDIT_USER_REJECT,
          payload: e,
        });
      });
  };
}
