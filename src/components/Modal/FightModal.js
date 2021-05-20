import React, { useState } from 'react';

import Modal from '@material-ui/core/Modal';
import useModalStyles from './FightModalStyles';
import { Button, Link, Typography } from '@material-ui/core';
import purple from '@material-ui/core/colors/purple';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Link as RouterLink } from 'react-router-dom';

function FightModal(props) {
  const [open, setOpen] = useState(false);

  const classes = useModalStyles();
  const { primaryMovie, secondaryMovie, handleSelection, handleReset } = props;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const redirect = () => {
    console.log('redirecting...');
  };

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
                {primaryMovie && primaryMovie.Title}
              </Typography>
              <Typography variant="overline">🔪VS🔪</Typography>
              <Typography variant="body2">
                {secondaryMovie && secondaryMovie.Title}
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
                onClick={handleReset}
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
