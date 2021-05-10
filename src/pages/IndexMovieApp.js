import React, { useEffect, useState } from 'react';
import Hero from '../components/Hero/Hero';
import NavBar from '../components/NavBar/NavBar';
import Movies from '../components/Movies/Movies';
import { Grid } from '@material-ui/core';
import { fetchMovie } from '../api/api';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MovieDetails from '../components/MovieDetails/MovieDetails';
import FightPage from './FightPage';

function MovieApp() {
  const [searchTerm, setSearchTerm] = useState('');
  const [timeoutId, setTimeoutId] = useState('');
  const [currentMovieList, setCurrentMovieList] = useState('');
  const [primaryMovie, setPrimaryMovie] = useState('');
  const [secondaryMovie, setSecondaryMovie] = useState('');
  const [fightValues, setFightValues] = useState({});

  function handleSearch(e) {
    if (timeoutId) clearTimeout(timeoutId);

    setTimeoutId(
      setTimeout(() => {
        setSearchTerm(e.target.value.trim());
      }, 3000) //set it to 500
    );
  }

  useEffect(() => {
    const fetchMovieHandler = async () => {
      setCurrentMovieList(await fetchMovie(searchTerm));
    };

    searchTerm && fetchMovieHandler();
  }, [searchTerm]);

  const handleSelection = (data, type) => {
    type === 'primary' ? setPrimaryMovie(data) : setSecondaryMovie(data);

    const dataSelected = [];

    for (let i in data) {
      dataSelected.push({ key: i, value: data[i] });
    }

    type === 'primary'
      ? setFightValues({ ...fightValues, primary: dataSelected })
      : setFightValues({ ...fightValues, secondary: dataSelected });
  };

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <NavBar handleSearch={handleSearch} />
          <Grid container justify="center" style={{ marginTop: '1rem' }}>
            <Grid item xs={11} md={10} lg={9}>
              <Hero />
              <Movies
                currentMovieList={currentMovieList}
                handleSelection={handleSelection}
                primaryMovie={primaryMovie}
                secondaryMovie={secondaryMovie}
              />
            </Grid>
          </Grid>
        </Route>
        <Route exact path="/details/:id">
          <MovieDetails />
        </Route>
        <Route exact path="/fight">
          <FightPage
            setFightValues={setFightValues}
            fightValues={fightValues}
            handleSelection={handleSelection}
          />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default MovieApp;
