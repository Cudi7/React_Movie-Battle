import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Avatar, ClickAwayListener, ListItemAvatar } from '@material-ui/core';
import useLocalStorage from '../../../hooks/useLocalStorage';
import { MovieContext } from '../../../contexts/movie.context';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: 'absolute',
    right: 0,
    top: '3.5rem',
    boxShadow: '1px 2px 3px 0 rgba(0,0,0,0.7)',
    zIndex: '3',
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    marginRight: theme.spacing(2),
  },
}));

function SearchItems(props) {
  const classes = useStyles();
  const { searchMovieList, setSearchMovieList, setResetValue } = props;

  const { currentMovieList, setCurrentMovieList, reset } =
    useContext(MovieContext);

  const [open, setOpen] = useState(true);

  useEffect(() => {
    setOpen(true);
  }, [searchMovieList]);

  const handleClickAwayEvent = () => {
    setOpen(false);
    setResetValue(true);
    setSearchMovieList([]);
  };

  const handleClick = (newElement) => {
    reset(); //input from searchbar
    setOpen((prev) => !prev);

    const newCurrentMovieList = currentMovieList;
    newCurrentMovieList.pop();

    setSearchMovieList([]);

    setCurrentMovieList([
      { ...newElement, liked: false },
      ...newCurrentMovieList,
    ]);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAwayEvent}>
      <div className={classes.root}>
        {open ? (
          <List component="nav" aria-label="secondary">
            {searchMovieList.map((el, index) => {
              return (
                <>
                  <ListItem
                    button
                    divider={
                      searchMovieList.indexOf(el) < searchMovieList.length - 1
                    }
                    onClick={() => handleClick(el)}
                    key={Date.now()}
                  >
                    <ListItemAvatar>
                      <Avatar
                        alt={el.Title}
                        src={el.Poster}
                        className={classes.large}
                      />
                    </ListItemAvatar>
                    <ListItemText primary={el.Title} key={Date.now()} />
                  </ListItem>
                </>
              );
            })}
          </List>
        ) : null}
      </div>
    </ClickAwayListener>
  );
}

export default SearchItems;
