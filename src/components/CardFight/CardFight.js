import React, { useState } from 'react';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MovieIcon from '@material-ui/icons/Movie';
import {
  Hidden,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },

  avatar: {
    backgroundColor: red[500],
  },
}));

function CardFight(props) {
  const { movieComparative, wins } = props;

  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Hidden xsDown>
            <Avatar aria-label="recipe" className={classes.avatar}>
              {movieComparative[0].value.slice(0, 1)}
            </Avatar>
          </Hidden>
        }
        title={movieComparative[0].value}
      />

      <CardMedia
        className={classes.media}
        image={movieComparative[2].value}
        title="Paella dish"
      />

      <CardActions disableSpacing>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto">
        <CardContent>
          <List>
            {movieComparative.map((el, i) =>
              el.key !== 'Poster' &&
              el.key !== 'Title' &&
              el.key !== 'imdbID' ? (
                <ListItem
                  key={i}
                  divider={
                    movieComparative.indexOf(el) < movieComparative.length - 1
                  }
                  style={{
                    border: el.winner
                      ? '1px solid rgba(3, 192, 74, 0.3)'
                      : '1px solid rgba(255, 0, 0, 0.3)',
                    backgroundColor: el.winner
                      ? 'rgba(3, 192, 74, 0.2)'
                      : 'rgba(255, 0, 0, 0.2)',
                  }}
                >
                  <Hidden xsDown={true}>
                    <ListItemAvatar>
                      <Avatar>
                        <MovieIcon />
                      </Avatar>
                    </ListItemAvatar>
                  </Hidden>
                  <ListItemText primary={el.key} secondary={el.value} />
                </ListItem>
              ) : null
            )}
          </List>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default CardFight;
