import history from '../utils/history';
import * as TYPE from "./actionTypes";

export function redirect(to) {
    return ( dispatch ) => {
        history.push(`${process.enc.PUBLIC_URL}/${to}`);
        dispatch({
            type: TYPE.REDIRECT,
            payload: { to }
        })
    }
}