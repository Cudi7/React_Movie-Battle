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

function Movie(props) {
  const classes = useMovieStyles();
  const { movie, handleSelection, primaryMovie, secondaryMovie } = props;
  let history = useHistory();

  const handleClick = (id) => {
    history.push(`/details/${id}`);
  };

  const handleSingleMovieData = () => {};

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
            size="small"
            variant="contained"
            color="secondary"
            style={{ marginLeft: 'auto' }}
            onClick={
              primaryMovie
                ? () => handleSelection(movie, 'secondary')
                : () => handleSelection(movie, 'primary')
            }
          >
            {primaryMovie ? 'Second Fighter' : 'First Fighter'}
          </Button>
        ) : (
          <FightModal
            primaryMovie={primaryMovie}
            secondaryMovie={secondaryMovie}
            handleSelection={handleSelection}
          />
        )}
      </CardActions>
    </Card>
  );
}

export default Movie;
