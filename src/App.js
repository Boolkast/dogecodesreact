import React, { Component } from 'react';
import PermanentDrawerLeft from "./components/Drawer/drawerSideBar";
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

class App extends Component {

  constructor() {
    super()
    
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" Component={PermanentDrawerLeft} />
          <Route path="/chat" component={PermanentDrawerLeft} />
          <Redirect to="/" />
        </Switch>
      </Router>
    );
  }
}

export default App;
