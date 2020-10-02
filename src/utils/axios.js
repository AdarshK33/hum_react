import axios from 'axios';
import Cookies from "js-cookie";
axios.defaults.baseURL = process.env.REACT_APP_BASEURL
axios.defaults.headers.common['Authorization'] = 'Bearer AUTH_TOKEN'
export const client = axios;

export const setDefaultHeader = AUTH_TOKEN => axios.defaults.headers.common['Authorization'] = 'Bearer  ' + AUTH_TOKEN;


const getRefreshToken = () => {
    console.log("INSIDE THE GET_REFRESH_TOKEN")
    let refreshToken = Cookies.get('APPRT');
    let config = {
        method: "get",
        url: "http://humine.theretailinsights.co/auth/token/refresh?refresh_token=" + refreshToken,

    };
    return client(config)
}


// let authTokenRequest;

// const resetAuthTokenRequest = () => {
//     authTokenRequest = null;
// };

client.interceptors.request.use((config) => {
    const token = Cookies.get("APPAT");
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
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
                    Cookies.set("APPAT", access_token);
                    Cookies.set("APPRT", refresh_token, { expires: 0.5 });
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


