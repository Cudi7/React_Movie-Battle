import { makeStyles } from '@material-ui/core';
import { red } from '@material-ui/core/colors';

const useMovieDetailsStyles = makeStyles((theme) => ({
  root: {
    marginTop: '2rem',
    boxShadow: '1px 2px 3px 0 rgba(0,0,0,0.4)'
  },
  media: {
    transition: 'all 0.3s linear',
    margin: '0 auto'


  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default useMovieDetailsStyles;
