import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { IconButton } from '@material-ui/core';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import useNavBarStyles from './NavBarStyles';

import { Link as RouterLink } from 'react-router-dom';
import SearchItems from './SearchItems/SearchItems';

function HideOnScroll(props) {
  const { children } = props;

  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

function NavBar(props) {
  const classes = useNavBarStyles();
  const [resetValue, setResetValue] = useState(false);

  const {
    handleSearch,
    searchMovieList,
    setSearchMovieList,
    setCurrentMovieList,
    currentMovieList,
  } = props;

  useEffect(() => {
    setTimeout(() => setResetValue(false), 500);
  }, [resetValue]);

  return (
    <>
      <div className={classes.root}>
        <HideOnScroll {...props}>
          <AppBar>
            <Toolbar>
              <Typography
                variant="h6"
                className={classes.title}
                noWrap
                component={RouterLink}
                to="/"
              >
                movieBattle
              </Typography>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                  onChange={handleSearch}
                  value={resetValue ? '' : undefined}
                />
              </div>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="open drawer"
                component={RouterLink}
                to="/liked-movies"
              >
                <FavoriteBorderIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
        </HideOnScroll>
        {searchMovieList.length && (
          <SearchItems
            searchMovieList={searchMovieList}
            setSearchMovieList={setSearchMovieList}
            setCurrentMovieList={setCurrentMovieList}
            currentMovieList={currentMovieList}
            setResetValue={setResetValue}
          />
        )}
      </div>
    </>
  );
}

export default NavBar;
