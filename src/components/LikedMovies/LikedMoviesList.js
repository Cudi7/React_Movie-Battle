import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { IconButton, ListItemSecondaryAction } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import useLocalStorage from '../../hooks/useLocalStorage';
import { MovieContext } from '../../contexts/movie.context';

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    marginRight: theme.spacing(2),
  },
}));

export default function LikedMoviesList(props) {
  const { movie } = props;

  const { currentMovieList, setCurrentMovieList } = useContext(MovieContext);

  const [value, setValue] = useLocalStorage('movies');
  const classes = useStyles();

  const handleClick = (id) => {
    const filteredList = currentMovieList.map((el) => {
      if (el.imdbID === id) {
        el.liked = false;
      }
      return el;
    });
    setCurrentMovieList(filteredList);
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
          onClick={() => handleClick(movie.imdbID)}
        >
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}
