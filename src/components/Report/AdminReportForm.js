import React, { Fragment, useEffect, useContext, useState } from "react";
import { Form, Row, Button } from "react-bootstrap";
import Breadcrumb from "../common/breadcrumb";
import { LeaveContext } from "../../context/LeaveState";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { AdminContext } from "../../context/AdminState";
import AdminReportView from "./AdminReportView";
import { AppContext } from "../../context/AppState";
import "../Leaves/Leaves.css";
import MultiSelect from "react-multi-select-component";
import Select from "react-select";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PermissionContext } from "../../context/PermissionState";

const AdminReportForm = () => {
  const [reportType, setReportType] = useState("");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [yearly, setYearly] = useState();
  const [leave, setLeave] = useState([]);
  const [costCenter, setCostCenter] = useState("");
  const [employeeCostCenter, setEmployeeCostCenter] = useState([]);
  const { user,fetchemployeeData } = useContext(AppContext);

  const reportTypeList = [
    { reportTypeData: "Monthly", id: 1 },
    { reportTypeData: "Yearly", id: 2 },
  ];

  const { getLeaveReport, leaveTypeReport, reportLeave, reportList } =
    useContext(LeaveContext);
  const { CostCenter, costCenterList, employeeIdData, employeeIdList } =
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
      setCostCenter(fetchemployeeData.costCentre);
      employeeIdData(fetchemployeeData.costCentre);
      console.log("data1", fetchemployeeData.costCentre);
    }
  }, [fetchemployeeData.costCentre, user.loginType]);

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
      <Breadcrumb title="Report" parent="Leave Report" />
      <div className="container-fluid">
        <Form onSubmit={submitData}>
          <Row>
            <div className="col-sm-4">
              <Form.Group>
                <Form.Label>Type of report</Form.Label>
                <Form.Control
                  as="select"
                  onChange={(e) => setReportTypeHandler(e)}
                  value={reportType}
                  required
                >
                  <option value="">Select Report Type</option>
                  {reportTypeList.map((item, i) => {
                    return (
                      <option key={item.id} value={item.reportTypeData}>
                        {item.reportTypeData}
                      </option>
                    );
                  })}
                </Form.Control>
              </Form.Group>
            </div>
            {rolePermission == "admin" ||
            rolePermission == "superCostCenterManager" ? (
              <div className="col-sm-4">
                <Form.Group>
                  <Form.Label>Cost Center</Form.Label>{" "}
                  <span style={{ color: "red" }}>*</span>
                  {/* <Form.Control as="select" required value={costCenter}
                                 onChange={(e) => setCostCenterHandler(e)} data-live-search="true" >
                                    <option value=''>Select Cost Center</option>
                                    <option value='all'>All</option>
                                    {costCenterList.length > 0 && costCenterList.map((item, i) => {
                                            return (
                                                <option key={item.costCenterId} value={item.costCentreName}>
                                                {item.costCentreName}</option>
                                            )
                                        })
                                        }
                                </Form.Control> */}
                  <Select
                    name="filters"
                    placeholder="Select Cost Center"
                    value={costCenter}
                    style={{ fontSize: "0.8rem" }}
                    options={
                      costCenterList !== null
                        ? costCenterList.map((e) => ({
                            label: e.costCentreName,
                            value: e.costCentreName,
                          }))
                        : []
                    }
                    onChange={setCostCenterHandler}
                    required={true}
                    isSearchable
                  />
                </Form.Group>
              </div>
            ) : (
              <div className="col-sm-4">
                <Form.Group>
                  <Form.Label>Cost Center </Form.Label>
                  <Form.Control
                    type="text"
                    disabled
                    value={costCenter}
                    onChange={(e) => setCostCenter(e.targrt.value)}
                  />
                </Form.Group>
              </div>
            )}
          </Row>
          <Row>
            <div className="col-sm-4">
              <Form.Group>
                <Form.Label>Employee Id</Form.Label>{" "}
                <span style={{ color: "red" }}>*</span>
                {/*  <Select
                                name="filters"
                                placeholder="Select Employee Id"
                                value={employeeCostCenter} 
                                style={{fontSize:"0.8rem"}}
                                options={employeeIdList !== null  ?
                                 employeeIdList.map(e => ({label: e.firstName + " - " + e.employeeId, value: e.employeeId})):[]}
                                onChange={setEmployeeCostCenterHandler}
                                isMulti required isSearchable /> */}
                <MultiSelect
                  options={
                    employeeIdList !== null
                      ? employeeIdList.map((e) => ({
                          label: e.firstName + " - " + e.employeeId,
                          value: e.employeeId,
                        }))
                      : []
                  }
                  value={employeeCostCenter}
                  onChange={setEmployeeCostCenterHandler}
                  labelledBy={"Select Employee Id"}
                  hasSelectAll={true}
                  disableSearch={false}
                />
              </Form.Group>
            </div>
            <div className="col-sm-4">
              <Form.Group>
                <Form.Label>Leave Category</Form.Label>{" "}
                <span style={{ color: "red" }}>*</span>
                {/*  <Select
                                name="filters"
                                placeholder="Select Leave Type"
                                value={leave} 
                                style={{fontSize:"0.8rem"}}
                                options={leaveTypeReport !== undefined && leaveTypeReport.map(e => ({label: e.leaveName , value: e.leaveTypeId}))}
                                onChange={setLeaveHandler}
                                isMulti required /> */}
                <MultiSelect
                  options={
                    leaveTypeReport !== undefined &&
                    leaveTypeReport.map((e) => ({
                      label: e.leaveName,
                      value: e.leaveTypeId,
                    }))
                  }
                  value={leave}
                  onChange={setLeaveHandler}
                  labelledBy={"Select Leave Type"}
                  hasSelectAll={true}
                  disableSearch={false}
                />
              </Form.Group>
            </div>
          </Row>
          {reportType === "Monthly" && (
            <Row>
              <div className="col-sm-4">
                <Form.Group>
                  <Form.Label>From Date</Form.Label>{" "}
                  <span style={{ color: "red" }}>*</span>
                  <div>
                    <DatePicker
                      selected={startDate}
                      onChange={(e) => fromDateHandler(e)}
                      className="form-control"
                      dateFormat="yyyy-MM-dd"
                      /*  minDate={currentYear} */
                      placeholderText="From Date"
                      required
                    />
                  </div>
                </Form.Group>
              </div>
              <div className="col-sm-4">
                <Form.Group>
                  <Form.Label>To Date</Form.Label>{" "}
                  <span style={{ color: "red" }}>*</span>
                  <div>
                    <DatePicker
                      selected={endDate}
                      onChange={(e) => toDateHandler(e)}
                      className="form-control"
                      dateFormat="yyyy-MM-dd"
                      minDate={startDate}
                      placeholderText="To Date"
                    />
                  </div>
                </Form.Group>
              </div>
            </Row>
          )}
          {reportType === "Yearly" && (
            <Row>
              <div className="col-sm-4">
                <Form.Group>
                  <Form.Label>Select Year</Form.Label>{" "}
                  <span style={{ color: "red" }}>*</span>
                  <Form.Control
                    type="number"
                    placeholder="YYYY"
                    min={previousYear}
                    max={nextYear}
                    className="form-control digit"
                    required
                    onChange={(e) => setYearly(e.target.value)}
                    value={yearly || ""}
                  />
                </Form.Group>
              </div>
            </Row>
          )}
          <Button type="submit" className="submitButton">
            Submit
          </Button>
        </Form>
      </div>
      <AdminReportView
        AdminReportList={reportList}
        startDate={startDate}
        endDate={endDate}
      />
    </Fragment>
  );
};

export default AdminReportForm;
