import React, { Fragment } from 'react';
import Breadcrumb from '../common/breadcrumb';

const Samplepage = () => {
    //sample page
    return (
        <Fragment>
            <Breadcrumb title="Sample Page" parent="Sample Page" />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-header">
                                <h5>Profile Edit</h5>
                            </div>
                            <div className="card-body">
                                <p>"you can edit here..."</p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Samplepage;