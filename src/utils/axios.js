import axios from 'axios';
// import api from '../constant/apiConstants'
axios.defaults.baseURL =  process.env.REACT_APP_BASEURL
// alert(axios.defaults.baseURL);
axios.defaults.headers.common['Authorization'] = 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6Ik1BSU4iLCJwaS5hdG0iOiI2In0.eyJzY29wZSI6WyJvcGVuaWQiLCJwcm9maWxlIl0sImNsaWVudF9pZCI6IkM2YTdiNjhkNTJhZDIxYzBkNTU0NmZiZWY3OGMwOTAzYTU1MTkwNDgwIiwiaXNzIjoiaWRwZGVjYXRobG9uLnByZXByb2Qub3JnIiwianRpIjoiVXlIS3JObGljWCIsInN1YiI6IkFHQU5HSjA0IiwidWlkIjoiQUdBTkdKMDQiLCJvcmlnaW4iOiJjb3Jwb3JhdGUiLCJleHAiOjE1OTk0MTk3Nzl9.x5BLkOuwDZE6LwxfUqQYLE-nS6CoAv-o2gl1owUAaIN7hgHP7ZoCV3vSL3MGdzgqAmwbT7YBv8dCEYK1bXJLevdXo0TSf5xcgHHXVrXCeNj4LqzSkR-jS1gIoLrWWnxu7Lef3_ikEOHADkeMV6ecPmd8piPbziWl53o'

export const client = axios;

export const setDefaultHeader = AUTH_TOKEN => axios.defaults.headers.common['Authorization'] = 'Bearer  ' + AUTH_TOKEN;

