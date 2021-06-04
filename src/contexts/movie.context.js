import React, { useState, createContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../hooks/useInput';
import useLocalStorage from '../hooks/useLocalStorage';
import { fetchInitialMovies, selectMovies } from '../store/ui/moviesSlice';

export const MovieContext = createContext();

export function MovieProvider(props) {
  const [val, handleVal, restoreVal] = useLocalStorage('movies');
  const [primaryMovie, setPrimaryMovie] = useState('');
  const [secondaryMovie, setSecondaryMovie] = useState('');
  const [input, handleChange, reset] = useInput();
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const currentMovieList = useSelector(selectMovies());

  //fetch initial data when loading page if localStorage is empty
  useEffect(() => {
    const fetchInitalValHandler = (type) => {
      dispatch(fetchInitialMovies(type));
    };
    val === 'movies' ? fetchInitalValHandler() : fetchInitalValHandler(val);
  }, [val]);

  //everytime there is a change, it saves to localStorage
  useEffect(() => {
    handleVal(currentMovieList);
  }, [currentMovieList, handleVal]);

  return (
    <MovieContext.Provider
      value={{
        setPrimaryMovie,
        primaryMovie,
        setSecondaryMovie,
        secondaryMovie,
        input,
        handleChange,
        reset,
        restoreVal,
        loading,
      }}
    >
      {props.children}
    </MovieContext.Provider>
  );
}
