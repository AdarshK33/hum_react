import axios from 'axios';
// import api from '../constant/apiConstants'
axios.defaults.baseURL =  process.env.REACT_APP_BASEURL
// alert(axios.defaults.baseURL);
    axios.defaults.headers.common['Authorization'] = 'Bearer AUTH_TOKEN'
export const client = axios;

export const setDefaultHeader = AUTH_TOKEN => axios.defaults.headers.common['Authorization'] = 'Bearer  ' + AUTH_TOKEN;

