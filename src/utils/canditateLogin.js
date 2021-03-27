import axios from 'axios';
import Cookies from "js-cookie";
import { useEffect } from 'react';
import { useHistory } from "react-router-dom";
axios.defaults.baseURL = process.env.REACT_APP_BASEURL
export const candidate = axios
let value = localStorage.getItem('candidate_access_token')
let accessToken = (value!== null||value!==undefined)? value:''

export const setDefaultCandidiateHeader = (Token) => {
    accessToken = Token;
    console.log(accessToken,"token candidate")
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
        console.log("useeffect1")
        candidate.interceptors.request.use((config) => {
            const refreshUrl = config.url.includes('/auth/token/refresh')
            console.log(config,"candidate request")
            if (accessToken && !refreshUrl) {
                config.headers["Authorization"] = `Bearer ${accessToken}`;
            }
            return config;
        });

        candidate.interceptors.response.use(
            (response) => {
                return response;
            },
            (error) => {
                const {
                    config,
                    response: { status },
                } = error;
                console.log(error, "status in interceptorrrrr candidate");
                if (status === 401) {
                    return getRefreshToken()
                        .then((response) => {
                            console.log("INSIDE THE INTERSECPECTOR ", response)
                            config.headers.Authorization = `Bearer ${accessToken}`;
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

