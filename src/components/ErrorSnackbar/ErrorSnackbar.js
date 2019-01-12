import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from 'material-ui/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

class ErrorSnackbar extends React.Component {
  static propTypes = {
    error: PropTypes.instanceOf(Error),
  };

  static defaultProps = {
    error: null,
  };

  state = {
    // eslint-disable-next-line
    open: !!this.props.error,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      this.setState({ open: true });
    }
  }

  handleCloseSnackbar = () => {
    this.setState({ open: false });
  };

  render() {
    const { error } = this.props;
    const { open } = this.state;

    if (!error) {
      return null;
    }
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={this.handleCloseSnackbar}
        message={<span>{error}</span>}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={this.handleCloseSnackbar}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    );
  }
}

export default ErrorSnackbar;
