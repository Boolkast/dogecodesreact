import React from 'react';
import {
  BrowserRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom';
import ChatPage from './containers/ChatPage';
import Auth from './components/Auth/Auth';
import PrivateRouter from './containers/PrivateRouter';

function App() {
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

export default App;
