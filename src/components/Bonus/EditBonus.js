import React, {
  Fragment,
  useState,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { Container, Col, Row, Button, Form, Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { OfferContext } from "../../context/OfferState";
import { RosterContext } from "../../context/RosterState";
import { BonusContext } from "../../context/BonusState";
import moment from "moment";

const EditBonus = (props) => {
  const { getBonusDetailsById, updateBonus } = useContext(BonusContext);
  const { departmentView, departmentName, designationView, designationName } =
    useContext(OfferContext);
  const { viewContractTypes, shiftContractNames } = useContext(RosterContext);

  const [state, setState] = useState({
    bonus: "",
    bonusId: "",
    contractType: "",
    department: "",
    position: "",
  });
  const [contactTypeList, setContactTypeList] = useState();
  const onCloseModal = () => {
    let close = props.handleEditClose;
    close();
  };
  const [year, setYear] = useState("");
  const [effectiveDate, setEffectiveDate] = useState(new Date());
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const updateBonusDetails = () => {
    let data = {
      bonus: state.bonus,
      bonusId: getBonusDetailsById.bonusId,
      contractType: state.contractType,
      department: state.department,
      position: state.position,
      // month:
      //   typeof month === "number"
      //     ? month
      //     : parseInt(moment(month).format("MM")),
      // year:
      //   typeof year === "number" ? year : parseInt(moment(year).format("YYYY")),
    };
    console.log(data);
    updateBonus(data);
    onCloseModal();
  };

  useEffect(() => {
    departmentView();
    viewContractTypes();
    designationView();
  }, []);

  useEffect(() => {
    let contractList = shiftContractNames.filter(
      (item) => item.contractType !== "Internship"
    );
    console.log("contract list", contractList);
    setContactTypeList(contractList);
  }, [shiftContractNames]);

  useEffect(() => {
    setState({
      bonus: getBonusDetailsById.bonus,
      contractType: getBonusDetailsById.contractType,
      department: getBonusDetailsById.department,
      position: getBonusDetailsById.position,
      // month: getBonusDetailsById.month,
      // year: getBonusDetailsById.year,
    });
    // setYear(getBonusDetailsById.year);
    // setMonth(getBonusDetailsById.month);
    // need to change it as a effective date
  }, [getBonusDetailsById]);
  const getSelectedYear = (year) => {
    if (year !== undefined) {
      return year.toString();
    }
  };
  const getMonth = (month) => {
    if (month !== undefined) {
      return moment(month.toString()).format("MM");
    }
  };

  return (
    <Fragment>
      <Modal show={props.editmodal} onHide={props.handleEditClose} centered>
        <Modal.Header>
          <Modal.Title>Edit Bonus Structure</Modal.Title>
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
          <Row>
            <Col sm={12}>
              <Form.Group>
                <Form.Label>Select Department:</Form.Label>
                <Form.Control
                  as="select"
                  name="department"
                  onChange={handleChange}
                  value={state.department}
                >
                  <option value="">Select Department</option>
                  {departmentName !== null &&
                    departmentName !== undefined &&
                    departmentName.length > 0 &&
                    departmentName.map((item) => {
                      return (
                        <option key={item.deptId}>{item.departmentName}</option>
                      );
                    })}
                </Form.Control>
              </Form.Group>
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
                  value={state.position}
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
                  value={state.contractType}
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
                  value={state.bonus}
                ></Form.Control>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col sm={12}>
              <Form.Group>
                <Form.Label>Select Effective Date</Form.Label>
                <br></br>
                <div>
                  <DatePicker
                    name="month"
                    className="dateClass"
                    selected={effectiveDate}
                    onChange={(date) => setEffectiveDate(date)}
                    placeholderText="Select Effective Date"
                    maxDate={new Date()}
                    dateFormat="yyyy-MM-dd"
                  />{" "}
                </div>
              </Form.Group>
            </Col>
          </Row>
          {/* <Row>
            <Col sm={12}>
              <Form.Group>
                <Form.Label>Select Year</Form.Label>
                <br></br>
                <DatePicker
                  selected={year}
                  // defaultValue={state.year}
                  value={
                    typeof year === "number" ? getSelectedYear(year) : year
                  }
                  className="dateClass"
                  onChange={(date) => setYear(date)}
                  placeholderText="Select Start Year"
                  dateFormat="yyyy"
                  showYearPicker
                />{" "}
              </Form.Group>
            </Col>
          </Row> */}
          <Button onClick={updateBonusDetails}>Save</Button>
          <Button className="cancelButton" onClick={onCloseModal}>
            Cancel
          </Button>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};
export default EditBonus;
