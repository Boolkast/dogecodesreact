import history from '../utils/history';
import * as TYPE from './actionTypes';

// eslint-disable-next-line
export function redirect(to) {
  return (dispatch) => {
    history.push(to);
    dispatch({
      type: TYPE.REDIRECT,
      payload: { to },
    });
  };
}
