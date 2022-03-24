import React, {
  Fragment,
  useState,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { Container, Col, Row, Button, Form, Modal } from "react-bootstrap";
import "./bonus.css";
import DatePicker from "react-datepicker";
import { OfferContext } from "../../context/OfferState";
import { RosterContext } from "../../context/RosterState";
import { BonusContext } from "../../context/BonusState";
import moment from "moment";

const BonusForm = (props) => {
  const [bonusList, setBonusList] = useState({
    bonus: "",
    bonusId: "",
    contractType: "",
    department: "",
    position: "",
  });
  const [effectiveDate, setEffectiveDate] = useState(new Date());
  const [year, setYear] = useState(new Date());
  const { departmentView, departmentName, designationView, designationName } =
    useContext(OfferContext);
  const { viewContractTypes, shiftContractNames } = useContext(RosterContext);
  const { bonusCreate, bonusData } = useContext(BonusContext);
  const [contactTypeList, setContactTypeList] = useState();
  const [bonusError, setBonusError] = useState(false);
  const [bonusLimitError, setBonusLimitError] = useState(false);
  const [departmentError, setDepartmentError] = useState(false);
  const [positionError, setPositionError] = useState(false);
  const [contactTypeError, setContactTypeError] = useState(false);
  const [effectiveDateError, setEffectiveDateError] = useState(false);
  const [yearError, setYearError] = useState(false);
  const onCloseModal = () => {
    /*  const resetValue = {
                
             } */
    const setModal = props.handleClose;
    setModal();
  };

  const checkValidation = () => {
    console.log("inside validation", bonusList);
    if (bonusList.bonus !== "" && bonusList.bonus > 20) {
      setBonusError(false);
      setBonusLimitError(true);
    } else if (bonusList.bonus !== "" && bonusList.bonus <= 20) {
      setBonusError(false);
      setBonusLimitError(false);
    } else {
      setBonusError(true);
      setBonusLimitError(false);
    }

    if (bonusList.contractType !== "") {
      setContactTypeError(false);
    } else {
      setContactTypeError(true);
    }

    if (bonusList.department !== "") {
      setDepartmentError(false);
    } else {
      setDepartmentError(true);
    }

    if (bonusList.position !== "") {
      setPositionError(false);
    } else {
      setPositionError(true);
    }

    if (effectiveDate !== "") {
      setEffectiveDateError(false);
    } else {
      setEffectiveDateError(true);
    }

    if (year !== "") {
      setYearError(false);
    } else {
      setYearError(true);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // checkValidation();
    console.log(
      "bonusError",
      bonusError,
      bonusList.bonus,
      "bonusLimitError",
      bonusLimitError,
      "contactTypeError",
      contactTypeError,
      bonusList.contractType,
      "positionError",
      positionError,
      bonusList.position,
      "departmentError",
      departmentError,
      bonusList.department,
      "effectiveDateError",
      effectiveDateError,
      effectiveDate,
      "yearError",
      yearError,
      year
    );
    // if (
    //   bonusError === false &&
    //   bonusLimitError === false &&
    //   contactTypeError === false &&
    //   positionError === false &&
    //   departmentError === false &&
    //   monthError === false &&
    //   yearError === false
    // ) {
    const data = {
      bonus: bonusList.bonus,
      bonusId: 0,
      contractType: bonusList.contractType,
      department: bonusList.department,
      effectiveDate: effectiveDate,
      // month: parseInt(moment(month).format("MM")),
      // year: parseInt(moment(year).format("YYYY")),
    };
    bonusCreate(data);
    onCloseModal();
    // }
  };
  const handleChange = (e) => {
    setBonusList({ ...bonusList, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    departmentView();
    designationView();
    viewContractTypes();
  }, []);

  useEffect(() => {
    let contractList = shiftContractNames.filter(
      (item) => item.contractType !== "Internship"
    );
    console.log("contract list", contractList);
    setContactTypeList(contractList);
  }, [shiftContractNames]);

  return (
    <Fragment>
      <Modal show={props.show} onHide={props.handleClose} centered>
        <Modal.Header>
          <Modal.Title>
            <h4>Create Bonus Structure</h4>
          </Modal.Title>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={onCloseModal}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submitHandler}>
            <Row>
              <Col sm={12}>
                <Form.Group>
                  <Form.Label>Select Department:</Form.Label>
                  <Form.Control
                    as="select"
                    name="department"
                    onChange={handleChange}
                    value={bonusList.department}
                  >
                    <option value="">Select Department</option>
                    {departmentName !== null &&
                      departmentName !== undefined &&
                      departmentName.length > 0 &&
                      departmentName.map((item) => {
                        return (
                          <option key={item.deptId}>
                            {item.departmentName}
                          </option>
                        );
                      })}
                  </Form.Control>
                </Form.Group>
                {departmentError ? (
                  <p style={{ color: "red" }}>Please Enter the valid Input</p>
                ) : (
                  ""
                )}
              </Col>
            </Row>
            {/* <Row>
              <Col sm={12}>
                <Form.Group>
                  <Form.Label>Select Position:</Form.Label>
                  <Form.Control
                    as="select"
                    name="position"
                    onChange={handleChange}
                    value={bonusList.position}
                  >
                    <option value="">Select Position</option>
                    {designationName !== null &&
                      designationName !== undefined &&
                      designationName.length > 0 &&
                      designationName.map((item) => {
                        return (
                          <option key={item.designationId}>
                            {item.designation}
                          </option>
                        );
                      })}
                  </Form.Control>
                </Form.Group>
                {positionError ? (
                  <p style={{ color: "red" }}>Please Enter the valid Input</p>
                ) : (
                  ""
                )}
              </Col>
            </Row> */}
            <Row>
              <Col sm={12}>
                <Form.Group>
                  <Form.Label>Select Contract Type:</Form.Label>
                  <Form.Control
                    as="select"
                    name="contractType"
                    onChange={handleChange}
                    value={bonusList.contractType}
                  >
                    <option value="">Select Employment Type</option>
                    {contactTypeList !== null &&
                      contactTypeList !== undefined &&
                      contactTypeList.length > 0 &&
                      contactTypeList.map((item) => {
                        return (
                          <option key={item.typeId}>{item.contractType}</option>
                        );
                      })}
                  </Form.Control>
                </Form.Group>
                {contactTypeError ? (
                  <p style={{ color: "red" }}>Please Enter the valid Input</p>
                ) : (
                  ""
                )}
              </Col>
            </Row>
            <Row>
              <Col sm={12}>
                <Form.Group>
                  <Form.Label>Enter Bonus %</Form.Label>
                  <Form.Control
                    type="text"
                    name="bonus"
                    onChange={handleChange}
                    value={bonusList.bonus}
                  ></Form.Control>
                </Form.Group>
                {bonusLimitError ? (
                  <p style={{ color: "red" }}>Maximum Bonus 20 %</p>
                ) : bonusError ? (
                  <p style={{ color: "red" }}>Please Enter the valid Input</p>
                ) : (
                  ""
                )}
              </Col>
            </Row>

            <Row>
              <Col sm={12}>
                <Form.Group>
                  <Form.Label>Select Effective Date</Form.Label>
                  <br></br>
                  <div>
                    <DatePicker
                      name="EffectiveDate"
                      className="dateClass"
                      selected={effectiveDate}
                      onChange={(date) => setEffectiveDate(date)}
                      placeholderText="Select Effective Date"
                      minDate={new Date()}
                      dateFormat="yyyy-MM-dd"
                    />{" "}
                  </div>
                </Form.Group>
                {effectiveDateError ? (
                  <p style={{ color: "red" }}>Please Enter the valid Input</p>
                ) : (
                  ""
                )}
              </Col>
            </Row>
            {/* <Row>
              <Col sm={12}>
                <Form.Group>
                  <Form.Label>Select Year</Form.Label>
                  <br></br>
                  <DatePicker
                    selected={year}
                    className="dateClass"
                    onChange={(date) => setYear(date)}
                    minDate={new Date()}
                    placeholderText="Select Start Year"
                    dateFormat="yyyy"
                    showYearPicker
                  />{" "}
                </Form.Group>
                {yearError ? (
                  <p style={{ color: "red" }}>Please Enter the valid Input</p>
                ) : (
                  ""
                )}
              </Col>
            </Row> */}

            <Button type="submit" className="submitButton">
              Save
            </Button>
            <Button className="cancelButton" onClick={onCloseModal}>
              Cancel
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};
export default BonusForm;
