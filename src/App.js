import React, { Component } from 'react';
import PermanentDrawerLeft from "./components/Drawer/drawerSideBar";
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Auth from "./components/Auth/Auth";
import { Provider } from 'react-redux';
import AuthReducer from './redux/authReducer';


class App extends Component {
  render() {
    return (
      <Provider store={AuthReducer}>
        <Router>
          <Switch>
            <Route exact path="/" component={Auth} />
            <Route path="/chat" component={PermanentDrawerLeft} />
            <Redirect to="/" />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
