import React, { Fragment, useState, useContext, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

const NomineeForm = (props) => {
  const [Valuestate, setValueState] = useState("");
  const [cancelState, setCancelState] = useState(true);

  const cancel = () => {
    setCancelState(false);
  };

  return (
    <Fragment>
      <Form>
        {cancelState ? (
          <div>
            <Row style={{ marginBottom: "2rem" }}>
              <Col sm={11}>
                <Row>
                  <div className="col-sm-4">
                    <Form.Group>
                      <Form.Label>
                        Nominee Name<span style={{ color: "red" }}>*</span>
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
                      <Form.Label>Relationship</Form.Label>
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
                      <Form.Label>Blood Group</Form.Label>
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
          <div> </div>
        )}
      </Form>
    </Fragment>
  );
};

export default NomineeForm;
