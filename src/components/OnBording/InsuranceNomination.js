import React, {
  Fragment,
  useState,
  useRef,
  useContext,
  useEffect,
} from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import "./OnBoard.css";
import NomineeForm from "./NominForm";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

const submitHandler = (e) => {
  e.preventDefault();
};
var NomineeArray = [0, 0, 0, 0, 0];

const InsuranceNomination = (props) => {
  const [isChecked, changeCheckState] = useState(false);
  const [count, setCount] = useState(0);
  const [NomineeCount, setNomineeCount] = useState(0);
  const [NominForm1, setNominForm1] = useState(false);
  const [NominForm2, setNominForm2] = useState(false);
  const [NominForm3, setNominForm3] = useState(false);
  const [NominForm4, setNominForm4] = useState(false);
  const [state, setState] = useState({
    age: 0,
    bloodGroup: "",
    candidateId: 0,
    dateOfBirth: "",
    gender: "",
    nominiId: 0,
    nominiName: "",
    relationship: "",
  });
  const submitHandler = (e) => {
    const nextPage = props.NextStep;
    nextPage();
  };

  const PrevStep = () => {
    console.log("previous");
    const back = props.PrevStep;
    back();
  };
  const handleCheckboxChange = (e) => {
    changeCheckState(e.target.checked);
    console.log(isChecked);
  };
  const handleNoCheckboxChange = (e) => {
    changeCheckState(!e.target.checked);
    console.log(isChecked);
  };
  const cancel = () => {
    if (NomineeCount >= 0) {
      console.log(NomineeCount);
      switch (NomineeCount) {
        case 1:
          console.log("11111");
          setNominForm1(false);
          setNomineeCount(NomineeCount - 1);
          return;
          break;
        case 2:
          console.log("22222");
          setNominForm2(false);
          setNomineeCount(NomineeCount - 1);
          return;
          break;
        case 3:
          console.log("3333");
          setNominForm3(false);
          setNomineeCount(NomineeCount - 1);
          return;
          break;
        case 4:
          console.log("4444");
          setNominForm4(false);
          setNomineeCount(NomineeCount - 1);
          return;
          break;

        default:
          break;
      }
    }
    console.log(NomineeCount);
  };

  const handleIncrement = () => {
    if (NomineeCount <= 4) {
      console.log(NomineeCount);

      switch (NomineeCount) {
        case 0:
          console.log("11111");
          setNominForm1(true);
          setNomineeCount(NomineeCount + 1);
          return;
          break;
        case 1:
          console.log("22222");
          setNominForm2(true);
          setNomineeCount(NomineeCount + 1);
          return;
          break;
        case 2:
          console.log("3333");
          setNominForm3(true);
          setNomineeCount(NomineeCount + 1);
          return;
          break;
        case 3:
          console.log("4444");
          setNominForm4(true);
          setNomineeCount(NomineeCount + 1);
          return;
          break;

        default:
          break;
      }
    }
    console.log(NomineeCount);
  };

  const changeHandler = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
    console.log(state);
  };

  return (
    <Fragment>
      {/* <Form onSubmit={submitHandler}>  */}
      <Row style={{ marginBottom: "2rem" }} className="CheckBoxField">
        <Col sm={2}>
          <div>
            <label>
              <b>Employee Name:</b>
            </label>
            <label>
              <b></b>
            </label>
          </div>
        </Col>
        <Col sm={2}>
          <div>
            <label>
              <b>Gender:</b>
            </label>
            <label>
              <b></b>
            </label>
          </div>
        </Col>
        <Col sm={2}>
          <div>
            <label>
              <b>Date Of Birth:</b>
            </label>
            <label>
              <b></b>
            </label>
          </div>
        </Col>
        <Col sm={2}>
          <div>
            <label>
              <b>Age:</b>
            </label>
            <label>
              <b></b>
            </label>
          </div>
        </Col>
        <Col sm={2}>
          <div>
            <label>
              <b>Blood Group:</b>
            </label>
            <label>
              <b></b>
            </label>
          </div>
        </Col>
      </Row>
      <Row style={{ marginBottom: "1rem" }}>
        <Col sm={5}>
          <div>
            <label>
              <b>Enroll Dependents for Insurance Nomination</b>
            </label>
            <label>
              <b></b>
            </label>
          </div>
        </Col>
      </Row>
      <Row style={{ marginBottom: "2rem" }}>
        <Col sm={3}>
          <Form.Group>
            <div className="boxField input">
              <input
                type="checkbox"
                value="No"
                checked={!isChecked}
                onChange={handleNoCheckboxChange}
              />
              <label>Add New Nominee</label>
            </div>
          </Form.Group>
        </Col>
        <Col sm={3} style={{ marginLeft: "-6rem" }}>
          <Form.Group>
            <div className="boxField input">
              <input
                type="checkbox"
                value="Yes"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
              <label>Edit Existing Nominees </label>
            </div>
          </Form.Group>
        </Col>
      </Row>
      {isChecked ? (
        <div></div>
      ) : (
        <div>
          <div>
            {/* first Nominee */}
            <Row style={{ marginBottom: "2rem" }}>
              <Col sm={11}>
                <Row>
                  <div className="col-sm-4">
                    <Form.Group>
                      <Form.Label>
                        Nominee Name
                        <span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="nominiName"
                        value={state.nominiName}
                        onChange={changeHandler}
                        required
                        placeholder="Nominee Name"
                      />
                    </Form.Group>
                  </div>
                  <div className="col-sm-4">
                    <Form.Group>
                      <Form.Label>
                        Relationship <span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <Form.Control
                        as="select"
                        name="relationship"
                        value={state.relationship}
                        onChange={changeHandler}
                      >
                        <option value="">Relationship</option>
                      </Form.Control>
                    </Form.Group>
                  </div>
                  <div className="col-sm-4">
                    <Form.Group>
                      <Form.Label>
                        Gender<span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Gender"
                        required="required"
                      />
                    </Form.Group>
                  </div>
                </Row>
              </Col>
            </Row>
            <Row style={{ marginBottom: "1rem" }}>
              <Col sm={11}>
                <Row>
                  <div className="col-sm-4">
                    <Form.Group>
                      <Form.Label>
                        Datte Of Birth<span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <div className="onBoard-date">
                        <DatePicker
                          className="form-control onBoard-view"
                          dateFormat="MM/yyyy"
                          showMonthYearPicker
                          placeholderText="Date Of Birth"
                        />
                      </div>
                    </Form.Group>
                  </div>
                  <div className="col-sm-4">
                    <Form.Group>
                      <Form.Label>
                        Age<span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Age"
                        required="required"
                      />
                    </Form.Group>
                  </div>
                  <div className="col-sm-4">
                    <Form.Group>
                      <Form.Label>
                        Blood Group <span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <Form.Control as="select">
                        <option value="">Blood Group</option>
                      </Form.Control>
                    </Form.Group>
                  </div>
                </Row>
              </Col>
              <Col sm={1}></Col>
            </Row>
          </div>
          {NominForm1 === true ? (
            <div>
              {/* second Nominee */}
              <Row style={{ marginBottom: "2rem" }}>
                <Col sm={11}>
                  <Row>
                    <div className="col-sm-4">
                      <Form.Group>
                        <Form.Label>
                          Second Nominee Name
                          <span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Nominee Name"
                          required="required"
                        />
                      </Form.Group>
                    </div>
                    <div className="col-sm-4">
                      <Form.Group>
                        <Form.Label>
                          Relationship <span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Form.Control as="select">
                          <option value="">Relationship</option>
                        </Form.Control>
                      </Form.Group>
                    </div>
                    <div className="col-sm-4">
                      <Form.Group>
                        <Form.Label>
                          Gender<span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Gender"
                          required="required"
                        />
                      </Form.Group>
                    </div>
                  </Row>
                </Col>
                <Col sm={1} style={{ marginLeft: "-2rem" }}>
                  <Form.Group>
                    <div>
                      <button
                        onClick={cancel}
                        type="cancel"
                        style={{ color: "white", border: " 2px solid#4466f2" }}
                      >
                        <i
                          class="fa fa-close"
                          style={{ fontSize: "20px", color: "red" }}
                        ></i>
                      </button>
                    </div>
                  </Form.Group>
                </Col>
              </Row>
              <Row style={{ marginBottom: "1rem" }}>
                <Col sm={11}>
                  <Row>
                    <div className="col-sm-4">
                      <Form.Group>
                        <Form.Label>
                          Datte Of Birth<span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <div className="onBoard-date">
                          <DatePicker
                            className="form-control onBoard-view"
                            dateFormat="MM/yyyy"
                            showMonthYearPicker
                            placeholderText="Date Of Birth"
                          />
                        </div>
                      </Form.Group>
                    </div>
                    <div className="col-sm-4">
                      <Form.Group>
                        <Form.Label>
                          Age<span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Age"
                          required="required"
                        />
                      </Form.Group>
                    </div>
                    <div className="col-sm-4">
                      <Form.Group>
                        <Form.Label>
                          Blood Group <span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Form.Control as="select">
                          <option value="">Blood Group</option>
                        </Form.Control>
                      </Form.Group>
                    </div>
                  </Row>
                </Col>
                <Col sm={1}></Col>
              </Row>
            </div>
          ) : (
            ""
          )}
          {NominForm2 === true ? (
            <div>
              {/* Third Nominee  */}
              <Row style={{ marginBottom: "2rem" }}>
                <Col sm={11}>
                  <Row>
                    <div className="col-sm-4">
                      <Form.Group>
                        <Form.Label>
                          Third Nominee Name
                          <span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Nominee Name"
                          required="required"
                        />
                      </Form.Group>
                    </div>
                    <div className="col-sm-4">
                      <Form.Group>
                        <Form.Label>
                          Relationship <span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Form.Control as="select">
                          <option value="">Relationship</option>
                        </Form.Control>
                      </Form.Group>
                    </div>
                    <div className="col-sm-4">
                      <Form.Group>
                        <Form.Label>
                          Gender<span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Gender"
                          required="required"
                        />
                      </Form.Group>
                    </div>
                  </Row>
                </Col>
                <Col sm={1} style={{ marginLeft: "-2rem" }}>
                  <Form.Group>
                    <div>
                      <button
                        onClick={cancel}
                        type="cancel"
                        style={{ color: "white", border: " 2px solid#4466f2" }}
                      >
                        <i
                          class="fa fa-close"
                          style={{ fontSize: "20px", color: "red" }}
                        ></i>
                      </button>
                    </div>
                  </Form.Group>
                </Col>
              </Row>
              <Row style={{ marginBottom: "1rem" }}>
                <Col sm={11}>
                  <Row>
                    <div className="col-sm-4">
                      <Form.Group>
                        <Form.Label>
                          Datte Of Birth<span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <div className="onBoard-date">
                          <DatePicker
                            className="form-control onBoard-view"
                            dateFormat="MM/yyyy"
                            showMonthYearPicker
                            placeholderText="Date Of Birth"
                          />
                        </div>
                      </Form.Group>
                    </div>
                    <div className="col-sm-4">
                      <Form.Group>
                        <Form.Label>
                          Age<span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Age"
                          required="required"
                        />
                      </Form.Group>
                    </div>
                    <div className="col-sm-4">
                      <Form.Group>
                        <Form.Label>
                          Blood Group <span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Form.Control as="select">
                          <option value="">Blood Group</option>
                        </Form.Control>
                      </Form.Group>
                    </div>
                  </Row>
                </Col>
                <Col sm={1}></Col>
              </Row>
            </div>
          ) : (
            ""
          )}
          {NominForm3 === true ? (
            <div>
              {/* fourth Nominee Name */}
              <Row style={{ marginBottom: "2rem" }}>
                <Col sm={11}>
                  <Row>
                    <div className="col-sm-4">
                      <Form.Group>
                        <Form.Label>
                          Fourth Nominee Name
                          <span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Nominee Name"
                          required="required"
                        />
                      </Form.Group>
                    </div>
                    <div className="col-sm-4">
                      <Form.Group>
                        <Form.Label>
                          Relationship <span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Form.Control as="select">
                          <option value="">Relationship</option>
                        </Form.Control>
                      </Form.Group>
                    </div>
                    <div className="col-sm-4">
                      <Form.Group>
                        <Form.Label>
                          Gender<span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Gender"
                          required="required"
                        />
                      </Form.Group>
                    </div>
                  </Row>
                </Col>
                <Col sm={1} style={{ marginLeft: "-2rem" }}>
                  <Form.Group>
                    <div>
                      <button
                        onClick={cancel}
                        type="cancel"
                        style={{ color: "white", border: " 2px solid#4466f2" }}
                      >
                        <i
                          class="fa fa-close"
                          style={{ fontSize: "20px", color: "red" }}
                        ></i>
                      </button>
                    </div>
                  </Form.Group>
                </Col>
              </Row>
              <Row style={{ marginBottom: "1rem" }}>
                <Col sm={11}>
                  <Row>
                    <div className="col-sm-4">
                      <Form.Group>
                        <Form.Label>
                          Datte Of Birth<span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <div className="onBoard-date">
                          <DatePicker
                            className="form-control onBoard-view"
                            dateFormat="MM/yyyy"
                            showMonthYearPicker
                            placeholderText="Date Of Birth"
                          />
                        </div>
                      </Form.Group>
                    </div>
                    <div className="col-sm-4">
                      <Form.Group>
                        <Form.Label>
                          Age<span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Age"
                          required="required"
                        />
                      </Form.Group>
                    </div>
                    <div className="col-sm-4">
                      <Form.Group>
                        <Form.Label>
                          Blood Group <span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Form.Control as="select">
                          <option value="">Blood Group</option>
                        </Form.Control>
                      </Form.Group>
                    </div>
                  </Row>
                </Col>
                <Col sm={1}></Col>
              </Row>
            </div>
          ) : (
            ""
          )}
          {NominForm4 === true ? (
            <div>
              {/* Fifth Nominee */}
              <Row style={{ marginBottom: "2rem" }}>
                <Col sm={11}>
                  <Row>
                    <div className="col-sm-4">
                      <Form.Group>
                        <Form.Label>
                          Fifth Nominee Name
                          <span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Nominee Name"
                          required="required"
                        />
                      </Form.Group>
                    </div>
                    <div className="col-sm-4">
                      <Form.Group>
                        <Form.Label>
                          Relationship <span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Form.Control as="select">
                          <option value="">Relationship</option>
                        </Form.Control>
                      </Form.Group>
                    </div>
                    <div className="col-sm-4">
                      <Form.Group>
                        <Form.Label>
                          Gender<span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Gender"
                          required="required"
                        />
                      </Form.Group>
                    </div>
                  </Row>
                </Col>
                <Col sm={1} style={{ marginLeft: "-2rem" }}>
                  <Form.Group>
                    <div>
                      <button
                        onClick={cancel}
                        type="cancel"
                        style={{ color: "white", border: " 2px solid#4466f2" }}
                      >
                        <i
                          class="fa fa-close"
                          style={{ fontSize: "20px", color: "red" }}
                        ></i>
                      </button>
                    </div>
                  </Form.Group>
                </Col>
              </Row>
              <Row style={{ marginBottom: "1rem" }}>
                <Col sm={11}>
                  <Row>
                    <div className="col-sm-4">
                      <Form.Group>
                        <Form.Label>
                          Datte Of Birth<span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <div className="onBoard-date">
                          <DatePicker
                            className="form-control onBoard-view"
                            dateFormat="MM/yyyy"
                            showMonthYearPicker
                            placeholderText="Date Of Birth"
                          />
                        </div>
                      </Form.Group>
                    </div>
                    <div className="col-sm-4">
                      <Form.Group>
                        <Form.Label>
                          Age<span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Age"
                          required="required"
                        />
                      </Form.Group>
                    </div>
                    <div className="col-sm-4">
                      <Form.Group>
                        <Form.Label>
                          Blood Group <span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Form.Control as="select">
                          <option value="">Blood Group</option>
                        </Form.Control>
                      </Form.Group>
                    </div>
                  </Row>
                </Col>
                <Col sm={1}></Col>
              </Row>
            </div>
          ) : (
            ""
          )}

          {/* {(() => {
            switch (NomineeCount) {
              case 1:
                return <NomineeForm />;
              case 2:
                return (
                  <div>
                    <NomineeForm />
                    <NomineeForm />{" "}
                  </div>
                );
              case 3:
                return (
                  <div>
                    <NomineeForm />
                    <NomineeForm />
                    <NomineeForm />
                  </div>
                );
              case 4:
                return (
                  <div>
                    <NomineeForm />
                    <NomineeForm />
                    <NomineeForm />
                    <NomineeForm />
                  </div>
                );
              case 5:
                return (
                  <div>
                    <NomineeForm />
                    <NomineeForm />
                    <NomineeForm />
                    <NomineeForm />
                    <NomineeForm />
                  </div>
                );
              default:
                return <div>Nominees.</div>;
            }
          })()} */}

          <Row>
            <Col sm={4}></Col>
            <Col sm={4} style={{ padding: "0px 0px 0px 35px" }}>
              {/* style={{ padding: "0px 0px 0px 20px" }} */}
              <Form.Group>
                <div>
                  <button
                    className="buttonField  button"
                    onClick={handleIncrement}
                    disabled={false}
                    style={{ width: "160px" }}
                  >
                    <b> Add New Nominee + </b>
                  </button>
                  {/* onClick={AddExtrReferenceClick} disabled={isClicked} */}
                </div>
              </Form.Group>
            </Col>
          </Row>
        </div>
      )}
      <div style={{ marginTop: "2rem", textAlign: "center" }}>
        <button className="stepperButtons" onClick={PrevStep}>
          Back
        </button>
        <button className="stepperButtons" onClick={submitHandler}>
          Save & Next
        </button>
      </div>
    </Fragment>
  );
};
export default InsuranceNomination;
