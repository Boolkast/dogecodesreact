import React from "react";
import classNames from 'classnames';
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import AvatarComponent from "../Avatar/avatar";
import { styles } from "./style";

function MessageList(props) {
  const { classes } = props;
  return (
  <main className={classes.content}>
  <div className={classes.toolbar} />
  {
    props.messages.map((item, i) => {
      console.log(i)
      return (
      <div key={i} className={classNames(classes.messageWrapper, item.sender === "me" && classes.messageWrappperFromMe)}>
      { item.sender !== "me" && <AvatarComponent name={item.sender}/> }
        <Paper className={classNames(classes.messages, item.sender === "me" && classes.messageFromMe)}>
          <Typography variant="h5" component="h3">
            {item.sender}
          </Typography>
          <Typography component="p">
            {item.message}
          </Typography>
        </Paper>
      { item.sender === "me" && <AvatarComponent name={item.sender}/> }
      </div>
      )
    })
  }
</main>
  )
}

export default withStyles(styles)(MessageList);
