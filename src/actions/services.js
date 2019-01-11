import history from '../utils/history';
import * as TYPE from "./actionTypes";

export function redirect(to) {
    return (dispatch) => {
      history.push(to);
      dispatch({
        type: TYPE.REDIRECT,
        payload: { to },
      });
    };
  }
  