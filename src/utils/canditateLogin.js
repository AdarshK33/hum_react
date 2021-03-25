import axios from 'axios';
import Cookies from "js-cookie";
import { useEffect } from 'react';
import { useHistory } from "react-router-dom";
axios.defaults.baseURL = process.env.REACT_APP_BASEURL
// axios.defaults.headers.common['Authorization'] = 'Bearer AUTH_TOKEN'
export const candidate = axios
let accessToken = "";

export const setDefaultCandidiateHeader = (Token) => {
    console.log(Token,"token")
    accessToken = Token;
    console.log(accessToken,"token candidate")
    //  axios.defaults.headers.common['Authorization'] = 'Bearer  ' + access_token
};

const CandidateWithAxios = ({ children }) => {
    let history = useHistory();
    
    const getRefreshToken = () => {
        console.log("INSIDE THE GET_REFRESH_TOKEN")

        let config = {
            method: "get",
            url: candidate.defaults.baseURL + "auth/token/refresh?refresh_token=" + accessToken,

        };
        return candidate(config)
    }

    useEffect(() => {

        candidate.interceptors.request.use((config) => {
            
            const refreshUrl = config.url.includes('/auth/token/refresh')

            if (accessToken && !refreshUrl) {
                if (window.location.pathname !== "/loginonboard") {
                    let location = window.location.pathname;
                    localStorage.setItem('candidate_access_token', accessToken)

                }

                config.headers["Authorization"] = `Bearer ${accessToken}`;
                console.log(config.headers["Authorization"] = `Bearer ${accessToken}`,"candidate login" )
            }
            return config;
        });

        candidate.interceptors.response.use(
            (response) => {
                return response;
            },
            (error) => {
                console.log(error,"candidate status in interceptorrrrr candidateerror")
                const {
                    config,
                    response: { status },
                } = error;
                console.log(error, "status in interceptorrrrr candidate");
                if (status === 401) {
                    return getRefreshToken()
                        .then((response) => {
                            console.log("INSIDE THE INTERSECPECTOR ", response)
                            const { data: {
                                data: {
                                    access_token
                                }
                            } } = response;
                            // Cookies.set("APPAT", access_token);
                            // Cookies.set("APPRT", refresh_token, { expires: 0.5 });
                            accessToken = access_token;
                            console.log(axios.defaults);
                            config.headers.Authorization = `Bearer ${access_token}`;
                            config.__isRetryRequest = true;
                            return axios(config);
                        })
                        .catch((error) => {
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
export { accessToken };
export default CandidateWithAxios

