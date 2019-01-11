import React, { Component } from 'react';
import ChatPage from "./containers/ChatPage";
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Auth from "./components/Auth/Auth";
import PrivateRouter from "./containers/PrivateRouter";

class App extends Component {
  render() {
    return (
        <Router>
          <Switch>
            <Route exact path="/" component={Auth} />
            <PrivateRouter path="/chat/:chatId?" component={ChatPage} />
            <Redirect to="/" />
          </Switch>
        </Router>
    );
  }
}

export default App;