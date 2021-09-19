# Spacestagram

Project Link: https://spacestagram-peterhan.netlify.app/ <br/>
Project Requirement: https://docs.google.com/document/d/1QlC6htA5SXEl3YruAOkJWj2-0W3w-n0UOzGuJ1EcktQ/edit#

## Overview

### Basic Functionality

* Get iamge of the day from NASA Open API\
* Display the image/video of the day, title, date and description\
* Like/Unlike button


### Extras

#### Get Image by day

* The "Pick a Date" button at the bottom of the content card allows user to select photo from previous date
* An blackhole image will show up if a future date is selected

#### I'm Feeling Lucky

* Idea taken from Google's I'm feeling lucky
* When the "I'm Feeling Lucky" button at the bottom of the page is clicked, a photo from a randomly selected date will be dispalyed

#### Share the Image

* The share icon on the right of the "Like" button can be click to bring up a popup window
* A shareable link of the image will be provided and copy to the clipboard by clicking the "Copy Link" button

#### A Spotify Playlist

* Integrated a Spotify component at the end of the page. Who doesn't like listening of Sir Elton John while looking at the wonders of the universe?

#### A Rocket Spinner for Loading

* Added a Roacker Loading Spinner to display while waiting for the API call to return

#### Double Click the Image or Video to like

* You can double click the Image or Video to like, just like Instagram


### CI/CD
* This app is deployed via Netlify.

## Run the App Locally

```
npm run start
```

Open http://localhost:3000/ to view it.
