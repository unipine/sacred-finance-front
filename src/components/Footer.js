import FooterLeft from './FooterLeft';
import FooterRight from './FooterRight';
import FooterMid from './FooterMid';
import Grid from '@material-ui/core/Grid';

const Footer = ({ deployment, depositCount, networkId }) => {
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
        <FooterRight deployment={deployment} depositCount={depositCount} networkId={networkId}/>
      </Grid>
    </div>
  )
}

export default Footer
