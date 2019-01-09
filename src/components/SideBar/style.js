import { fade } from '@material-ui/core/styles/colorManipulator';
const drawerWidth = 320;

export const styles = theme => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth
    },
    toolbar: theme.mixins.toolbar,
    search: {
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        width: '100%',
        height: '64px',
        display: "flex",
        alignItems: "center",
        justifyContent: 'center'
    },
    chatlist: {
        height: `calc(100% - 20px)`
      },
    inputRoot: {
        color: 'inherit',
        width: '100%',
        display: 'flex',
        alignItems: "center",
        justifyContent: 'center'
    },
    inputInput: {
        width: '85%',
        borderBottom: 'solid 1px #000',
    },
    tabContainer: {
        height: "56px"
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
});
