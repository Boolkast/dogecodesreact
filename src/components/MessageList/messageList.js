import React from "react";
import classNames from 'classnames';
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import AvatarComponent from "../Avatar/avatar";
import { styles } from "./style";
import ChatMessageInput from "../ChatMessageInput/ChatMessageInput";

function MessageList(props) {
  const { classes } = props;
  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      {
        props.messages.map((item, i) => {
          const isMe = props.userId == item.sender._id
          return (
            <div key={i} className={classNames(classes.messageWrapper, isMe && classes.messageWrappperFromMe)}>
              { !isMe && <AvatarComponent name={item.sender.username} />}
              <Paper className={classNames(classes.messages, isMe ? classes.messageFromMe : null)}>
                <Typography variant="h5" component="h4">
                  {item.sender.username}
                </Typography>
                <Typography component="p">
                  {item.content}
                </Typography>
              </Paper>
              { isMe && <AvatarComponent name={item.sender.username} />}
            </div>
          )
        })
      }
      <ChatMessageInput joinChat={props.joinChat} isUserInChat={props.isUserInChat} sendMessage={props.sendMessage} id={props.chatId}/>
    </main>
  )
}

export default withStyles(styles)(MessageList);
