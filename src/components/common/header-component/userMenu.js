import React, { Fragment, useContext } from 'react';
import man from '../../../assets/images/dashboard/userImage.png';
import { useHistory } from "react-router-dom";
import LoginError from "../loginError";
import { User, Mail, Lock, Settings, LogOut, LogIn, Users, UserPlus } from 'react-feather';
import { AppContext } from "../../../context/AppState";

const loginUrl = `${process.env.REACT_APP_FEDID_AUTH_URL}?response_type=code&client_id=${process.env.REACT_APP_FEDID_CLIENTID}&scope=openid%20profile&redirect_uri=${process.env.REACT_APP_REDIRECT_URL}`;
const UserMenu = () => {
    const { user, getUserMenu } = useContext(AppContext);
    let history = useHistory();

    const handleMenuListProfile = () => {
        getUserMenu(user.generalUserMenus);
    }

    const handleMenuListAdmin = () => {
        getUserMenu(user.adminMenus);
    }

    const handleMenuListTeam = () => {
        getUserMenu(user.managerMenus);
    }

    const moveToError = () => {
        history.push("../loginError");
    }
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
                    <li onClick={handleMenuListProfile}><a href="#profile"><User />My Profile</a></li>
                    {user.adminMenus !== null &&
<<<<<<< HEAD
                        <li onClick={handleMenuListAdmin}><a href="#"><UserPlus />Admin</a></li>
=======
                     <li onClick={handleMenuListAdmin}><a href="#admin"><UserPlus />Admin</a></li>
>>>>>>> e33d8feb71c7edc19106a0dc7b9d40e9cf759ae3
                        // <Fragment>

                        //     <li onClick={handleMenuListTeam}><a href="#javascript"><Users />My Team</a></li>
                        // </Fragment>
                    }
<<<<<<< HEAD
                    {user.managerMenus !== null &&
                        <li onClick={handleMenuListTeam}><a href="#"><Users />My Team</a></li>
=======
                    {user.managerMenus !== null && 
                        <li onClick={handleMenuListTeam}><a href="#team"><Users />My Team</a></li>
>>>>>>> e33d8feb71c7edc19106a0dc7b9d40e9cf759ae3
                    }
                    {/*  <li><a href="#javascript"><Settings />Settings</a></li> */}
                    {/* <li><a href="#javascript"><LogOut /> Log out</a></li> */}
                    <li><a href={loginUrl}><LogIn />Log In</a></li>
                    <li><a href="#javascript"><LogOut /> Log out</a></li>
                    {/* <li onClick={() => { moveToError() }}>Error</li> */}
                </ul>
            </li>
        </Fragment>
    );
};


export default UserMenu;