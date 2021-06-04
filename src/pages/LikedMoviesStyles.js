import { makeStyles } from '@material-ui/core';

const useLikedMoviesStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    margin: '0.5rem auto 0',
  },
}));

export default useLikedMoviesStyles;
