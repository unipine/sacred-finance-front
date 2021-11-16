import React from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
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

const InspectSuccess = ({ parsedNote, txReceipt, claim, deployment }) => {
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
          <Text style={styles.title}>{t('document.compliance')}</Text>
        </View>
        <View style={styles.claimView}>
          <Text style={styles.claimHead}>{t('document.claim')}:</Text>
          <Text style={styles.claimContent}>{claimText}</Text>
        </View>
        <View style={styles.depositView}>
          <Text style={{ fontSize: '12.42px' }}>{t('Deposit')}</Text>
          <View style={styles.depositVerify}>
            <View style={{width: '50%', textAlign: 'left'}}><Text style={{fontWeight: 'bold'}}>{t('Verified')}</Text></View>
            <View style={{ width: '50%', textAlign: 'right'}}><Text style={{fontWeight: 'bold'}}>{`${parsedNote.amount} ${parsedNote.currency.toUpperCase()}`}</Text></View>
          </View>
          <View style={styles.depositContent}>
            <Text style={styles.field}>{t('Date')}</Text>
            <Text style={styles.value}>{new Date(txReceipt.timestamp * 1000).toUTCString()}</Text>
          </View>
          <View style={styles.depositContent}>
            <Text style={styles.field}>{t('Transaction')}</Text>
            <Text style={styles.value}>{txReceipt.transactionHash}</Text>
          </View>
          <View style={styles.depositContent}>
            <Text style={styles.field}>{t('From')}</Text>
            <Text style={styles.value}>{txReceipt.from.toLowerCase()}</Text>
          </View>
          <View style={styles.depositContent}>
            <Text style={styles.field}>{t('Commitment')}</Text>
            <Text style={styles.value}>{parsedNote.deposit.commitmentHex}</Text>
          </View>
        </View>
        <View style={styles.depositView}>
          <Text style={{ fontSize: '12.42px' }}>{t('Withdrawal')}</Text>
          <View style={styles.depositVerify}>
            <View style={{width: '50%', textAlign: 'left'}}><Text style={{fontWeight: 'bold'}}>Verified</Text></View>
            <View style={{ width: '50%', textAlign: 'right'}}><Text style={{fontWeight: 'bold'}}>- {txReceipt?.events?.Withdrawal?.returnValues?.fee} {parsedNote.currency.toUpperCase()}</Text></View>
          </View>
          <View style={styles.depositContent}>
            <Text style={styles.field}>{t('Date')}</Text>
            <Text style={styles.value}>{new Date(txReceipt.timestamp * 1000).toUTCString()}</Text>
          </View>
          <View style={styles.depositContent}>
            <Text style={styles.field}>{t('Transaction')}</Text>
            <Text style={styles.value}>{txReceipt.transactionHash}</Text>
          </View>
          <View style={styles.depositContent}>
            <Text style={styles.field}>{t('To')}</Text>
            <Text style={styles.value}>{txReceipt.to.toLowerCase()}</Text>
          </View>
          <View style={styles.depositContent}>
            <Text style={styles.field}>{t('Nullifier Hash')}</Text>
            <Text style={styles.value}>{txReceipt?.events?.Withdrawal?.returnValues?.nullifierHash}</Text>
          </View>
        </View>
        <View style={styles.warningView}>
          <Text style={{ fontSize: '14.2px', fontWeight: 'bold' }}>{t('common.warning')}</Text>
          <Text style={{ color: '#686868', fontSize: '10.6px', paddingTop: '8px' }}>{t('document.text1')}</Text>
          <Text style={{ color: '#686868', fontSize: '10.6px', paddingTop: '8px' }}>{t('document.text2')}</Text>
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
              <b>{t("Receipt")}</b>
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

export default InspectSuccess