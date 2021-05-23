import React, { useState, createContext, useEffect } from 'react';
import { fetchInitialVal } from '../api/api';
import useLocalStorage from '../hooks/useLocalStorage';

export const MovieContext = createContext();

export function MovieProvider(props) {
  const [val, handleVal] = useLocalStorage('movies');
  const [currentMovieList, setCurrentMovieList] = useState('');
  const [initialVal, setInitialVal] = useState([]);
  const [primaryMovie, setPrimaryMovie] = useState('');
  const [secondaryMovie, setSecondaryMovie] = useState('');

  useEffect(() => {
    const fetchInitalValHandler = async () => {
      const initialValues = await fetchInitialVal();

      setInitialVal(initialValues.map((val) => ({ ...val, liked: false })));
    };
    val === 'movies' ? fetchInitalValHandler() : setInitialVal(val);
  }, [val]);

  useEffect(() => {
    setCurrentMovieList(initialVal);
  }, [initialVal, setCurrentMovieList]);

  useEffect(() => {
    handleVal(currentMovieList);
  }, [currentMovieList, handleVal]);

  return (
    <MovieContext.Provider
      value={{
        currentMovieList,
        setCurrentMovieList,
        setPrimaryMovie,
        primaryMovie,
        setSecondaryMovie,
        secondaryMovie,
      }}
    >
      {props.children}
    </MovieContext.Provider>
  );
}
