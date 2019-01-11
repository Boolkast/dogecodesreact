import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import Input from 'material-ui/Input';
import { styles } from "./style";

class ChatMessageInput extends React.Component {

    state = {
        value: "",
    }

    enterHandler = (e) => {
        if (e.key == "Enter" && this.state.value.length != 0) {
            this.props.sendMessage(this.state.value)
            this.setState({ value: "" })
        }
    }

    changeHandler = (e) => {
        this.setState({
            value: e.target.value
        })
    }

    render() {
        const { classes } = this.props
        return (
            <div className={classes.chatInputCenterer}>
                <Paper className={classes.input}>
                    {
                        this.props.isUserInChat ? (
                            <Button
                                fullWidth
                                variant="raised"
                                color="primary"
                                onClick={() => this.props.joinChat}
                            >
                                Join chat
                        </Button>
                        ) : (
                                <Input
                                    fullWidth
                                    placeholder="Enter a message"
                                    value={this.state.value}
                                    onChange={this.changeHandler}
                                    onKeyPress={this.enterHandler}
                                />
                            )
                    }
                </Paper>
            </div>
        )
    }
}

export default withStyles(styles)(ChatMessageInput);
