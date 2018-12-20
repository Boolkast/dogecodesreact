const drawerWidth = 320;

export const styles = theme => ({
  root: {
    display: "flex"
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
    height: `calc(100% - 20px)`
  },
  tabContainer: {
    height: "56px"
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  messages: {
    ...theme.mixins.gutters(),
    padding: theme.spacing.unit * 2,
    maxWidth: "70%",
    minWidth: "10%"
  },
  messageFromMe: {
    padding: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    backgroundColor: '#e6dcff',
  },
  tabsSizes: {
    height: "100%"
  },
  tabSize: {
    padding: "5px"
  },
  drawerPaper: {
    width: drawerWidth
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3
  },
  right: {
    position: "absolute",
    right: 0,
    marginRight: 20
  }
});
