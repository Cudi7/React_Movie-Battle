import { Paper } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { fetchInitialVal } from '../../api/api';
import Movie from './Movie/Movie';

function Movies(props) {
  const [initialVal, setInitialVal] = useState([]);
  const {
    currentMovieList,
    handleSelection,
    primaryMovie,
    secondaryMovie,
  } = props;

  useEffect(() => {
    const fetchInitalValHandler = async () => {
      setInitialVal(await fetchInitialVal());
    };

    fetchInitalValHandler();
  }, []);

  const currentMovieArrayValues = currentMovieList
    ? currentMovieList
    : initialVal;

  return (
    <Paper
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1rem',
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}
    >
      {currentMovieArrayValues &&
        currentMovieArrayValues.map((movie, index) => (
          <Movie
            movie={movie}
            key={index}
            handleSelection={handleSelection}
            primaryMovie={primaryMovie}
            secondaryMovie={secondaryMovie}
          />
        ))}
    </Paper>
  );
}

export default Movies;
