import Grid from '@material-ui/core/Grid';
import WarningIcon from '@material-ui/icons/Warning';


const FooterMid = () => {

  return (

    <Grid item xs={5}>
      <p className='ip-display'>
        <WarningIcon className="inline-icon" /> <small>Sacred is still experimental software. Please use at your own risk.</small>
      </p>

    </Grid>
  )
}

export default FooterMid

//<WarningIcon className="inline-icon" /> <small>Sacred <a style={{ color: '#fff' }} href="https://sacred.gitbook.io/sacred-finance/other-important-information/audit-by-certik">was audited</a>. However, it is still experimental software. Please use at your own risk.</small>
