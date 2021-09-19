import axios from 'axios';
import { formatDate } from "./DateUtil";

const NASA_URL = "https://api.nasa.gov/planetary/apod";
const NASA_API_KEY = process.env.REACT_APP_NASA_API_KEY;

export async function getPictureByDefault() {
    return axios.get(NASA_URL, {
        params: 
            {api_key: NASA_API_KEY}
        }).then((result) => {
            return result;
        });
}

export async function getPictureByDate(selectedDate) {
    const DATE_URL = NASA_URL + "?api_key=" + NASA_API_KEY + "&date=" + formatDate(selectedDate);
    return axios.get(DATE_URL).then((result) => {
        return result;
    });
}

export async function getPictureBySurprise() {
    return axios.get(NASA_URL, {
        params: 
            {count:1, api_key: NASA_API_KEY}
        }).then((result) => {
            return result;
        });
}