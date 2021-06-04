import { Paper } from '@material-ui/core';
import React from 'react';
import Loading from '../Loading/Loading';

import Movie from './Movie/Movie';
import { useSelector } from 'react-redux';
import { selectMovies, selectLoading } from '../../store/ui/moviesSlice';

function Movies(props) {
  const { handleSelection } = props;

  const currentMovieList = useSelector(selectMovies());
  const loading = useSelector(selectLoading());

  return loading ? (
    <Loading from={'movies'} />
  ) : (
    <Paper
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1rem',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: '1vw',
      }}
    >
      {currentMovieList &&
        currentMovieList.map((movie, index) => (
          <Movie movie={movie} key={index} handleSelection={handleSelection} />
        ))}
    </Paper>
  );
}

export default Movies;
