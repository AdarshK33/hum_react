import React, { Fragment, useContext } from 'react';
import man from '../../../assets/images/dashboard/userImage.png';
import { User, Mail, Lock, Settings, LogOut, LogIn, Users, UserPlus } from 'react-feather';
import { AppContext } from "../../../context/AppState";

const loginUrl = `${process.env.REACT_APP_FEDID_AUTH_URL}?response_type=code&client_id=${process.env.REACT_APP_FEDID_CLIENTID}&scope=openid%20profile&redirect_uri=${process.env.REACT_APP_REDIRECT_URL}`;
const UserMenu = () => {
    const { user, getUserMenu } = useContext(AppContext);

    const handleMenuListProfile = () => {
        getUserMenu(user.generalUserMenus);
    }

    const handleMenuListAdmin = () => {
        getUserMenu(user.adminMenus);
    }

    const handleMenuListTeam = () => {
        getUserMenu(user.managerMenus);
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
                    <li onClick={handleMenuListProfile}><a href="#"><User />My Profile</a></li>
                    {user.adminMenus !== null &&
                     <li onClick={handleMenuListAdmin}><a href="#"><UserPlus />Admin</a></li>
                        // <Fragment>
                           
                        //     <li onClick={handleMenuListTeam}><a href="#javascript"><Users />My Team</a></li>
                        // </Fragment>
                    }
                    {user.managerMenus !== null && 
                        <li onClick={handleMenuListTeam}><a href="#"><Users />My Team</a></li>
                    }
                    {/*  <li><a href="#javascript"><Settings />Settings</a></li> */}
                    {/* <li><a href="#javascript"><LogOut /> Log out</a></li> */}
                    <li><a href={loginUrl}><LogIn />Log In</a></li>
                    <li><a href="#javascript"><LogOut /> Log out</a></li>
                </ul>
            </li>
        </Fragment>
    );
};


export default UserMenu;