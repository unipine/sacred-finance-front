import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import video from "../images/sacred_animated_white";
import { styled } from "@mui/material/styles";

const FixedBox = styled(Box)`
  position: fixed;
  z-index: 1300;
  inset: 0;
`;

const BodyBox = styled(Box)`
  position: fixed;
  inset: 0px;
  background-color: rgba(20, 20, 20, 0.85);
  z-index: -1;
`;

const ContentBox = styled(Box)`
  position: absolute;
  text-align: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  bgcolor: transparent;
  width: 100%;
  border: none;
`;

const VideoContent = styled("img")`
  width: 250px;
  height: 250px;
  border-radius: 100%;
`;

const TextContent = styled(Typography)`
  padding-top: 1.25rem;
  color: white;
  font-size: 18px;
  font-family: Montserrat;
`;

const WaitingModal = (prop) => {
  return (
    <FixedBox>
      <BodyBox />
      <ContentBox>
        <Grid item xs={12}>
          <Grid
            item
            xs
            container
            spacing={2}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item>
              <VideoContent src={video}></VideoContent>
            </Grid>
          </Grid>
        </Grid>
        <TextContent>{prop.content}</TextContent>
      </ContentBox>
    </FixedBox>
  );
};

export default WaitingModal;
