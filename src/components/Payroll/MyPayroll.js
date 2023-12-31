import React, {
  Fragment,
  useState,
  useContext,
  useEffect,
  useRef,
} from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import Breadcrumb from "../common/breadcrumb";
import { PayrollContext } from "../../context/PayrollState";
import DropDowns from "./DropDowns";
import { PermissionContext } from "../../context/PermissionState";

const MyPayroll = (props) => {
  const { rolePermission } = useContext(PermissionContext);
  const { setManagerFlag, managerFlag } = useContext(PayrollContext);
  const [docType, setDocType] = useState("");
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Fragment>
      <Breadcrumb title="MY PAYROLL" parent="MY PAYROLL" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card" style={{ borderRadius: "1rem" }}>
              <div>
                <div className="OnBoardHeading" style={{ padding: "5px" }}>
                  <b>MY PAYROLL</b>
                </div>
                <div>
                  <Row className="mt-3 ml-4">
                    <div
                      className="tabsHeading"
                      style={{ marginBottom: "1rem" }}
                    >
                      <div
                        className={tabIndex === 0 ? "activeTab" : "disabledTab"}
                        onClick={(e) => setTabIndex(0)}
                      >
                        <label style={{ paddingTop: "5px" }}>
                          Payroll Till Sept 2021
                        </label>
                      </div>
                      <div
                        className={tabIndex === 1 ? "activeTab" : "disabledTab"}
                        onClick={(e) => setTabIndex(0)}
                      >
                        <a href="https://idpdecathlon.oxylane.com/idp/startSSO.ping?PartnerSpId=ADPIND" target="_blank">
                        <label style={{ paddingTop: "5px" }}>
                          Payroll After Sept 2021
                        </label>
                        </a>
                      </div>
                    </div>

                    <div style={{ width: "100%", height: "100%" }}>
                      {(() => {
                        switch (tabIndex) {
                          case 0:
                            return <DropDowns />;
                          case 1:
                            return <h1>ADP</h1>;

                          default:
                            return <div>nothing</div>;
                        }
                      })()}
                    </div>
                  </Row>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default MyPayroll;
