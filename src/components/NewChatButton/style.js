import { fade } from '@material-ui/core/styles/colorManipulator';
const drawerWidth = 320;

export const styles = theme => ({
    button: {
        borderRadius: "60px",
        width: "56px",
        height: "56px",
        margin: '0',
        padding: '0',
        position: "absolute",
        bottom: "70px",
        right: "10px"
    },
    iconContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    modal: {
        width: "30%",
        minWidth: "300px",
        padding: "40px"
    },
    modalContainer: {
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
    }
});