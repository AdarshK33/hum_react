import React, { useContext, useEffect, useState, useMemo } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import { AdminContext } from "../../context/AdminState";
import { DocumentManagementContext } from "../../context/DocumentManagementState";
import { AppContext } from "../../context/AppState";
import { OfferContext } from "../../context/OfferState";
import { PermissionContext } from "../../context/PermissionState";
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
    documentEmployeeList,
    documentEmployeeData
  } = useContext(DocumentManagementContext);
  const { user } = useContext(AppContext);
  const { AllCostCenter, allCostCenterList } = useContext(OfferContext);
  const { rolePermission } = useContext(PermissionContext);
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

  /* To get the cost centre options */
  const costCentreOptions = useMemo(() => {
    return allCostCenterList !== null && allCostCenterList.length > 0
      ? allCostCenterList.map((item) => {
          return {
            label: item.costCentreName,
            value: item.costCentreName,
          };
        })
      : [];
  }, [allCostCenterList]);

  /* To get the module list options */
  const moduleOptions = useMemo(() => {
    return moduleList !== null && moduleList.length > 0
      ? moduleList.map((item) => {
          return {
            label: item.name,
            value: item.id,
          };
        })
      : [];
  }, [moduleList]);

  /* To get the employee list options */
  const employeeOptions = useMemo(() => {
    return documentEmployeeData !== null && documentEmployeeData.length > 0
      ? documentEmployeeData.map((item) => {
          return {
            label: `${item.firstName} - ${item.employeeId}`,
            value: item.employeeId,
          };
        })
      : [];
  }, [documentEmployeeData]);

  /* To get the selected cost center value */
  const selectedCostCenterValue = useMemo(() => {
    if (typeof costCentre.value === "object" && costCentre.value !== null) {
      return costCentre.value.value;
    } else {
      return costCentre.value;
    }
  }, [costCentre.value]);

  /* To get the selected employee value */
  const selectedEmployeeValue = useMemo(() => {
    if (typeof employee.value === "object" && employee.value !== null) {
      return employee.value.value;
    } else {
      return employee.value;
    }
  }, [employee.value]);

  /* To get the selected module value */
  const selectedModuleValue = useMemo(() => {
    return module.value.value;
  }, [module.value]);

  const changeCostCentreHandler = (option) => {
    setCostCentre({
      ...costCentre,
      value: option,
      errMsg: "",
    });
    setFormValid(false);
  };

  const changeModuleHandler = (option) => {
    setModule({
      ...module,
      value: option,
      errMsg: "",
    });
    setFormValid(false);
  };

  const changeEmployeeHandler = (option) => {
    setEmployee({
      ...employee,
      value: option,
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
    if (
      selectedCostCenterValue !== null &&
      selectedCostCenterValue !== "" &&
      loginRole !== "Employee"
    ) {
      // employeeIdData(selectedCostCenterValue);
      documentEmployeeList(selectedCostCenterValue);
    }
  }, [selectedCostCenterValue, loginRole]);

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
      let superMangerFlag;
      if(rolePermission === "superCostCenterManager"){
        superMangerFlag=1
        AllCostCenter(superMangerFlag);
      }else{
        superMangerFlag=0
        AllCostCenter(superMangerFlag);
      }
    }
  }, [loginRole,rolePermission]);

  useEffect(() => {
    if (formValid === true) {
      const apiInfo = {
        costCentre: selectedCostCenterValue,
        employeeId: selectedEmployeeValue,
        module: parseInt(selectedModuleValue),
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
                      <Select
                        options={costCentreOptions}
                        className="text-primary"
                        aria-label="documentsCostCentre"
                        value={costCentre.value}
                        placeholder="Cost Centre"
                        onChange={changeCostCentreHandler}
                      />
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
                  <Select
                    options={moduleOptions}
                    className="text-primary"
                    aria-label="documentsModule"
                    value={module.value}
                    placeholder="Module"
                    onChange={changeModuleHandler}
                  />
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
                className="mt-3"
              >
                <Form.Label column md={2}>
                  Employee:
                </Form.Label>
                <Col md={10}>
                  <Select
                    options={employeeOptions}
                    className="text-primary"
                    aria-label="documentsEmployee"
                    value={employee.value}
                    placeholder="Employee"
                    onChange={changeEmployeeHandler}
                  />
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
