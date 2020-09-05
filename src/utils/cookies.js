import Cookies from "js-cookie";

const secure = process.env.NODE_ENV === 'production'

Cookies.defaults = {
  path: "/",
//   domain: ".example.com",
  expires: 30,
  sameSite: 'lax',
  secure
};

export default Cookies;
