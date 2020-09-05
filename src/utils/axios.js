import axios from 'axios';

axios.defaults.baseURL = 'http://humine.theretailinsights.co/';
const setDefaultHeader = AUTH_TOKEN => axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

export default {axios, setDefaultHeader}