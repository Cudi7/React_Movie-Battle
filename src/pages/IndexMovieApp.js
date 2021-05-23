import React, { useEffect, useState, useContext } from 'react';
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
import useLocalStorage from '../hooks/useLocalStorage';
import { MovieContext } from '../contexts/movie.context';

function MovieApp() {
  const [searchTerm, setSearchTerm] = useState('');
  const [timeoutId, setTimeoutId] = useState('');

  const [fightValues, setFightValues] = useState({});
  const [figthersId, setFigthersId] = useState([]);
  const [likedMovies, setLikedMovies] = useState([]);

  const [loading, setLoading] = useState(true);

  const [searchMovieList, setSearchMovieList] = useState([]);

  const {
    currentMovieList,
    setCurrentMovieList,
    setPrimaryMovie,
    setSecondaryMovie,
  } = useContext(MovieContext);

  useEffect(() => {
    const fetchMovieHandler = async () => {
      const data = await fetchMovie(searchTerm);

      data && setSearchMovieList(data);
    };

    searchTerm && fetchMovieHandler();
  }, [searchTerm]);

  function handleSearch(e) {
    if (timeoutId) clearTimeout(timeoutId);

    setTimeoutId(
      setTimeout(() => {
        setSearchTerm(e.target.value.trim());
      }, 1000) //set it to 500
    );
  }

  const handleLikes = (id) => {
    const filteredList = currentMovieList.map((el) => {
      if (el.imdbID === id) {
        el.liked = !el.liked;
      }
      return el;
    });

    setCurrentMovieList(filteredList);
  };

  const handleSelection = (data, type, id) => {
    const existingId = figthersId.find((el) => el === id);
    if (existingId) return;

    setFigthersId([...figthersId, id]);

    type === 'primary' ? setPrimaryMovie(data) : setSecondaryMovie(data);

    const dataSelected = [];

    for (let i in data) {
      dataSelected.push({ key: i, value: data[i] });
    }

    type === 'primary'
      ? setFightValues({ ...fightValues, primary: dataSelected })
      : setFightValues({ ...fightValues, secondary: dataSelected });
  };

  const handleReset = () => {
    setFigthersId([]);
    setFightValues({});
    setSecondaryMovie('');
    setPrimaryMovie('');
  };

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <NavBar
            handleSearch={handleSearch}
            searchMovieList={searchMovieList}
            setSearchMovieList={setSearchMovieList}
          />
          <Grid container justify="center" style={{ marginTop: '1rem' }}>
            <Grid item xs={11} md={10} lg={9}>
              <Hero />
              <Movies
                handleSelection={handleSelection}
                id={figthersId}
                handleReset={handleReset}
              />
            </Grid>
          </Grid>
        </Route>
        <Route exact path="/details/:id">
          <NavBarSecondary />
          <MovieDetails
            idArray={figthersId}
            handleSelection={handleSelection}
            handleReset={handleReset}
            setLikedMovies={setLikedMovies}
            handleLikes={handleLikes}
          />
        </Route>
        <Route exact path="/fight">
          <NavBarSecondary />
          <FightPage
            fightValues={fightValues}
            handleReset={handleReset}
            setLoading={setLoading}
            loading={loading}
          />
        </Route>
        <Route exact path="/liked-movies">
          <NavBarSecondary />
          <LikedMovies />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default MovieApp;
