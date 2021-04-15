import React, { useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
// axios.defaults.baseURL = process.env.REACT_APP_BASEURL
// export const candidate = axios
export const candidate = axios.create({
  baseURL: process.env.REACT_APP_BASEURL,
});
let value = localStorage.getItem("candidate_access_token");
let accessToken = value !== null || value !== undefined ? value : "";
export const setDefaultCandidiateHeader = (Token) => {
  accessToken = Token;
  console.log(accessToken, "token candidate");
};
export const getRefreshToken = () => {
    console.log("INSIDE THE GET_REFRESH_TOKEN");

        let config = {
            method: "get",
            url: candidate.defaults.baseURL + "api/v2/refresh_token",
            headers: {
                "Host":"<calculated when request is sent>",
                "Accept":"*/*",
                "Accept-Encoding":"gzip, deflate, br",
                "Connection":"keep-alive",
                "accept": "application/json",
                "Authorization":`Bearer ${accessToken}`
            }
        };
        // config.headers['accept'] = "application/json";
        // config.headers["Authorization"] =`Bearer ${accessToken}`;
        return candidate(config)
    }

const CandidateWithAxios = ({ children ,props}) => {
    let history = useHistory();
 
  console.log("useeffect1");
  candidate.interceptors.request.use((config) => {
    const refreshUrl = config.url.includes("api/v2/refresh_token");
    console.log(config, "candidate request");
    if (accessToken && !refreshUrl) {
      config.headers["accept"] = "application/json";
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
                console.log(error, "status  candidate");
                if (status === 401) {
                    return getRefreshToken()
                        .then((response) => {
                            console.log("INSIDE THE INTERSECPECTOR ", response)
                            return axios(config);
                        })
                        .catch((error) => {
                            return error;
                        });
                } else if(status == 403){
                    localStorage.removeItem("candidate_access_token");
                    props.history.push("/onboard-offer")

                }else if (!error.response.data) {
                    let error = {};
                    error.status = 501;
                    error.error_description = "Please check internet connectivity.";
                    return error;
                } else {
                    return error.response;
                }
        }
        );
    return children
}
export { accessToken };
export default CandidateWithAxios;
