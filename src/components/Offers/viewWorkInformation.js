import React, { Fragment, useState, useContext, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import "./offers.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ClusterContext } from "../../context/ClusterState";
import { AdminContext } from "../../context/AdminState";
import { OfferContext } from "../../context/OfferState";
import { RosterContext } from "../../context/RosterState";
import { AppContext } from "../../context/AppState";

const ViewWorkInformation = () => {
  const [state, setState] = useState({
    employmentType: "",
    department: "",
    position: "",
    designation: "",
    sports: "",
    probation: "",
    recuritment: "",
    ngoDetail: "",
    internship: "",
    noticePeriod: "",
  });
  const [dateOfJoining, setDateOFJoining] = useState();
  const [costCenter, setCostCenter] = useState("");
  const [dateOfLeaving, setDateOFLeaving] = useState();
  const { viewSports, sportsNames } = useContext(ClusterContext);
  const { CostCenter, costCenterList } = useContext(AdminContext);
  const [college, setCollege] = useState("");
  const {
    departmentView,
    departmentName,
    designationView,
    designationName,
    locationView,
    locationName,
    createCandidateWork,
    candidateData,
    updateCandidateWork,
    stateList,
    stateData,
    cityData,
    cityList,
  } = useContext(OfferContext);
  const { viewContractTypes, shiftContractNames } = useContext(RosterContext);
  const { user } = useContext(AppContext);
  const [stateValue, setStateValue] = useState();
  const [city, setCity] = useState();

  useEffect(() => {
    viewSports();
    CostCenter();
    departmentView();
    viewContractTypes();
    designationView();
    stateData();
    console.log("candidateData work info", candidateData);
  }, []);

  useEffect(() => {
    let workData =
      candidateData !== null &&
      candidateData !== undefined &&
      candidateData.workInformation;

    if (workData !== null && workData !== undefined) {
      setState({
        employmentType: workData.contractType,
        department: workData.department,
        position: workData.position,
        designation: workData.designation,
        sports: workData.sportId !== null ? workData.sportId : "",
        probation: workData.probationPeriod,
        recuritment: workData.recruitmentSource,
        ngoDetail: workData.ngoDetails !== null ? workData.ngoDetails : "",
        internship: workData.internshipPeriod,
        noticePeriod: workData.noticePeriod,
      });
      setDateOFJoining(new Date(workData.dateOfJoin));
      setDateOFLeaving(new Date(workData.dateOfLeaving));
      setCostCenter(workData.costCentre);
      locationView(workData.costCentre);
      setCollege(workData.collegeName);
    }
  }, [candidateData]);

  useEffect(() => {
    setStateValue(locationName.stateId);
    setCity(locationName.cityId);
    cityData(locationName.stateId);
    console.log("state in useEffect", locationName);
  }, [locationName]);

  return (
    <Fragment>
      <Form>
        <Row>
          <Col sm={3}>
            <Form.Group>
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type="text"
                value={user.company}
                className="form-input"
                name="company"
                readOnly
              />
            </Form.Group>
          </Col>
          <Col sm={3}>
            <Form.Group>
              <Form.Label>Type of Employment</Form.Label>
              {/* <Form.Control
                as="select"
                value={state.employmentType}
                className="form-input disable-arrow"
                name="employmentType"
                readOnly
                disabled="true"
              >
                {shiftContractNames !== null &&
                  shiftContractNames !== undefined &&
                  shiftContractNames.length > 0 &&
                  shiftContractNames.map((item) => {
                    return (
                      <option key={item.typeId}>{item.contractType}</option>
                    );
                  })}
              </Form.Control> */}
              <Form.Control
                type="text"
                value={state.employmentType}
                className="form-control form-input"
                readOnly
              />
            </Form.Group>
          </Col>
          <Col sm={3}>
            {state.employmentType === "Internship" ? (
              <Form.Group className="reactDate">
                <Form.Label>Manager Name/Id</Form.Label>
                <Form.Control
                  type="text"
                  value={user.employeeId}
                  className="form-input"
                  readOnly
                />
              </Form.Group>
            ) : (
              <Form.Group className="reactDate">
                <Form.Label>Date of Joining</Form.Label>
                <DatePicker
                  className="form-control form-input"
                  selected={dateOfJoining}
                  dateFormat="yyyy-MM-dd"
                  placeholderText="Date of Joining"
                  readOnly
                />
              </Form.Group>
            )}
          </Col>
          <Col sm={3}>
            <Form.Group>
              <Form.Label>Department</Form.Label>
              <Form.Control
                as="select"
                value={state.department}
                className="form-input disable-arrow"
                name="department"
                readOnly
                disabled="true"
              >
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
        <Row>
          <Col sm={3}>
            {state.employmentType === "Internship" ? (
              <Form.Group className="reactDate">
                <Form.Label>College Name</Form.Label>
                <Form.Control
                  type="text"
                  value={college}
                  placeholder="Enter College Name"
                  className="form-input"
                  disabled="true"
                />
              </Form.Group>
            ) : (
              <Form.Group>
                <Form.Label>Position</Form.Label>
                <Form.Control
                  as="select"
                  value={state.position}
                  className="form-input disable-arrow"
                  name="position"
                  readOnly
                  disabled="true"
                >
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
            )}
          </Col>
          <Col sm={3}>
            <Form.Group>
              <Form.Label>Designation</Form.Label>
              {state.employmentType === "Internship" ? (
                <Form.Control
                  type="text"
                  value="Intern"
                  className="form-input"
                  readOnly
                />
              ) : (
                <Form.Control
                  as="select"
                  value={state.designation}
                  className="form-input disable-arrow"
                  name="designation"
                  readOnly
                  disabled="true"
                >
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
              )}
            </Form.Group>
          </Col>
          <Col sm={3}>
            <Form.Group>
              <Form.Label>Cost Center</Form.Label>
              <Form.Control
                as="select"
                value={costCenter}
                className="form-input disable-arrow"
                name="costCenter"
                readOnly
                disabled="true"
              >
                {costCenterList !== null &&
                  costCenterList !== undefined &&
                  costCenterList.length > 0 &&
                  costCenterList.map((item) => {
                    return (
                      <option key={item.costCenterId}>
                        {item.costCentreName}
                      </option>
                    );
                  })}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col sm={3}>
            <Form.Group>
              <Form.Label>Sports</Form.Label>
              {state.employmentType === "Internship" ? (
                <Form.Control
                  type="text"
                  value="N/A"
                  readOnly
                  className="form-input"
                />
              ) : (
                <Form.Control
                  as="select"
                  value={state.sports}
                  className="form-input disable-arrow"
                  name="sports"
                  disabled="true"
                >
                  {sportsNames !== null &&
                    sportsNames !== undefined &&
                    sportsNames.length > 0 &&
                    sportsNames.map((item) => {
                      return (
                        <option key={item.sportId} value={item.sportId}>
                          {item.sportName}
                        </option>
                      );
                    })}
                </Form.Control>
              )}
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col sm={3}>
            <Form.Group>
              <Form.Label>Work Location state</Form.Label>
              <Form.Control
                type="text"
                value={locationName.stateName}
                className="form-input"
                readOnly
                disabled="true"
              />
            </Form.Group>
          </Col>
          <Col sm={3}>
            <Form.Group>
              <Form.Label>Work Location City</Form.Label>
              <Form.Control
                type="text"
                value={locationName.cityName}
                className="form-input"
                readOnly
                disabled="true"
              />
            </Form.Group>
          </Col>

          <Col sm={3}>
            {state.employmentType === "Internship" ? (
              <Form.Group className="reactDate">
                <Form.Label>Date of Joining</Form.Label>
                <DatePicker
                  className="form-control form-input"
                  selected={dateOfJoining}
                  required
                  dateFormat="yyyy-MM-dd"
                  placeholderText="Date of Joining"
                  disabled="true"
                />
              </Form.Group>
            ) : (
              <Form.Group>
                <Form.Label>Probation Period</Form.Label>
                <Form.Control
                  as="select"
                  value={state.probation}
                  className="form-input disable-arrow"
                  name="probation"
                  disabled="true"
                >
                  <option value="1">1 Month</option>
                  <option value="2">2 Month</option>
                  <option value="3">3 Month</option>
                </Form.Control>
              </Form.Group>
            )}
          </Col>
          <Col sm={3}>
            {state.employmentType === "Internship" ? (
              <Form.Group className="reactDate">
                <Form.Label>Date of Leaving</Form.Label>
                <DatePicker
                  className="form-control form-input"
                  selected={dateOfLeaving}
                  required
                  dateFormat="yyyy-MM-dd"
                  placeholderText="Date of Leaving"
                  disabled="true"
                />
              </Form.Group>
            ) : (
              <Form.Group>
                <Form.Label>Recuritment Source</Form.Label>
                <Form.Control
                  as="select"
                  value={state.recuritment}
                  className="form-input disable-arrow"
                  name="recuritment"
                  readOnly
                  disabled="true"
                >
                  <option>Employee Referral</option>
                  <option>LinkedIn</option>
                  <option>Monster</option>
                  <option>Naukri</option>
                  <option>Others</option>
                  <option>Recruitment Agency</option>
                  <option>NGO</option>
                </Form.Control>
              </Form.Group>
            )}
          </Col>
        </Row>
        <Row>
          <Col sm={3}>
            {state.employmentType === "Internship" ? (
              <Form.Group>
                <Form.Label>Internship Duration</Form.Label>
                <Form.Control
                  as="select"
                  value={state.internship}
                  className="form-input disable-arrow"
                  name="internship"
                  disabled="true"
                  required
                >
                  <option value="">Select Internship Duration</option>
                  <option value="1">1 Month</option>
                  <option value="2">2 Month</option>
                  <option value="3">3 Month</option>
                  <option value="4">4 Month</option>
                  <option value="5">5 Month</option>
                  <option value="6">6 Month</option>
                </Form.Control>
              </Form.Group>
            ) : (
              <Form.Group>
                <Form.Label>Notice Period</Form.Label>
                <Form.Control
                  as="select"
                  value={state.noticePeriod}
                  className="form-input disable-arrow"
                  name="noticePeriod"
                  disabled="true"
                >
                  <option value="">Select Notice Period</option>
                  <option value="1">1 Month</option>
                  <option value="2">2 Month</option>
                  <option value="3">3 Month</option>
                </Form.Control>
              </Form.Group>
            )}
          </Col>
        </Row>
        {state.recuritment === "NGO" ? (
          <Row>
            <Col sm={12}>
              <Form.Group>
                <Form.Label>Enter NGO Detail</Form.Label>
                <Form.Control
                  type="text"
                  value={state.ngoDetail}
                  className="form-input"
                  readOnly
                  name="ngoDetail"
                  placeholder="Enter NGO Detail"
                  disabled="true"
                />
              </Form.Group>
            </Col>
          </Row>
        ) : (
          ""
        )}
      </Form>
    </Fragment>
  );
};

export default ViewWorkInformation;
