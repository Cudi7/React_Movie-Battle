import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  secondRoot: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export default function Loading({ from }) {
  const classes = useStyles();

  return (
    <div className={from === 'movies' ? classes.secondRoot : classes.root}>
      <CircularProgress color="primary" size={80} />
    </div>
  );
}
