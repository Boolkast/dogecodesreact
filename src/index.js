import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'typeface-roboto';
import './index.css';
import store from "./reducers";
import { Provider } from "react-redux";

const rootEl = document.getElementById('root');

const render = (Comp) => {
    ReactDOM.render(
        <Provider store={store}>
            <Comp />
        </Provider>,
        rootEl
    );
}

render(App)
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
