import React from 'react'
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';
import svgLogo from "../images/sacred_pdf_logo.png";
import Mont_Regular from "../fonts/Montserrat-Regular.ttf";
import Mont_Bold from "../fonts/Montserrat-Bold.ttf";
import { useTranslation } from "react-i18next";

Font.register({
  family: 'Montserrat',
  format: 'truetype',
  fonts: [
    {
      src: Mont_Regular
    },
    {
      src: Mont_Bold,
      fontWeight: 'bold',
    }
  ]
});

Font.registerHyphenationCallback(word => {
  const middle = Math.floor(word.length / 2);
  const parts = word.length === 1 ? [word] : [word.substr(0, middle), word.substr(middle)];
  return parts;
});

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Montserrat',
    textAlign: 'center',
  },
  section1: {
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    paddingTop: '20px',
  },
  title: {
    paddingTop: '14px',
    fontWeight: 'bold',
    fontSize: "21.3px",
  },
  claimView: {
    paddingTop: '14px',
    flexDirection: 'row',
    flexShrink: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  claimHead: {
    fontWeight: 'bold', 
    fontSize: '13.31px', 
    paddingRight: 8
  },
  claimContent: {
    fontSize: '13.31px', 
    textAlign: 'left'
  },
  depositView: {
    paddingTop: '14px',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginRight: '100px',
    marginLeft: '100px',
  },
  warningView: {
    paddingTop: '14px',
    flexDirection: 'column',
    alignItems: 'flex-start',
    textAlign: 'left',
    marginRight: '94px',
    marginLeft: '94px',
  },
  depositVerify: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: '24px',
  },
  depositContent: {
    paddingTop: '14px',
    flexDirection: 'row',
    flexShrink: 1,
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
    fontSize: '12px'
  }
});

const WithdrawSuccess = ({ parsedNote, txReceipt, claim, deployment }) => {
  const history = useHistory();

  const handleDepositRoute = () => {
    history.push("/deposit");
  }

  const { t } = useTranslation();

  //TODO: add styling somehow?

  const claimText = claim.substr(0, Math.floor(claim.length / 3)) + ' ' + claim.substr( Math.floor(claim.length / 3),  Math.floor(claim.length / 3) * 2) ;

  const MyDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section1}>
          <Image src={svgLogo} style={{ width: 200, height: 55 }} />
          <Text style={styles.title}>Compliance Report</Text>
        </View>
        <View style={styles.claimView}>
          <Text style={styles.claimHead}>Sacred Claim:</Text>
          <Text style={styles.claimContent}>{claimText}</Text>
        </View>
        <View style={styles.depositView}>
          <Text style={{ fontSize: '12.42px' }}>Deposit</Text>
          <View style={styles.depositVerify}>
            <View style={{width: '50%', textAlign: 'left'}}><Text style={{fontWeight: 'bold'}}>Verified</Text></View>
            <View style={{ width: '50%', textAlign: 'right'}}><Text style={{fontWeight: 'bold'}}>{`${parsedNote.amount} ${parsedNote.currency.toUpperCase()}`}</Text></View>
          </View>
          <View style={styles.depositContent}>
            <Text style={styles.field}>Date</Text>
            <Text style={styles.value}>{new Date(txReceipt.timestamp * 1000).toUTCString()}</Text>
          </View>
          <View style={styles.depositContent}>
            <Text style={styles.field}>Transaction</Text>
            <Text style={styles.value}>{txReceipt.transactionHash}</Text>
          </View>
          <View style={styles.depositContent}>
            <Text style={styles.field}>From</Text>
            <Text style={styles.value}>{txReceipt.from.toLowerCase()}</Text>
          </View>
          <View style={styles.depositContent}>
            <Text style={styles.field}>Commitment</Text>
            <Text style={styles.value}>{parsedNote.deposit.commitmentHex}</Text>
          </View>
        </View>
        <View style={styles.depositView}>
          <Text style={{ fontSize: '12.42px' }}>Withdrawal</Text>
          <View style={styles.depositVerify}>
            <View style={{width: '50%', textAlign: 'left'}}><Text style={{fontWeight: 'bold'}}>Verified</Text></View>
            <View style={{ width: '50%', textAlign: 'right'}}><Text style={{fontWeight: 'bold'}}>- {txReceipt?.events?.Withdrawal?.returnValues?.fee} {parsedNote.currency.toUpperCase()}</Text></View>
          </View>
          <View style={styles.depositContent}>
            <Text style={styles.field}>Date</Text>
            <Text style={styles.value}>{new Date(txReceipt.timestamp * 1000).toUTCString()}</Text>
          </View>
          <View style={styles.depositContent}>
            <Text style={styles.field}>Transaction</Text>
            <Text style={styles.value}>{txReceipt.transactionHash}</Text>
          </View>
          <View style={styles.depositContent}>
            <Text style={styles.field}>To</Text>
            <Text style={styles.value}>{txReceipt.to.toLowerCase()}</Text>
          </View>
          <View style={styles.depositContent}>
            <Text style={styles.field}>Nullifier Hash</Text>
            <Text style={styles.value}>{txReceipt?.events?.Withdrawal?.returnValues?.nullifierHash}</Text>
          </View>
        </View>
        <View style={styles.warningView}>
          <Text style={{ fontSize: '14.2px', fontWeight: 'bold' }}>Warning</Text>
          <Text style={{ color: '#686868', fontSize: '10.6px', paddingTop: '8px' }}>This Compliance Report is for informational purposes only. You should confirm the validity of this report by using Sacred’s Compliance Tool (https://app.sacred.finance/compliance) or with any other cryptographic software that can compute and verify the information contained herein(the "Sacred Inspect Tool"). Any discrepancies between information found in this report and provided by the above tool indicate that the information in this report is inaccurate and/or fraudulent.</Text>
          <Text style={{ color: '#686868', fontSize: '10.6px', paddingTop: '8px' }}> THE COMPLIANCE REPORT IS PROVIDED "AS IS," WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OF THE SACRED COMPLIANCE TOOL BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THIS COMPLIANCE REPORT.</Text>
        </View>
      </Page>
    </Document>
  );

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
              <b>{t("Success!")}</b>
            </Grid>
            <Grid item>
              <br />
              {t("Your withdrawal of")}{t("confirmed")}
            </Grid>
            <Grid item>
              <span className='blue-text'><b>{`${deployment.amount} ${deployment.symbol}`}</b></span>
            </Grid>
            <Grid item>
              {t("has been confirmed.")}
            </Grid>
            <Grid item>
              <a href={`https://kovan.etherscan.io/tx/${txReceipt.transactionHash.toLowerCase()}`} className='blue-text' target="_blank" rel="noopener noreferrer"><b>{t("View on EtherScan")}</b></a>
            </Grid>

            <Grid item>
              <br />
              <PDFDownloadLink document={<MyDocument />} fileName={"sacred_compliance_report"} style={{textDecoration: 'none'}}>
                <Button variant="contained" color="secondary" style={{ textTransform: 'none', fontWeight: 'bold' }} fullWidth >{t("Generate PDF")}</Button>
              </PDFDownloadLink>
            </Grid>
            <Grid item>
              <br />
              <Button variant="outlined" color="secondary" style={{ textTransform: 'none', fontWeight: 'bold' }} fullWidth onClick={handleDepositRoute}>{t("Done")}</Button>
            </Grid>
            <Grid item>
              <small>{`${deployment.symbol.toLowerCase()}-${deployment.amount.replace('.', '')}.sacred.eth`}</small>
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