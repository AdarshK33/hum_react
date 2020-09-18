import React, { Fragment } from 'react';
import Breadcrumb from '../../common/breadcrumb';
import './default.css';
import Dashboard from '../dashboard';

const Default = () => {

    return (
        <Fragment>
            <Breadcrumb parent="Dashboard" title="Default" />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-header">
                                {/* <h5>Dashboard</h5><span>lorem ipsum dolor sit amet, consectetur adipisicing elit</span> */}
                                <Dashboard />
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Default;


