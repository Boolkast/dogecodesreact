import React from "react";
import classNames from 'classnames';
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import AvatarComponent from "../Avatar/avatar";
import { styles } from "./style";
import ChatMessageInput from "../ChatMessageInput/ChatMessageInput";

class MessageList extends React.Component {

  componentDidMount() {
    this.scrollDownHistory();
  }

  componentDidUpdate() {
    this.scrollDownHistory();
  }
  
  scrollDownHistory() {
    if (this.wrapper) {
      this.wrapper.scrollTop = this.wrapper.scrollHeight;
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.content} ref={(wrapper) => {
        this.wrapper = wrapper;
      }}>
        <div className={classes.toolbar} />
        <div className={classes.messagesContainer}>
        {
          this.props.messages.map((item, i) => {
            const isMe = this.props.userId == item.sender._id
            return (
              <div key={i} className={classNames(classes.messageWrapper, isMe && classes.messageWrappperFromMe)}>
                {!isMe && <AvatarComponent name={item.sender.username} />}
                <Paper className={classNames(classes.messages, isMe ? classes.messageFromMe : null)}>
                  <Typography variant="h5" component="h4">
                    {item.sender.username}
                  </Typography>
                  <Typography component="p">
                    {item.content}
                  </Typography>
                </Paper>
                {isMe && <AvatarComponent name={item.sender.username} />}
              </div>
            )
          })
        }
        </div>
        <ChatMessageInput disabled={!this.props.isConnected} joinChat={this.props.joinChat} activeUser={this.props.activeUser} sendMessage={this.props.sendMessage}/>
      </div>
    )
  }
}

export default withStyles(styles)(MessageList);
