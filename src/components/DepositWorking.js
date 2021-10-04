import React from 'react'
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';

const DepositWorking = ({ deployment }) => {


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
              <b>Working...</b>
            </Grid>
            <Grid item>
              One moment while we take care of that...
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
              Your <span className='blue-text'><b>{`${deployment.amount} ${deployment.symbol}`}</b></span> deposit is being confirmed on the blockchain.
            </Grid>
            <Grid item>
              <br />
            </Grid>
            <Grid item>
              <br />
              <small>{`${deployment.symbol.toLowerCase()}-${deployment.amount.replace('.', '')}.sacred.cfx`}</small>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </div>
  )
}

export default DepositWorking
