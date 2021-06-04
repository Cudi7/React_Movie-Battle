import React, { useState } from 'react';

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

import IconButton from '@material-ui/core/IconButton';

import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import DeleteIcon from '@material-ui/icons/Delete';
import SnackBar from '../../SnackBar/SnackBar';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMovie, toggleLike } from '../../../store/ui/moviesSlice';
import {
  resetFighters,
  selectFirstFighter,
  selectSecondFighter,
} from '../../../store/entities/movieFightSlice';

function Movie(props) {
  const classes = useMovieStyles();

  const { movie, handleSelection } = props;

  const dispatch = useDispatch();
  const firstFighter = useSelector(selectFirstFighter());
  const secondFighter = useSelector(selectSecondFighter());

  const [anchorEl, setAnchorEl] = useState(null);
  const [snackBarState, setSnackBarState] = useState(false);

  let history = useHistory();

  const open = Boolean(anchorEl);
  const selectedFirst = firstFighter.imdbID === movie.imdbID;
  const selectedSecond = secondFighter.imdbID === movie.imdbID;

  const handleClick = (id) => history.push(`/details/${id}`);

  const handleMenu = (event) => setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const handleLikeState = (id) => {
    dispatch(toggleLike(id));
    setSnackBarState(true);
  };

  const handleDelete = (id) => dispatch(deleteMovie(id));

  const handleSelectionClick = (movie) => {
    firstFighter.length === 0
      ? handleSelection(movie, 'primary')
      : handleSelection(movie, 'secondary');
  };

  return (
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
          Details
        </Button>
        <div>
          <IconButton
            aria-label="more actions"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
          >
            <AddCircleRoundedIcon color="error" fontSize="default" />
          </IconButton>

          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              <IconButton
                aria-label="like"
                onClick={() => handleLikeState(movie.imdbID)}
              >
                {movie?.liked ? (
                  <FavoriteIcon aria-label="like" color="secondary" />
                ) : (
                  <FavoriteBorderIcon
                    color={movie?.liked ? 'secondary' : 'inherit'}
                  />
                )}
              </IconButton>
              {movie?.liked ? (
                <Typography onClick={() => handleLikeState(movie.imdbID)}>
                  😍
                </Typography>
              ) : (
                <Typography onClick={() => handleLikeState(movie.imdbID)}>
                  👍
                </Typography>
              )}
            </MenuItem>

            <MenuItem onClick={handleClose}>
              <IconButton
                aria-label="delete"
                onClick={() => handleDelete(movie.imdbID)}
              >
                <DeleteIcon />
              </IconButton>
              <Typography onClick={() => handleDelete(movie.imdbID)}>
                Delete
              </Typography>
            </MenuItem>
          </Menu>
        </div>
        {firstFighter.length === 0 || secondFighter.length === 0 ? (
          <Button
            disabled={selectedFirst || selectedSecond ? true : false}
            size="small"
            variant="contained"
            color="secondary"
            style={{ marginLeft: 'auto' }}
            onClick={() => handleSelectionClick(movie)}
          >
            {selectedFirst || selectedSecond
              ? firstFighter.length === 0 || secondFighter.length === 0
                ? 'Selected'
                : 'Ready!'
              : 'Select Fighter'}
          </Button>
        ) : (
          <>
            <FightModal handleSelection={handleSelection} />
            <RotateLeftIcon
              onClick={() => dispatch(resetFighters())}
              cursor="pointer"
            />
          </>
        )}
      </CardActions>
      <SnackBar
        snackBarState={snackBarState}
        setSnackBarState={setSnackBarState}
        liked={movie?.liked}
      />
    </Card>
  );
}

export default Movie;
