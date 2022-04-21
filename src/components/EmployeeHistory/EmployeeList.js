import React, { Fragment, useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../common/breadcrumb";
import { Container, Form, Row, Col, Table, Button } from "react-bootstrap";
import { Edit2, Eye, Search, AlertCircle,LogOut } from "react-feather";
import { EmployeeHistoryContext } from "../../context/EmployeeHistoryState";
import Pagination from "react-js-pagination";
import DatePicker from "react-datepicker";
import ActiveEmployeeHistoryList from "./ActiveEmployeeHistoryList"
import InActiveEmployeeHistoryList from "./InActiveEmployeeHistoryList"
import "react-confirm-alert/src/react-confirm-alert.css";
import "./EmployeeHistory.css";
import moment from "moment";
import { AdminContext } from "../../context/AdminState";
import { AppContext } from "../../context/AppState";
import { PermissionContext } from "../../context/PermissionState";

const EmployeeList = (props) => {
  const {
    ViewEmployeeHistoryData,
    employeeHistoryData,
    loader,
    total,
  } = useContext(EmployeeHistoryContext);
  const { rolePermission } = useContext(PermissionContext);
  const { user } = useContext(AppContext);
  const [pageCount, setPageCount] = useState(0);
  const [stepCount, setStepNumber] = useState(1);
  const [currentRecords, setCurrentRecords] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [role, setRole] = useState(0);
  const [activeStatus, setActiveStatus] = useState(true);

  /*-----------------Pagination------------------*/


  useEffect(() => {
    if (rolePermission == "superCostCenterManager") {
      setRole(1);
    } else {
      setRole(0);
    }
  }, [rolePermission]);


  return (
    <Fragment>
      <Breadcrumb title="EMPLOYEE LIST" parent="EMPLOYEE LIST" />
      <Container fluid>
        <Row>
          <Col sm={12}>
          <Row>
              <Col sm={4} style={{paddingTop:"29px",paddingLeft:"50px"}} >
              </Col>
              <Col sm={2} style={{paddingTop:"29px",paddingLeft:"50px"}} >
              <Button name="active" value={1} onClick={(e)=>setStepNumber(parseInt(1))} className="submitButton">
            Active Employees
          </Button>
              </Col>
              <Col sm={4} style={{paddingTop:"29px",paddingLeft:"50px"}} >
              <Button name="inactive" value={0} onClick={(e)=>setStepNumber(parseInt(0))} className="submitButton">
              Inactive Employees
          </Button>
              </Col>
              <Col sm={4} style={{paddingTop:"29px",paddingLeft:"50px"}} >
              </Col>
            </Row>
                        </Col>
        </Row>
      </Container>
      {(() => {
                          switch (parseInt(stepCount)) {
                              case 1:
                                return (
                                  <ActiveEmployeeHistoryList />
                                );
                                case 0:
                                return (
                                  <InActiveEmployeeHistoryList />
                                );
                                default:
                                  return (
                                  <ActiveEmployeeHistoryList />
                                )
                          }
                        })()}

    </Fragment>
  );
};

export default EmployeeList;
