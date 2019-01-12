/* eslint no-use-before-define: 0 */
/* eslint-disable no-underscore-dangle */
import { combineReducers } from 'redux';
import * as types from '../actions/actionTypes';

const initialState = {
  activeId: null,
  allIds: [],
  myIds: [],
  byIds: {},
};

function activeId(state = initialState.activeId, action) {
  switch (action.type) {
    case types.SET_ACTIVE_CHAT:
    case types.JOIN_CHAT_FULFILLED:
      return action.payload.chat._id;
    case types.UNSET_ACTIVE_CHAT:
    case types.DELETE_CHAT_FULFILLED:
      return '';
    case types.RECIEVE_DELETED_CHAT:
      return state === getChatId(action.payload.chat) ? null : activeId;
    default:
      return state;
  }
}
function allIds(state = initialState.allIds, action) {
  switch (action.type) {
    case types.FETCH_ALL_CHATS_FULFILLED:
      return action.payload.chats.map(getChatId);
    case types.CREATE_CHAT_FULFILLED:
    case types.RECIEVE_NEW_CHAT:
      return [...state, action.payload.chat._id];
    case types.DELETE_CHAT_FULFILLED:
    case types.RECIEVE_DELETED_CHAT:
      return state.filter(chatId => chatId !== getChatId(action.payload.chat));
    default:
      return state;
  }
}
function myIds(state = initialState.myIds, action) {
  switch (action.type) {
    case types.FETCH_MY_CHATS_FULFILLED:
      return action.payload.chats.map(getChatId);
    case types.CREATE_CHAT_FULFILLED:
    case types.JOIN_CHAT_FULFILLED:
      return [...state, action.payload.chat._id];
    case types.DELETE_CHAT_FULFILLED:
    case types.LEAVE_CHAT_FULFILLED:
    case types.RECIEVE_DELETED_CHAT:
      return state.filter(chatId => chatId !== getChatId(action.payload.chat));
    default:
      return state;
  }
}
function byIds(state = initialState.byIds, action) {
  switch (action.type) {
    case types.FETCH_ALL_CHATS_FULFILLED:
    case types.FETCH_MY_CHATS_FULFILLED:
      return {
        ...state,
        ...action.payload.chats.reduce(
          (ids, chat) => ({
            ...ids,
            [chat._id]: chat,
          }),
          {},
        ),
      };
    case types.CREATE_CHAT_FULFILLED:
    case types.LEAVE_CHAT_FULFILLED:
    case types.JOIN_CHAT_FULFILLED:
    case types.RECIEVE_NEW_CHAT:
      return {
        ...state,
        [action.payload.chat._id]: {
          ...action.payload.chat,
        },
      };
    case types.DELETE_CHAT_FULFILLED:
    case types.RECIEVE_DELETED_CHAT:
      return {
        ...state,
        [getChatId(action.payload.chat)]: action.payload.chat,
      };
    default:
      return state;
  }
}

export default combineReducers({
  activeId,
  allIds,
  myIds,
  byIds,
});

export const getChatId = chat => chat._id;
export const getById = (state, id) => state.byIds[id];
export const getByIds = (state, ids) => ids.map(id => state.byIds[id]);
