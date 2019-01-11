export const styles = theme => ({
  messageWrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 3}px`,
  },
  messageWrappperFromMe: {
    justifyContent: 'flex-end',
  },
  messages: {
    padding: theme.spacing.unit * 2,
    maxWidth: "70%",
    minWidth: "10%"
  },
  messageFromMe: {
    padding: theme.spacing.unit * 2,
    backgroundColor: '#e6dcff',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    display: "flex",
    flexDirection: "column"
  },
  right: {
    position: "absolute",
    right: 0,
  },
  messagesContainer: {
    marginBottom: "50px"
  }
});
