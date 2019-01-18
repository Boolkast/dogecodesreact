import SocketIOClient from 'socket.io-client';
import * as TYPE from './actionTypes';
import { redirect } from './services';
/* eslint-disable no-underscore-dangle */

export function missingSocketConnection() {
  return {
    type: TYPE.SOCKET_MISSING_CONNECTION,
    payload: new Error('Missong connection'),
  };
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
      type: TYPE.SOCKETS_CONNECTION_REQUEST,
    });

    socket = SocketIOClient('wss://dogecodes-chat-api.herokuapp.com/', {
      query: { token },
    });

    socket.on('connect', () => {
      dispatch({
        type: TYPE.SOCKETS_CONNECTION_FULFILLED,
      });
    });

    socket.on('error', (error) => {
      dispatch({
        type: TYPE.SOCKETS_CONNECTION_REJECT,
        payload: new Error(`Connection: ${error}`),
      });
    });

    socket.on('connect_error', () => {
      dispatch({
        type: TYPE.SOCKETS_CONNECTION_REJECT,
        payload: new Error('We have lost a connection :('),
      });
    });

    socket.on('new-message', (message) => {
      dispatch({
        type: TYPE.RECIEVE_MESSAGE,
        payload: message,
      });
    });

    socket.on('new-chat', ({ chat }) => {
      dispatch({
        type: TYPE.RECIEVE_NEW_CHAT,
        payload: { chat },
      });
    });

    socket.on('deleted-chat', ({ chat }) => {
      const { activeId } = getState().chat;

      dispatch({
        type: TYPE.RECIEVE_DELETED_CHAT,
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
  return (dispatch, getState) => {
    const { activeId } = getState().chat;

    if (!socket) {
      dispatch(missingSocketConnection());
    }

    socket.emit(
      'send-message',
      {
        chatId: activeId,
        content,
      },
      () => {
        dispatch({
          type: TYPE.SEND_MESSAGE,
          payload: {
            chatId: activeId,
            content,
          },
        });
      },
    );
  };
}
export function mountChat(chatId) {
  return (dispatch) => {
    if (!socket) {
      dispatch(missingSocketConnection());
    }

    socket.emit('mount-chat', chatId);

    dispatch({
      type: TYPE.MOUNT_CHAT,
      payload: { chatId },
    });
  };
}
export function unmountChat(chatId) {
  return (dispatch) => {
    if (!socket) {
      dispatch(missingSocketConnection());
    }

    socket.emit('unmount-chat', chatId);

    dispatch({
      type: TYPE.UNMOUNT_CHAT,
      payload: { chatId },
    });
  };
}
