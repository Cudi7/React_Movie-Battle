import { makeStyles } from '@material-ui/core/styles';

const useModalStyles = makeStyles((theme) => ({
  paper: {
    width: 310,
    backgroundColor: theme.palette.background.paper,
    border: '0.5px solid rgba(0,0,0,0.4)',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    margin: '50vh auto',
    transform: 'translateY(-50%)',
  },
}));

export default useModalStyles;
