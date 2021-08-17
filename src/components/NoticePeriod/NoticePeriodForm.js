import React, { useContext, useEffect, useState } from "react";
import { Form, Row, Col, Button, Modal, Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { RosterContext } from "../../context/RosterState";
import { OfferContext } from "../../context/OfferState";
import { NoticePeriodContext } from "../../context/NoticePeriodState";
import LoaderIcon from "../Loader/LoaderIcon";

const NoticePeriodForm = (props) => {
  const history = useHistory();
  const { viewContractTypes, shiftContractNames } = useContext(RosterContext);
  const { departmentView, departmentName } = useContext(OfferContext);
  const {
    changeActionStatus,
    actionStatus,
    getNoticePeriodDetails,
    noticePeriodDetails,
    loader,
    createNoticePeriod,
  } = useContext(NoticePeriodContext);

  const [department, setDepartment] = useState({
    value: "",
    errMsg: "",
  });

  const [contractType, setContractType] = useState({
    value: "",
    errMsg: "",
  });

  const [noticePeriod, setNoticePeriod] = useState({
    value: "",
    errMsg: "",
  });

  const [formValid, setFormValid] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    changeActionStatus();
    viewContractTypes();
    departmentView();
  }, []);

  useEffect(() => {
    if (props.noticePeriodId !== null && props.noticePeriodId !== undefined) {
      getNoticePeriodDetails(props.noticePeriodId);
    }
  }, [props.noticePeriodId]);

  useEffect(() => {
    if (
      props.type !== "add" &&
      noticePeriodDetails !== null &&
      noticePeriodDetails !== undefined &&
      Object.keys(noticePeriodDetails).length > 0
    ) {
      setDepartment({
        ...department,
        value: noticePeriodDetails.department,
      });
      setContractType({
        ...contractType,
        value: noticePeriodDetails.contractType,
      });
      setNoticePeriod({
        ...noticePeriod,
        value: noticePeriodDetails.noticePeriod,
      });
    }
  }, [noticePeriodDetails]);

  useEffect(() => {
    if (formValid === true) {
      const apiInfo = {
        department: department.value,
        contractType: contractType.value,
        noticePeriod: parseInt(noticePeriod.value),
        noticePeriodId:
          props.type === "add" ? 0 : noticePeriodDetails.noticePeriodId,
      };
      createNoticePeriod(apiInfo);
    }
  }, [formValid]);

  useEffect(() => {
    actionStatus === true ? setModalShow(true) : setModalShow(false);
  }, [actionStatus]);

  const handleModalClose = () => {
    setModalShow(false);
    history.push("/master/notice-period");
  };

  const changeDeptHandler = (e) => {
    setDepartment({
      ...department,
      value: e.target.value,
      errMsg: "",
    });
  };

  const changeContractTypeHandler = (e) => {
    setContractType({
      ...contractType,
      value: e.target.value,
      errMsg: "",
    });
  };

  const changeNoticePeriodHandler = (e) => {
    setNoticePeriod({
      ...noticePeriod,
      value: e.target.value,
      errMsg: "",
    });
  };

  const checkValidation = () => {
    let validForm = true;

    if (department.value === "") {
      validForm = false;
      setDepartment({
        ...department,
        errMsg: "Please select department",
      });
    }

    if (contractType.value === "") {
      validForm = false;
      setContractType({
        ...contractType,
        errMsg: "Please select contract type",
      });
    }

    if (noticePeriod.value === "") {
      validForm = false;
      setNoticePeriod({
        ...noticePeriod,
        errMsg: "Please select notice period",
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

  const viewStyles = {
    marginLeft: "30%",
  };

  return (
    <div className="notice-period-form m-5">
      <Modal show={modalShow} onHide={handleModalClose} size="md" centered>
        <Container>
          <Modal.Header closeButton className="modalHeader"></Modal.Header>
          <Modal.Body className="mx-auto">
            <label className="text-center">
              {props.type === "add"
                ? "Notice period added successfully!"
                : "Notice period updated successfully!"}
            </label>
            <div className="text-center mb-2">
              <Button onClick={handleModalClose}>Close</Button>
            </div>
          </Modal.Body>
        </Container>
      </Modal>
      {loader ? (
        <LoaderIcon />
      ) : (
        <Form style={props.type === "view" ? viewStyles : {}}>
          <Form.Group as={Row} className="mb-4" controlId="noticePeriodDept">
            <Form.Label column sm="3">
              Department
            </Form.Label>
            <Col sm="6">
              {props.type === "view" ? (
                <div className="text-primary pt-2">{department.value}</div>
              ) : (
                <Form.Control
                  as="select"
                  className="text-primary"
                  aria-label="noticePeriodDept"
                  value={department.value}
                  placeholder="Select Department"
                  onChange={changeDeptHandler}
                >
                  <option>Select Department</option>
                  {departmentName !== null &&
                    departmentName !== undefined &&
                    departmentName.length > 0 &&
                    departmentName.map((item) => {
                      return (
                        <option key={item.deptId}>{item.departmentName}</option>
                      );
                    })}
                </Form.Control>
              )}
              {department.errMsg !== "" && (
                <div className="text-danger">{department.errMsg}</div>
              )}
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-4"
            controlId="noticePeriodContractType"
          >
            <Form.Label column sm="3">
              Contract Type
            </Form.Label>
            <Col sm="6">
              {props.type === "view" ? (
                <div className="text-primary pt-2">{contractType.value}</div>
              ) : (
                <Form.Control
                  as="select"
                  className="text-primary"
                  aria-label="noticePeriodContractType"
                  value={contractType.value}
                  placeholder="Select Contract Type"
                  onChange={changeContractTypeHandler}
                >
                  <option>Select Contract</option>
                  {shiftContractNames !== null &&
                    shiftContractNames !== undefined &&
                    shiftContractNames.length > 0 &&
                    shiftContractNames.map((item) => {
                      const optionElement =
                        item.contractType === "Internship" ? null : (
                          <option key={item.typeId}>{item.contractType}</option>
                        );
                      return optionElement;
                    })}
                </Form.Control>
              )}
              {contractType.errMsg !== "" && (
                <div className="text-danger">{contractType.errMsg}</div>
              )}
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-4" controlId="noticePeriodTerm">
            <Form.Label column sm="3">
              Notice Period
            </Form.Label>
            <Col sm="6">
              {props.type === "view" ? (
                <div className="text-primary pt-2">
                  {noticePeriod.value}{" "}
                  {noticePeriod.value === 1 ? "Month" : "Months"}
                </div>
              ) : (
                <Form.Control
                  as="select"
                  className="text-primary"
                  aria-label="noticePeriodTerm"
                  value={noticePeriod.value}
                  placeholder="Select Notice Period"
                  onChange={changeNoticePeriodHandler}
                >
                  <option>Select Notice Period</option>
                  <option value="1">1 Month</option>
                  <option value="2">2 Months</option>
                  <option value="3">3 Months</option>
                </Form.Control>
              )}
              {noticePeriod.errMsg !== "" && (
                <div className="text-danger">{noticePeriod.errMsg}</div>
              )}
            </Col>
          </Form.Group>
          {props.type !== "view" && (
            <Row className="mt-5">
              <Col className="text-center">
                <Button
                  type="button"
                  className="px-4"
                  onClick={submitHandler}
                  disabled={formValid}
                >
                  Save
                </Button>
              </Col>
            </Row>
          )}
        </Form>
      )}
    </div>
  );
};

export default NoticePeriodForm;
