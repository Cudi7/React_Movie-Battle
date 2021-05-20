import { Paper } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { fetchInitialVal } from '../../api/api';
import useLocalStorage from '../../hooks/useLocalStorage';
import Movie from './Movie/Movie';

function Movies(props) {
  const [initialVal, setInitialVal] = useState([]);
  const {
    currentMovieList,
    setCurrentMovieList,
    handleSelection,
    primaryMovie,
    secondaryMovie,
    id,
    handleReset,
  } = props;

  const [val, handleVal] = useLocalStorage('movies');

  useEffect(() => {
    const fetchInitalValHandler = async () => {
      const initialValues = await fetchInitialVal();

      setInitialVal(initialValues.map((val) => ({ ...val, liked: false })));
    };
    val === 'movies' ? fetchInitalValHandler() : setInitialVal(val);
  }, []);

  useEffect(() => {
    setCurrentMovieList(initialVal);
  }, [initialVal]);

  useEffect(() => {
    handleVal(currentMovieList);
  }, [currentMovieList]);

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
      {currentMovieList &&
        currentMovieList.map((movie, index) => (
          <Movie
            movie={movie}
            key={index}
            handleSelection={handleSelection}
            primaryMovie={primaryMovie}
            secondaryMovie={secondaryMovie}
            id={id}
            handleReset={handleReset}
          />
        ))}
    </Paper>
  );
}

export default Movies;
