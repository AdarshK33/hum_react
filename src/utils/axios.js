import axios from 'axios';
import api from '../constant/apiConstants'
axios.defaults.baseURL = api.BASEURL;
axios.defaults.headers.common['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbmlzdHJhdG9yIiwiZXhwIjoxNTk5NDEzMzU1LCJpYXQiOjE1OTkzNzczNTV9.J4zsob2Rt4n94VeP_b6tXDnwE-CDMlUh6_F5GsQPi88'

export const client = axios;

export const setDefaultHeader = AUTH_TOKEN => axios.defaults.headers.common['Authorization'] = 'Bearer  ' + AUTH_TOKEN;

