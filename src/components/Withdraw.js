import React from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { parseNote } from "../conflux/utils";
import { useWeb3React } from "@web3-react/core";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import WaitingModal from "./WaitingModal";
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';
import svgLogo from "../images/sacred_pdf_logo.png";

const web3Utils = require("web3-utils");

const useStyles = makeStyles((theme) => ({
  textField: {
    margin: theme.spacing(1),
    "& .MuiInputBase-input": {
      marginLeft: "10px",
      marginBottom: "10px",
    },
  },
  headerBtn: {
    marginTop: "-10px",
    fontSize: "20px",
    fontFamily: "Montserrat",
    textTransform: "none",
    fontWeight: "bold",
  },
  inspect: {
    position: "relative",
    left: "-100%",
    cursor: "pointer",
  },
}));

const isLikeBase32Address = (addr) => {
  // this won't return false when there's net1029, net1
  return /^(cfx(test)?|net\d+):(type\.(null|user|contract|builtin):)?[0123456789abcdefghjkmnprstuvwxyz]{42}$/i.test(
    addr
  );
};

// Font.register({
//   family: 'Montserrat',
//   fonts: [
//     {
//       src: `https://fonts.googleapis.com/css2?family=Montserrat&display=swap`
//     },
//     {
//       src: `https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap`,
//       fontWeight: 'bold'
//     },
//     {
//       src: `https://fonts.googleapis.com/css2?family=Montserrat:ital@1&display=swap`,
//       fontWeight: 'normal',
//       fontStyle: 'italic'
//     },
//     {
//       src: `https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@1,700&display=swap`,
//       fontWeight: 'bold',
//       fontStyle: 'italic'
//     }
//   ]
// })

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    // fontFamily: 'Montserrat',
    textAlign: 'center',
  },
  section1: {
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    paddingTop: '32px',
  },
  title: {
    paddingTop: '17px',
    fontWeight: 'bold',
    fontSize: "21.3px",
  },
  claimView: {
    paddingTop: '27px',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  depositView: {
    paddingTop: '28px',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginRight: '100px',
    marginLeft: '100px',
  },
  warningView: {
    paddingTop: '40px',
    flexDirection: 'column',
    alignItems: 'flex-start',
    textAlign: 'left',
    marginRight: '94px',
    marginLeft: '94px',
  },
  depositVerify: {
    paddingTop: '10px',
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: '24px',
  },
  depositContent: {
    paddingTop: '14px',
    flexDirection: 'row',
    textAlign: 'left',
  },
  field: {
    width: '25%', 
    textAlign: 'right',
    fontSize: '12px',
    fontWeight: 'bold',
    paddingRight: '14px',
  },
  value: {
    width: '75%', 
    textAlign: 'left', 
    overflowWrap: 'break-word',
    hyphens: 'auto',
    fontSize: '12px'
  }
});

