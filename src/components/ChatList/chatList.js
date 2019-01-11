import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { styles } from "./style";
import ChatListItem from "../ChatListItem/ChatListItem";
import List from '@material-ui/core/List';

function ChatList(props) {
    const { classes } = props;
    return (
        <React.Fragment>
            <List>
            {
                props.chatlist &&
                props.chatlist.map( (chat, i) => {
                    return (
                        <ChatListItem disabled={!props.isConnected} indx={i} title={chat.title} id={chat._id} setActiveChat={props.setActiveChat}/>
                    )
                })
            }
            </List>
        </React.Fragment>
    )
}

export default withStyles(styles)(ChatList);
