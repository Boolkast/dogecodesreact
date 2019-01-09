import React from "react";
import { withStyles } from "@material-ui/core/styles";
import MessageList from "../MessageList/messageList";
import { styles } from "./style";
import { connect } from "react-redux";
import AppBarComponent from "../AppBar/AppBar";
import SideBar from "../SideBar/SideBar";

class ChatPage extends React.Component {

  componentDidMount() {
    const { fetchAllChats, fetchMyChats } = this.props

    Promise.all([
      fetchAllChats(),
      fetchMyChats()
    ])
  }

  render() {
    return (
      <div className={this.props.classes.root}>
        <AppBarComponent state={this.props.state} chatname={this.props.chat} />
        <SideBar chats={this.props.chat} />
        <MessageList messages={[]} />
      </div>
    );
  }
}

export default connect(
  state => ({ state: state })
)(withStyles(styles)(ChatPage));
