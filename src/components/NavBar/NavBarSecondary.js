import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import { Button, IconButton } from '@material-ui/core';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import useNavBarStyles from './NavBarStyles';

import { Link as RouterLink } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';

function HideOnScroll(props) {
  const { children } = props;

  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

function NavBarSecondary(props) {
  const classes = useNavBarStyles();

  return (
    <>
      <div className={classes.root}>
        <HideOnScroll {...props}>
          <AppBar>
            <Toolbar>
              <IconButton component={RouterLink} to="/">
                <HomeIcon />
              </IconButton>

              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="open drawer"
                component={RouterLink}
                to="/liked-movies"
                style={{ marginLeft: 'auto' }}
              >
                <FavoriteBorderIcon />
              </IconButton>

              <Button
                edge="start"
                className={classes.menuButton}
                variant="contained"
                component={RouterLink}
                to="/"
              >
                Go Back
              </Button>
            </Toolbar>
          </AppBar>
        </HideOnScroll>
      </div>
    </>
  );
}

export default NavBarSecondary;
