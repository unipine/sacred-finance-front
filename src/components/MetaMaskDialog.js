import * as React from "react";
import { Box, Typography, Modal, Link } from "@mui/material";
import { styled } from "@mui/material/styles";

const Content = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  background-color: white;
  border: none;
  border-radius: 20px;
  box-shadow: 24px;
  padding: 20px;
  fontfamily: Montserrat;
  color: black;
  font-size: 14px;
`;

const Title = styled('p')`
  font-size: 24px;
  font-weight: bold;
`;

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
      <Content>
        <Title>You need to install Metamask.</Title>
        <p>
          Please visit{" "}
          <Link href="https://metamask.io/" variant="body2">
            https://metamask.io/
          </Link>
        </p>
      </Content>
    </Modal>
  );
};

export default MetaMaskDialog;
