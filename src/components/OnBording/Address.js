import React, { Fragment, useState, useContext, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import "./OnBoard.css";

const submitHandler = (e) => {
  e.preventDefault();
};

const Address = () => {
  const [isChecked, changeCheckState] = useState(false);

  const handleCheckboxChange = (e) => {
    changeCheckState(e.target.checked);
    console.log(isChecked);
  };
  const handleNoCheckboxChange = (e) => {
    changeCheckState(!e.target.checked);
    console.log(isChecked);
  };
  return (
    <Fragment>
      <Form onSubmit={submitHandler}>
        <Row style={{ marginBottom: "1rem" }}>
          <Col sm={6}>
            <div>
              <label>
                <b>Present Address</b>
              </label>
            </div>
          </Col>
        </Row>
        <Row style={{ marginBottom: "1rem" }}>
          {/* <div className="divContents"> */}
          <Col sm={3}>
            <div className="inputField">
              <input type="text" required="required" />
              <label>Flat/Plot No</label>
            </div>
          </Col>
          <Col sm={3}>
            <div className="inputFieldWithoutStar">
              <input type="text" required="required" />
              <label>Street</label>
            </div>
          </Col>
          <Col sm={3}>
            <div className="inputFieldWithoutStar">
              <input type="text" required="required" />
              <label>Locality</label>
            </div>
          </Col>
          <Col sm={3}>
            <div className="inputField">
              <input type="text" required="required" />
              <label>Address Line 1</label>
            </div>
          </Col>
          {/* </div> */}
        </Row>
        <Row style={{ marginBottom: "1rem" }}>
          <Col sm={3}>
            <div className="select_box">
              <select>
                <option value="">City</option>
              </select>
            </div>
          </Col>
          <Col sm={3}>
            <div className="select_box">
              <select>
                <option value="">Country</option>
              </select>
            </div>
          </Col>
          <Col sm={3}>
            <div className="inputField">
              <input type="text" required="required" />
              <label>PinCode</label>
            </div>
          </Col>
          <Col sm={3}>
            <div className="inputField">
              <input type="text" required="required" />
              <label>Phone No</label>
            </div>
          </Col>
        </Row>
        <Row style={{ marginBottom: "1rem" }}>
          <Col sm={3}>
            <div>
              <label>
                <b>Is permanent address same as present address ?</b>
              </label>
            </div>
          </Col>
          <Col sm={1}>
            <Form.Group>
              <div className="boxField input">
                {/* className="CheckBoxField" */}

                {/* <input  className="largerCheckbox" type="checkbox" value="No" /> */}
                <input
                  type="checkbox"
                  value="No"
                  checked={!isChecked}
                  onChange={handleNoCheckboxChange}
                />
                <label>No </label>
              </div>
            </Form.Group>
          </Col>
          <Col sm={1}>
            <Form.Group>
              <div className="boxField input">
                {/* <label>Yes</label> */}
                {/* <input  className="largerCheckbox" type="checkbox" value="Yes" /> */}
                <input
                  type="checkbox"
                  value="Yes"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
                <label>Yes</label>
              </div>
            </Form.Group>
          </Col>
        </Row>
        {isChecked ? (
          <div></div>
        ) : (
          <div>
            <Row style={{ marginBottom: "1rem" }}>
              <Col sm={6}>
                <div>
                  <label>
                    <b>Permanent Address</b>
                  </label>
                </div>
              </Col>
            </Row>
            <Row style={{ marginBottom: "1rem" }}>
              <Col sm={3}>
                <div className="inputField">
                  <input type="text" required="required" />
                  <label>Flat/Plot No</label>
                </div>
              </Col>
              <Col sm={3}>
                <div className="inputFieldWithoutStar">
                  <input type="text" required="required" />
                  <label>Street</label>
                </div>
              </Col>
              <Col sm={3}>
                <div className="inputFieldWithoutStar">
                  <input type="text" required="required" />
                  <label>Locality</label>
                </div>
              </Col>
              <Col sm={3}>
                <div className="inputField">
                  <input type="text" required="required" />
                  <label>Address Line 1</label>
                </div>
              </Col>
            </Row>
            <Row style={{ marginBottom: "1rem" }}>
              <Col sm={3}>
                <div className="select_box">
                  <select>
                    <option value="">City</option>
                  </select>
                </div>
              </Col>
              <Col sm={3}>
                <div className="select_box">
                  <select>
                    <option value="">Country</option>
                  </select>
                </div>
              </Col>
              <Col sm={3}>
                <div className="inputField">
                  <input type="text" required="required" />
                  <label>PinCode</label>
                </div>
              </Col>
              <Col sm={3}>
                <div className="inputField">
                  <input type="text" required="required" />
                  <label>Phone No</label>
                </div>
              </Col>
            </Row>
          </div>
        )}
      </Form>
    </Fragment>
  );
};
export default Address;
