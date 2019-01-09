import auth from './authReducer';
import chat from "./chatReducer";
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from "redux-thunk";
import logger from "redux-logger";

function configureStore() {
    const reducer = combineReducers({
        auth,
        chat
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