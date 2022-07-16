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
  const {
    InsuranceView,
    insuranceData,
    insuranceTopUpView,
    premiumView,
    insuranceTopUpData,
    premiumViewData,
    UpdateInsurance,
  } = useContext(EmployeeProfileContext);

  console.log("insuranceData", insuranceData);
  console.log("insuranceTopUpData", insuranceTopUpData);
  const [sumInsured, setSumInsured] = useState("");
  const [premiumAmnt, setPremiumAmnt] = useState("");
  const [sumInsuredId, setSumInsuredId] = useState("");
  const [year, setYear] = useState();
  const [yearError, setYearError] = useState(false);
  const [sumValueError, setSumValueError] = useState(false);
  useEffect(() => {
    InsuranceView(user.employeeId);
  }, []);
  useEffect(() => {
    if (year !== null && year !== undefined && year !== "") {
      insuranceTopUpView(year);
    }
  }, [year]);

  useEffect(() => {
    if (
      sumInsuredId !== "" &&
      sumInsuredId !== null &&
      sumInsuredId !== undefined &&
      user !== "" &&
      user !== null &&
      user !== undefined &&
      Object.keys(user).length !== 0
    ) {
      premiumView(sumInsuredId, user.employeeId);
    }
  }, [sumInsuredId]);
  console.log("premiumViewData", premiumViewData);

  useEffect(() => {
    if (
      premiumViewData !== "" &&
      premiumViewData !== null &&
      premiumViewData !== undefined &&
      Object.keys(premiumViewData).length !== 0
    ) {
      setPremiumAmnt(premiumViewData.premiumAmt);
    } else {
      setPremiumAmnt("");
    }
  }, [premiumViewData]);
  useEffect(() => {
    if (
      insuranceTopUpData !== null &&
      insuranceTopUpData !== undefined &&
      Object.keys(insuranceTopUpData).length !== 0
    ) {
      console.log("insuranceTopUpData", insuranceTopUpData, sumInsured);
      if (
        sumInsured !== "" &&
        sumInsured !== null &&
        sumInsured !== undefined
      ) {
        var premiumValue = insuranceTopUpData.filter(
          (item) => item.sum == sumInsured
        );
        if (
          premiumValue !== null &&
          premiumValue !== undefined &&
          Object.keys(premiumValue).length !== 0
        ) {
          console.log("premiumAmnt", premiumValue[0]);
          setSumInsuredId(premiumValue[0].insuranceNominationId);
        } else {
          setSumInsuredId(0);
        }
        // setPremiumAmnt(premiumValue[0].premiumAmt);
      }
    }
  }, [insuranceTopUpData, sumInsured]);

  useEffect(() => {
    if (
      insuranceData !== null &&
      insuranceData !== undefined &&
      Object.keys(insuranceData).length !== 0
    ) {
      if (
        insuranceData[0].sumInsured !== null &&
        insuranceData[0].sumInsured !== undefined &&
        insuranceData[0].sumInsured !== "" &&
        insuranceData[0].sumInsured !== 0
      ) {
        setSumInsured(insuranceData[0].sumInsured);
      } else {
        setSumInsured("");
      }
      if (
        insuranceData[0].premiumAmount !== null &&
        insuranceData[0].premiumAmount !== undefined &&
        insuranceData[0].premiumAmount !== "" &&
        insuranceData[0].premiumAmount !== 0
      ) {
        setPremiumAmnt(insuranceData[0].premiumAmount);
      } else {
        setPremiumAmnt("");
      }
      if (
        insuranceData[0].year !== null &&
        insuranceData[0].year !== undefined &&
        insuranceData[0].year !== "" &&
        insuranceData[0].year !== 0
      ) {
        setYear(insuranceData[0].year);
      } else {
        setYear("");
      }
    }
  }, [insuranceData]);

  const DropDownsValidation = (item, setError) => {
    console.log("sumInsured", sumInsured);
    if (item !== "" && item !== null && item !== undefined) {
      setError(false);
      return true;
    } else {
      setError(true);
      return false;
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      insuranceData !== null &&
      insuranceData !== undefined &&
      Object.keys(insuranceData).length !== 0 &&
      (DropDownsValidation(year, setYearError) === true) &
        (DropDownsValidation(sumInsured, setSumValueError) === true)
    ) {
      insuranceData.map((item, i) => {
        item.sumInsured = parseInt(sumInsured);
        item.premiumAmount = parseInt(premiumAmnt);
        item.year = parseInt(year);
        item.dob = moment(item.dob).format("DD-MM-YYY");
      });
      console.log("data insurance", insuranceData);
      UpdateInsurance(insuranceData);
    }
  };
  const changeYear = (e) => {
    setPremiumAmnt("");
    setSumInsured("");
    setYear(e.target.value);
  };
  return (
    <Fragment>
      <Form>
        <label>
          <b>Insurance Nomination Details :</b>
        </label>

        {insuranceData !== null &&
                  insuranceData !== undefined &&
                  insuranceData.length > 0 &&
                  insuranceData.map((item,i) =>{ 
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
                  <label className="itemResult">{item.gender?item.gender:"NA"}</label>
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
                  <label className="itemResult">{item.age?item.age:"NA"}</label>
                </Col>
                <Col sm={3}>
                  <label>
                    <b>Blood Group</b>
                  </label>
                  <br />
                  <label className="itemResult">{item.bloodGroup?item.bloodGroup:"NA"}</label>
                </Col>
              </Row>
            </div>
          );
        })}
        <Row>
          <Col>
            <label>
              <b>Top-Up YOY Declaration:</b>
            </label>
          </Col>
        </Row>
        <Row style={{ marginTop: "1rem" }}>
          <Col sm={3}>
            <label>
              <b>Year</b>
            </label>
            <br />
            <Form.Group>
              <Form.Control
                type="number"
                name="year"
                // className="text-primary"
                value={year}
                onChange={changeYear}
                required
                placeholder="Year"
                // disabled={disabled}
                style={yearError ? { borderColor: "red" } : {}}
              />
              {yearError ? (
                <p style={{ color: "red" }}>Please enter valid year</p>
              ) : (
                <p></p>
              )}
            </Form.Group>
          </Col>
          <Col sm={3}>
            <label>
              <b>Sum Insured</b>
            </label>
            <br />
            <Form.Group>
              <Form.Control
                as="select"
                name="insuredAmount"
                value={sumInsured}
                onChange={(e) => setSumInsured(e.target.value)}
                required
                style={sumValueError ? { borderColor: "red" } : {}}
              >
                <option value="">Select Value</option>
                {insuranceTopUpData !== null &&
                  insuranceTopUpData !== undefined &&
                  insuranceTopUpData.length > 0 &&
                  insuranceTopUpData.map((item) => {
                    return (
                      <option key={item.insuranceNominationId}>
                        {item.sum}
                      </option>
                    );
                  })}
              </Form.Control>
              {sumValueError ? (
                <p style={{ color: "red" }}> &nbsp; *Please select Value</p>
              ) : (
                <p></p>
              )}
            </Form.Group>
          </Col>
          <Col sm={3}>
            <label>
              <b>Premium Amount</b>
            </label>
            <br />
            <label className="itemResult">{premiumAmnt}</label>
          </Col>
          <div
            style={{
              marginTop: "2rem",
              marginBottom: "1rem",
              textAlign: "right",
            }}
          >
            <button className="profileButtons" onClick={submitHandler}>
              Submit
            </button>
          </div>
        </Row>
      </Form>
    </Fragment>
  );
};
export default Insurance;
