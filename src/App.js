import React, { Component } from 'react';
import ChatPage from "./containers/ChatPage";
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Auth from "./components/Auth/Auth";
import { Provider } from 'react-redux';
import reducers from './reducers';
import PrivateRouter from "./containers/PrivateRouter";

class App extends Component {
  render() {
    return (
      <Provider store={reducers}>
        <Router>
          <Switch>
            <Route exact path="/" component={Auth} />
            <PrivateRouter path="/chat" component={ChatPage} />
            <Redirect to="/" />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;