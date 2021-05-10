import { makeStyles } from '@material-ui/core/styles';

const useModalStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 300,
    backgroundColor: theme.palette.background.paper,
    border: '0.5px solid rgba(0,0,0,0.4)',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default useModalStyles;
