import React, { Component } from 'react';
import { styles } from "./style";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button"
import AddIcon from "@material-ui/icons/Add";
import Modal from "@material-ui/core/Modal";
import Paper from "@material-ui/core/Paper";
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

class NewChatButton extends React.Component {

    state = {
        modal: false,
        title: {
            value: "",
            valid: true
        }
    };

    changeHandler = (e) => {
        this.setState({
            title: {
                value: e.target.value,
                valid: true
            }
        })
    }

    onCreateButton = (e) => {
        if (this.state.title.value.length === 0) {
            this.setState({
                title: {
                    valid: false
                }
            })
        } else {
            this.props.createChat( {data: {
                title: this.state.title.value}})
            .then( r=> console.log(r))
        }
    }

    render() {
        return (
            <>
                <Button
                    onClick={() => this.setState({ modal: true })}
                    className={this.props.classes.button}
                    color="primary"
                    variant="fab"
                >
                    <div className={this.props.classes.iconContainer}>
                        <AddIcon />
                    </div>
                </Button>
                <Modal
                    className={this.props.classes.modalContainer}
                    open={this.state.modal}
                    onClose={() => this.setState({ modal: false })}
                >
                    <Paper className={this.props.classes.modal}>
                        <Typography variant="title">
                            Create new chat
                        </Typography>
                        <TextField
                            required
                            fullWidth
                            label="New chat"
                            placeholder="Enter the name"
                            type="text"
                            value={this.state.title.value}
                            onChange={this.changeHandler}
                            error={!this.state.title.valid}
                        />
                        <Button
                            onClick={this.onCreateButton}
                            color="primary"
                        > Create chat </Button>
                    </Paper>
                </Modal>
            </>
        )
    }
}

export default withStyles(styles)(NewChatButton);