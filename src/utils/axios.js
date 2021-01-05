import axios from 'axios';
import Cookies from "js-cookie";
import { useEffect } from 'react';
import { useHistory } from "react-router-dom";
axios.defaults.baseURL = process.env.REACT_APP_BASEURL
// axios.defaults.headers.common['Authorization'] = 'Bearer AUTH_TOKEN'
export const client = axios;

let accessToken = "";
let refreshToken = "";

export const setDefaultHeader = (Token, refresh_Token) => {
    accessToken = Token;
    refreshToken = refresh_Token;
    //  axios.defaults.headers.common['Authorization'] = 'Bearer  ' + access_token
};

const WithAxios = ({ children }) => {
    let history = useHistory();
    // const [accessToken, setAccessToken] = useState({access_token});
    // useEffect(() => {
    //     console.log("accessToken :    ",access_token);
    //     axios.defaults.headers.common['Authorization'] = 'Bearer  ' + access_token;
    // }, [access_token]);
    const getRefreshToken = () => {
        console.log("INSIDE THE GET_REFRESH_TOKEN")
        // let refreshToken = Cookies.get('APPRT');

        let config = {
            method: "get",
            url: client.defaults.baseURL + "auth/token/refresh?refresh_token=" + refreshToken,

        };
        return client(config)
    }


    // let authTokenRequest;

    // const resetAuthTokenRequest = () => {
    //     authTokenRequest = null;
    // };
    useEffect(() => {

        client.interceptors.request.use((config) => {
            const fedid = config.url.includes('auth/token?code=')
            const token = Cookies.get("APPAT");
            const refreshUrl = config.url.includes('/auth/token/refresh')

            if (accessToken && !refreshUrl) {
                if (window.location.pathname !== "/signin") {
                    let location = window.location.pathname;
                    localStorage.setItem('URL', location)
                }

                config.headers["Authorization"] = `Bearer ${accessToken}`;
            }
            return config;
        });

        client.interceptors.response.use(
            (response) => {
                return response;
            },
            (error) => {
                const {
                    config,
                    response: { status },
                } = error;
                console.log(status, "status in interceptorrrrr");
                if (status === 401) {
                    return getRefreshToken()
                        .then((response) => {
                            console.log("INSIDE THE INTERSECPECTOR ", response)
                            const { data: {
                                data: {
                                    access_token, refresh_token
                                }
                            } } = response;
                            // Cookies.set("APPAT", access_token);
                            // Cookies.set("APPRT", refresh_token, { expires: 0.5 });
                            accessToken = access_token;
                            refreshToken = refresh_token;
                            console.log(axios.defaults);
                            config.headers.Authorization = `Bearer ${access_token}`;
                            config.__isRetryRequest = true;
                            return axios(config);
                        })
                        .catch((error) => {
                            // console.log(error?.response);
                            // console.log(error?.data);
                            // const errorData = {
                            //     status: error?.response?.status,
                            //     ...error?.response?.data,
                            // };
                            return error;
                        });
                } else if (!error.response.data) {
                    let error = {};
                    error.status = 501;
                    error.error_description = "Please check internet connectivity.";
                    return error;
                } else {
                    return error.response;
                }
            }
        );
    }, [accessToken]);
    return children
}
export { accessToken, refreshToken };
export default WithAxios

