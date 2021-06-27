import React, { useState } from 'react';

import Modal from '@material-ui/core/Modal';
import useModalStyles from './FightModalStyles';
import { Button, Link, Typography } from '@material-ui/core';
import purple from '@material-ui/core/colors/purple';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Link as RouterLink } from 'react-router-dom';
import {
  resetFighters,
  selectFirstFighter,
  selectSecondFighter,
} from '../../store/entities/movieFightSlice';
import { useDispatch, useSelector } from 'react-redux';

function FightModal() {
  const [open, setOpen] = useState(false);
  const firstFighter = useSelector(selectFirstFighter());
  const secondFighter = useSelector(selectSecondFighter());

  const dispatch = useDispatch();
  const classes = useModalStyles();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const redirect = () => console.log('redirecting...');

  const accent = purple['A200'];
  return (
    <div>
      <Button
        size="small"
        variant="contained"
        style={{ backgroundColor: accent }}
        onClick={open === true ? redirect : handleOpen}
        disableElevation
      >
        START FIGHT!
      </Button>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2>You're gonna start a fight</h2>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: ' 1rem',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '1rem',
              }}
            >
              <Typography variant="body2">
                {firstFighter && firstFighter.Title}
              </Typography>
              <Typography variant="overline">🔪VS🔪</Typography>
              <Typography variant="body2">
                {secondFighter && secondFighter.Title}
              </Typography>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                style={{ backgroundColor: accent }}
                size="small"
                variant="contained"
                disableElevation
              >
                <Link color="inherit" component={RouterLink} to="/fight">
                  LET'S DO IT
                </Link>
              </Button>

              <Button
                color="secondary"
                size="small"
                variant="contained"
                onClick={() => dispatch(resetFighters())}
                disableElevation
              >
                Reset
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
export default FightModal;
