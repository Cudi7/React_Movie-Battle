import React, { useState, useEffect, useContext } from 'react';
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
import { MovieContext } from '../../contexts/movie.context';
import SimpleAlerts from '../Alert/Alert';

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

  const { input, handleChange } = useContext(MovieContext);

  const {
    handleSearch,
    searchMovieList,
    setSearchMovieList,
    error,
    loading,
    setLoading,
  } = props;

  useEffect(() => {
    setTimeout(() => setResetValue(false), 500);
  }, [resetValue]);

  useEffect(() => {
    setLoading(false);
  }, [searchMovieList.length]);

  const handleChangeTerm = (e) => {
    handleChange(e); //custom hook
    handleSearch(e);
  };

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
                  onChange={handleChangeTerm}
                  value={input}
                />
              </div>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="open drawer"
                component={RouterLink}
                to="/likedMovies"
              >
                <FavoriteBorderIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
        </HideOnScroll>
        <SearchItems
          searchMovieList={searchMovieList}
          setSearchMovieList={setSearchMovieList}
          setResetValue={setResetValue}
          loading={loading}
        />
        )
      </div>
      {error && <SimpleAlerts />}
    </>
  );
}

export default NavBar;
