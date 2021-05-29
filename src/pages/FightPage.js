import React, { useEffect, useState } from 'react';
import { fetchMovie } from '../api/api';
import CardFight from '../components/CardFight/CardFight';
import { formatedDataFight } from '../utils/formatedData';

import CssBaseline from '@material-ui/core/CssBaseline';
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
import Loading from '../components/Loading/Loading';
import { useHistory } from 'react-router-dom';

function FightPage(props) {
  const { fightValues, handleReset } = props;
  const [movieComparative, setMovieComparative] = useState('');

  const [movieItems, setMovieItems] = useState({});

  const [primaryWinCount, setPrimaryWinCount] = useState(0);
  const [secondaryWinCount, setSecondaryWinCount] = useState(0);

  let history = useHistory();

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

    fightValues.primary ? handleSearch() : history.push('/');
  }, []);

  useEffect(() => {
    if (movieItems.primary && movieItems.secondary) {
      //award comparision
      const primaryWinsAward = compareAwards(movieItems);
      let awardWinner;
      let primaryWins = false;

      if (primaryWinsAward !== 'N/A') {
        if (primaryWinsAward) {
          setPrimaryWinCount((currCount) => currCount + 1);
          primaryWins = true;
        } else {
          setSecondaryWinCount((currCount) => currCount + 1);
        }
        awardWinner = primaryWins
          ? (movieItems.primary[1].winner = true)
          : (movieItems.secondary[1].winner = true);
      }

      //metaScore comparision
      const primaryWinsMeta = compareMetascore(movieItems);
      let metaWinner;
      primaryWins = false;

      if (primaryWinsMeta !== 'N/A') {
        if (primaryWinsMeta) {
          setPrimaryWinCount((currCount) => currCount + 1);
          primaryWins = true;
        } else {
          setSecondaryWinCount((currCount) => currCount + 1);
        }
        metaWinner = primaryWins
          ? (movieItems.primary[3].winner = true)
          : (movieItems.secondary[3].winner = true);
      }
      //Rating comparision

      const primaryWinsRating = compareRating(movieItems);
      let ratingWinner;
      primaryWins = false;

      if (primaryWinsRating !== 'N/A') {
        if (primaryWinsRating) {
          setPrimaryWinCount((currCount) => currCount + 1);
          primaryWins = true;
        } else {
          setSecondaryWinCount((currCount) => currCount + 1);
        }
        ratingWinner = primaryWins
          ? (movieItems.primary[4].winner = true)
          : (movieItems.secondary[4].winner = true);
      }
      // Votes comparision

      const primaryWinsVotes = compareVotes(movieItems);
      let votesWinner;
      primaryWins = false;

      if (primaryWinsVotes !== 'N/A') {
        if (primaryWinsVotes) {
          setPrimaryWinCount((currCount) => currCount + 1);
          primaryWins = true;
        } else {
          setSecondaryWinCount((currCount) => currCount + 1);
        }
        votesWinner = primaryWins
          ? (movieItems.primary[5].winner = true)
          : (movieItems.secondary[5].winner = true);
      }
      //Box office comparision

      const primaryWinsBox = compareBoxOffice(movieItems);
      primaryWins = false;

      if (primaryWinsBox) {
        setPrimaryWinCount((currCount) => currCount + 1);
        primaryWins = true;
      } else {
        setSecondaryWinCount((currCount) => currCount + 1);
      }
      //some movies/series doesnt have boxoffice value, we need to check it first

      if (primaryWinsBox === undefined) {
        setMovieComparative({
          ...movieItems,
          awardWinner,
          metaWinner,
          ratingWinner,
          votesWinner,
        });
      } else {
        console.log(movieItems);
        console.log(primaryWinsBox);
        const boxOfficeWinner = primaryWins
          ? (movieItems.primary[7].winner = true)
          : (movieItems.secondary[7].winner = true);

        setMovieComparative({
          ...movieItems,
          awardWinner,
          metaWinner,
          ratingWinner,
          votesWinner,
          boxOfficeWinner,
        });
      }
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
            variant="outlined"
            component={RouterLink}
            to="/"
            onClick={handleReset}
          >
            Reset
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
