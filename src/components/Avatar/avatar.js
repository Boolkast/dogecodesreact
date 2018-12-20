import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { styles } from "./style";
import colorFrom from "../../utils/colors"

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
  
  return <Avatar className={classes.purpleAvatar} style={{backgroundColor: colorFrom(props.name)}}>{sym}</Avatar>;
}

export default withStyles(styles)(AvatarComponent);
