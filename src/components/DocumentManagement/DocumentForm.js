import React, { useContext, useEffect, useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { AdminContext } from "../../context/AdminState";
import { DocumentManagementContext } from "../../context/DocumentManagementState";
import "./DocumentManagement.css";

const DocumentForm = () => {
  const { CostCenter, costCenterList, employeeIdData, employeeIdList } =
    useContext(AdminContext);
  const { getModuleList, moduleList } = useContext(DocumentManagementContext);

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

  const changeCostCentreHandler = (e) => {
    setCostCentre({
      ...costCentre,
      value: e.target.value,
      errMsg: "",
    });
  };

  const changeModuleHandler = (e) => {
    setModule({
      ...module,
      value: e.target.value,
      errMsg: "",
    });
  };

  const changeEmployeeHandler = (e) => {
    setEmployee({
      ...employee,
      value: e.target.value,
      errMsg: "",
    });
  };

  /* Get cost center and module details */
  useEffect(() => {
    CostCenter();
    getModuleList();
  }, []);

  /* Get the employee data based on cost centers */
  useEffect(() => {
    if (costCentre.value !== "") {
      employeeIdData(costCentre.value);
    }
  }, [costCentre.value]);

  return (
    <div className="document_form_conatiner m-5">
      <Form>
        <Row>
          <Col md={6}>
            <Form.Group as={Row} controlId="documentsCostCentre">
              <Form.Label column md={4}>
                Cost Centre:
              </Form.Label>
              <Col md={8}>
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
              </Col>
            </Form.Group>
          </Col>
        </Row>
        <Form.Group as={Row} controlId="documentsEmployee" className="mb-3">
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
              employeeIdList.length > 0 ? (
                <>
                  <option value="all">All</option>
                  {employeeIdList.map((item) => {
                    return (
                      <option
                        key={`emp_${item.employeeId}`}
                        value={item.employeeId}
                      >
                        {`${item.firstName} - ${item.employeeId}`}
                      </option>
                    );
                  })}
                </>
              ) : null}
            </Form.Control>
          </Col>
        </Form.Group>
        <Row className="text-center">
          <Button type="button" className="text-center">
            View Documents
          </Button>
        </Row>
      </Form>
    </div>
  );
};

export default DocumentForm;
