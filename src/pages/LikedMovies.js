import React from 'react';
import { useHistory } from 'react-router';

import Typography from '@material-ui/core/Typography';
import useMovieStyles from '../components/Movies/Movie/MovieStyles';
import LikedMoviesList from '../components/LikedMovies/LikedMoviesList';
import { List, makeStyles, Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    margin: '0.5rem auto 0',
  },
}));

function LikedMovies(props) {
  const { likedMovies, currentMovieList, setCurrentMovieList } = props;
  const classes = useStyles();
  let history = useHistory();

  return (
    <>
      <Typography
        gutterBottom
        variant="h4"
        component="h2"
        style={{ margin: '7rem auto 3rem', textAlign: 'center' }}
      >
        Your favorite Movies!
      </Typography>

      {currentMovieList ? (
        currentMovieList.map(
          (movie, index) =>
            movie.liked && (
              <List className={classes.root}>
                <LikedMoviesList
                  movie={movie}
                  setCurrentMovieList={setCurrentMovieList}
                  currentMovieList={currentMovieList}
                />
              </List>
            )
        )
      ) : (
        <h1>No liked movies yet</h1>
      )}
    </>
  );
}

export default LikedMovies;
