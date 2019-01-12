import * as TYPE from '../actions/actionTypes';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case TYPE.RECIEVE_MESSAGE:
      return [...state, action.payload.message];
    case TYPE.FETCH_CHAT_FULFILLED:
      return action.payload.chat.messages;
    default:
      return state;
  }
};
