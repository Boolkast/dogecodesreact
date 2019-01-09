import * as types from './actionTypes';
import http from "../service/NetworkService";
import { redirect } from "./services";

export function fetchMyChats() {
    return (dispatch, getState) => {
        const { token } = getState().auth;

        dispatch({
            type: types.FETCH_MY_CHATS_REQUEST,
        });

        return http('/chats/my', "GET", "", token)
            .then(r => r.json())
            .then(r => {
                console.log(r)
                dispatch({
                    type: types.FETCH_MY_CHATS_FULFILLED,
                    payload: r
                })
            })
            .catch(e => {
                dispatch({
                    type: types.FETCH_MY_CHATS_REJECT,
                    payload: e
                })
            })
    }
}

export function fetchAllChats() {
    return (dispatch, getState) => {
        const { token } = getState().auth;

        dispatch({
            type: types.FETCH_ALL_CHATS_REQUEST,
        });

        return http('/chats', "GET", "", token)
            .then(r => r.json())
            .then(r => {
                dispatch({
                    type: types.FETCH_ALL_CHATS_FULFILLED,
                    payload: r
                })
            })
            .catch(e => {
                dispatch({
                    type: types.FETCH_ALL_CHATS_REJECT,
                    payload: e
                })
            })
    }
}

export function fetchChat(id) {
    return (dispatch, getState) => {
        const { token } = getState().auth;

        dispatch({
            type: types.FETCH_CHAT_REQUEST,
        });
        return http(`/chats/${id}`, "GET", null, token)
            .then(r => r.json())
            .then(r => {
                dispatch({
                    type: types.FETCH_CHAT_FULFILLED,
                    payload: r
                })
                return r;
            })
            .catch(e => {
                dispatch({
                    type: types.FETCH_CHAT_REJECT,
                    payload: e
                })
            })
    }
}

export function setActiveChat(id) {
    return (dispatch) => {
        return dispatch(fetchChat(id))
            .then(r => {
                if (!r) {
                    dispatch(redirect('/chat'));
                    return dispatch({
                        type: types.UNSET_ACTIVE_CHAT
                    })
                }

                dispatch({
                    type: types.SET_ACTIVE_CHAT,
                    payload: r
                })
            })
    }
}