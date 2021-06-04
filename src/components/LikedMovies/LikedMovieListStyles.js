import { makeStyles } from '@material-ui/core/styles';

const useLikedMovieListStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    marginRight: theme.spacing(2),
  },
}));

export default useLikedMovieListStyles;
