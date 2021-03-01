import Cookies from "js-cookie";

const secure = process.env.NODE_ENV === 'production'
let flag = false;
/* if(process.env.REACT_APP_BASEURL.includes("https")){
  flag = true;
} */
console.log({ secure })
Cookies.defaults = {
  path: "/",
  //   domain: ".example.com",
  expires: 30,
  sameSite: 'lax',
  secure: flag
};

export default Cookies;

