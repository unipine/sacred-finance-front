import React from 'react'
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';
import WaitingModal from "./WaitingModal";
import { useTranslation } from "react-i18next";

const DepositWorking = ({ deployment }) => {
  const { t } = useTranslation();

  return (
    <div>
      <Paper>
        <Box p={5}>
          <Grid container
            direction="column"
            spacing={2}
          >
            <Grid item>
              <br />
              <b>{t("Working...")}</b>
            </Grid>
            <Grid item>
              {t("One moment while we take care of that...")}
            </Grid>
            <Grid item>
              <br />
              <br />
              <LinearProgress color="secondary" />
              <br />
              <br />
            </Grid>
            <Grid item>
              <br />
              {t("Your ")}<span className='blue-text'><b>{`${deployment.amount} ${deployment.symbol}`}</b></span>{t(" deposit is being confirmed on the blockchain.")}
            </Grid>
            <Grid item>
              <br />
            </Grid>
            <Grid item>
              <br />
              <small>{`${deployment.symbol.toLowerCase()}-${deployment.amount.replace('.', '')}.sacred.eth`}</small>
            </Grid>
          </Grid>
        </Box>
      </Paper>
      <WaitingModal content="Transaction is in progress..." />
    </div>
  )
}

export default DepositWorking
