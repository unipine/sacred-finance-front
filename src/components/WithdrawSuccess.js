import React from 'react'
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { jsPDF } from 'jspdf';
import { useHistory } from "react-router-dom";

const WithdrawSuccess = ({ parsedNote, txReceipt, claim, deployment }) => {
  const history = useHistory();

  const handleDepositRoute = () => {
    history.push("/deposit");
  }

  //TODO: add styling somehow?
  const doc = new jsPDF();
  const generatePdf = () => {
    doc.setFontSize(20);
    doc.text("SACRED", 20, 15);
    doc.text("Compliance Report", 20, 30);

    doc.setFontSize(10);
    doc.text("Sacred Claim:", 20, 40);
    doc.text(claim.substr(0, 75), 20, 45);
    doc.text(claim.substr(76), 20, 50);

    doc.setFontSize(14);
    doc.text("Deposit Verified", 20, 65);
    doc.setFontSize(16);
    doc.text(`${parsedNote.amount} ${parsedNote.currency.toUpperCase()}`, 20, 75);
    doc.setFontSize(10);
    // doc.text("Date", 20, 70);
    // doc.text("April 21, 2021 4:55 PM EST", 20, 75);
    // doc.text("Transaction", 20, 85);
    // doc.text("0xce1424fe02587fa23ff1e7702sdfsdfcb83a360d97e3c1722122742348980267c2512c31", 20, 90);
    // doc.text("From", 20, 100);
    // doc.text("0x123fs3dfgasy8121W2kAZod8Kdjioa", 20, 105);
    doc.text("Commitment", 20, 85);
    doc.text(parsedNote.deposit.commitmentHex, 20, 90);

    doc.setFontSize(14);
    doc.text("Withdrawal Verified", 20, 120);
    doc.setFontSize(16);
    doc.text(`${parsedNote.amount} ${parsedNote.currency.toUpperCase()}`, 20, 130);
    doc.setFontSize(10);
    doc.text("Date", 20, 140);
    doc.text(new Date(txReceipt.timestamp * 1000).toUTCString(), 20, 145);
    doc.text("Transaction", 20, 155);
    doc.text(txReceipt.transactionHash, 20, 160);
    doc.text("From", 20, 170);
    doc.text(txReceipt.from.toLowerCase(), 20, 175);
    doc.text("Commitment", 20, 185);
    doc.text(parsedNote.deposit.commitmentHex, 20, 190);

    doc.setFontSize(14);
    doc.text("Warning", 20, 220);
    doc.setFontSize(10);
    doc.text("This Compliance Report is for informational purposes only. You should", 20, 230);
    doc.text("confirm the validity of this report by using Sacred’s Compliance Tool", 20, 235);
    doc.text("[https://app.sacred.finance/compliance] or with any other cryptographic software", 20, 240);
    doc.text("that can compute and verify the information contained herein[the 'Sacred Inspect", 20, 245);
    doc.text("Tool']. Any discrepancies between information found in this report and provided by", 20, 250);
    doc.text("the above tool indicate that the information in this report is inaccurate and/or fraudulent.", 20, 255);

    doc.text("THE COMPLIANCE REPORT IS PROVIDED 'AS IS,' WITHOUT WARRANTY OF ANY KIND, EXPRESS OR", 20, 265);
    doc.text("IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS", 20, 270);
    doc.text("FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OF THE", 20, 275);
    doc.text("SACRED COMPLIANCE TOOL BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER", 20, 280);
    doc.text("IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION", 20, 285);
    doc.text("WITH THIS COMPLIANCE REPORT.", 20, 290);

    doc.save("sacred_compliance_report.pdf");
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
              <b>Success!</b>
            </Grid>
            <Grid item>
              <br />
              Your withdrawal of
            </Grid>
            <Grid item>
              <span className='blue-text'><b>{`${deployment.amount} ${deployment.symbol}`}</b></span>
            </Grid>
            <Grid item>
              has been confirmed.
            </Grid>
            <Grid item>
              <a href={`https://kovan.etherscan.io/tx/${txReceipt.transactionHash.toLowerCase()}`} className='blue-text' target="_blank" rel="noopener noreferrer"><b>View on EtherScan</b></a>
            </Grid>

            <Grid item>
              <br />
              <Button variant="contained" color="secondary" style={{ textTransform: 'none', fontWeight: 'bold' }} fullWidth onClick={generatePdf}>Generate PDF</Button>
            </Grid>
            <Grid item>
              <br />
              <Button variant="outlined" color="secondary" style={{ textTransform: 'none', fontWeight: 'bold' }} fullWidth onClick={handleDepositRoute}>Done</Button>
            </Grid>
            <Grid item>
              <small>{`${deployment.symbol.toLowerCase()}-${deployment.amount.replace('.', '')}.sacred.cfx`}</small>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </div>
  )
}

