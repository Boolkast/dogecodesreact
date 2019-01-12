import { fade } from '@material-ui/core/styles/colorManipulator';

const drawerWidth = 320;

// eslint-disable-next-line
export const styles = theme => ({
  root: {
    display: 'flex',
  },
  messageWrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 3}px`,
  },
  messageWrappperFromMe: {
    justifyContent: 'flex-end',
  },
  chatlist: {
    height: 'calc(100% - 20px)',
  },
  tabContainer: {
    height: '56px',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  messages: {
    ...theme.mixins.gutters(),
    padding: theme.spacing.unit * 2,
    maxWidth: '70%',
    minWidth: '10%',
  },
  messageFromMe: {
    padding: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    backgroundColor: '#e6dcff',
  },
  tabsSizes: {
    height: '100%',
  },
  tabSize: {
    padding: '5px',
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
  right: {
    position: 'absolute',
    right: 0,
    marginRight: 20,
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  search: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    width: '100%',
    height: '64px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputInput: {
    width: '85%',
    borderBottom: 'solid 1px #000',
  },
});
