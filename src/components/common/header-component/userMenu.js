import React, { Fragment } from 'react';
import man from '../../../assets/images/dashboard/userImage.png';
import { User, Mail, Lock, Settings, LogOut, LogIn } from 'react-feather';

const loginUrl = `https://preprod.idpdecathlon.oxylane.com/as/authorization.oauth2?response_type=code&client_id=${process.env.REACT_APP_FEDID_CLIENTID}&scope=openid%20profile&redirect_uri=${process.env.REACT_APP_REDIRECT_URL}`;

const UserMenu = () => {
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
                    <li><a href="#javascript"><User />Edit Profile</a></li>
                    <li><a href="#javascript"><Mail />Inbox</a></li>
                    <li><a href="#javascript"><Lock />Lock Screen</a></li>
                    <li><a href="#javascript"><Settings />Settings</a></li>
                    <li><a href="#javascript"><LogOut /> Log out</a></li>
                    <li><a href={loginUrl}><LogIn />Log In</a></li>
                </ul>
            </li>
        </Fragment>
    );
};


export default UserMenu;