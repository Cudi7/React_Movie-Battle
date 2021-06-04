import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: 'absolute',
    right: 0,
    top: '3.5rem',
    boxShadow: '1px 2px 3px 0 rgba(0,0,0,0.7)',
    zIndex: '3',
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    marginRight: theme.spacing(2),
  },
}));

export default useStyles;
