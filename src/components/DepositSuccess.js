import React from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { GoToContract } from "./Deposit";

const DepositSuccess = ({ txReceipt, deployment }) => {
  const history = useHistory();

  const { t } = useTranslation();

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
              <b>{t("Success!")}</b>
              <br />
              <br />
            </Grid>
            <Grid item>
              {t("Your deposit of")}
            </Grid>
            <Grid item>
              <span style={{ fontSize: '23px' }} className="blue-text"><b>{`${deployment.amount} ${deployment.symbol}`}</b></span>
            </Grid>
            <Grid item>
              {t("has been confirmed.")}
            </Grid>
            <Grid item>
              <a href={`https://kovan.etherscan.io/tx/${txReceipt.transactionHash.toLowerCase()}`} className='blue-text' target="_blank" rel="noopener noreferrer"><b>{t("View on EtherScan")}</b></a>
            </Grid>
            <Grid item>
              <br />
              <br />
              <Button variant="contained" color="secondary" style={{ textTransform: 'none', fontWeight: 'bold' }} fullWidth onClick={handleClick}>{t("Done")}</Button>
            </Grid>
            <Grid item>
              <br />
              <br />
              <GoToContract
                href={`https://kovan.etherscan.io/address/${deployment.address}`}
                className="blue-text"
                target="_blank"
                rel="noopener noreferrer"
              >
                <small>{`${deployment.symbol.toLowerCase()}-${deployment.amount.replace(
                  ".",
                  ""
                )}.sacred.eth`}</small>
              </GoToContract>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </div>
  )
}

export default DepositSuccess
