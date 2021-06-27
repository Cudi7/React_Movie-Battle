import React, { useEffect, useState } from 'react';
import Hero from '../components/Hero/Hero';
import NavBar from '../components/NavBar/NavBar';
import NavBarSecondary from '../components/NavBar/NavBarSecondary';
import Movies from '../components/Movies/Movies';
import { Grid } from '@material-ui/core';
import { fetchMovie } from '../api/api';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MovieDetails from '../components/MovieDetails/MovieDetails';
import FightPage from './FightPage';
import LikedMovies from './LikedMovies';
import { useDispatch } from 'react-redux';
import {
  addFirstFighter,
  addSecondFighter,
} from '../store/entities/movieFightSlice';

function MovieApp() {
  const [searchTerm, setSearchTerm] = useState('');
  const [timeoutId, setTimeoutId] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [searchMovieList, setSearchMovieList] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMovieHandler = async () => {
      const data = await fetchMovie(searchTerm);

      data ? setSearchMovieList(data) : handleError();
    };

    searchTerm && fetchMovieHandler();
  }, [searchTerm]);

  function handleSearch(e) {
    if (!e.target.value.trim()) {
      setLoading(false);
      setSearchMovieList([]);
      return;
    }

    setLoading(true);
    if (timeoutId) clearTimeout(timeoutId);

    setTimeoutId(
      setTimeout(() => {
        setSearchTerm(e.target.value.trim());
      }, 1000)
    );
  }

  function handleError() {
    setLoading(false);
    setError(true);

    setTimeout(() => setError(false), 3000);
  }

  const handleSelection = (data, figtherNumber) => {
    const dataSelected = [];

    for (let i in data) {
      dataSelected.push({ key: i, value: data[i] });
    }

    figtherNumber === 'primary'
      ? dispatch(addFirstFighter(data))
      : dispatch(addSecondFighter(data));
  };

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <NavBar
            handleSearch={handleSearch}
            searchMovieList={searchMovieList}
            setSearchMovieList={setSearchMovieList}
            error={error}
            loading={loading}
            setLoading={setLoading}
          />
          <Grid container justify="center" style={{ marginTop: '1rem' }}>
            <Grid item xs={11} md={10} lg={9}>
              <Hero />
              <Movies handleSelection={handleSelection} />
            </Grid>
          </Grid>
        </Route>
        <Route exact path="/details/:id">
          <NavBarSecondary />
          <MovieDetails />
        </Route>
        <Route exact path="/fight">
          <NavBarSecondary />
          <FightPage setLoading={setLoading} loading={loading} />
        </Route>
        <Route exact path="/likedMovies">
          <NavBarSecondary />
          <LikedMovies />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default MovieApp;
