import React, {
  Fragment,
  useState,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Employee360Context } from "../../context/Employee360State";
import { EmployeeProfileContext } from "../../context/EmployeeProfileState";
import WorkingBonusList from "./WorkingBonusList";
import { AppContext } from "../../context/AppState";

const HolidayWorkingBonus = () => {
  const { HolidaysView, HolidaysList } = useContext(Employee360Context);
  const { UpdateHolidayWorkingBonus, currentEmpId } = useContext(
    EmployeeProfileContext
  );
  const [HolidayName, setHolidayName] = useState("");
  const [HolidayId, setHolidayId] = useState(0);
  const [HoloidayDate, setHolidayDate] = useState("");
  const [HolidayError, setHolidayError] = useState(false);
  const { user } = useContext(AppContext);

  useEffect(() => {
    HolidaysView();
  }, []);

  const HolidayHandler = (e) => {
    console.log("e.target.value", e.target.value);
    setHolidayName(e.target.value);
    if (
      HolidaysList !== null &&
      HolidaysList !== undefined &&
      Object.keys(HolidaysList).length !== 0
    ) {
      HolidaysList.map((item, i) => {
        if (e.target.value === HolidaysList[i].holidayName) {
          setHolidayId(HolidaysList[i].holidayId);
          setHolidayDate(HolidaysList[i].holidayDate);
        }
      });
    }
  };

  const HolidayValidation = () => {
    if (
      HolidayName !== "" &&
      HolidayName !== undefined &&
      HolidayName !== null
    ) {
      setHolidayError(false);
      console.log("doc name Success");
      return true;
    } else {
      setHolidayError(true);
      console.log("doc name Error");
      return false;
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (HolidayValidation() === true) {
      if (
        HolidaysList !== null &&
        HolidaysList !== undefined &&
        Object.keys(HolidaysList).length !== 0
      ) {
        let data = {
          employeeId: currentEmpId,
          holidayDate: HoloidayDate,
          holidayName: HolidayName,
          holidayId: HolidayId,
        };
        console.log("data", data);
        UpdateHolidayWorkingBonus(data);
      }
    }
  };
  console.log("HolidayId", HolidayId);
  return (
    <Fragment>
      <Row>
        <Col sm={10}>
          <Form.Group>
            <Form.Label>
              <b> Select Holiday </b>
            </Form.Label>
            <Form.Control
              as="select"
              name="holiday"
              value={HolidayName}
              onChange={(e) => HolidayHandler(e)}
              required
              //   style={countryError ? { borderColor: "red" } : {}}
              //   disabled={disabled}
            >
              <option value="">Select Holiday</option>
              {HolidaysList !== null &&
                HolidaysList !== undefined &&
                HolidaysList.length > 0 &&
                HolidaysList.map((item, i) => {
                  return (
                    <option key={item.holidayId}>{item.holidayName}</option>
                  );
                })}
            </Form.Control>
            {HolidayError ? (
              <p style={{ color: "red" }}> Please choose Holiday</p>
            ) : (
              <p></p>
            )}
          </Form.Group>
        </Col>
        <Col sm={2}>
          <div
            style={{
              marginTop: "2rem",
              marginBottom: "1rem",
              textAlign: "right",
              marginLeft: "-1rem",
            }}
          >
            <button className="profileButtons" onClick={submitHandler}>
              Update
            </button>
          </div>
        </Col>
      </Row>
      <WorkingBonusList />
    </Fragment>
  );
};
export default HolidayWorkingBonus;
