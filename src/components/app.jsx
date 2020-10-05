import React, { useEffect, useContext } from 'react';
import Header from './common/header-component/header';
import Sidebar from './common/sidebar-component/sidebar';
import "./common/style.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppContext } from "../context/AppState";
import Cookies from "js-cookie";
import axios from 'axios';
import { client } from "../utils/axios";
const AppLayout = ({ children }) => {

    const { authenticateUser, getUserInfo, state } = useContext(AppContext);

    useEffect(() => {
        checkTokenExists()
        getUserInfo()
    }, []);

    useEffect(() => {
        const { app, user } = state
        console.log("=== ", app)
        console.log("for user", user)
    })


    const checkTokenExists = () => {
        // console.log("ALL TOKENS "+Cookies.get());
        // console.log("checkTokenExists");
        let access_token = Cookies.get('APPAT');
        //console.log("INSIDE CHECK TOKEN EXISTS"+access_token)
        if (access_token) {
            authenticateUser(true)
        }
        else {
            authenticateUser(false)
        }

    }
    const getRefreshToken = () => {
        console.log("INSIDE THE GET_REFRESH_TOKEN")
        let refreshToken = Cookies.get('APPRT');
        let config = client.get('/auth/token/refresh?refresh_token=' + refreshToken)
        return client(config)
    }


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


    return (
        <div>

            <div className="page-wrapper">
                <div className="page-body-wrapper">
                    <Header />
                    <Sidebar />
                    <div className="page-body">
                        {children}


                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default AppLayout;