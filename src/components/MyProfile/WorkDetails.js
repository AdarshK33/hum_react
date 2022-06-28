import React, {
  Fragment,
  useState,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { AppContext } from "../../context/AppState";
import { PermissionContext } from "../../context/PermissionState";
import moment from "moment";

const WorkDetails = () => {
  const { user } = useContext(AppContext);
  const { rolePermission, locationDetails, locationDetailsList } =
    useContext(PermissionContext);
  const [locationName, setLocationName] = useState("");
  useEffect(() => {
    locationDetails();
  }, []);
  console.log("locationDetailsList", locationDetailsList);
  useEffect(() => {
    if (
      user !== null &&
      user !== undefined &&
      Object.keys(user).length !== 0 &&
      locationDetailsList &&
      locationDetailsList !== null &&
      locationDetailsList !== undefined &&
      Object.keys(locationDetailsList).length !== 0
    ) {
      locationDetailsList.map((item, i) => {
        if (item.locationId === user.locationId) {
          setLocationName(item.locationName);
        }
      });
    }
  }, [locationDetailsList, user]);
  return (
    <Fragment>
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
            <label className="itemResult">{user.email}</label>
          </Col>
          <Col sm={3}>
            <label>
              <b>Fed Id</b>
            </label>
            <br />
            <label className="itemResult">{user.fedId}</label>
          </Col>
          <Col sm={3}>
            <label>
              <b>Contract Type</b>
            </label>
            <br />
            <label className="itemResult">{user.contractType}</label>
          </Col>
          <Col sm={3}>
            <label>
              <b>Department</b>
            </label>
            <br />
            <label className="itemResult">{user.department}</label>
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
            <label className="itemResult">{user.position}</label>
          </Col>
          <Col sm={3}>
            <label>
              <b>Designation</b>
            </label>
            <br />
            <label className="itemResult">{user.designation}</label>
          </Col>
          <Col sm={3}>
            <label>
              <b>Sport</b>
            </label>
            <br />
            <label className="itemResult">{user.sport}</label>
          </Col>
          <Col sm={3}>
            <label>
              <b>Cost Center</b>
            </label>
            <br />
            <label className="itemResult">{user.costCentre}</label>
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
            <label className="itemResult">{locationName}</label>
          </Col>
          <Col sm={3}>
            <label>
              <b>Company Name</b>
            </label>
            <br />
            <label className="itemResult">{user.company}</label>
          </Col>
          <Col sm={3}>
            <label>
              <b>Date Of Transfer</b>
            </label>
            <br />
            <label className="itemResult">
            {user.dateOfTransfer!==null? moment(user.dateOfTransfer).format("DD-MM-YYYY"):"NA"}
            </label>
          </Col>
          <Col sm={3}>
            <label>
              <b>Manager Id</b>
            </label>
            <br />
            <label className="itemResult">{user.managerId}</label>
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
            <label className="itemResult">{user.managerName}</label>
          </Col>
          <Col sm={3}>
            <label>
              <b>Probation Period</b>
            </label>
            <br />
            <label className="itemResult">{user.probationPeriod}</label>
          </Col>
          <Col sm={3}>
            <label>
              <b>System Role</b>
            </label>
            <br />
            <label className="itemResult">
              General User</label>
          </Col>
          <Col sm={3}>
            <label>
              <b>Recruitment Source</b>
            </label>
            <br />
            <label className="itemResult">{user.recruitmentSource}</label>
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
            <label className="itemResult">{user.ngoName}</label>
          </Col>
        </Row>
      </Form>
    </Fragment>
  );
};
export default WorkDetails;
