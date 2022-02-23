import React, { Fragment, useEffect, useContext, useState } from "react";
import { Form, Row, Button } from "react-bootstrap";
import Breadcrumb from "../common/breadcrumb";
import { LeaveContext } from "../../context/LeaveState";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { AdminContext } from "../../context/AdminState";
import SalaryHistory from "./SalaryHistory";
import { AppContext } from "../../context/AppState";
import "../Leaves/Leaves.css";
import MultiSelect from "react-multi-select-component";
import Select from "react-select";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PermissionContext } from "../../context/PermissionState";

const MasterHistory = () => {
  const [reportType, setReportType] = useState("");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [yearly, setYearly] = useState();
  const [leave, setLeave] = useState([]);
  const [costCenter, setCostCenter] = useState("");
  const [employeeCostCenter, setEmployeeCostCenter] = useState([]);
  const [stepCount, setStepNumber] = useState(0);
  const [dropDownData,setDropDownData] = useState([{
    name:"EMPLOYEE_CONTRACT_DETAILS",value:0
  },{name:"SALARY_HISTORY",value:1}])
  const { user } = useContext(AppContext);

  const reportTypeList = [
    { reportTypeData: "Monthly", id: 1 },
    { reportTypeData: "Yearly", id: 2 },
  ];

  const { getLeaveReport, leaveTypeReport, reportLeave, reportList } =
    useContext(LeaveContext);
  const { CostCenter, costCenterList, employeeIdData } =
    useContext(AdminContext);
  const { rolePermission } = useContext(PermissionContext);
  useEffect(() => {
    CostCenter();
  }, []);

  var previousYear = new Date().getFullYear() - 1;

  var nextYear = new Date().getFullYear() + 1;

  useEffect(() => {
    if (
      rolePermission !== "admin" &&
      rolePermission !== "superCostCenterManager"
    ) {
      setCostCenter(user.costCentre);
      employeeIdData(user.costCentre);
      console.log("data1", user.costCentre);
    }
  }, [user.costCentre, user.loginType]);

  useEffect(() => {
    getLeaveReport();
  }, []);

  const setCostCenterHandler = (options) => {
    let data1 = options !== null ? options.value : "";
    setCostCenter(options);
    employeeIdData(data1);
    console.log("data1", data1);
  };
  const setEmployeeCostCenterHandler = (options) => {
    setEmployeeCostCenter(options);
    setStepNumber(options[0].value)
    console.log("options", options);
  };
  const fromDateHandler = (date) => {
    let value = date;
    console.log("fromDate", value);
    setStartDate(value);
  };

  const toDateHandler = (date) => {
    let value1 = date;
    console.log("toDate", value1);
    setEndDate(value1);
  };

  const setLeaveHandler = (options) => {
    setLeave(options);
  };

  const setReportTypeHandler = (e) => {
    setReportType(e.target.value);
    setStartDate();
    setEndDate();
  };

  const validation = () => {
    let flag = true;
    if (costCenter === "") {
      toast.error("Select Cost Center");
      flag = false;
      return;
    }
    if (leave.length === 0) {
      toast.error("Select Leave Category");
      flag = false;
      return;
    }
    if (employeeCostCenter.length === 0) {
      toast.error("Select Employee Id");
      flag = false;
      return;
    }

    return flag;
  };

  const submitData = (e) => {
    e.preventDefault();
    const validate = validation();
    let leaveIds = [];
    for (let i = 0; i < leave.length; i++) {
      if (leave[i].value === 1) {
        leaveIds.push(0);
        leaveIds.push(leave[i].value);
      } else {
        leaveIds.push(leave[i].value);
      }
    }
    console.log("leaveIds", leaveIds);

    const reportData = {
      employeeIds: employeeCostCenter.map(
        (e, i) => employeeCostCenter[i].value
      ),
      fromDate:
        reportType === "Monthly"
          ? moment(startDate).format("YYYY-MM-DD")
          : "string",
      leaveTypeIds: leaveIds,
      toDate:
        reportType === "Monthly"
          ? moment(endDate).format("YYYY-MM-DD")
          : "string",
      year: reportType === "Monthly" ? "string" : yearly,
    };
    /*  const yearReportData = {
            employeeIds:  employeeCostCenter.map((e,i) => employeeCostCenter[i].value),
            fromDate: 'string',
            leaveTypeIds: leaveIds,
            toDate: 'string',
            year: yearly
        } */
    if (validate) {
      reportLeave(reportData);
    }

    /*  if(reportType === 'Monthly' ){
            console.log("leaveTypeIds",monthReportData)
            reportLeave(monthReportData)
        }
        if(reportType === 'Yearly'){
            reportLeave(yearReportData)
        } */

    setReportType("");
    setCostCenter(costCenter);
    setEmployeeCostCenter([]);
    /* setStartDate()
        setEndDate() */
    setLeave([]);
  };
  return (
    <Fragment>
      <Breadcrumb title="Master History" parent="Master History" />
      <div className="container-fluid">
        <Form onSubmit={submitData}>
          <Row>
            <div className="col-sm-4">
              <Form.Group>
                <Form.Label>Employee Id</Form.Label>{" "}
                <span style={{ color: "red" }}>*</span>
                 {/* <Select
                                name="filters"
                                placeholder="Select Employee Id"
                                value={employeeCostCenter} 
                                style={{fontSize:"0.8rem"}}
                                options={dropDownData !== null  ?
                                 dropDownData.map(e => ({label: e.firstName + " - " + e.employeeId, value: e.employeeId})):[]}
                                onChange={setEmployeeCostCenterHandler}
                                isMulti required isSearchable /> */}
                <MultiSelect
                  options={
                    dropDownData !== null
                      ? dropDownData.map((e) => ({
                          label: e.name,
                          value: e.value,
                        }))
                      : []
                  }
                  value={employeeCostCenter}
                  onChange={setEmployeeCostCenterHandler}
                  labelledBy={"Select Employee Id"}
                  disableSearch={false}
                />
              </Form.Group>
            </div>
            <div className="col-sm-4">
          <Button type="submit" className="submitButton" >
            Search
          </Button>
          </div>
          </Row>
        </Form>
      </div>
      {/* <SalaryHistory
        AdminReportList={reportList}
        startDate={startDate}
        endDate={endDate}
      /> */}
        {(() => {
                          switch (stepCount) {
                            case 1:
                              return (
                                <SalaryHistory
                                />
                              );
                           
                          }
                        })()}
    </Fragment>
  );
};

export default MasterHistory;
