import Grid from '@material-ui/core/Grid';
// import getIPs from '../utils/webrc-ip';
import { useState, useEffect } from 'react';



const FooterLeft = () => {

  const [ip, setIp] = useState();
  const [location, setLocation] = useState()

  useEffect(() => {

    // Gets IP address WITHOUT 3rd party but missing location details
    // getIPs().then(data => {
    //   setIp(data);
    // })

    // This call sends IP address to a 3rd party (geoip) to get location
    fetch('https://ip.tornado.cash')
      .then(res => res.json())
      .then((result) => {
        setIp(result.ip);
        setLocation(`${result.city}, ${result.region}, ${result.country}`);
      })
  }, [])

  return (

    <Grid item xs={3}>
      {/* <p className='ip-display'>
        <b>Your IP: </b> {ip}, {location}
      </p> */}

    </Grid>
  )
}

export default FooterLeft
