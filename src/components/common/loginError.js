import React, { Fragment } from 'react';
import sad from '../../assets/images/other-images/sad.png';
import { Link } from 'react-router-dom';

const LoginError = () => {
    return (
        <Fragment>
            <div className="page-wrapper">

                <div className="error-wrapper">
                    <div className="container"><img className="img-100" src={sad} alt="" />
                        <div className="error-heading">

                        </div>
                        <div className="col-md-8 offset-md-2">
                            <p className="sub-content">Please enter the valid crediential </p>
                        </div>
                        <div><Link to={`${process.env.PUBLIC_URL}/dashboard/default`} className="btn btn-info-gradien"> BACK TO HOME PAGE</Link></div>
                    </div>
                </div>

            </div>
        </Fragment>
    );
};

export default LoginError;