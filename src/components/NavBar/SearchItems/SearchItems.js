import React, { useState, useEffect, useContext } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Avatar, ClickAwayListener, ListItemAvatar } from '@material-ui/core';
import { MovieContext } from '../../../contexts/movie.context';
import LoadingSearch from '../../Loading/LoadingSearch';
import { useDispatch } from 'react-redux';
import { addMovie } from '../../../store/ui/moviesSlice';
import useSearchItemsStyles from './SearchItemsStyles';

function SearchItems(props) {
  const classes = useSearchItemsStyles();
  const dispatch = useDispatch();
  const { searchMovieList, setSearchMovieList, setResetValue, loading } = props;

  const { reset } = useContext(MovieContext);

  const [open, setOpen] = useState(true);

  useEffect(() => {
    setOpen(true);
  }, [searchMovieList]);

  const handleClickAwayEvent = () => {
    setOpen(false);
    setResetValue(true);
    setSearchMovieList([]);
  };

  const handleClick = (newMovie) => {
    dispatch(addMovie(newMovie));

    reset(); //input from searchbar
    setOpen((prev) => !prev);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAwayEvent}>
      <div className={(loading || searchMovieList.length) && classes.root}>
        {open ? (
          <List component="nav" aria-label="secondary">
            {loading ? (
              <LoadingSearch />
            ) : (
              searchMovieList.map((el, index) => {
                return (
                  <ListItem
                    button
                    divider={
                      searchMovieList.indexOf(el) < searchMovieList.length - 1
                    }
                    onClick={() => handleClick(el)}
                    key={el.imdbID}
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
                );
              })
            )}
          </List>
        ) : null}
      </div>
    </ClickAwayListener>
  );
}

export default SearchItems;
