import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import useNavBarStyles from './NavBarStyles';

import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

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

  const { handleSearch } = props;

  return (
    <>
      <div className={classes.root}>
        <HideOnScroll {...props}>
          <AppBar>
            <Toolbar>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="open drawer"
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title} noWrap component={RouterLink} to="/">
               Movie Battle App
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
                />
              </div>
            </Toolbar>
          </AppBar>
        </HideOnScroll>
      </div>
    </>
  );
}

export default NavBar;
