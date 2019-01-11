import React from "react";
import { withStyles } from "@material-ui/core/styles";
import AvatarComponent from "../Avatar/avatar";
import { styles } from "./style";
import Button from "@material-ui/core/Button"

function ChatListItem(props) {
    const { classes } = props;
    return (
        <Button key={props.indx} className={classes.chatItem} onClick={() => props.setActiveChat(props.id)}>
            <AvatarComponent name={props.title} />
            <div className={classes.info}>
                <p className={classes.infoItem}>{props.title}</p>
            </div>
        </Button>
    )
}

export default withStyles(styles)(ChatListItem);
