import React from 'react';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import useMovieStyles from './MovieStyles';
import { useHistory } from 'react-router';
import FightModal from '../../Modal/FightModal';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';

function Movie(props) {
  const classes = useMovieStyles();
  const {
    movie,
    handleSelection,
    primaryMovie,
    secondaryMovie,
    id,
    handleReset,
  } = props;
  let history = useHistory();

  const handleClick = (id) => {
    history.push(`/details/${id}`);
  };

  const selected = id.find((el) => el === movie.imdbID);

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={() => handleClick(movie.imdbID)}>
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
          <Typography variant="body2" color="textSecondary" component="p">
            {movie.Year}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          color="primary"
          variant="contained"
          onClick={() => handleClick(movie.imdbID)}
          style={{ marginRight: 'auto' }}
        >
          Learn More
        </Button>
        {!primaryMovie || !secondaryMovie ? (
          <Button
            disabled={selected ? true : false}
            size="small"
            variant="contained"
            color="secondary"
            style={{ marginLeft: 'auto' }}
            onClick={
              primaryMovie
                ? () => handleSelection(movie, 'secondary', movie.imdbID)
                : () => handleSelection(movie, 'primary', movie.imdbID)
            }
          >
            {id.find((el) => el === movie.imdbID)
              ? primaryMovie
                ? 'First Fighter'
                : 'Second Fighter'
              : 'Select Fighter'}
          </Button>
        ) : (
          <>
            <FightModal
              primaryMovie={primaryMovie}
              secondaryMovie={secondaryMovie}
              handleSelection={handleSelection}
              handleReset={handleReset}
            />
            <RotateLeftIcon onClick={handleReset} cursor="pointer" />
          </>
        )}
      </CardActions>
    </Card>
  );
}

export default Movie;
