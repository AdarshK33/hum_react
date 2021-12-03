import React, {
  Fragment,
  useState,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { AppContext } from "../../context/AppState";
import { EmployeeProfileContext } from "../../context/EmployeeProfileState";
import moment from "moment";

const Insurance = () => {
  const { user } = useContext(AppContext);
  const { InsuranceView, insuranceData } = useContext(EmployeeProfileContext);
  useEffect(() => {
    InsuranceView();
  }, []);
  console.log("insuranceData", insuranceData);
  return (
    <Fragment>
      <Form>
        <label>
          <b>Insurance Nomination Details :</b>
        </label>

        {insuranceData.map((item, i) => {
          return (
            <div>
              <Row
                style={{
                  marginBottom: "1rem",
                }}
              >
                <Col sm={3}>
                  <label>
                    <b>Nominee {i + 1}</b>
                  </label>
                </Col>
              </Row>
              <Row
                style={{
                  marginBottom: "2rem",
                }}
              >
                <Col sm={3}>
                  <label>
                    <b>Name</b>
                  </label>
                  <br />
                  <label className="itemResult">{item.name}</label>
                </Col>
                <Col sm={3}>
                  <label>
                    <b>Relationship</b>
                  </label>
                  <br />
                  <label className="itemResult">{item.relationship}</label>
                </Col>
                <Col sm={3}>
                  <label>
                    <b>Gender</b>
                  </label>
                  <br />
                  <label className="itemResult">{item.gender}</label>
                </Col>
                <Col sm={3}>
                  <label>
                    <b>Date Of Birth</b>
                  </label>
                  <br />
                  <label className="itemResult">
                    {" "}
                    {moment(item.dob).format("DD-MM-YYYY")}
                  </label>
                </Col>
              </Row>
              <Row
                style={{
                  marginBottom: "2rem",
                }}
              >
                <Col sm={3}>
                  <label>
                    <b>Age</b>
                  </label>
                  <br />
                  <label className="itemResult">{item.age}</label>
                </Col>
                <Col sm={3}>
                  <label>
                    <b>Blood Group</b>
                  </label>
                  <br />
                  <label className="itemResult">{item.bloodGroup}</label>
                </Col>
              </Row>
            </div>
          );
        })}
      </Form>
    </Fragment>
  );
};
export default Insurance;
