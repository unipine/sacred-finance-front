import React from "react";
import Grid from "@material-ui/core/Grid";
import Deposit from "./Deposit";

const FooterRight = ({ deployment, depositCount, depositData }) => {

  const getRemainTimeString = (dep) => {
    let currentTime = new Date();
    let countTime = currentTime - dep;
    const [days, hours, mins] = [countTime / (3600 * 24 * 1000), countTime / (3600 * 1000), countTime / (60 * 1000)];
    if (days >= 1) {
      return parseInt(days.toString()) + "days ago";
    } else if (hours >= 1) {
      return parseInt(hours.toString()) + "hours ago";
    } else {
      return parseInt(mins.toString()) + "mins ago";
    }
  }

  return (
    <Grid item xs={3}>
      <Grid
        item
        xs
        container
        spacing={2}
        direction="column"
        justify="flex-end"
        alignItems="flex-start"
      >
        <Grid item>
          <div className="deposit-1">
            {`${deployment.amount} ${deployment.symbol}`}
          </div>
        </Grid>
        <Grid item>
          <div className="deposit-latest">
            {depositCount === undefined ? "Loading... " : `${depositCount} `}
            equal user deposits
          </div>
        </Grid>
        <Grid item>
          <div className='deposit-latest'>Latest Deposits</div>
        </Grid>
        <Grid item
          spacing={2}
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
          <Grid item>
            <div className='deposit-age'>
              {
                depositData?.map((dep, index) => {
                  return index < 4 && (
                    <>
                      <b className='deposit-id'>{depositData.length - index}</b> {getRemainTimeString(dep.timestamp)} <br />
                    </>
                  )
                })
              }
            </div>
          </Grid>
          <Grid item>
            <div className='deposit-age'>
              {
                depositData?.map((dep, index) => {
                  return index >= 4 && index < 8 && (
                    <>
                      <b className='deposit-id'>{depositData.length - index}</b> {getRemainTimeString(dep.timestamp)} <br />
                    </>
                  )
                })
              }
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FooterRight;
