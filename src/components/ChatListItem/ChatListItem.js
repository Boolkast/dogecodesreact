import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import { Link } from 'react-router-dom';
import { styles } from './style';
import AvatarComponent from '../Avatar/avatar';

function ChatListItem(props) {
  const {
    classes, disabled, title, id, createdAt,
  } = props;
  return (
    <ListItem disabled={disabled} button component={Link} to={`/chat/${id}`}>
      <AvatarComponent name={title} />
      <div className={classes.info}>
        <p className={classes.infoItem}>{title}</p>
        <p>{createdAt}</p>
      </div>
    </ListItem>
  );
}

ChatListItem.propTypes = {
  id: PropTypes.string.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  disabled: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default withStyles(styles)(ChatListItem);