const MyDocument = () => (
  <Document file="somefile.pdf">
    <Page size="A4" style={styles.page}>
      <View style={styles.section1}>
        <Image src={svgLogo} style={{ width: 200, height: 55 }} />
        <Text style={styles.title}>Compliance Report</Text>
      </View>
      <View style={styles.claimView}>
        <Text style={{ fontWeight: 700, fontSize: '13.31px', paddingRight: 8 }}>Sacred Claim:</Text>
        <Text style={{ fontSize: '13.31px' }}>sacred-c72141ikwPJWb28121W28Kdj7HjHioa8sHSDfsef432g342G</Text>
      </View>
      <View style={styles.depositView}>
        <Text style={{ fontSize: '12.42px' }}>Deposit</Text>
        <View style={styles.depositVerify}>
          <View style={{width: '50%', textAlign: 'left', overflowWrap: "anywhere"}}><Text>Verified</Text></View>
          <View style={{width: '50%', textAlign: 'right', overflowWrap: "anywhere"}}><Text>10 CFX</Text></View>
        </View>
        <View style={styles.depositContent}>
          <Text style={styles.field}>Date</Text>
          <Text style={styles.value}>April 21, 2021 4:55 PM EST</Text>
        </View>
        <View style={styles.depositContent}>
          <Text style={styles.field}>Transaction</Text>
          <Text style={styles.value}>0xce1424fe02587fa23ff1e7702sdfsdfcb83a360d97e3c1722122742348980267c2512c31</Text>
        </View>
        <View style={styles.depositContent}>
          <Text style={styles.field}>From</Text>
          <Text style={styles.value}>0x123fs3dfgasy8121W2kAZod8Kdjioa</Text>
        </View>
        <View style={styles.depositContent}>
          <Text style={styles.field}>Commitment</Text>
          <Text style={styles.value}>0x6a3fe8cadfaf2a30384e0e715ff66d11a4e4e937dc84948c904b76502823edff</Text>
        </View>
      </View>
      <View style={styles.depositView}>
        <Text style={{ fontSize: '12.42px' }}>Withdrawal</Text>
        <View style={styles.depositVerify}>
          <View style={{width: '50%', textAlign: 'left', overflowWrap: "anywhere"}}><Text>Verified</Text></View>
          <View style={{width: '50%', textAlign: 'right', overflowWrap: "anywhere"}}><Text>-0.02494 CFX</Text></View>
        </View>
        <View style={styles.depositContent}>
          <Text style={styles.field}>Date</Text>
          <Text style={styles.value}>June 30, 2021 2:27 AM EST</Text>
        </View>
        <View style={styles.depositContent}>
          <Text style={styles.field}>Transaction</Text>
          <Text style={styles.value}>0xad3351whs131we30384e0e715ff66d11a4e4e937dc8yuaeaw48c904b76502823edff</Text>
        </View>
        <View style={styles.depositContent}>
          <Text style={styles.field}>From</Text>
          <Text style={styles.value}>0x141ikwPqweqJWb28121W2kAZod8Kdjioa</Text>
        </View>
        <View style={styles.depositContent}>
          <Text style={styles.field}>Commitment</Text>
          <Text style={styles.value}>0xce1424fe02587fa23ff1e770283a360d97e3c1722122742348980267c2512c31</Text>
        </View>
      </View>
      <View style={styles.warningView}>
        <Text style={{ fontSize: '14.2px' }}>Warning</Text>
        <Text style={{ color: '#686868', fontSize: '10.6px', paddingTop: '8px' }}>This Compliance Report is for informational purposes only. You should confirm the validity of this report by using Sacred’s Compliance Tool (https://app.sacred.finance/compliance) or with any other cryptographic software that can compute and verify the information contained herein(the "Sacred Inspect Tool"). Any discrepancies between information found in this report and provided by the above tool indicate that the information in this report is inaccurate and/or fraudulent.</Text>
        <Text style={{ color: '#686868', fontSize: '10.6px', paddingTop: '8px' }}> THE COMPLIANCE REPORT IS PROVIDED "AS IS," WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OF THE SACRED COMPLIANCE TOOL BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THIS COMPLIANCE REPORT.</Text>
      </View>
    </Page>
  </Document>
);

const Withdraw = ({ handleWithdraw, deployment, handleSetDeployment, handleRelayer, relayerOption }) => {
  const history = useHistory();
  const classes = useStyles();
  const location = useLocation();
  const { account } = useWeb3React();

  const [claim, setClaim] = useState("");
  const [recipient, setRecipient] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [waiting, setWaiting] = useState(false);

  async function sendWithdraw() {
    if (await handleWithdraw({ claim, recipient })) {
      history.push("/withdrawCheck");
    }
    setWaiting(false);
  }

  const handleClick = () => {
    setWaiting(true);
  };

  const handleClaim = (e) => {
    setClaim(e.target.value);
  };

  const handleRecipient = (e) => {
    setRecipient(e.target.value);
  };

  const handleDepositRoute = () => {
    history.push("/deposit");
  };

  const handleWithdrawRoute = () => {
    if (location.pathname === "/inspect") history.push("/withdraw");
  };

  const handleCurrentAddress = () => {
    setRecipient(account);
  };

  const handleRelayerOption = (event) => {
    handleRelayer(event.target.checked);
  }

  useEffect(() => {
    if (waiting) {
      sendWithdraw();
    }
  }, [waiting])

  //TODO optimize this as there's time lag to parse the note
  useEffect(() => {
    if (claim.length > 0 && recipient.length > 0) {
      if (web3Utils.isAddress(recipient)) {
        setBtnDisabled(false);
      } else {
        setBtnDisabled(true);
      }

      try {
        parseNote(claim);
      } catch (err) {
        console.log("The note has invalid format");
        setBtnDisabled(true);
      }
    } else {
      setBtnDisabled(true);
    }
  }, [claim, recipient]);

  return (
    <div
      onClick={handleWithdrawRoute}
      className={location.pathname === "/inspect" ? classes.inspect : ""}
    >
      <Paper>
        <Box p={3}>
          <Grid container direction="column" spacing={2}>
            <Grid
              item
              container
              direction="row"
              spacing={0}
              justify="space-between"
              alignItems="center"
            >
              <Grid item>
                <Button
                  variant="text"
                  className={classes.headerBtn}
                  style={{ color: "#A7A9AC", marginLeft: "10px" }}
                  onClick={handleDepositRoute}
                >
                  Deposit
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="text"
                  className={classes.headerBtn}
                  style={{ marginRight: "10px" }}
                >
                  <b>Withdraw</b>
                </Button>
              </Grid>
            </Grid>
            <Grid item container direction="row" justify="flex-start">
              <Grid item container direction="column" alignItems="flex-start">
                <br />
                <span style={{ marginLeft: "10px" }}>Sacred Claim</span>
                <TextField
                  className={classes.textField}
                  variant="filled"
                  size="small"
                  onChange={handleClaim}
                  InputProps={{
                    disableUnderline: true,
                  }}
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid item container direction="row" justify="flex-start">
              <Grid item container direction="column" alignItems="flex-start">
                <span style={{ marginLeft: "10px" }}>Recipient Address</span>
                <TextField
                  className={classes.textField}
                  variant="filled"
                  size="small"
                  onChange={handleRecipient}
                  InputProps={{ disableUnderline: true }}
                  fullWidth
                  value={recipient}
                />
                <Grid item container justify="flex-end">
                  <span
                    className="blue-text"
                    onClick={handleCurrentAddress}
                    style={{ cursor: "pointer" }}
                  >
                    <small>
                      <b>Use current address</b>
                    </small>
                  </span>
                </Grid>
              </Grid>
            </Grid>
            <Grid item container direction="row" justify="flex-start">
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={relayerOption} onChange={handleRelayerOption} />}
                  label="Use Sacred Relayer"
                  disabled={true}
                />
              </FormGroup>
            </Grid>
            <Grid item>
              <br />
              <br />
              <Button
                variant="contained"
                color="secondary"
                style={{ textTransform: "none", fontWeight: "bold" }}
                fullWidth
                onClick={handleClick}
                disabled={btnDisabled}
              >
                Continue
              </Button>
              {/* <PDFDownloadLink document={<MyDocument />} fileName={"sacred_compliance_report"}>
                <Button variant="contained" color="secondary" style={{ textTransform: 'none', fontWeight: 'bold' }} fullWidth >Generate PDF</Button>
              </PDFDownloadLink> */}
            </Grid>
            <Grid item>
              <small>{`${deployment.symbol.toLowerCase()}-${deployment.amount.replace(
                ".",
                ""
              )}.sacred.eth`}</small>
            </Grid>
          </Grid>
        </Box>
      </Paper>
      {waiting && <WaitingModal content="Verifying claim..." />}
    </div>
  );
};

export default Withdraw;
