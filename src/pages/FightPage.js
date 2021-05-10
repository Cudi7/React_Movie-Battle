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

function FightPage(props) {
  const { handleSelection, setFightValues, fightValues } = props;
  const [movieComparative, setMovieComparative] = useState({});
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

      setMovieComparative({
        primary: formatedDataFight(first),
        secondary: formatedDataFight(second),
      });
    };

    fightValues && handleSearch();
  }, []);

  useEffect(() => {
    const primaryWinsAward =
      movieComparative.primary && compareAwards(movieComparative);
    const primaryWinsMetascore =
      movieComparative.primary && compareMetascore(movieComparative);
    const primaryWinsRating =
      movieComparative.primary && compareRating(movieComparative);
    const primaryWinsVotes =
      movieComparative.primary && compareVotes(movieComparative);
    const primaryWinsBoxOffice =
      movieComparative.primary && compareBoxOffice(movieComparative);

    if (primaryWinsAward) {
      setPrimaryWinCount((currCount) => currCount + 1);
      const test = (movieComparative.primary[1].winner = true);

      setMovieComparative({ ...movieComparative, test });
      //intentar arreglar este estado para hacerlo en una linea
    } else if (!primaryWinsAward) {
      setSecondaryWinCount((currCount) => currCount + 1);
    }

    if (primaryWinsMetascore) {
      setPrimaryWinCount((currCount) => currCount + 1);
      const test = (movieComparative.primary[3].winner = true);

      setMovieComparative({ ...movieComparative, test });
      //intentar arreglar este estado para hacerlo en una linea
    } else if (!primaryWinsMetascore) {
      setSecondaryWinCount((currCount) => currCount + 1);
    }

    if (primaryWinsRating) {
      setPrimaryWinCount((currCount) => currCount + 1);
      const test = (movieComparative.primary[4].winner = true);

      setMovieComparative({ ...movieComparative, test });
      //intentar arreglar este estado para hacerlo en una linea
    } else if (!primaryWinsRating) {
      setSecondaryWinCount((currCount) => currCount + 1);
    }

    if (primaryWinsVotes) {
      setPrimaryWinCount((currCount) => currCount + 1);
      const test = (movieComparative.primary[5].winner = true);

      setMovieComparative({ ...movieComparative, test });
      //intentar arreglar este estado para hacerlo en una linea
    } else if (!primaryWinsVotes) {
      setSecondaryWinCount((currCount) => currCount + 1);
    }

    if (primaryWinsBoxOffice) {
      setPrimaryWinCount((currCount) => currCount + 1);
      const test = (movieComparative.primary[6].winner = true);

      setMovieComparative({ ...movieComparative, test });
      //intentar arreglar este estado para hacerlo en una linea
    } else if (!primaryWinsBoxOffice) {
      setSecondaryWinCount((currCount) => currCount + 1);
    }
  }, [movieComparative.primary]);

  return movieComparative.primary ? (
    <>
      <CssBaseline />

      <Container maxWidth="md">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            margin: '3rem auto 2rem',
          }}
        >
          <ModalFight
            winner={
              primaryWinCount > secondaryWinCount
                ? movieComparative.primary
                : movieComparative.secondary
            }
          />
          <Button variant="contained" component={RouterLink} to="/">
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
  ) : null;
}

export default FightPage;
