import { IconButton, Paper } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import useMovieStyles from '../components/Movies/Movie/MovieStyles';

function LikedMovies(props) {
  const { likedMovies, currentMovieList, setCurrentMovieList } = props;

  let history = useHistory();

  const handleClick = (id) => {
    history.push(`/details/${id}`);
  };

  console.log(likedMovies);

  const classes = useMovieStyles();

  return (
    <>
      <Typography
        gutterBottom
        variant="h4"
        component="h2"
        style={{ margin: '3rem auto 1rem', textAlign: 'center' }}
      >
        Your favorite Movies!
      </Typography>
      <Paper
        elevation={0}
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          justifyContent: 'center',
          alignItems: 'flex-start',
          maxWidth: '1000px',
          margin: '5rem auto',
        }}
      >
        {currentMovieList ? (
          currentMovieList.map(
            (movie, index) =>
              //   <div>{movie.currentDetails.Title}</div>

              movie.liked && (
                <Card className={classes.root}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt={movie.Title}
                      height="400px"
                      image={movie.Poster}
                      title={movie.Title}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {movie.Title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {movie.Year}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      variant="contained"
                      style={{ marginRight: 'auto' }}
                    >
                      Remove
                    </Button>
                  </CardActions>
                </Card>
              )
          )
        ) : (
          <h1>No liked movies yet</h1>
        )}
      </Paper>
    </>
  );
}

export default LikedMovies;
