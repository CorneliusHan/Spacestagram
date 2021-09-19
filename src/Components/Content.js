import React from 'react';
import ContentCard from './ContentCard'
import SpotifyPlayer from 'react-spotify-player';
import { Page, FooterHelp, Link } from '@shopify/polaris';


const size = {
  width: '50%',
  height: 300,
};
const view = 'list'; // or 'coverart'
const theme = 'black'; // or 'white'

class Content extends React.Component {
  render() {
    return (
      <div className="Content" >
        <Page title='Spacestagram' fullWidth='true'/>
        <ContentCard/>
        <br></br>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <SpotifyPlayer
            uri="spotify:playlist:122EUAX3YUFsdfeEt0cv3q"
            size={size}
            view={view}
            theme={theme}
          />
        </div>
        <FooterHelp>
            Brought You By NASA{' '}
            <Link external url="https://api.nasa.gov/#apod">
            Astronomy Picture of the Day
            </Link>
          </FooterHelp>
      </div>
    );
  }
}

export default Content;