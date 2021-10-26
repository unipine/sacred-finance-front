import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { useEffect } from "react";
const Web3 = require("web3");

const web3 = window.web3 ? new Web3(window.web3.currentProvider) : null;

const FooterRight = ({ deployment, depositCount }) => {
  const [depositData, setDepositData] = useState([]);

  const handleDepositData = async() => {
    if (!web3) return;
    const contract = new web3.eth.Contract(deployment.abi, deployment.address)
    const events = await contract.getPastEvents("Deposit", {
      fromBlock: 0,
      toBlock: "latest",
    });

    if (events.length === 0) {
      throw new Error('There is no related deposit, the note is invalid')
    }
    
    let depositlist = [];
    let length = 0;
    events.length >= 8 ? length = 8 : length = events.length
    for(let i = events.length - 1; i >= events.length - length; i --) {
      depositlist.push(events[i].returnValues.timestamp);
    }
    
    setDepositData(depositlist);
  }

  useEffect(() => {
    handleDepositData();
  }, [])

  const getRemainTimeString = (dep) => {
    if(!dep)return;
    var milisec = parseInt(dep) * 1000;
    let newDate = new Date(milisec);
    let currentTime = new Date();
    let countTime = currentTime - newDate;
    const [days, hours, mins] = [countTime / (3600 * 24 * 1000), countTime / (3600 * 1000), countTime / (60 * 1000)];
    if (days >= 1) {
      return parseInt(days.toString()) + " days ago";
    } else if (hours >= 1) {
      return parseInt(hours.toString()) + " hours ago";
    } else {
      return parseInt(mins.toString()) + " mins ago";
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
                      <b className='deposit-id'>{depositCount - index}</b> {getRemainTimeString(dep)} <br />
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
                      <b className='deposit-id'>{depositCount - index}</b> {getRemainTimeString(dep)} <br />
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
