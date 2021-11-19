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

const Insurance = () => {
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
          <b>Insurance Nomination Details :</b>
        </label>
        {/* <Row
          style={{
            borderTop: "2px solid #006ebb",
            width: "98%",
            marginRight: "1rem",
            marginBottom: "1rem",
            marginLeft: "-2px",
          }}
        ></Row> */}
        <Row
          style={{
            marginBottom: "1rem",
          }}
        >
          <Col sm={3}>
            <label>
              <b>Nominee 1</b>
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
            {/* <label className="itemResult">{user.email}</label> */}
          </Col>
          <Col sm={3}>
            <label>
              <b>Relationship</b>
            </label>
            <br />
            {/* <label className="itemResult">{user.fedId}</label> */}
          </Col>
          <Col sm={3}>
            <label>
              <b>Gender</b>
            </label>
            <br />
            {/* <label className="itemResult">{user.contractType}</label> */}
          </Col>
          <Col sm={3}>
            <label>
              <b>Date Of Bith</b>
            </label>
            <br />
            {/* <label className="itemResult">{user.department}</label> */}
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
            {/* <label className="itemResult">{user.position}</label> */}
          </Col>
          <Col sm={3}>
            <label>
              <b>Blood Group</b>
            </label>
            <br />
            {/* <label className="itemResult">{user.designation}</label> */}
          </Col>
        </Row>
      </Form>
    </Fragment>
  );
};
export default Insurance;
