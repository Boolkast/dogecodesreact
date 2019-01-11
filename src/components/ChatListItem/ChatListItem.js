import React from "react";
import { withStyles } from "@material-ui/core/styles";
import AvatarComponent from "../Avatar/avatar";
import { styles } from "./style";
import Button from "@material-ui/core/Button"
import ListItem from '@material-ui/core/ListItem';
import { Link } from 'react-router-dom';

function ChatListItem(props) {
    const { classes } = props;
    return (
        <ListItem disabled={props.disabled} button component={Link} to={`/chat/${props.id}`}>
            <AvatarComponent name={props.title} />
            <div className={classes.info}>
                <p className={classes.infoItem}>{props.title}</p>
            </div>
        </ListItem>
    )
}

export default withStyles(styles)(ChatListItem);
