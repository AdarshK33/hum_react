import axios from 'axios';
import api from '../constant/apiConstants'
axios.defaults.baseURL = api.BASEURL;
axios.defaults.headers.common['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbmlzdHJhdG9yIiwiZXhwIjoxNTk5MzMxMjkyLCJpYXQiOjE1OTkyOTUyOTJ9.IYBMKAtpakrJj7R1hwbXKYu2Q7F_CMbwmyS6sAOcJZ0'

export const client = axios;

export const setDefaultHeader = AUTH_TOKEN => axios.defaults.headers.common['Authorization'] = 'Bearer  ' + AUTH_TOKEN;

