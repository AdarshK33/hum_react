import React, { useContext, useEffect, useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { AdminContext } from "../../context/AdminState";
import { DocumentManagementContext } from "../../context/DocumentManagementState";
import { AppContext } from "../../context/AppState";
import LoaderIcon from "../Loader/LoaderIcon";
import "./DocumentManagement.css";

const DocumentForm = () => {
  const { CostCenter, costCenterList, employeeIdData, employeeIdList } =
    useContext(AdminContext);
  const {
    changeDocsStatus,
    getModuleList,
    moduleList,
    getLoginRole,
    loginRole,
    getModuleDocuments,
    docsStatus,
    loader,
  } = useContext(DocumentManagementContext);
  const { user } = useContext(AppContext);

  const history = useHistory();

  const [costCentre, setCostCentre] = useState({
    value: "",
    errMsg: "",
  });

  const [module, setModule] = useState({
    value: "",
    errMsg: "",
  });

  const [employee, setEmployee] = useState({
    value: "",
    errMsg: "",
  });

  const [formValid, setFormValid] = useState(false);

  const changeCostCentreHandler = (e) => {
    setCostCentre({
      ...costCentre,
      value: e.target.value,
      errMsg: "",
    });
    setFormValid(false);
  };

  const changeModuleHandler = (e) => {
    setModule({
      ...module,
      value: e.target.value,
      errMsg: "",
    });
    setFormValid(false);
  };

  const changeEmployeeHandler = (e) => {
    setEmployee({
      ...employee,
      value: e.target.value,
      errMsg: "",
    });
    setFormValid(false);
  };

  /* Get module details */
  useEffect(() => {
    changeDocsStatus();
    getModuleList();
  }, []);

  /* Get Login User Role */
  useEffect(() => {
    getLoginRole(user);
  }, [user]);

  /* Get the employee data based on cost center and loginUser role */
  useEffect(() => {
    if (costCentre.value !== "" && loginRole !== "Employee") {
      employeeIdData(costCentre.value);
    }
  }, [costCentre.value, loginRole]);

  /* Add Cost Center and Employee info based on login type */
  useEffect(() => {
    if (loginRole === "Employee") {
      setEmployee({
        ...employee,
        value: user.employeeId,
        errMsg: "",
      });
      setCostCentre({
        ...costCentre,
        value: user.costCentre,
        errMsg: "",
      });
    } else if (loginRole === "Manager") {
      setCostCentre({
        ...costCentre,
        value: user.costCentre,
        errMsg: "",
      });
    } else if (loginRole !== "") {
      CostCenter();
    }
  }, [loginRole]);

  useEffect(() => {
    if (formValid === true) {
      const apiInfo = {
        costCentre: costCentre.value,
        employeeId: employee.value,
        module: parseInt(module.value),
      };
      getModuleDocuments(apiInfo);
    }
  }, [formValid]);

  useEffect(() => {
    if (formValid === true && docsStatus === true) {
      history.push("/module-docs");
    }
  }, [docsStatus]);

  const checkValidation = () => {
    let validForm = true;

    if (costCentre.value === "") {
      validForm = false;
      setCostCentre({
        ...costCentre,
        errMsg: "Please select cost centre",
      });
    }

    if (module.value === "") {
      validForm = false;
      setModule({
        ...module,
        errMsg: "Please select module",
      });
    }

    if (employee.value === "") {
      validForm = false;
      setEmployee({
        ...employee,
        errMsg: "Please select employee",
      });
    }
    return validForm;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const validForm = checkValidation();
    if (validForm === true) {
      setFormValid(true);
    }
  };

  return (
    <div className="document_form_conatiner m-5">
      {loader ? (
        <LoaderIcon />
      ) : (
        <Form>
          <Row>
            <Col md={6}>
              <Form.Group as={Row} controlId="documentsCostCentre">
                <Form.Label column md={4}>
                  Cost Centre:
                </Form.Label>
                <Col
                  className={`${
                    loginRole === "Employee" || loginRole === "Manager"
                      ? "text-primary pt-2"
                      : ""
                  } col-md-8`}
                >
                  {loginRole === "Employee" || loginRole === "Manager" ? (
                    <span>{costCentre.value}</span>
                  ) : (
                    <>
                      <Form.Control
                        as="select"
                        className="text-primary"
                        aria-label="documentsCostCentre"
                        value={costCentre.value}
                        placeholder="Cost Centre"
                        onChange={changeCostCentreHandler}
                      >
                        <option value="">Select Cost Centre</option>
                        {costCenterList !== null &&
                          costCenterList !== undefined &&
                          costCenterList.length > 0 &&
                          costCenterList.map((item) => {
                            return (
                              <option
                                key={`costCentre_${item.costCentreName}`}
                                value={item.costCentreName}
                              >
                                {item.costCentreName}
                              </option>
                            );
                          })}
                      </Form.Control>
                      {costCentre.errMsg !== "" && (
                        <div className="text-danger">{costCentre.errMsg}</div>
                      )}
                    </>
                  )}
                </Col>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group as={Row} controlId="documentsModule">
                <Form.Label column md={4}>
                  Module:
                </Form.Label>
                <Col md={8}>
                  <Form.Control
                    as="select"
                    className="text-primary"
                    aria-label="documentsModule"
                    value={module.value}
                    placeholder="Module"
                    onChange={changeModuleHandler}
                  >
                    <option>Select Module</option>
                    {moduleList !== null &&
                      moduleList !== undefined &&
                      moduleList.length > 0 &&
                      moduleList.map((item) => {
                        return (
                          <option key={`module_${item.id}`} value={item.id}>
                            {item.name}
                          </option>
                        );
                      })}
                  </Form.Control>
                  {module.errMsg !== "" && (
                    <div className="text-danger">{module.errMsg}</div>
                  )}
                </Col>
              </Form.Group>
            </Col>
          </Row>
          <>
            {loginRole !== "Employee" && (
              <Form.Group
                as={Row}
                controlId="documentsEmployee"
                className="mb-3"
              >
                <Form.Label column md={2}>
                  Employee:
                </Form.Label>
                <Col md={10}>
                  <Form.Control
                    as="select"
                    className="text-primary"
                    aria-label="documentsEmployee"
                    value={employee.value}
                    placeholder="Employee"
                    onChange={changeEmployeeHandler}
                  >
                    <option value="">Select Employee</option>
                    {employeeIdList !== null &&
                      employeeIdList !== undefined &&
                      employeeIdList.length > 0 &&
                      employeeIdList.map((item) => {
                        return (
                          <option
                            key={`emp_${item.employeeId}`}
                            value={item.employeeId}
                          >
                            {`${item.firstName} - ${item.employeeId}`}
                          </option>
                        );
                      })}
                  </Form.Control>
                  {employee.errMsg !== "" && (
                    <div className="text-danger">{employee.errMsg}</div>
                  )}
                </Col>
              </Form.Group>
            )}
          </>
          <Row className="text-center mt-5">
            <Button
              type="button"
              className="text-center"
              onClick={submitHandler}
            >
              View Documents
            </Button>
          </Row>
        </Form>
      )}
    </div>
  );
};

export default DocumentForm;
