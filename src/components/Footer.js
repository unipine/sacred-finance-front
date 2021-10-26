import FooterLeft from './FooterLeft';
import FooterRight from './FooterRight';
import FooterMid from './FooterMid';
import Grid from '@material-ui/core/Grid';

const Footer = ({ deployment, depositCount, depositData }) => {
  return (
    <div className='footer'>
      <Grid container
        spacing={0}
        direction="row"
        justify="space-between"
        alignItems="flex-end"
      >
        <FooterLeft />
        <FooterMid />
        <FooterRight deployment={deployment} depositCount={depositCount} depositData={depositData}/>
      </Grid>
    </div>
  )
}

export default Footer
