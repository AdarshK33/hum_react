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
  import { WorkHourContext } from "../../context/WorkHourState";
  import moment from "moment";
  import { toast } from "react-toastify";
  
  const EditWorkHourForm = (props) => {
    const { workHourCreate, workHourData,workHourEdit,workHourById } = useContext(WorkHourContext);
    const { viewContractTypes, shiftContractNames } = useContext(RosterContext);
    const [workHourList, setWorkHourList] = useState({
      workingId: "",
      contractType: "",
      shiftHours: "",
      workHours: "",
      breakHours: "",
    });
  
    const [effectiveDate, setEffectiveDate] = useState();
    const onCloseModal = () => {
      const setModal = props.editHandleClose;
      setModal();
    };
  
    useEffect(() => {
      viewContractTypes();
    }, []);

    useEffect(() => {
        if(workHourById!==null&&workHourById!==undefined&&workHourById&&Object.keys(workHourById).length!==0){
            setWorkHourList({workingId: workHourById.workingId,
            contractType: workHourById.contractType,
            shiftHours: workHourById.shiftHours,
            workHours:workHourById.workHours,
            breakHours:workHourById.breakHours})
            setEffectiveDate(new Date(workHourById.effectiveDate))
        }
              }, [workHourById]);
  
    const checkValidation = () => {
      let flag = true;
      if (workHourList.contractType === "") {
        toast.error("Select Contract Type");
        flag = false;
        return;
      }
  
      if (effectiveDate === "") {
        toast.error("Select Effective Date");
        flag = false;
        return;
      }
  
      if (workHourList.shiftHours === "") {
        toast.error("Select Number Of ShiftHours");
        flag = false;
        return;
      }
  
      if (workHourList.workHours === "") {
        toast.error("Select Number Of WorkHours");
        flag = false;
        return;
      }
  
      if (workHourList.breakHours === "") {
        toast.error("Select Number Of BreakHours");
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
        effectiveDate,
        "contactTypeError",
        workHourList.contractType,
        workHourList.shiftHours,
        workHourList.workHours,
        workHourList.breakHours
      );
      const validate = checkValidation();
      if (validate) {
        const data = {
          workingId: workHourList.workingId,
          contractType: workHourList.contractType,
          effectiveDate: moment(effectiveDate).format("YYYY-MM-DD"),
          breakHours: workHourList.breakHours,
          shiftHours: workHourList.shiftHours,
          workHours: workHourList.workHours,
        };
        console.log("editdata",data);
        workHourEdit(data);
        onCloseModal();
        setWorkHourList({
          contractType: "",
          shiftHours: "",
          workHours: "",
          breakHours: "",
        });
        setEffectiveDate(new Date());
      }
    };
  
    const handleChange = (e) => {
      setWorkHourList({ ...workHourList, [e.target.name]: e.target.value });
    };
    const isSunday = (date) => {
      const day = date.getDay();
      return day === 0;
    };
  
    // useEffect(() => {
    //   let contractList = shiftContractNames.filter(
    //     (item) => item.contractType !== "Internship"
    //   );
    //   console.log("contract list", contractList);
    //   setContactTypeList(contractList);
    // }, [shiftContractNames]);
    console.log("props.modal", props.modal);
    return (
      <Fragment>
    <Modal show={props.modal} onHide={props.editHandleClose} centered>
          <Modal.Header>
            <Modal.Title>
              <h4>Edit Work Hours</h4>
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
                      value={workHourList.contractType}
                      disabled
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
                    <Form.Label>Shift Hours / Day</Form.Label>
                    <Form.Control
                      type="text"
                      name="shiftHours"
                      placeholderText="Shift Hours/Day"
                      onChange={handleChange}
                      value={workHourList.shiftHours}
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col sm={12}>
                  <Form.Group>
                    <Form.Label>Work Hours / Day</Form.Label>
                    <Form.Control
                      type="text"
                      name="workHours"
                      placeholderText="Work Hours/Day"
                      onChange={handleChange}
                      value={workHourList.workHours}
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col sm={12}>
                  <Form.Group>
                    <Form.Label>Break Hours/Day</Form.Label>
                    <Form.Control
                      type="text"
                      name="breakHours"
                      placeholderText="Break Hours/Day"
                      onChange={handleChange}
                      value={workHourList.breakHours}
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col sm={12}>
                  <Form.Group>
                    <Form.Label>Select Effective From</Form.Label>
                    <Form.Control
                      type="text"
                      name="effectiveDate"
                      placeholderText="Select Effective From"
                      disabled
                      value={moment(effectiveDate).format("DD-MM-YYYY")}
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              {/* <Row>
                <Col sm={12}>
                  <Form.Label>Select Effective From</Form.Label>
                  <br></br>
                  <div >
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
                      disabled
                    />{" "}
                  </div>
                </Col>
              </Row> */}
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
  export default EditWorkHourForm;
  