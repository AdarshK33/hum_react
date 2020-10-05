import Cookies from "js-cookie";

const secure = process.env.NODE_ENV === 'production'
console.log({ secure })
Cookies.defaults = {
  path: "/",
  //   domain: ".example.com",
  expires: 30,
  sameSite: 'lax',
  secure: false
};

export default Cookies;

