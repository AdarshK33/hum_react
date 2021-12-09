import React, { Fragment, useState, useContext, useEffect } from "react";

import {
  Button,
  Container,
  Modal,
  Row,
  Col,
  Form,
  Table,
} from "react-bootstrap";
import Breadcrumb from "../common/breadcrumb";

import { PermissionContext } from "../../context/PermissionState";

// import { handleInputChange } from "react-select/src/utils";

const AdminDocVerfication = () => {
  const [isChecked, changeState] = useState(false);
  const [showModal, setModal] = useState(false);
  const [remarks, setremarks] = useState("");
  const [docId, setdocId] = useState("");
  const [error, setError] = useState(false);
  const [state, setState] = useState({});
  const [pfData, setPFData] = useState({});
  const [onBoardPopup, setOnboardPopup] = useState(false);
  const [UANYes, setYes] = useState(false);
  const [UANNo, setNo] = useState(false);
  const [uanNumber, setUanNumber] = useState();
  const [uanError, setUanError] = useState(false);
  const [uanValueError, setUanValueError] = useState(false);
  const [shiftingTheStatus, setShiftingTheStatus] = useState("");
  const [disApproveTheStatus, setDisApproveTheStatus] = useState("");
  const [docType, setDocType] = useState("");

  const { rolePermission } = useContext(PermissionContext);

  return (
    <Fragment>
      <Breadcrumb
        title="EMPLOYEE DOCUMENT VERFICATION"
        parent="EMPLOYEE DOCUMENT VERFICATIONE"
      />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card" style={{ borderRadius: "1rem" }}>
              <div className="OnBoardHeading">
                <strong>EMPLOYEE DOCUMENT VERFICATION </strong>
              </div>
              <div
                style={{
                  marginTop: "2rem",
                }}
              ></div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  height: "40px",
                  backgroundColor: "#006ebb",
                  color: "white",
                }}
              >
                <div>
                  <label style={{ marginLeft: "1rem" }}>
                    <strong>Document Name</strong>
                  </label>
                </div>
                <div>
                  <label>
                    <strong>Old Document</strong>{" "}
                  </label>
                </div>

                <div>
                  <label>
                    <strong>New Document</strong>
                  </label>
                </div>
                <div>
                  <label>
                    <strong>Status</strong>
                  </label>
                </div>
                <div>
                  <label style={{ marginRight: "1rem" }}>
                    <strong>Remarks</strong>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default AdminDocVerfication;
