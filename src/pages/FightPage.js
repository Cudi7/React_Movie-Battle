import React, { useEffect, useState } from 'react';
import { fetchMovie } from '../api/api';
import CardFight from '../components/CardFight/CardFight';
import { formatedDataFight } from '../utils/formatedData';

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Button, Grid } from '@material-ui/core';
import {
  compareAwards,
  compareMetascore,
  compareRating,
  compareVotes,
  compareBoxOffice,
} from '../utils/compareData';
import ModalFight from '../components/CardFight/ModalFight/ModalFight';

import { Link as RouterLink } from 'react-router-dom';
import Hero from '../components/Hero/Hero';
import { ExpandLessOutlined, TrendingUpOutlined } from '@material-ui/icons';
import Loading from '../components/Loading/Loading';

function FightPage(props) {
  // const { handleSelection, setFightValues, fightValues, handleReset } = props;
  const { fightValues, handleReset, loading, setLoading } = props;
  const [movieComparative, setMovieComparative] = useState('');

  const [movieItems, setMovieItems] = useState({});

  const [primaryWinCount, setPrimaryWinCount] = useState(0);
  const [secondaryWinCount, setSecondaryWinCount] = useState(0);

  useEffect(() => {
    const handleSearch = async () => {
      const first = await fetchMovie(
        fightValues.primary[2].value,
        'searchById'
      );

      const second = await fetchMovie(
        fightValues.secondary[2].value,
        'searchById'
      );

      setMovieItems({
        ...movieItems,
        primary: formatedDataFight(first),
        secondary: formatedDataFight(second),
      });
    };

    fightValues && handleSearch();
  }, []);

  useEffect(() => {
    if (movieItems.primary && movieItems.secondary) {
      const primaryWinsAward = compareAwards(movieItems);
      let primaryWins = false;
      let secondaryWins = false;
      if (primaryWinsAward) {
        setPrimaryWinCount((currCount) => currCount + 1);
        primaryWins = true;
      } else {
        setSecondaryWinCount((currCount) => currCount + 1);
        secondaryWins = true;
      }
      const winner = primaryWins
        ? (movieItems.primary[1].winner = true)
        : (movieItems.secondary[1].winner = true);

      setMovieComparative({ ...movieItems, winner });
    }
  }, [movieItems.primary]);

  useEffect(() => {
    if (movieItems.primary && movieItems.secondary) {
      const primaryWinsAward = compareMetascore(movieItems);
      let primaryWins = false;
      let secondaryWins = false;
      if (primaryWinsAward) {
        setPrimaryWinCount((currCount) => currCount + 1);
        primaryWins = true;
      } else {
        setSecondaryWinCount((currCount) => currCount + 1);
        secondaryWins = true;
      }
      const winner = primaryWins
        ? (movieItems.primary[3].winner = true)
        : (movieItems.secondary[3].winner = true);

      setMovieComparative({ ...movieItems, winner });
    }
  }, [movieItems.primary]);

  useEffect(() => {
    if (movieItems.primary && movieItems.secondary) {
      const primaryWinsAward = compareRating(movieItems);
      let primaryWins = false;
      let secondaryWins = false;
      if (primaryWinsAward) {
        setPrimaryWinCount((currCount) => currCount + 1);
        primaryWins = true;
      } else {
        setSecondaryWinCount((currCount) => currCount + 1);
        secondaryWins = true;
      }
      const winner = primaryWins
        ? (movieItems.primary[4].winner = true)
        : (movieItems.secondary[4].winner = true);

      setMovieComparative({ ...movieItems, winner });
    }
  }, [movieItems.primary]);

  useEffect(() => {
    if (movieItems.primary && movieItems.secondary) {
      const primaryWinsAward = compareVotes(movieItems);
      let primaryWins = false;
      let secondaryWins = false;
      if (primaryWinsAward) {
        setPrimaryWinCount((currCount) => currCount + 1);
        primaryWins = true;
      } else {
        setSecondaryWinCount((currCount) => currCount + 1);
        secondaryWins = true;
      }
      const winner = primaryWins
        ? (movieItems.primary[5].winner = true)
        : (movieItems.secondary[5].winner = true);

      setMovieComparative({ ...movieItems, winner });
    }
  }, [movieItems.primary]);

  useEffect(() => {
    if (movieItems.primary && movieItems.secondary) {
      const primaryWinsAward = compareBoxOffice(movieItems);
      let primaryWins = false;
      let secondaryWins = false;
      if (primaryWinsAward) {
        setPrimaryWinCount((currCount) => currCount + 1);
        primaryWins = true;
      } else {
        setSecondaryWinCount((currCount) => currCount + 1);
        secondaryWins = true;
      }
      const winner = primaryWins
        ? (movieItems.primary[7].winner = true)
        : (movieItems.secondary[7].winner = true);

      setMovieComparative({ ...movieItems, winner });
    }
  }, [movieItems.primary]);

  return movieComparative?.primary ? (
    <>
      <CssBaseline />

      <Container maxWidth="md" style={{ marginBottom: '5rem' }}>
        <Hero fight />
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            margin: '0 auto 2rem',
            gap: '3rem',
          }}
        >
          <ModalFight
            winner={
              primaryWinCount > secondaryWinCount
                ? movieComparative.primary
                : movieComparative.secondary
            }
          />
          <Button
            variant="contained"
            component={RouterLink}
            to="/"
            onClick={handleReset}
          >
            Go Back
          </Button>
        </div>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="baseline"
          spacing={1}
        >
          <Grid item xs={6}>
            <CardFight movieComparative={movieComparative.primary} />
          </Grid>
          <Grid item xs={6}>
            <CardFight movieComparative={movieComparative.secondary} />
          </Grid>
        </Grid>
      </Container>
    </>
  ) : (
    <Loading />
  );
}

export default FightPage;
