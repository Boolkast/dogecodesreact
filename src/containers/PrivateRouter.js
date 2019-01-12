import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { recieveAuth } from '../actions/auth';

class PrivateRouter extends React.Component {
  static propTypes = {
    component: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    recieveAuth: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { recieveAuth } = this.props
    recieveAuth();
  }

  render() {
    const { component: Component, isAuth, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={props => (isAuth ? <Component {...props} /> : <Redirect to="/" />)}
      />
    );
  }
}

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    recieveAuth,
  },
  dispatch,
);

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(PrivateRouter),
);
