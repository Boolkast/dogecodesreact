import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import Input from 'material-ui/Input';
import { styles } from './style';

class ChatMessageInput extends React.Component {
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    joinChat: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
    sendMessage: PropTypes.func.isRequired,
    activeUser: PropTypes.objectOf(PropTypes.string).isRequired,
  };

  state = {
    value: '',
  };

  enterHandler = (e) => {
    const { value } = this.state;
    const { sendMessage } = this.props;
    if (e.key === 'Enter' && value.length !== 0) {
      sendMessage(value);
      this.setState({ value: '' });
    }
  };

  changeHandler = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    const {
      classes, activeUser, disabled, joinChat,
    } = this.props;
    const { value } = this.state;
    return (
      <div className={classes.chatInputCenterer}>
        <Paper className={classes.input}>
          {activeUser.isMember || activeUser.isCreator ? (
            <Input
              fullWidth
              placeholder="Enter a message"
              value={value}
              onChange={this.changeHandler}
              onKeyPress={this.enterHandler}
              disabled={disabled}
            />
          ) : (
            <Button
              disabled={disabled}
              fullWidth
              variant="raised"
              color="primary"
              onClick={joinChat}
            >
              Join chat
            </Button>
          )}
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(ChatMessageInput);
