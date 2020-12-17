import React from 'react';
import Header from './common/header-component/header';
import Sidebar from './common/sidebar-component/sidebar';
import "./common/style.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppContext } from "../context/AppState";
import Cookies from "js-cookie";
import { UserManager } from 'oidc-client';
const AppLayout = ({ children }) => {

    const { authenticateUser, getUserInfo, state, getUserMenu, flag, app } = useContext(AppContext);
    const [flagValue, setFlagValue] = useState();
    const [menuItems, setMenuItems] = useState();
    const loginUrl = `${process.env.REACT_APP_FEDID_AUTH_URL}?response_type=code&client_id=${process.env.REACT_APP_FEDID_CLIENTID}&scope=openid%20profile&redirect_uri=${process.env.REACT_APP_REDIRECT_URL}`;

    const config = {
      authority: "https://preprod.idpdecathlon.oxylane.com",
      client_id: "C8e09d8bc792c0cd24b470d9e67f3ded5322882e1",
      redirect_uri: window.location.origin,
      response_type: "code",
      scope: "openid profile",
      filterProtocolClaims: true,
      loadUserInfo: true,
    };
    const userManager = new UserManager(config);

    useEffect(() => {
        // checkTokenExists()
        // setFlagValue(flag)
    //   userManager.signinRedirect();
    userManager.signinRedirectCallback().then(resp => console.log(resp, 'signinRedirectCallback'))
    //   userManager.signinRedirectCallback().then(user => {
    //     console.log(user, 'found user');
    //   }).catch(e => console.log(e));

    }, []);
    useEffect(() => {
        const { MENUITEMS, flag, user } = state
        setMenuItems(MENUITEMS);
        let type = localStorage.getItem('type')
        if (flag === 0 && MENUITEMS !== []) {
            setFlagValue(flag)
            if (type === "team") {
                getUserMenu(user.managerMenus);
            } else if (type === "admin") {
                getUserMenu(user.adminMenus);
            } else if (type === "leader") {
                getUserMenu(user.clusterManagerMenus);
            } else {
                getUserMenu(user.generalUserMenus, "profile", user);
                localStorage.setItem('flag', "0")
            }
        }
    }, [window.location.href, state])

    useEffect(() => {
        setMenuItems(state.MENUITEMS);
    }, [state.MENUITEMS]);

    const checkTokenExists = () => {
        console.log("APP RESULT " + app.isLoggedin);
        // console.log("ALL TOKENS "+Cookies.get());
        let access_token = Cookies.get('APPAT');

        if (access_token) {
            authenticateUser(true)
            getUserInfo()
            console.log("login valid")
        }
        else {
            authenticateUser(false)
            console.log("Invalid Login")
            window.location.href = loginUrl
        }
    }
    return (
        <div>

            <div className="page-wrapper">
                <div className="page-body-wrapper">
                    {
                        app.isLoggedin ?
                            <div>
                                <Header />
                                {menuItems !== null && menuItems !== undefined ?
                                    <Sidebar MENUITEMS={menuItems} />
                                    : ""}
                                <div className="page-body">
                                    {children}


                                </div>
                            </div>
                            : <Loader />
                    }

const AppLayout = ({children}) => {
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