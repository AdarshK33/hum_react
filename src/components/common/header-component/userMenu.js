import React, { Fragment, useContext } from 'react';
import man from '../../../assets/images/dashboard/userImage.png';
import { User, Mail, Lock, Settings, LogOut, LogIn, Users, UserPlus } from 'react-feather';
import { AppContext } from "../../../context/AppState";
import { useHistory } from "react-router-dom";

const loginUrl = `${process.env.REACT_APP_FEDID_AUTH_URL}?response_type=code&client_id=${process.env.REACT_APP_FEDID_CLIENTID}&scope=openid%20profile&redirect_uri=${process.env.REACT_APP_REDIRECT_URL}`;
const UserMenu = () => {
    const { user, getUserMenu } = useContext(AppContext);
    let history = useHistory();

    const handleMenuListProfile = () => {
        getUserMenu(user.generalUserMenus, "profile", user);
        history.push("/dashboard/storedashboard");
    }

    const handleMenuListAdmin = () => {
        getUserMenu(user.adminMenus);
        history.push("/dashboard/storedashboard");
    }

    const handleMenuListTeam = () => {
        getUserMenu(user.managerMenus);
        history.push("/dashboard/storedashboard");
    }

    const handleMenuListCluster = () => {
        getUserMenu(user.clusterManagerMenus);
        history.push("/dashboard/storedashboard");
    }

    const gotoProfilePage = () => {
        window.location.href = "../profileEdit"
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
                        <li onClick={handleMenuListAdmin}><a href="#admin"><UserPlus />Admin</a></li>
                        // <Fragment>

                        //     <li onClick={handleMenuListTeam}><a href="#javascript"><Users />My Team</a></li>
                        // </Fragment>
                    }
                    {user.managerMenus !== null &&
                        <li onClick={handleMenuListTeam}><a href="#team"><Users />My Team</a></li>
                    }
                    {user.clusterManagerMenus !== null &&
                        <li onClick={handleMenuListCluster}><a href="#cluster"><Users />Cluster Leader</a></li>
                    }
                    {/*  <li><a href="#javascript"><Settings />Settings</a></li> */}
                    {/* <li><a href="#javascript"><LogOut /> Log out</a></li> */}
                    <li><a href={loginUrl}><LogIn />Log In</a></li>
                    <li onClick={gotoProfilePage}><a href="#profile">Profile Edit</a></li>
                    <li><a href="#javascript"><LogOut /> Log out</a></li>
                </ul>
            </li>
        </Fragment>
    );
};


export default UserMenu;
