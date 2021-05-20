import React, { useState, createContext } from 'react';

export const MovieContext = createContext();

export function ThemeProvider(props) {
  const [currentMovieList, setCurrentMovieList] = useState('');

  return (
    <MovieContext.Provider value={{ currentMovieList, setCurrentMovieList }}>
      {props.children}
    </MovieContext.Provider>
  );
}
