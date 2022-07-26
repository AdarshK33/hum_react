import React, { Fragment,useContext } from "react";
import { Home } from "react-feather";
import { Link } from "react-router-dom";
// import Bookmark from './bookmark';
import { PermissionContext } from "../../context/PermissionState";


const Breadcrumb = (props) => {
  const breadcrumb = props;
  const { rolePermission } = useContext(PermissionContext);
  return (
    <Fragment>
      <div className="container-fluid">
        <div className="page-header page-header-margin-top">
          <div className="row">
            <div className="col">
              <div className="page-header-left">
                <h3>{breadcrumb.title}</h3>
                <ol className="breadcrumb pull-right">
                  <li className="breadcrumb-item">
                   { rolePermission === "manager" || rolePermission === "admin"  ||rolePermission === "costCenterManager" ||rolePermission === "superCostCenterManager" ? (
                     <Link to={"/manager360"}>
                     <Home />
                   </Link>
                   ):(
                    <Link to="/employee360">
                    <Home />
                  </Link>
                   )}
                  </li>
                  <li className="breadcrumb-item">{breadcrumb.parent}</li>
                  {/* <li className="breadcrumb-item active">{breadcrumb.title}</li> */}
                </ol>
              </div>
            </div>
            {/* <!-- Bookmark Start--> */}
            {/* <Bookmark /> */}
            {/* <!-- Bookmark Ends--> */}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Breadcrumb;
