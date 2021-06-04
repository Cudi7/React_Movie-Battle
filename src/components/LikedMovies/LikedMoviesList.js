import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { IconButton, ListItemSecondaryAction } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch } from 'react-redux';
import { toggleLike } from '../../store/ui/moviesSlice';
import useLikedMovieListStyles from './LikedMovieListStyles';

export default function LikedMoviesList(props) {
  const { movie } = props;

  const classes = useLikedMovieListStyles();
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(toggleLike(id));
  };

  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar
          alt={movie.Title}
          src={movie.Poster}
          className={classes.large}
        />
      </ListItemAvatar>
      <ListItemText primary={movie.Title} secondary={movie.Year} />
      <ListItemSecondaryAction>
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={() => handleDelete(movie.imdbID)}
        >
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}
