import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import Breadcrumb from "../common/breadcrumb";
import { ToastContainer } from "react-toastify";
import { Search } from "react-feather";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import MODULES_LIST from "./ModuleList";
import { TransferContext } from "../../context/TransferState";

const ModuleReports = () => {
  const {
    getCostCentreDetails,
    costCentreData,
    getTransferInitiationEmpData,
    initiationEmpData,
  } = useContext(TransferContext);

  const [subModules, setSubModules] = useState({});

  const [moduleName, setModuleName] = useState({
    value: "",
    errMsg: "",
  });

  const [subModuleName, setSubModuleName] = useState({
    value: "",
    errMsg: "",
  });

  const [reportType, setReportType] = useState({
    value: "",
    errMsg: "",
  });

  const [fromDate, setFromDate] = useState({
    value: new Date(),
    errMsg: "",
  });

  const [toDate, setToDate] = useState({
    value: new Date(),
    errMsg: "",
  });

  const [reportYear, setReportYear] = useState({
    value: "",
    errMsg: "",
  });

  const [costCentre, setCostCentre] = useState({
    value: "",
    errMsg: "",
  });

  const [employee, setEmployee] = useState({
    value: "",
    search: "",
    empId: "",
    errMsg: "",
  });

  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    getCostCentreDetails();
  }, []);

  useEffect(() => {
    if (employee.search !== "") {
      getTransferInitiationEmpData(employee.search);
    }
  }, [employee.search]);

  useEffect(() => {
    initiationEmpData !== null &&
      initiationEmpData !== undefined &&
      Object.keys(initiationEmpData).length > 0 &&
      setEmployee({
        ...employee,
        value: `${initiationEmpData.employeeName} ${initiationEmpData.currentEmployeeId}`,
        empId: initiationEmpData.currentEmployeeId,
      });
  }, [initiationEmpData]);

  const changeModuleNameHandler = (e) => {
    const module = e.target.value;
    setModuleName({
      value: module,
      errMsg: "",
    });
    setSubModules(MODULES_LIST.subModules[module]);
  };

  const changeSubModuleNameHandler = (e) => {
    setSubModuleName({
      value: e.target.value,
      errMsg: "",
    });
  };

  const changeReportTypeHandler = (e) => {
    setReportType({
      value: e.target.value,
      errMsg: "",
    });
  };

  const changeFromDateHandler = (date) => {
    setFromDate({
      value: date,
      errMsg: "",
    });
  };

  const changeToDateHandler = (date) => {
    setToDate({
      value: date,
      errMsg: "",
    });
  };

  const changeReportYearHandler = (e) => {
    setReportYear({
      value: e.target.value,
      errMsg: "",
    });
  };

  const changeCostCentreHandler = (e) => {
    setCostCentre({
      value: e.target.value,
      errMsg: "",
    });
  };

  const searchInputHandler = (e) => {
    setEmployee({
      ...employee,
      value: e.target.value,
      errMsg: "",
    });
  };

  const searchValueHandler = (e) => {
    setEmployee({
      ...employee,
      search: employee.value,
    });
  };

  /* Validate form */
  const validateForm = () => {
    let validForm = true;

    if (moduleName.value === "") {
      validForm = false;
      setModuleName({
        ...moduleName,
        errMsg: "Please select module",
      });
    }

    if (subModuleName.value === "") {
      validForm = false;
      setSubModuleName({
        ...subModuleName,
        errMsg: "Please select sub-module",
      });
    }

    if (reportType.value === "") {
      validForm = false;
      setReportType({
        ...reportType,
        errMsg: "Please select report type",
      });
    }

    if (reportType.value === "monthly" && fromDate.value === "") {
      validForm = false;
      setFromDate({
        ...fromDate,
        errMsg: "Please enter from date",
      });
    }

    if (reportType.value === "monthly" && toDate.value === "") {
      validForm = false;
      setToDate({
        ...toDate,
        errMsg: "Please enter to date",
      });
    }

    if (reportType.value === "yearly" && reportYear.value === "") {
      validForm = false;
      setReportYear({
        ...reportYear,
        errMsg: "Please select report year",
      });
    }

    if (costCentre.value === "") {
      validForm = false;
      setCostCentre({
        ...costCentre,
        errMsg: "Please select cost centre",
      });
    }

    if (employee.empId === "") {
      validForm = false;
      setEmployee({
        ...employee,
        errMsg: "Please enter employee ID",
      });
    }

    return validForm;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const validFormRes = validateForm();
    if (validFormRes === true) {
      setFormValid(true);
    }
  };

  return (
    <div className="module-reports">
      <ToastContainer />
      <Breadcrumb title="ALL REPORTS" parent="ALL REPORTS" />
      <Container fluid>
        <div className="card" style={{ borderRadius: "1rem" }}>
          <div className="OnBoardHeading">
            <b className="align-middle">ALL REPORTS</b>
          </div>
          <div className="module-reports-form mx-5 my-5">
            <Form>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="reportModuleName"
              >
                <Form.Label column sm="3">
                  Select Module Name:
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    as="select"
                    className="text-primary"
                    aria-label="reportModuleName"
                    value={moduleName.value}
                    placeholder="Select Module"
                    onChange={changeModuleNameHandler}
                  >
                    <option>Select Module</option>
                    {MODULES_LIST.modules !== null &&
                      MODULES_LIST.modules !== undefined &&
                      Object.keys(MODULES_LIST.modules).length > 0 &&
                      Object.entries(MODULES_LIST.modules).map(
                        ([key, value]) => (
                          <option key={`module_${key}`} value={key}>
                            {value}
                          </option>
                        )
                      )}
                  </Form.Control>
                  {moduleName.errMsg !== "" && (
                    <span className="text-danger">{moduleName.errMsg}</span>
                  )}
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="reportSubModuleName"
              >
                <Form.Label column sm="3">
                  Select Sub-Module:
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    as="select"
                    className="text-primary"
                    aria-label="reportSubModuleName"
                    value={subModuleName.value}
                    placeholder="Select Sub-Module"
                    onChange={changeSubModuleNameHandler}
                  >
                    <option>Select Sub-Module</option>
                    {subModules !== null &&
                      subModules !== undefined &&
                      Object.keys(subModules).length > 0 &&
                      Object.entries(subModules).map(([key, value]) => (
                        <option key={`sub_module_${key}`} value={key}>
                          {value}
                        </option>
                      ))}
                  </Form.Control>
                  {subModuleName.errMsg !== "" && (
                    <span className="text-danger">{subModuleName.errMsg}</span>
                  )}
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="reportType">
                <Form.Label column sm="3">
                  Select Report Type:
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    as="select"
                    className="text-primary"
                    aria-label="reportType"
                    value={reportType.value}
                    placeholder="Report Type"
                    onChange={changeReportTypeHandler}
                  >
                    <option>Select Report Type</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </Form.Control>
                  {reportType.errMsg !== "" && (
                    <span className="text-danger">{reportType.errMsg}</span>
                  )}
                </Col>
              </Form.Group>
              {reportType.value !== "" && (
                <>
                  <Row className="mb-3" md={8}>
                    {reportType.value === "monthly" ? (
                      <>
                        <Col md={6}>
                          <Form.Group as={Row} controlId="reportFromDate">
                            <Form.Label column md={5}>
                              From Date:
                            </Form.Label>
                            <Col md={{ span: 6, offset: 1 }}>
                              <DatePicker
                                className="text-primary form-control"
                                selected={fromDate.value}
                                minDate={fromDate.value}
                                closeOnScroll={true}
                                dateFormat="yyyy-MM-dd"
                                onChange={(date) => {
                                  changeFromDateHandler(date);
                                }}
                              />
                              {fromDate.errMsg !== "" && (
                                <span className="text-danger">
                                  {fromDate.errMsg}
                                </span>
                              )}
                            </Col>
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group as={Row} controlId="reportToDate">
                            <Form.Label column md={4}>
                              To Date:
                            </Form.Label>
                            <Col md={6}>
                              <DatePicker
                                className="text-primary form-control"
                                selected={toDate.value}
                                minDate={toDate.value}
                                closeOnScroll={true}
                                dateFormat="yyyy-MM-dd"
                                onChange={(date) => {
                                  changeToDateHandler(date);
                                }}
                              />
                              {toDate.errMsg !== "" && (
                                <span className="text-danger">
                                  {toDate.errMsg}
                                </span>
                              )}
                            </Col>
                          </Form.Group>
                        </Col>
                      </>
                    ) : (
                      <Col md={6}>
                        <Form.Group as={Row} controlId="reportYear">
                          <Form.Label column md={5}>
                            Select Year:
                          </Form.Label>
                          <Col md={{ span: 6, offset: 1 }}>
                            <Form.Control
                              as="select"
                              className="text-primary"
                              aria-label="reportYear"
                              value={reportYear.value}
                              placeholder="Year"
                              onChange={changeReportYearHandler}
                            >
                              <option>Select Year</option>
                              <option value="2021">2021</option>
                              <option value="2020">2020</option>
                            </Form.Control>
                            {reportYear.errMsg !== "" && (
                              <span className="text-danger">
                                {reportYear.errMsg}
                              </span>
                            )}
                          </Col>
                        </Form.Group>
                      </Col>
                    )}
                    <Col md={6}>
                      <Form.Group as={Row} controlId="reportCostCentre">
                        <Form.Label
                          column
                          md={`${reportType.value === "monthly" ? 5 : 4}`}
                        >
                          Cost Centre:
                        </Form.Label>
                        <Col
                          className={`${
                            reportType.value === "monthly"
                              ? "col-md-6 offset-md-1"
                              : "col-md-6"
                          }`}
                        >
                          <Form.Control
                            as="select"
                            className="text-primary"
                            aria-label="reportCostCentre"
                            value={costCentre.value}
                            placeholder="Select Cost Centre"
                            onChange={changeCostCentreHandler}
                          >
                            <option>Select Cost Centre</option>
                            {costCentreData !== null &&
                              costCentreData !== undefined &&
                              costCentreData.length > 0 &&
                              costCentreData.map((item) => {
                                return (
                                  <option
                                    key={`cost_centre_${item.costCentreName}`}
                                    value={item.costCentreName}
                                  >
                                    {item.costCentreName}
                                  </option>
                                );
                              })}
                          </Form.Control>
                          {costCentre.errMsg !== "" && (
                            <span className="text-danger">
                              {costCentre.errMsg}
                            </span>
                          )}
                        </Col>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group as={Row} controlId="reportEmpId">
                        <Form.Label
                          column
                          md={`${reportType.value === "monthly" ? 4 : 5}`}
                        >
                          Employee ID:
                        </Form.Label>
                        <Col
                          className={`${
                            reportType.value === "monthly"
                              ? "col-md-6"
                              : "col-md-6 offset-md-1"
                          }`}
                        >
                          <Form.Control
                            type="text"
                            className="text-primary"
                            placeholder="search employee"
                            value={employee.value}
                            onChange={searchInputHandler}
                          />
                          <Search
                            className="search-icon mr-1"
                            style={{ color: "#313131" }}
                            onClick={searchValueHandler}
                          />
                          {employee.errMsg !== "" && (
                            <span className="text-danger">
                              {employee.errMsg}
                            </span>
                          )}
                        </Col>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mt-5">
                    <Col className="text-center">
                      <Button
                        variant="primary"
                        type="button"
                        onClick={submitHandler}
                        disabled={formValid}
                      >
                        Download Report
                      </Button>
                    </Col>
                  </Row>
                </>
              )}
            </Form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ModuleReports;
