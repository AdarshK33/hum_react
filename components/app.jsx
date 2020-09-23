import React from 'react';
import Header from './common/header-component/header';
import Sidebar from './common/sidebar-component/sidebar';
import "./common/style.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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