import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import { Link } from 'react-router-dom';
import { styles } from './style';
import AvatarComponent from '../Avatar/avatar';

function getTimeLabel(date) {
  const parsed = new Date(date);
  const dif = new Date().getTime() - parsed.getTime();
  const a = new Date(dif);
  if (a.getMonth() > 0) {
    return `${a.getMonth()} month ago`;
  } else if (a.getDay() > 0) {
    return `${a.getDay()} days ago`;
  } else if (a.getHours() > 0) {
    return `${a.getHours()} hours ago`;
  } else if (a.getMinutes() > 0) {
    return `${a.getMinutes()} minutes ago`;
  } else if (a.getSeconds() > 0) {
    return `${a.getSeconds()} seconds ago`;
  }
}

function ChatListItem(props) {
  const {
    classes, disabled, title, id, updatedAt,
  } = props;
  return (
    <ListItem disabled={disabled} button component={Link} to={`/chat/${id}`}>
      <AvatarComponent name={title} />
      <div className={classes.info}>
        <p className={classes.infoItem}>{title}</p>
        <p>{getTimeLabel(updatedAt)}</p>
      </div>
    </ListItem>
  );
}

ChatListItem.propTypes = {
  id: PropTypes.string.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  disabled: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
};

export default withStyles(styles)(ChatListItem);
