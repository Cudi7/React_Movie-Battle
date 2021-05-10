import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import useHeroStyles from './HeroStyles';
import { Box, Container, CssBaseline } from '@material-ui/core';

function Hero() {
  const classes = useHeroStyles();

  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box my={10}>
          <Card className={classes.root} variant="outlined">
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                Word of the Day
              </Typography>
              <Typography variant="h5" component="h2">
                Movie Fight Club
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                adjective
              </Typography>
              <Typography variant="body2" component="p">
                Select two movies or use the search bar to find something, and
                make them fight!
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Box>
      </Container>
    </>
  );
}

export default Hero;
