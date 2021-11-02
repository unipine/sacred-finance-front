import React from "react";
import Grid from "@material-ui/core/Grid";

const FooterRight = ({ deployment, depositCount }) => {
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
        {/* <Grid item>
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
              <b className='deposit-id'>7769</b> 1 min ago <br />
              <b className='deposit-id'>7769</b> 1 min ago <br />
              <b className='deposit-id'>7769</b> 1 min ago <br />
              <b className='deposit-id'>7769</b> 1 min ago <br />
            </div>
          </Grid>
          <Grid item>
            <div className='deposit-age'>
              <b className='deposit-id'>7769</b> 1 min ago <br />
              <b className='deposit-id'>7769</b> 1 min ago <br />
              <b className='deposit-id'>7769</b> 1 min ago <br />
              <b className='deposit-id'>7769</b> 1 min ago <br />
            </div>
          </Grid>
        </Grid> */}
      </Grid>
    </Grid>
  );
};

export default FooterRight;
