import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
const Web3 = require("web3");

const web3 = window.web3 ? new Web3(window.web3.currentProvider) : null;

const FooterRight = ({ deployment, depositCount, networkId }) => {
  const [depositHistory, setDepositHistory] = useState([]);

  const handleDepositData = async () => {
    if (!web3) return;
    const contract = new web3.eth.Contract(deployment.abi, deployment.address)
    const events = await contract.getPastEvents("Deposit", {
      fromBlock: 0,
      toBlock: "latest",
    });

    if (events.length === 0) {
      console.log('There is no related deposit, the note is invalid')
    }

    let history = [];
    let length = 0;
    events.length >= 8 ? length = 8 : length = events.length
    for (let i = events.length - 1; i >= events.length - length; i--) {
      let milisec = parseInt(events[i].returnValues.timestamp) * 1000;
      let newDate = new Date(milisec);
      let currentTime = new Date();
      let countTime = currentTime - newDate;
      const [days, hours, mins] = [countTime / (3600 * 24 * 1000), countTime / (3600 * 1000), countTime / (60 * 1000)];
      let historyString = "";
      if (days >= 1) {
        if(parseInt(days) === 1){
          historyString = parseInt(days.toString()) + " day ago"
        } else {
          historyString = parseInt(days.toString()) + " days ago"
        }
      } else if (hours >= 1) {
        if(parseInt(hours) === 1){
          historyString = parseInt(hours.toString()) + " hour ago"
        } else {
          historyString = parseInt(hours.toString()) + " hours ago"
        }
      } else {
        if(parseInt(mins) === 1){
          historyString = parseInt(mins.toString()) + " minute ago"
        } else {
          historyString = parseInt(mins.toString()) + " minutes ago"
        }
      }

      history.push(historyString);
    }

    setDepositHistory(history);
  }

  useEffect(() => {
    handleDepositData();
  }, [networkId])

  useEffect(() => {
    setInterval(() => {
      handleDepositData();
    }, 60000)
  }, [networkId])

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
        {
          depositHistory.length > 0 && (
            <Grid item
              spacing={2}
              container
              direction="row"
              justify="flex-start"
              alignItems="flex-start"
              style={{ textAlign: 'left' }}
            >
              <Grid item>
                <div className='deposit-age'>
                  {
                    depositHistory?.map((dep, index) => {
                      return index < 4 && (
                        <>
                          <b className='deposit-id'>{depositCount - index}</b> {dep} <br />
                        </>
                      )
                    })
                  }
                </div>
              </Grid>
              <Grid item>
                <div className='deposit-age'>
                  {
                    depositHistory?.map((dep, index) => {
                      return index >= 4 && index < 8 && (
                        <>
                          <b className='deposit-id'>{depositCount - index}</b> {dep} <br />
                        </>
                      )
                    })
                  }
                </div>
              </Grid>
            </Grid>
          )
        }
      </Grid>
    </Grid>
  );
};

export default FooterRight;
