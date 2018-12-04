import React, { Component } from 'react';
import PermanentDrawerLeft from "./components/drawerSideBar";

class App extends Component {

  constructor() {
    super()
    this.messages = [
      {
        sender: "me",
        message: "blablablabla"
      },
      {
        sender: "someone",
        message: "you're pidor"
      },
      {
        sender: "me",
        message: "(((("
      },
      {
        sender: "Boolka Lol",
        message: "(((("
      }
    ]

    this.chatname = "Boolka kekosikus"
  }

  render() {
    return (
      <div>
        <PermanentDrawerLeft messages={this.messages} chatname={this.chatname}/>
      </div>
    );
  }
}

export default App;
