import React, { useContext } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import useHeroStyles from './HeroStyles';
import { Box, Container, CssBaseline } from '@material-ui/core';
import { MovieContext } from '../../contexts/movie.context';

function Hero(props) {
  const classes = useHeroStyles();
  const { restoreVal, handleVal } = useContext(MovieContext);

  const handleRestoreApp = () => {
    restoreVal('movies');
    window.location.reload();
  };

  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box my={10}>
          {props.fight ? (
            <Card className={classes.root} variant="outlined">
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  It was a terrifying fight 💢💥
                </Typography>
                <Typography variant="h5" component="h2">
                  But we have a winner!
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  Now you can:
                </Typography>
                <Typography variant="body2" component="p">
                  - Scroll down and press the arrows to see the details
                </Typography>
                <Typography variant="body2" component="p">
                  - Press Show Winner
                </Typography>
                <Typography variant="body2" component="p">
                  - Go back and reset
                </Typography>
              </CardContent>
            </Card>
          ) : (
            <Card className={classes.root} variant="outlined">
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  Welcome to the
                </Typography>
                <Typography variant="h5" component="h2">
                  Movie Fight Club
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  V1.0
                </Typography>
                <Typography variant="body2" component="p">
                  Select two movies or use the search bar to find something, and
                  make them fight!
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" variant="outlined">
                  <a
                    href="https://github.com/Cudi7"
                    style={{ color: 'inherit', textDecoration: 'none' }}
                  >
                    Learn More
                  </a>
                </Button>
                <Button
                  size="small"
                  onClick={handleRestoreApp}
                  style={{ marginLeft: 'auto' }}
                >
                  Restore App
                </Button>
              </CardActions>
            </Card>
          )}
        </Box>
      </Container>
    </>
  );
}

export default Hero;
