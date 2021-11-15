import React, {
  Fragment,
  useState,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
// import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { Search, PlusCircle, MinusCircle } from "react-feather";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { OnBoardContext } from "../../context/OnBoardState";
import Address from "./Address";
import EmergencyContact from "./EmergencyContact";
import BankDetails from "./BankDetails";
import moment from "moment";

const WorkDetails = () => {
  return (
    <Fragment>
      <ToastContainer />
      <Form>
        <label>
          <b>Work :</b>
        </label>
        <Row
          style={{
            borderTop: "2px solid #006ebb",
            width: "98%",
            marginRight: "1rem",
            marginBottom: "1rem",
            marginLeft: "-2px",
          }}
        ></Row>
        <Row
          style={{
            marginBottom: "2rem",
          }}
        >
          <Col sm={3}>
            <label>
              <b>Email Id</b>
            </label>
            <br />
            <label className="itemResult">IDDDDD</label>
          </Col>
          <Col sm={3}>
            <label>
              <b>Fed Id</b>
            </label>
            <br />
            <label className="itemResult">IDDDDD</label>
          </Col>
          <Col sm={3}>
            <label>
              <b>Contract Type</b>
            </label>
            <br />
            <label className="itemResult">IDDDDD</label>
          </Col>
          <Col sm={3}>
            <label>
              <b>Department</b>
            </label>
            <br />
            <label className="itemResult">IDDDDD</label>
          </Col>
        </Row>
        <Row
          style={{
            marginBottom: "2rem",
          }}
        >
          <Col sm={3}>
            <label>
              <b>Position</b>
            </label>
            <br />
            <label className="itemResult">IDDDDD</label>
          </Col>
          <Col sm={3}>
            <label>
              <b>Designation</b>
            </label>
            <br />
            <label className="itemResult">IDDDDD</label>
          </Col>
          <Col sm={3}>
            <label>
              <b>Sport</b>
            </label>
            <br />
            <label className="itemResult">IDDDDD</label>
          </Col>
          <Col sm={3}>
            <label>
              <b>Cost Centre</b>
            </label>
            <br />
            <label className="itemResult">IDDDDD</label>
          </Col>
        </Row>
        <Row
          style={{
            marginBottom: "2rem",
          }}
        >
          <Col sm={3}>
            <label>
              <b>Work Location</b>
            </label>
            <br />
            <label className="itemResult">IDDDDD</label>
          </Col>
          <Col sm={3}>
            <label>
              <b>Company Name</b>
            </label>
            <br />
            <label className="itemResult">IDDDDD</label>
          </Col>
          <Col sm={3}>
            <label>
              <b>Date Of Transfer</b>
            </label>
            <br />
            <label className="itemResult">IDDDDD</label>
          </Col>
          <Col sm={3}>
            <label>
              <b>Manager Id</b>
            </label>
            <br />
            <label className="itemResult">IDDDDD</label>
          </Col>
        </Row>
        <Row
          style={{
            marginBottom: "2rem",
          }}
        >
          <Col sm={3}>
            <label>
              <b>Manager Name</b>
            </label>
            <br />
            <label className="itemResult">IDDDDD</label>
          </Col>
          <Col sm={3}>
            <label>
              <b>Probation Period</b>
            </label>
            <br />
            <label className="itemResult">IDDDDD</label>
          </Col>
          <Col sm={3}>
            <label>
              <b>System Role</b>
            </label>
            <br />
            <label className="itemResult">IDDDDD</label>
          </Col>
          <Col sm={3}>
            <label>
              <b>Recruitment Source</b>
            </label>
            <br />
            <label className="itemResult">IDDDDD</label>
          </Col>
        </Row>
        <Row
          style={{
            marginBottom: "2rem",
          }}
        >
          <Col sm={3}>
            <label>
              <b>NGO Name</b>
            </label>
            <br />
            <label className="itemResult">IDDDDD</label>
          </Col>
        </Row>
      </Form>
    </Fragment>
  );
};
export default WorkDetails;
