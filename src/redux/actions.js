import http from "../service/NetworkService";
import * as TYPE from "./actionTypes";

export const logIn = (log, pass) => async (dispatch, getState) => {
    const username = log
    const password = pass
    const r = await http("/login", "POST", { username, password })
        .then(r => r.json())
        .then(r => {
            if (r.success) {
                dispatch({
                    type: TYPE.AUTH_FULFILLED,
                    payload: {
                        user: r.user,
                        token: r.token
                    }
                });
                localStorage.setItem("token", r.token)
            }
        })
        .catch(e => console.log(e))
}

export const register = (log, pass) => async (dispatch, getState) => {
    const username = log
    const password = pass
    const r = await http("/signup", "POST", { username, password })
        .then(r => r.json())
        .then(r => {
            if (r.success) {
                dispatch({
                    type: TYPE.AUTH_FULFILLED,
                    payload: {
                        user: r.user,
                        token: r.token
                    }
                });
                localStorage.setItem("token", r.token)
            }
        })
        .catch(e => console.log(e))
}