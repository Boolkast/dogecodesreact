import { createStore, applyMiddleware, compose } from 'redux';
import thunk from "redux-thunk";
import logger from "redux-logger";

const {} = require('redux');

const token = localStorage.getItem('token');

const initialState = {
    isAuth: !!token,
    token: token,
    user: {
        _id: "",
        createdAt: undefined,
        username: "",
        chats: [],
    }
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case "AUTH_FULFILLED":
            return {
                isAuth: true,
                ...action.payload
            }
        case "LOGOUT":
            return {
                isAuth: false
            };
        default:
            return state;
    }
}

function configureStore() {
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