export default WithdrawSuccess



// doc.setFontSize(20);
// doc.text("SACRED", 20, 15);
// // doc.addImage("../images/sacred_logo_png.PNG", "png", 20, 15, 50, 50);
// doc.text("Compliance Report", 20, 30);

// doc.setFontSize(10);
// doc.text("Sacred Claim:", 20, 40);
// doc.text("sacred-c72141ikwPJWb28121W28Kdj7HjHioa8sHSDfsef432g342G", 45, 40);

// doc.setFontSize(14);
// doc.text("Deposit Verified", 20, 50);
// doc.setFontSize(16);
// doc.text("0.1 CFX", 20, 60);
// doc.setFontSize(10);
// doc.text("Date", 20, 70);
// doc.text("April 21, 2021 4:55 PM EST", 20, 75);
// doc.text("Transaction", 20, 85);
// doc.text("0xce1424fe02587fa23ff1e7702sdfsdfcb83a360d97e3c1722122742348980267c2512c31", 20, 90);
// doc.text("From", 20, 100);
// doc.text("0x123fs3dfgasy8121W2kAZod8Kdjioa", 20, 105);
// doc.text("Commitment", 20, 115);
// doc.text("0x6a3fe8cadfaf2a30384e0e715ff66d11a4e4e937dc84948c904b76502823edff", 20, 120);

// doc.setFontSize(14);
// doc.text("Withdrawal Verified", 20, 140);
// doc.setFontSize(16);
// doc.text("0.1 CFX", 20, 150);
// doc.setFontSize(10);
// doc.text("Date", 20, 160);
// doc.text("April 21, 2021 4:55 PM EST", 20, 165);
// doc.text("Transaction", 20, 175);
// doc.text("0xce1424fe02587fa23ff1e7702sdfsdfcb83a360d97e3c1722122742348980267c2512c31", 20, 180);
// doc.text("From", 20, 190);
// doc.text("0x123fs3dfgasy8121W2kAZod8Kdjioa", 20, 195);
// doc.text("Commitment", 20, 205);
// doc.text("0x6a3fe8cadfaf2a30384e0e715ff66d11a4e4e937dc84948c904b76502823edff", 20, 210);

// doc.setFontSize(14);
// doc.text("Warning", 20, 230);
// doc.setFontSize(10);
// doc.text("This Compliance Report is for informational purposes only. You should confirm the", 20, 235);
// doc.text("validity of this report by using Sacred’s Compliance Tool", 20, 240);
// doc.text("[https://app.sacred.finance/compliance] or with any other cryptographic software", 20, 245);
// doc.text("that can compute and verify the information contained herein[the 'Sacred Inspect", 20, 250);
// doc.text("Tool']. Any discrepancies between information found in this report and provided by", 20, 255);
// doc.text("the above tool indicate that the information in this report is inaccurate and/or fraudulent.", 20, 260);
// doc.text("THE COMPLIANCE REPORT IS PROVIDED 'AS IS,' WITHOUT WARRANTY OF ANY KIND, EXPRESS OR", 20, 265);
// doc.text("IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS", 20, 270);
// doc.text("FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OF THE", 20, 275);
// doc.text("SACRED COMPLIANCE TOOL BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER", 20, 280);
// doc.text("IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION", 20, 285);
// doc.text("WITH THIS COMPLIANCE REPORT.", 20, 290);


// doc.save("sacred_compliance_report.pdf");