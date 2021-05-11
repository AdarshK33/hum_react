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
    designation: "",
  });
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const {
    departmentView,
    departmentName,
    designationView,
    designationName,
  } = useContext(OfferContext);
  const { viewContractTypes, shiftContractNames } = useContext(RosterContext);
  const { bonusCreate, bonusData } = useContext(BonusContext);
  const onCloseModal = () => {
    /*  const resetValue = {
                
             } */
    const setModal = props.handleClose;
    setModal();
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const data = {
      bonus: bonusList.bonus,
      bonusId: 0,
      contractType: bonusList.contractType,
      department: bonusList.department,
      designation: bonusList.designation,
      month: parseInt(moment(month).format("MM")),
      year: parseInt(moment(year).format("YYYY")),
    };
    bonusCreate(data);
  };
  const handleChange = (e) => {
    setBonusList({ ...bonusList, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    departmentView();
    designationView();
    viewContractTypes();
  }, []);
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
              </Col>
            </Row>
            <Row>
              <Col sm={12}>
                <Form.Group>
                  <Form.Label>Select Designation:</Form.Label>
                  <Form.Control
                    as="select"
                    name="designation"
                    onChange={handleChange}
                    value={bonusList.designation}
                  >
                    <option value="">Select Designation</option>
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
              </Col>
            </Row>
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
                    {shiftContractNames !== null &&
                      shiftContractNames !== undefined &&
                      shiftContractNames.length > 0 &&
                      shiftContractNames.map((item) => {
                        return (
                          <option key={item.typeId}>{item.contractType}</option>
                        );
                      })}
                  </Form.Control>
                </Form.Group>
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
              </Col>
            </Row>

            <Row>
              <Col sm={12}>
                {/* <Form.Group> */}
                <Form.Label>Select Month</Form.Label>
                <br></br>
                <div>
                  <DatePicker
                    name="month"
                    className="dateClass"
                    selected={month}
                    onChange={(date) => setMonth(date)}
                    placeholderText="Select Start Month"
                    dateFormat="MM"
                    showMonthYearPicker
                    showFullMonthYearPicker
                  />{" "}
                </div>
                {/* </Form.Group> */}
              </Col>
            </Row>
            <Row>
              <Col sm={12}>
                <Form.Group>
                  <Form.Label>Select Year</Form.Label>
                  <br></br>
                  <DatePicker
                    selected={year}
                    className="dateClass"
                    onChange={(date) => setYear(date)}
                    placeholderText="Select Start Year"
                    dateFormat="yyyy"
                    showYearPicker
                  />{" "}
                </Form.Group>
              </Col>
            </Row>

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
