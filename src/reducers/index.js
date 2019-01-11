import auth from './authReducer';
import messages from './messageReducer';
import chat from "./chatReducer";
import services from "./servicesReducer";

import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from "redux-thunk";
import logger from "redux-logger";

function configureStore() {
    const reducer = combineReducers({
        auth,
        chat,
        messages,
        services
    })

    if (process.env.NODE_ENV === "production") {
        return createStore(reducer, 
            applyMiddleware(thunk))
    } else {
        const composeEnhacers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        : compose;

        return createStore(
            reducer,
            composeEnhacers(
                applyMiddleware(
                    thunk,
                    logger
                )
            )
        )
    }
}

const store = configureStore();

export default store;

export const getUserId = user => user._id;
export const getActiveUser = state => state.auth.user;

export const isCreator = (state, chat) => {
    try {
        return getUserId(chat.creator) === getUserId(getActiveUser(state))
    } catch (e) {
        return false
    }}

export const isMember = (state, chat ) => {
    try {
        return chat.members.some(
            member => getUserId(member) === getUserId(getActiveUser(state))
        );
    } catch (e) {
        return false
    }
}

export const isChatMember = (state, chat) => {
    return isCreator(state, chat) || isMember(state, chat)
}