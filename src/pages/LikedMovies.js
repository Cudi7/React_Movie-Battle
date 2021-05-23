import React, { useContext, useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import LikedMoviesList from '../components/LikedMovies/LikedMoviesList';
import { List, makeStyles } from '@material-ui/core';
import { MovieContext } from '../contexts/movie.context';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    margin: '0.5rem auto 0',
  },
}));

function LikedMovies(props) {
  const { currentMovieList } = useContext(MovieContext);
  const [likedElement, setLikedElement] = useState(false);

  useEffect(() => {
    if (currentMovieList) {
      setLikedElement(currentMovieList.find((el) => el.liked === true));
    }
  }, [currentMovieList]);

  const classes = useStyles();

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

      {likedElement ? (
        currentMovieList.map(
          (movie, index) =>
            movie.liked && (
              <List className={classes.root}>
                <LikedMoviesList movie={movie} />
              </List>
            )
        )
      ) : (
        <h1
          className={classes.root}
          style={{ margin: '7rem auto 3rem', textAlign: 'center' }}
        >
          This list is empty, click 'Learn More' on any movie to add it here
        </h1>
      )}
    </>
  );
}

export default LikedMovies;
