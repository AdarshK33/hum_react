import axios from 'axios';
import Cookies from "js-cookie";
axios.defaults.baseURL = process.env.REACT_APP_BASEURL
axios.defaults.headers.common['Authorization'] = 'Bearer AUTH_TOKEN'
export const client = axios;

export const setDefaultHeader = AUTH_TOKEN => axios.defaults.headers.common['Authorization'] = 'Bearer  ' + AUTH_TOKEN;





