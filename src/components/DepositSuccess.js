import React from 'react'
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";

const DepositSuccess = ({ txReceipt, deployment }) => {
  const history = useHistory();

  const handleClick = () => {
    history.push("/deposit");
  }

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
              <br />
              <b>Success!</b>
              <br />
              <br />
            </Grid>
            <Grid item>
              Your deposit of
            </Grid>
            <Grid item>
              <span style={{ fontSize: '23px' }} className="blue-text"><b>{`${deployment.amount} ${deployment.symbol}`}</b></span>
            </Grid>
            <Grid item>
              has been confirmed.
            </Grid>
            <Grid item>
              <a href={`https://kovan.etherscan.io/tx/${txReceipt.transactionHash.toLowerCase()}`} className='blue-text' target="_blank" rel="noopener noreferrer"><b>View on EtherScan</b></a>
            </Grid>
            <Grid item>
              <br />
              <br />
              <Button variant="contained" color="secondary" style={{ textTransform: 'none', fontWeight: 'bold' }} fullWidth onClick={handleClick}>Done</Button>
            </Grid>
            <Grid item>
              <br />
              <br />
              <small>{`${deployment.symbol.toLowerCase()}-${deployment.amount.replace('.', '')}.sacred.cfx`}</small>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </div>
  )
}

export default DepositSuccess
