import * as React from 'react';
import { Box, Typography, Modal, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  box: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: 'white',
    border: null,
    borderRadius: 20,
    boxShadow: 24,
    padding: 20,
  },

  title: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: [
      'Montserrat'
    ]
  },

  content: {
    color: 'black',
    fontSize: 14,
    fontFamily: [
      'Montserrat'
    ]
  }
})

const MetaMaskDialog = (prop) => {
  const [open, setOpen] = React.useState(prop.connectMeta);

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={classes.box}>
        <p className={classes.title} >
          You need to install Metamask.
        </p>
        <p className={classes.content} >
          Please visit <Link href="https://metamask.io/" variant="body2">https://metamask.io/</Link>
        </p>
      </Box>
    </Modal>
  );
};


export default MetaMaskDialog;