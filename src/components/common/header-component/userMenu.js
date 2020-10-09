import React, { Fragment, useContext } from 'react';
import man from '../../../assets/images/dashboard/userImage.png';
import { User, Mail, Lock, Settings, LogOut, LogIn, Users, UserPlus } from 'react-feather';
import { AppContext } from "../../../context/AppState";

const loginUrl = `https://preprod.idpdecathlon.oxylane.com/as/authorization.oauth2?response_type=code&client_id=${process.env.REACT_APP_FEDID_CLIENTID}&scope=openid%20profile&redirect_uri=${process.env.REACT_APP_REDIRECT_URL}`;

const UserMenu = () => {
    const { user } = useContext(AppContext);
    return (
        <Fragment>
            <li className="onhover-dropdown">
                <div className="media align-items-center">
                    <img className="align-self-center pull-right img-50 rounded-circle blur-up lazyloaded" src={man} alt="header-user" />
                    <div className="dotted-animation">
                        <span className="animate-circle"></span>
                        <span className="main-circle"></span>
                    </div>
                </div>
                <ul className="profile-dropdown onhover-show-div p-20 profile-dropdown-hover">
                    <li><a href="#javascript"><User />My Profile</a></li>
                    {user.loginType === '1' &&
                        <Fragment>
                            <li><a href="#javascript"><UserPlus />Admin</a></li>
                            <li><a href="#javascript"><Users />My Team</a></li>
                        </Fragment>
                    }
                    {user.loginType === '7' || user.loginType === '9' &&
                        <li><a href="#javascript"><Users />My Team</a></li>
                    }
                    {/*  <li><a href="#javascript"><Settings />Settings</a></li> */}
                    {/* <li><a href="#javascript"><LogOut /> Log out</a></li> */}
                    <li><a href={loginUrl}><LogOut />Log In</a></li>
                    <li><a href="#javascript"><LogOut /> Log out</a></li>
                </ul>
            </li>
        </Fragment>
    );
};


export default UserMenu;