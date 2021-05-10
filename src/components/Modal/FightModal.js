import React from 'react';

import Modal from '@material-ui/core/Modal';
import useModalStyles from './FightModalStyles';
import { Button, Link } from '@material-ui/core';
import purple from '@material-ui/core/colors/purple';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Link as RouterLink } from 'react-router-dom';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

function FightModal(props) {
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const classes = useModalStyles();
  const { primaryMovie, secondaryMovie, handleSelection } = props;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleReset = () => {
    handleSelection('', 'primary');
    handleSelection('', 'secondary');
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
          <div style={modalStyle} className={classes.paper}>
            <h2>You're gonna start a fight</h2>
            <p>{primaryMovie && primaryMovie.Title}</p>
            <p>VS</p>
            <p>{secondaryMovie && secondaryMovie.Title}</p>
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
