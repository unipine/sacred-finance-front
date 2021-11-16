import Grid from '@mui/material/Grid';
import WarningIcon from '@mui/icons-material/Warning';
import { useTranslation } from "react-i18next";


const FooterMid = () => {
  const { t } = useTranslation();
  
  return (

    <Grid item xs={5}>
      <p className='ip-display'>
        <WarningIcon className="inline-icon" /> <small>{t('footer.risk_warning')}</small>
      </p>

    </Grid>
  )
}

export default FooterMid

//<WarningIcon className="inline-icon" /> <small>Sacred <a style={{ color: '#fff' }} href="https://sacred.gitbook.io/sacred-finance/other-important-information/audit-by-certik">was audited</a>. However, it is still experimental software. Please use at your own risk.</small>
