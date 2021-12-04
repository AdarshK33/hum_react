import React, {
  Fragment,
  useState,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { Container, Col, Row, Button, Form, Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { RosterContext } from "../../context/RosterState";
import { WeekOffContext } from "../../context/WeekOffState";
import moment from "moment";
import { toast } from "react-toastify";

const WeekOffForm = (props) => {
  const { weekOffCreate, weekoffData } = useContext(WeekOffContext);
  const { viewContractTypes, shiftContractNames } = useContext(RosterContext);
  const [weekOffList, setWeekOffList] = useState({
    weekOffId: "",
    contractType: "",
    numberOfWeekOffs: "",
  });

  const [effectiveDateError, setEffectiveDateError] = useState(false);
  const [weekOffError, setWeekOffError] = useState(false);
  const [contactTypeError, setContactTypeError] = useState(false);
  const [effectiveDate, setEffectiveDate] = useState(new Date());
  const onCloseModal = () => {
    const setModal = props.createHandleClose;
    setModal();
  };

  useEffect(() => {
    viewContractTypes();
  }, []);

  const checkValidation = () => {
    let flag = true;
    if (weekOffList.contractType === "") {
      toast.error("Select Contract Type");
      flag = false;
      return;
    }

    if (effectiveDate === "") {
      toast.error("Select Effective Date");
      flag = false;
      return;
    }

    if (weekOffList.numberOfWeekOffs === "") {
      toast.error("Select Number Of WeekOffs");
      flag = false;
      return;
    }
    return flag;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // checkValidation();
    console.log(
      "effectiveDateError",
      effectiveDateError,
      effectiveDate,
      "contactTypeError",
      contactTypeError,
      weekOffList.contractType,
      "weekOffError",
      weekOffError,
      weekOffList.numberOfWeekOffs
    );
    const validate = checkValidation();
    if (validate) {
      const data = {
        weekOffId: 0,
        contractType: weekOffList.contractType,
        effectiveDate: moment(effectiveDate).format("YYYY-MM-DD"),
        numberOfWeekOffs: weekOffList.numberOfWeekOffs,
      };
      weekOffCreate(data);
      onCloseModal();
      setWeekOffList({ contractType: "", numberOfWeekOffs: "" });
      setEffectiveDate(new Date());
    }
  };
  const handleChange = (e) => {
    setWeekOffList({ ...weekOffList, [e.target.name]: e.target.value });
  };

  const isSunday = (date) => {
    const day =date.getDay();
    return day ===0;
  };

  // useEffect(() => {
  //   let contractList = shiftContractNames.filter(
  //     (item) => item.contractType !== "Internship"
  //   );
  //   console.log("contract list", contractList);
  //   setContactTypeList(contractList);
  // }, [shiftContractNames]);
  console.log("props.createShow", props.createShow);
  return (
    <Fragment>
      <Modal show={props.createShow} onHide={props.createHandleClose} centered>
        <Modal.Header>
          <Modal.Title>
            <h4>Create Week Off</h4>
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
                  <Form.Label>Select Contract Type:</Form.Label>
                  <Form.Control
                    as="select"
                    name="contractType"
                    onChange={handleChange}
                    value={weekOffList.contractType}
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
                  <Form.Label>Number of weekoffs</Form.Label>
                  <Form.Control
                    type="text"
                    name="numberOfWeekOffs"
                    placeholderText="Number of weekoffs"
                    onChange={handleChange}
                    value={weekOffList.numberOfWeekOffs}
                  ></Form.Control>
                </Form.Group>
                {weekOffError ? (
                  <p style={{ color: "red" }}>Please Enter the valid Input</p>
                ) : (
                  ""
                )}
              </Col>
            </Row>

            <Row>
              <Col sm={12}>
                {/* <Form.Group> */}
                <Form.Label>Select Effective From</Form.Label>
                <br></br>
                <div>
                  <DatePicker
                    name="effectiveDate"
                    className="dateClass"
                    selected={effectiveDate}
                    required
                    onChange={(date) => setEffectiveDate(date)}
                    placeholderText="Select Effective From"
                    minDate={new Date()}
                    filterDate={isSunday}
                    dateFormat="yyyy-MM-dd"
                  />{" "}
                </div>
                {/* </Form.Group> */}
                {effectiveDateError ? (
                  <p style={{ color: "red" }}>Please Enter the valid Input</p>
                ) : (
                  ""
                )}
              </Col>
            </Row>
            <Row>
              <Col sm={12}>
                <br></br>
                <Button type="submit" className="submitButton">
                  Save
                </Button>
              </Col>
            </Row>
            {/* <Button className="cancelButton" onClick={onCloseModal}>
              Cancel
            </Button> */}
          </Form>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};
export default WeekOffForm;
