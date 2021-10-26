import * as React from 'react';
import { Box, Typography, Modal, Link } from '@material-ui/core';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: null,
  borderRadius: 20,
  boxShadow: 24,
  p: 4,
};

const MetaMaskDialog = (prop) => {
  const [open, setOpen] = React.useState(prop.connectMeta);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          You need to install Metamask.
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Please visit <Link href="https://metamask.io/" variant="body2">https://metamask.io/</Link>
        </Typography>
      </Box>
    </Modal>
  );
};

export default MetaMaskDialog;