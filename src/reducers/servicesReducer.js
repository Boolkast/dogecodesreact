import { combineReducers } from 'redux';
import * as types from '../actions/actionTypes';

const intialState = {
  isFetching: {
    login: false,
    logout: false,
    recieveAuth: false,
    allChats: false,
    myChats: false,
    chat: false,
    createChat: false,
    joinChat: false,
    leaveChat: false,
    deleteChat: false,
    sockets: false,
    editUser: false,
  },
  errors: {
    auth: null,
    chat: null,
  },
  isConnected: false,
};

export const isFetching = (state = intialState.isFetching, action) => {
  switch (action.type) {
    case types.AUTH_REQUEST:
      return { ...state, login: true };
    case types.LOGOUT_REQUEST:
      return { ...state, logout: true };
    case types.RECIEVE_AUTH_REQUEST:
      return { ...state, recieveAuth: true };
    case types.FETCH_ALL_CHATS_REQUEST:
      return { ...state, allChats: true };
    case types.FETCH_MY_CHATS_REQUEST:
      return { ...state, myChats: true };
    case types.FETCH_CHAT_REQUEST:
      return { ...state, chat: true };
    case types.CREATE_CHAT_REQUEST:
      return { ...state, createChat: true };
    case types.JOIN_CHAT_REQUEST:
      return { ...state, joinChat: true };
    case types.LEAVE_CHAT_REQUEST:
      return { ...state, leaveChat: true };
    case types.DELETE_CHAT_REQUEST:
      return { ...state, deleteChat: true };
    case types.SOCKETS_CONNECTION_REQUEST:
      return { ...state, sockets: true };
    case types.EDIT_USER_REQUEST:
      return { ...state, editUser: true };

    case types.AUTH_FULFILLED:
    case types.AUTH_REJECT:
      return { ...state, login: false };
    case types.LOGOUT_FULFILLED:
    case types.LOGOUT_REJECT:
      return { ...state, logout: false };
    case types.RECIEVE_AUTH_FULFILLED:
    case types.RECIEVE_AUTH_REJECT:
      return { ...state, recieveAuth: false };
    case types.FETCH_ALL_CHATS_FULFILLED:
    case types.FETCH_ALL_CHATS_REJECT:
      return { ...state, allChats: false };
    case types.FETCH_MY_CHATS_FULFILLED:
    case types.FETCH_MY_CHATS_REJECT:
      return { ...state, myChats: false };
    case types.FETCH_CHAT_FULFILLED:
    case types.FETCH_CHAT_REJECT:
      return { ...state, chat: false };
    case types.CREATE_CHAT_FULFILLED:
    case types.CREATE_CHAT_REJECT:
      return { ...state, createChat: false };
    case types.JOIN_CHAT_FULFILLED:
    case types.JOIN_CHAT_REJECT:
      return { ...state, joinChat: false };
    case types.LEAVE_CHAT_FULFILLED:
    case types.LEAVE_CHAT_REJECT:
      return { ...state, leaveChat: false };
    case types.DELETE_CHAT_FULFILLED:
    case types.DELETE_CHAT_REJECT:
      return { ...state, deleteChat: false };
    case types.SOCKETS_CONNECTION_FULFILLED:
    case types.SOCKETS_CONNECTION_REJECT:
      return { ...state, sockets: false };
    case types.EDIT_USER_FULFILLED:
    case types.EDIT_USER_REJECT:
      return { ...state, editUser: false };
    default:
      return state;
  }
};

export const errors = (state = intialState.errors, action) => {
  switch (action.type) {
    case types.AUTH_REJECT:
    case types.LOGOUT_REJECT:
      return { ...state, auth: action.payload };

    case types.AUTH_FULFILLED:
    case types.LOGOUT_FULFILLED:
      return { ...state, auth: null };

    case types.FETCH_ALL_CHATS_REJECT:
    case types.FETCH_MY_CHATS_REJECT:
    case types.FETCH_CHAT_REJECT:
    case types.CREATE_CHAT_REJECT:
    case types.JOIN_CHAT_REJECT:
    case types.LEAVE_CHAT_REJECT:
    case types.DELETE_CHAT_REJECT:
    case types.SOCKETS_CONNECTION_REJECT:
    case types.EDIT_USER_REJECT:
      return { ...state, chat: action.payload.message };
    case types.FETCH_ALL_CHATS_FULFILLED:
    case types.FETCH_MY_CHATS_FULFILLED:
    case types.FETCH_CHAT_FULFILLED:
    case types.CREATE_CHAT_FULFILLED:
    case types.JOIN_CHAT_FULFILLED:
    case types.LEAVE_CHAT_FULFILLED:
    case types.DELETE_CHAT_FULFILLED:
    case types.SOCKETS_CONNECTION_FULFILLED:
    case types.EDIT_USER_FULFILLED:
      return { ...state, chat: null };
    default:
      return state;
  }
};

export const isConnected = (state = intialState.isConnected, action) => {
  switch (action.type) {
    case types.SOCKET_MISSING_CONNECTION:
    case types.SOCKETS_CONNECTION_REJECT:
      return false;
    case types.SOCKETS_CONNECTION_FULFILLED:
      return true;
    default:
      return state;
  }
};

export default combineReducers({
  isFetching,
  errors,
  isConnected,
});
