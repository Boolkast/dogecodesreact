import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";

const styles = theme => ({
  purpleAvatar: {
    margin: 10,
    color: "#fff",
    backgroundColor: "#FF4444"
  }
});

function AvatarComponent(props) {
  const { classes } = props;
  let sym = "";
  props.name
    .split(" ")
    .map(word => {
      return word[0].toUpperCase();
    })
    .forEach(s => {
      sym = sym + s;
    });

  return <Avatar className={classes.purpleAvatar}>{sym}</Avatar>;
}

export default withStyles(styles)(AvatarComponent);
