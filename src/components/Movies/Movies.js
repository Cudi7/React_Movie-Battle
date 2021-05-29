import { Paper } from '@material-ui/core';
import React, { useContext } from 'react';
import Loading from '../Loading/Loading';

import { MovieContext } from '../../contexts/movie.context';

import Movie from './Movie/Movie';

function Movies(props) {
  const { handleSelection, id, handleReset, handleLikes } = props;

  const { currentMovieList, loading } = useContext(MovieContext);

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
          <Movie
            movie={movie}
            key={index}
            handleSelection={handleSelection}
            id={id}
            handleReset={handleReset}
            handleLikes={handleLikes}
          />
        ))}
    </Paper>
  );
}

export default Movies;
