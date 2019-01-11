import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { styles } from "./style";
import ChatListItem from "../ChatListItem/ChatListItem";

function ChatList(props) {
    const { classes } = props;
    const source = props.type == 0 ? props.chatlist.myIds : props.chatlist.allIds;
    return (
        <React.Fragment>
            {
                source &&
                source.map( (chat, i) => {
                    const gettedChat = props.chatlist.byIds[chat]
                    return (
                        <ChatListItem indx={i} title={gettedChat.title} id={gettedChat._id} setActiveChat={props.setActiveChat}/>
                    )
                })
            }
        </React.Fragment>
    )
}

export default withStyles(styles)(ChatList);
