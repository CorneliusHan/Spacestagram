import 'date-fns';
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ReactPlayer from 'react-player'
import { todayDate } from "../Util/DateUtil"
import { getPictureByDate, getPictureByDefault, getPictureBySurprise} from "../Util/NASA_API";
import { ACTION_CONSTANT } from '../Util/ActionConstants';
import  { MediaCard, Icon, Modal, Stack, TextField, TextContainer, Page } from '@shopify/polaris';
import { HeartMajor, CalendarMajor, ShareMinor, DuplicateMinor } from '@shopify/polaris-icons';
import Calendar from 'react-calendar';
import BLACK from "../Asstes/Black.jpeg"
import 'react-calendar/dist/Calendar.css';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import RocketSpinner from '../Asstes/RocketSpinner/RocketSpinner';





const useStyles = makeStyles((theme) => ({
  picture:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: "center",
    margin: 'auto',
    maxWidth: 50,
    maxHeight: 50,
  },
  root: {
   display: 'flex',
    flexWrap: 'wrap',
    alignItems: "center",
    justifyContent: 'center',
    margin: "0 20%"
  },
  mediaCard: {
    margin: "20%"
  },
  imageList: {
    Width: 1000,
    Height: 2000,
  },
  media: {
    Width: 1000,
    Height: 2000,
  }
}));

const BLACK_HOLE = "https://www.nasa.gov/sites/default/files/thumbnails/image/bh_accretiondisk_sim_stationary_websize.gif";

const loadingImage = {
  explanation: "Loading",
  title: "Loading",
  hdurl: BLACK,
  media_type: "image",
  date: ""
}

export default function ContentCard() {
  const classes = useStyles();
  const [liked, setLiked] = React.useState(false);
  const [nasa_image, setImage] = React.useState(loadingImage);
  const [action, setAction] = React.useState(ACTION_CONSTANT.DEFAULT);
  const [loading, setLoading] = React.useState(false);
  const [selectedDate, setDate] = React.useState(todayDate);
  const [surpriseCounter, setSurpriseCounter] = React.useState(0);
  const [shareWindowOpen, setShareWindowOpen] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const [dateOpened, setDateOpened] = React.useState(false);


  // Very simple like/dislike logic
  const handleLikeClick = () => {
    setLiked(!liked);
    console.log("like clicked");
  };

  // update date and action type to get picture by date to trigger the refresh
  const handleDateChange = (selectedDate) => {
    let formattedDate = (selectedDate);
    setDate(formattedDate);
    setAction(ACTION_CONSTANT.DATE);
  }

  // update the action type to surprise when the "I'm feeling lucky" button is pressed
  const handleLuckyClick = () => {
    setAction(ACTION_CONSTANT.SURPRISE);
    setSurpriseCounter(surpriseCounter + 1);
  }
  
  // set setShareWindowOpen to true to trigger the popup window
  const handleSharePopupOpen = () => {
    setShareWindowOpen(true);
  };

  // set setShareWindowOpen to false to close the popup window
  const handleSharePopupClose = () => {
    setShareWindowOpen(false);
    setCopied(false);
  };

  // copy url to the clipboard
  const handleCopyToClickBoard = () => {
    navigator.clipboard.writeText(nasa_image.hdurl ? nasa_image.hdurl : nasa_image.url);
    setCopied(true);
  }

  // toggle/untoggle the date picker popup
  const handleDatePopUp = () => {
    setDateOpened(!dateOpened)
  }

  useEffect(() => {
    // start the loading animation
    setLoading(true);
    // reset the current image variable
    setImage(loadingImage);
    switch ( action ){
      case ACTION_CONSTANT.DEFAULT:
        getPictureByDefault().then((result) => {
          setImage(result.data);
          // stop the loading animation
          setLoading(false);
          setLiked(false);
        });
        break;
      case ACTION_CONSTANT.DATE:
        getPictureByDate(selectedDate).then((result) => {
          setImage(result.data);
          // stop the loading animation
          setLoading(false);
          setLiked(false);
        }).catch((error) => {
          let errorImage = {
            explanation: error.msg,
            title: "The Image You Are Looking For is Swallowed by a Black Hole",
            hdurl: BLACK_HOLE,
            media_type: "image",
            date: ""
          }
          setImage(errorImage);
          setLoading(false);
          setLiked(false);
        });
        break;
      case ACTION_CONSTANT.SURPRISE:
        getPictureBySurprise().then((result) => {
          setImage(result.data[0]);
          // stop the loading animation
          setLoading(false);
          setLiked(false);
        });
        break;
      }
  }, [setImage, setAction, setLoading, setDate, setSurpriseCounter, selectedDate, action, surpriseCounter,]);


  return (
    <div>
      <div className={classes.root}>
      {loading? <RocketSpinner />: ''}
        <MediaCard
          className = {classes.mediaCard}
          title={nasa_image.title + "\n" + nasa_image.date}
          primaryAction={{
            content: 'Pick a Date',
            onAction: handleDatePopUp,
            icon: CalendarMajor,
            alt: "Piack a Date"
          }}
          secondaryAction={{
            content: 'I\'m Feeling Lucky',
            onAction: handleLuckyClick,
            alt: "I\'m Feeling Lucky"
          }}
          portrait={true}
          description= {nasa_image.explanation}
          style={{textAlign: 'center', margin: "20%"}}
        >
        
          {nasa_image.media_type === "image"?
          <img
            alt="Image displayed"
            width="100%"
            height="100%"
            style={{objectFit: 'fill', textAlign: 'center', zIndex: 0}}
            src={nasa_image.hdurl}
            onDoubleClick={handleLikeClick}
          /> :
          <ReactPlayer ralt="Video playing" url={nasa_image.url} playing controls={true} width="100%"
          style={{objectFit: 'cover', width:"100%"}} onDoubleClick={handleLikeClick} />
          }

          <div style={{ zIndex: 1, }}>
            <Button onClick={handleLikeClick} alt = "Like Button" >
              <Icon source={HeartMajor} color={liked ? "critical" : "base"} />
              {liked? "Liked" : "Like"}
            </Button>
            <Button onClick={handleSharePopupOpen} alt = "Share Button">
              <Icon source={ShareMinor} color="base"/>
              Share
            </Button>
          </div>
        </MediaCard>
    
        <div>
          <Modal
              title="Pick a Date"
              titleHidden
              open={dateOpened}
              onClose={handleDatePopUp}
              primaryAction={{
                content: 'Ok',
                onAction: handleDatePopUp,
              }}
            >
              <Modal.Section>
              <Calendar
                onChange={handleDateChange}
                value={new Date(selectedDate)}
              />
              </Modal.Section>
            </Modal>
          <Modal
          open={shareWindowOpen}
          onClose={handleSharePopupClose}
          title="Get a shareable link"
          primaryAction={{
            content: 'Close',
            onAction: handleSharePopupClose,
          }}
        >
          <Modal.Section>
            <Stack vertical>
              <Stack.Item fill>
                <TextField
                  label="Media Link"
                  value={nasa_image.hdurl ? nasa_image.hdurl : nasa_image.url}
                  connectedRight={
                    <Button primary onClick={handleCopyToClickBoard}>
                      <Icon
                        source={DuplicateMinor}
                        color="base" />
                      Copy link
                    </Button>
                  }
                />
              </Stack.Item>
              <Stack.Item>
              { copied ?
                <TextContainer>
                  Copied!
                </TextContainer> : <TextContainer/>
              }
              </Stack.Item>
            </Stack>
          </Modal.Section>
        </Modal>
        </div>
      </div>
    </div>
  );
}