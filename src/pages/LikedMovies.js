import React, { useContext, useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import LikedMoviesList from '../components/LikedMovies/LikedMoviesList';
import { List, makeStyles, Paper } from '@material-ui/core';
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
  //fix weird bug with material ui styles (8px margin appearing on refresh)
  document.body.style.margin = 0;

  useEffect(() => {
    if (currentMovieList) {
      setLikedElement(currentMovieList.find((el) => el.liked === true));
    }
  }, [currentMovieList]);

  const classes = useStyles();

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
          This list is empty... 😪
        </h1>
      )}
    </Paper>
  );
}

export default LikedMovies;
