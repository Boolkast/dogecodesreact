import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { styles } from './style';
import colorFrom from '../../utils/colors';

function AvatarComponent(props) {
  const { classes, name } = props;
  let sym = '';
  name
    .split(' ')
    .map(word => word[0].toUpperCase())
    .forEach((s) => {
      sym += s;
    });

  return (
    <Avatar className={classes.purpleAvatar} style={{ backgroundColor: colorFrom(name) }}>
      {sym}
    </Avatar>
  );
}

AvatarComponent.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
};

export default withStyles(styles)(AvatarComponent);
