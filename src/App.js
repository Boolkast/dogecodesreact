import React, { Component } from 'react';
import PermanentDrawerLeft from "./components/Drawer/drawerSideBar";

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
    this.chatlist = [
      {
        name: "boolker",
        last_update: new Date()
      },
      {
        name: "boolkerdwadwdw",
        last_update: new Date()
      },
      {
        name: "awdwadawboolker",
        last_update: new Date(2018, 10, 30)
      },
    ]
  }

  render() {
    return (
      <div>
        <PermanentDrawerLeft messages={this.messages} chatname={this.chatname} chatlist={this.chatlist}/>
      </div>
    );
  }
}

export default App;
