import * as types from './actionTypes';
import http from "../service/NetworkService";
import { redirect } from "./services";

export function fetchMyChats() {
    return (dispatch, getState) => {
        const { isFetching } = getState().services;
        if (isFetching.myChats) {
          return Promise.resolve();
        }

        const { token } = getState().auth;
        dispatch({
            type: types.FETCH_MY_CHATS_REQUEST,
        });

        return http('/chats/my', "GET", "", token)
            .then(r => r.json())
            .then(r => {
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
        const { isFetching } = getState().services;

        if (isFetching.allChats) {
          return Promise.resolve();
        }
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
        const { isFetching } = getState().services;

        if (isFetching.chat) {
          return Promise.resolve();
        }
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
                dispatch(redirect(`/chat/${r.chat._id}`))
            })
    }
}


export function createChat(title) {
    return (dispatch, getState) => {
        const { isFetching } = getState().services;

        if (isFetching.createChat) {
          return Promise.resolve();
        }
        const { token } = getState().auth;

        dispatch({
            type: types.CREATE_CHAT_REQUEST
        })

        return http('/chats', 'POST', title, token)
        .then( r => r.json())
        .then( r => {
            if (r.success) {
                dispatch({
                    type: types.CREATE_CHAT_FULFILLED,
                    payload: r
                })
                dispatch(redirect(`/chat/${r.chat._id}`))
            }
        })
        .catch( e => console.log(e))
    }
}
export function joinChat() {
    return (dispatch, getState) => {
        const { isFetching } = getState().services;
        const id = getState().chat.activeId
        if (isFetching.joinChat) {
          return Promise.resolve();
        }
        const { token } = getState().auth;

        dispatch({
            type: types.JOIN_CHAT_REQUEST
        })

        return http(`/chats/${id}/join`, 'GET', null, token)
        .then( r => r.json())
        .then( r => {
            if (r.success) {
                dispatch({
                    type: types.JOIN_CHAT_FULFILLED,
                    payload: r
                })
                dispatch(redirect(`/chat/${id}`))
            }
        })
        .catch( e => console.log(e))
    }
}
export function leaveChat(id) {
    return (dispatch, getState) => {
        const { isFetching } = getState().services;

        if (isFetching.leaveChat) {
          return Promise.resolve();
        }
        const { token } = getState().auth;

        dispatch({
            type: types.LEAVE_CHAT_REQUEST
        })

        return http(`/chats/${id}/leave`, 'GET', null, token)
        .then( r => r.json())
        .then( r => {
            if (r.success) {
                dispatch({
                    type: types.LEAVE_CHAT_FULFILLED,
                    payload: r
                })
            }
        })
        .catch( e => console.log(e))
    }
}
export function deleteChat(id) {
    return (dispatch, getState) => {
        const { isFetching } = getState().services;

        if (isFetching.deleteChat) {
          return Promise.resolve();
        }
        const { token } = getState().auth;

        dispatch({
            type: types.DELETE_CHAT_REQUEST
        })

        return http(`/chats/${id}`, 'DELETE', null, token)
        .then( r => r.json())
        .then( r => {
            if (r.success) {
                dispatch({
                    type: types.DELETE_CHAT_FULFILLED,
                    payload: r
                })
            }
        })
        .catch( e => console.log(e))
    }
}