import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import LikedMoviesList from '../components/LikedMovies/LikedMoviesList';
import { List, Paper } from '@material-ui/core';
import useLikedMoviesStyles from './LikedMoviesStyles';
import { useSelector } from 'react-redux';
import { selectMovies } from '../store/ui/moviesSlice';

function LikedMovies() {
  const currentMovieList = useSelector(selectMovies());
  const [likedElement, setLikedElement] = useState(false);

  //fix weird bug with material ui styles (8px margin appearing on refresh)
  document.body.style.margin = 0;

  useEffect(() => {
    if (currentMovieList) {
      setLikedElement(currentMovieList.find((el) => el.liked === true));
    }
  }, [currentMovieList]);

  const classes = useLikedMoviesStyles();

  return (
    <Paper style={{ minHeight: '100vh' }}>
      <Typography
        gutterBottom
        variant="h4"
        component="h2"
        style={{ paddingTop: '7rem', textAlign: 'center' }}
      >
        Your favorite Movies!
      </Typography>

      {likedElement ? (
        currentMovieList.map(
          (movie) =>
            movie.liked && (
              <List className={classes.root} key={movie.imdbID}>
                <LikedMoviesList movie={movie} />
              </List>
            )
        )
      ) : (
        <h1
          className={classes.root}
          style={{ margin: '7rem auto 3rem', textAlign: 'center' }}
        >
          This list is empty... 😪
        </h1>
      )}
    </Paper>
  );
}

export default LikedMovies;
