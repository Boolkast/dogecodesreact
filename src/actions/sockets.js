import SocketIOClinet from 'socket.io-client';
import * as TYPE from "./actionTypes";
import * as types from "./actionTypes";
import { redirect } from "./services";
import SocketIOClient from 'socket.io-client';

export function missingSocketConnection() {
    return {
        type: TYPE.SOCKET_MISSING_CONNECTION,
        payload: new Error('Missong connection')
    }
}

let socket = null;

export function socketsConnect() {
  return (dispatch, getState) => {
    const { isFetching } = getState().services;

    if (isFetching.sockets) {
      return Promise.resolve();
    }
    const state = getState();
    const { token } = state.auth;

    dispatch({
      type: types.SOCKETS_CONNECTION_REQUEST,
    });

    socket = SocketIOClient('localhost:8000', {
      query: { token },
    });

    socket.on('connect', () => {
      dispatch({
        type: types.SOCKETS_CONNECTION_FULFILLED,
      });
    });

    socket.on('error', (error) => {
      dispatch({
        type: types.SOCKETS_CONNECTION_REJECT,
        payload: new Error(`Connection: ${error}`),
      });
    });

    socket.on('connect_error', () => {
      dispatch({
        type: types.SOCKETS_CONNECTION_REJECT,
        payload: new Error('We have lost a connection :('),
      });
    });

    socket.on('new-message', (message) => {
      dispatch({
        type: types.RECIEVE_MESSAGE,
        payload: message,
      });
    });

    socket.on('new-chat', ({ chat }) => {
      dispatch({
        type: types.RECIEVE_NEW_CHAT,
        payload: { chat },
      });
    });

    socket.on('deleted-chat', ({ chat }) => {
      const { activeId } = getState().chat;

      dispatch({
        type: types.RECIEVE_DELETED_CHAT,
        payload: { chat },
      });

      if (activeId === chat._id) {
        dispatch(redirect('/chat'));
      }
    });

    return Promise.resolve();
  };
}

export function sendMessage(content) {
    return ( dispatch, getState ) => {

        const { activeId } = getState().chat;

        if (!socket) {
            dispatch(missingSocketConnection());
        }

        socket.emit('send-message', {
            chatId: activeId,
            content
        }, () => {
            dispatch({
                type: TYPE.SEND_MESSAGE,
                payload: {
                    chatId: activeId,
                    content
                }
            })
        })
    }
}
export function mountChat(chatId) {
    return ( dispatch, getState ) => {
        if (!socket) {
            dispatch(missingSocketConnection());
        }

        socket.emit('mount-chat', chatId)

        dispatch({
            type: TYPE.MOUNT_CHAT,
            payload: { chatId }
        })
    }
}
export function unmountChat(chatId) {
    return ( dispatch, getState ) => {
        if (!socket) {
            dispatch(missingSocketConnection());
        }

        socket.emit('unmount-chat', chatId)

        dispatch({
            type: TYPE.UNMOUNT_CHAT,
            payload: { chatId }
        })
    }
}