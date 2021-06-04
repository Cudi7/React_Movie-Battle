import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { fetchMovie } from '../../api/api';

import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import useMovieDetailsStyles from './MovieDetailsStyles';
import { Container, CssBaseline } from '@material-ui/core';
import Button from '@material-ui/core/Button';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

import MovieIcon from '@material-ui/icons/Movie';
import { Link as RouterLink } from 'react-router-dom';
import { formatedDataDetails } from '../../utils/formatedData';

import Loading from '../Loading/Loading';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import { useDispatch, useSelector } from 'react-redux';
import { selectMovies, toggleLike } from '../../store/ui/moviesSlice';

function MovieDetails() {
  const [currentDetails, setCurrentDetails] = useState('');
  const [movie, setMovie] = useState();
  const [detailsObject, setDetailsObject] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [height, setHeight] = useState('400px');
  const [loadingDetails, setLoadingDetails] = useState(true);
  const classes = useMovieDetailsStyles();

  const currentMovieList = useSelector(selectMovies());

  const dispatch = useDispatch();

  let { id } = useParams();

  const handleExpandClick = () => {
    setHeight(height === '400px' ? '0px' : '400px');
    setExpanded(!expanded);
  };

  useEffect(() => {
    const handleDetailsFetch = async () => {
      const data = await fetchMovie(id, 'searchById');

      const detailsObject = formatedDataDetails(data);

      setCurrentDetails(data);
      setDetailsObject(detailsObject);
      setMovie(currentMovieList.find((el) => el.imdbID === id));
      setLoadingDetails(false);
    };

    id && handleDetailsFetch();
  }, [id, currentMovieList]);

  const handleLikeState = (id) => {
    dispatch(toggleLike(id));
  };

  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">
        {loadingDetails ? (
          <Loading />
        ) : (
          <Card className={classes.root}>
            <CardHeader
              avatar={
                <Avatar aria-label="Rated" className={classes.avatar}>
                  {currentDetails.Rated}
                </Avatar>
              }
              title={currentDetails.Title}
              subheader={`Released: ${currentDetails.Released}`}
            />
            <CardMedia
              component="img"
              className={classes.media}
              image={currentDetails.Poster}
              title={currentDetails.Title}
              alt={currentDetails.Title}
              height={height}
              style={{ maxWidth: '300px' }}
            />
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                {currentDetails.Plot}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton
                aria-label="add to favorites"
                onClick={() => handleLikeState(currentDetails.imdbID)}
                style={{ marginRight: 'auto' }}
              >
                {movie?.liked ? (
                  <FavoriteIcon color="secondary" />
                ) : (
                  <FavoriteBorderIcon
                    color={movie?.liked ? 'secondary' : 'inherit'}
                  />
                )}
              </IconButton>
              <Button
                variant="outlined"
                style={{ marginRight: '1.5vw' }}
                component={RouterLink}
                to="/"
              >
                <KeyboardReturnIcon />
              </Button>

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
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <List>
                  {detailsObject &&
                    detailsObject.map((el, i) => (
                      <ListItem key={i}>
                        <ListItemAvatar>
                          <Avatar>
                            <MovieIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={el.key} secondary={el.value} />
                      </ListItem>
                    ))}
                </List>
              </CardContent>
            </Collapse>
          </Card>
        )}
      </Container>
    </>
  );
}

export default MovieDetails;
