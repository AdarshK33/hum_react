import React, { Fragment, useEffect, useContext, useState } from "react";
import { Form, Row, Button } from "react-bootstrap";
import Breadcrumb from "../common/breadcrumb";
import { AdminContext } from "../../context/AdminState";
import { ClusterContext } from "../../context/ClusterState";
import { RosterContext } from "../../context/RosterState";
import { LeaveContext } from "../../context/LeaveState";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import ProductivityReportView from "./ProductivityReportView";
import { AppContext } from "../../context/AppState";
import "../Leaves/Leaves.css";
import MultiSelect from "react-multi-select-component";
import { PermissionContext } from "../../context/PermissionState";

const ProductivityReportForm = () => {
  const [reportType, setReportType] = useState("");
  const [costCenter, setCostCenter] = useState([]);
  const [employeeCostCenter, setEmployeeCostCenter] = useState([]);
  const [sports, setSports] = useState([]);
  const [cluster, setCluster] = useState([]);
  const [contractTypeData, setContractType] = useState([]);
  const [getM, setGetM] = useState("");
  const [yearly, setYearly] = useState(new Date());
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const { user,fetchemployeeData } = useContext(AppContext);

  const reportTypeList = [
    { reportTypeData: "Monthly", id: 1 },
    { reportTypeData: "Yearly", id: 2 },
  ];
  const { CostCenter, costCenterList, employeeIdData, employeeIdList } =
    useContext(AdminContext);
  const {
    viewSports,
    sportsNames,
    clusterCostCenterList,
    viewClusterCostCenter,
  } = useContext(ClusterContext);
  const { viewContractTypes, shiftContractNames } = useContext(RosterContext);
  const { productivityReport, productivityList } = useContext(LeaveContext);
  const { rolePermission } = useContext(PermissionContext);
  useEffect(() => {
    viewSports();
    viewContractTypes();
    CostCenter();
  }, []);

  var previousYear = new Date().getFullYear() - 1;
  var nextYear = new Date().getFullYear() + 1;

  console.log("previousYear", previousYear);
  console.log("nextYear", nextYear);

  useEffect(() => {
    if (
      rolePermission !== "admin" &&
      rolePermission !== "superCostCenterManager"
    ) {
      setCostCenter(fetchemployeeData.costCentre);
      employeeIdData(fetchemployeeData.costCentre);
      viewClusterCostCenter(fetchemployeeData.costCentre);
      console.log("data1", fetchemployeeData.costCentre);
    }
  }, [fetchemployeeData.costCentre, fetchemployeeData.loginType]);

  const setCostCenterHandler = (options) => {
    let data1 = options !== null ? options.map((e, i) => options[i].value) : [];
    setCostCenter(options);
    employeeIdData(data1);
    viewClusterCostCenter(data1);
    console.log("options in cost center", data1);
  };

  const setEmployeeCostCenterHandler = (options) => {
    setEmployeeCostCenter(options);
    console.log("options", options);
  };
  const setContractTypeHandler = (options) => {
    setContractType(options);
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
  const setClusterHandler = (options) => {
    setCluster(options);
  };
  const setSportsHandler = (options) => {
    setSports(options);
    console.log("sports", options);
  };
  const submitData = (e) => {
    e.preventDefault();
    let reportData = {};
    let storeId = [];
    storeId.push(costCenter);
    if (
      rolePermission !== "admin" &&
      rolePermission !== "superCostCenterManager"
    ) {
      reportData = {
        clusterIds:
          cluster.length > 0 ? cluster.map((e, i) => cluster[i].value) : null,
        contractTypes:
          contractTypeData.length > 0
            ? contractTypeData.map((e, i) => contractTypeData[i].value)
            : null,
        employeeIds:
          employeeCostCenter.length > 0
            ? employeeCostCenter.map((e, i) => employeeCostCenter[i].value)
            : null,
        /* month: reportType === 'Monthly' ? moment(getM, ["YYYY-MM"]).format("M") : 0, */
        endDate:
          reportType === "Monthly" ? moment(endDate).format("YYYY-MM-DD") : 0,
        sportIds:
          sports.length > 0 ? sports.map((e, i) => sports[i].value) : null,
        startDate:
          reportType === "Monthly" ? moment(startDate).format("YYYY-MM-DD") : 0,
        storeIds: storeId,
        year: reportType === "Monthly" ? 0 : yearly,
      };
    } else {
      reportData = {
        clusterIds:
          cluster.length > 0 ? cluster.map((e, i) => cluster[i].value) : null,
        contractTypes:
          contractTypeData.length > 0
            ? contractTypeData.map((e, i) => contractTypeData[i].value)
            : null,
        employeeIds:
          employeeCostCenter.length > 0
            ? employeeCostCenter.map((e, i) => employeeCostCenter[i].value)
            : null,
        /*  month: reportType === 'Monthly' ? moment(getM, ["YYYY-MM"]).format("M") : 0, */
        endDate:
          reportType === "Monthly" ? moment(endDate).format("YYYY-MM-DD") : 0,
        sportIds:
          sports.length > 0 ? sports.map((e, i) => sports[i].value) : null,
        startDate:
          reportType === "Monthly" ? moment(startDate).format("YYYY-MM-DD") : 0,
        storeIds:
          costCenter.length > 0
            ? costCenter.map((e, i) => costCenter[i].value)
            : null,
        year: reportType === "Monthly" ? 0 : yearly,
      };
    }

    console.log("productivity data", reportData);
    productivityReport(reportData);

    setReportType("");

    setEmployeeCostCenter([]);
    setSports([]);
    setCluster([]);
    setContractType([]);
    setGetM("");
  };
  return (
    <Fragment>
      <Breadcrumb title="Report" parent="Productivity Report" />
      <div className="container-fluid">
        <Form onSubmit={submitData}>
          <Row>
            <div className="col-sm-4">
              <Form.Group>
                <Form.Label>Type of report</Form.Label>
                <Form.Control
                  as="select"
                  onChange={(e) => setReportType(e.target.value)}
                  value={reportType}
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
                  <Form.Label>Cost Center </Form.Label>
                  <MultiSelect
                    options={
                      costCenterList !== null
                        ? costCenterList.map((e) => ({
                            label: e.costCentreName,
                            value: e.costCentreName,
                          }))
                        : []
                    }
                    value={costCenter}
                    onChange={setCostCenterHandler}
                    labelledBy={"Select"}
                    hasSelectAll={true}
                    disableSearch={false}
                  />
                </Form.Group>
              </div>
            ) : (
              <div className="col-sm-4">
                <Form.Group>
                  <Form.Label>Cost Center</Form.Label>
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
                <Form.Label>Employee Id</Form.Label>
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
                <Form.Label>Select Sports</Form.Label>
                <MultiSelect
                  options={
                    sportsNames !== null && sportsNames !== undefined
                      ? sportsNames.map((e) => ({
                          label: e.sportName,
                          value: e.sportId,
                        }))
                      : []
                  }
                  value={sports}
                  onChange={setSportsHandler}
                  labelledBy={"Select sports Id"}
                  hasSelectAll={true}
                  disableSearch={false}
                />
              </Form.Group>
            </div>
          </Row>
          <Row>
            <div className="col-sm-4">
              <Form.Group>
                <Form.Label>Select Cluster</Form.Label>
                <MultiSelect
                  options={
                    clusterCostCenterList !== null &&
                    clusterCostCenterList !== undefined
                      ? clusterCostCenterList.map((e) => ({
                          label: e.clusterName,
                          value: e.clusterId,
                        }))
                      : []
                  }
                  value={cluster}
                  onChange={setClusterHandler}
                  labelledBy={"Select cluster Id"}
                  hasSelectAll={true}
                  disableSearch={false}
                />
              </Form.Group>
            </div>
            <div className="col-sm-4">
              <Form.Group>
                <Form.Label>Select Type of Contract</Form.Label>
                <MultiSelect
                  options={
                    shiftContractNames !== null &&
                    shiftContractNames !== undefined
                      ? shiftContractNames.map((e) => ({
                          label: e.contractType,
                          value: e.contractType,
                        }))
                      : []
                  }
                  value={contractTypeData}
                  onChange={setContractTypeHandler}
                  labelledBy={"Select contract type"}
                  hasSelectAll={true}
                  disableSearch={false}
                />
              </Form.Group>
            </div>
          </Row>
          {reportType === "Monthly" && (
            /* <Row>
                            <div className="col-sm-4">
                                <Form.Group>
                                    <Form.Label>Select Month </Form.Label> <span style={{ color: 'red' }}>*</span>
                                    <div className="salary-date">
                                        <DatePicker selected={getM} onChange={(date) => setGetM(date)}
                                            className="form-control salary-view" dateFormat="MM/yyyy" showMonthYearPicker
                                            placeholderText='Select Month' />
                                    </div>
                                </Form.Group>
                            </div>
                        </Row> */
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
                  <Form.Label>Select Year </Form.Label>{" "}
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
        <ProductivityReportView productivityList={productivityList} />
      </div>
    </Fragment>
  );
};

export default ProductivityReportForm;
