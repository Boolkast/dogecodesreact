import {
  createStore, applyMiddleware, compose, combineReducers,
} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import auth from './authReducer';
import messages from './messageReducer';
import chat from './chatReducer';
import services from './servicesReducer';

function configureStore() {
  const reducer = combineReducers({
    auth,
    chat,
    messages,
    services,
  });

  if (process.env.NODE_ENV === 'production') {
    return createStore(reducer, applyMiddleware(thunk));
  }

  /* eslint-disable no-underscore-dangle */
  const composeEnhacers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;
  /* eslint-enable no-underscore-dangle */

  return createStore(reducer, composeEnhacers(applyMiddleware(thunk, logger)));
}

const store = configureStore();

export default store;

/* eslint-disable no-underscore-dangle */
export const getUserId = user => user._id;
/* eslint-enable no-underscore-dangle */

export const getActiveUser = state => state.auth.user;

export const isCreator = (state, chatItem) => {
  try {
    return getUserId(chatItem.creator) === getUserId(getActiveUser(state));
  } catch (e) {
    return false;
  }
};

export const isMember = (state, chatItem) => {
  try {
    return chatItem.members.some(member => getUserId(member) === getUserId(getActiveUser(state)));
  } catch (e) {
    return false;
  }
};
/* eslint max-len: ["error", { "code": 150 }] */
export const isChatMember = (state, chatItem) => isCreator(state, chatItem) || isMember(state, chatItem);
