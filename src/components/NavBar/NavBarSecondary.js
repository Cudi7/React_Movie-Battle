import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Button, IconButton } from '@material-ui/core';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import useNavBarStyles from './NavBarStyles';

import { Link as RouterLink } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';

function NavBarSecondary(props) {
  const classes = useNavBarStyles();

  return (
    <>
      <div className={classes.root}>
        <AppBar position="static">
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
              to="/likedMovies"
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
      </div>
    </>
  );
}

export default NavBarSecondary;
