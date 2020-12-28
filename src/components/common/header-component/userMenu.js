import React, { Fragment, useContext, useEffect } from 'react';
import man from '../../../assets/images/dashboard/userImage.png';
import { User, Mail, Lock, Settings, LogOut, LogIn, Users, UserPlus } from 'react-feather';
import { AppContext } from "../../../context/AppState";
import { useHistory } from "react-router-dom";
import TicketListingPage from '../../support/ticketListingPage'
import { PermissionContext } from '../../../context/PermissionState'

const loginUrl = `${process.env.REACT_APP_FEDID_AUTH_URL}?response_type=code&client_id=${process.env.REACT_APP_FEDID_CLIENTID}&scope=openid%20profile&redirect_uri=${process.env.REACT_APP_REDIRECT_URL}`;
const UserMenu = () => {
    const { user, getUserMenu, userLogout } = useContext(AppContext);
    const { viewServiceGroup, groupList } = useContext(PermissionContext)
    let history = useHistory();

    useEffect(() => {
        viewServiceGroup()
    }, [])

    const handleMenuListProfile = () => {
        getUserMenu(user.generalUserMenus, "profile", user);
        localStorage.setItem('type', "profile")
        localStorage.setItem('flag', "0")
        history.push("/dashboard/storedashboard");
    }

    const handleMenuListAdmin = () => {
        getUserMenu(user.adminMenus);
        localStorage.setItem('type', "admin")
        localStorage.setItem('flag', "0")
        history.push("/dashboard/storedashboard");
    }

    const handleMenuListTeam = () => {
        getUserMenu(user.managerMenus);
        localStorage.setItem('type', "team")
        localStorage.setItem('flag', "0")
        history.push("/dashboard/storedashboard");
    }

    const handleMenuListCluster = () => {
        getUserMenu(user.clusterManagerMenus);
        localStorage.setItem('type', "leader")
        localStorage.setItem('flag', "1")
        history.push("/dashboard/storedashboard");
    }

    const TicketListingPage = () => {
        history.push("/ticketlistingpage");
    }

    // const gotoProfilePage = () => {
    //     window.location.href = "../profileEdit"
    // }







    return (
        <Fragment>
            <li className="onhover-dropdown">
                <div className="media align-items-center">
                    <img className="align-self-center pull-right img-50 rounded-circle blur-up lazyloaded" src={man} alt="header-user" />
                    {/* <div className="dotted-animation">
                        <span className="animate-circle"></span>
                        <span className="main-circle"></span>
                    </div> */}
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
                        <li onClick={handleMenuListCluster}><a href="#leader"><Users />Cluster Leader</a></li>
                    }
                    {groupList !== null && groupList.groupStatus === 0 ?
                        <li onClick={TicketListingPage}><a><Users />Support</a></li>
                        : ''}
                    {/*  <li><a href="#javascript"><Settings />Settings</a></li> */}
                    {/* <li><a href="#javascript"><LogOut /> Log out</a></li> */}
                    {/* <li><a href={loginUrl}><LogIn />Log In</a></li> */}
                    {/* <li onClick={gotoProfilePage}><a href="#profile">Profile Edit</a></li> */}
                    <li onClick={() => { userLogout() }}><a href="#javascript"><LogOut /> Log out</a></li>
                </ul>
            </li>
        </Fragment>
    );
};


export default UserMenu;
