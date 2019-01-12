import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { styles } from './style';

class NewChatButton extends React.Component {
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    disabled: PropTypes.bool.isRequired,
    createChat: PropTypes.func.isRequired,
  };

  state = {
    modal: false,
    title: {
      value: '',
      valid: true,
    },
  };

  changeHandler = (e) => {
    this.setState({
      title: {
        value: e.target.value,
        valid: true,
      },
    });
  };

  onCreateButton = () => {
    const { createChat } = this.props;
    const { title } = this.state;

    if (title.value.length === 0) {
      this.setState({
        title: {
          valid: false,
        },
      });
    } else {
      createChat({
        data: {
          title: title.value,
        },
      }).then(() => this.setState({ modal: false }));
    }
  };

  render() {
    const { disabled, classes } = this.props;

    const { modal, title } = this.state;

    return (
      <>
        <Button
          disabled={disabled}
          onClick={() => this.setState({ modal: true })}
          className={classes.button}
          color="primary"
          variant="fab"
        >
          <div className={classes.iconContainer}>
            <AddIcon />
          </div>
        </Button>
        <Modal
          className={classes.modalContainer}
          open={modal}
          onClose={() => this.setState({ modal: false })}
        >
          <Paper className={classes.modal}>
            <Typography variant="title">Create new chat</Typography>
            <TextField
              required
              fullWidth
              label="New chat"
              placeholder="Enter the name"
              type="text"
              value={title.value}
              onChange={this.changeHandler}
              error={!title.valid}
            />
            <Button onClick={this.onCreateButton} color="primary">
              {' '}
              Create chat
              {' '}
            </Button>
          </Paper>
        </Modal>
      </>
    );
  }
}

export default withStyles(styles)(NewChatButton);
