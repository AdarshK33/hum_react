import React, { useState, useContext, useEffect } from "react";
import Chart from "react-google-charts";
import { Row, Col, Form, Cards } from "react-bootstrap";
import Select from "react-select";
import { Fragment } from "react";

const Roster = () => {
  const [resultData, setResultData] = useState([]);
  const data = [];

  const handleShift = (type) => {
    if (type === "minus") {
      console.log(type);
      let tempArr = [];

      tempArr.push({
        date: data[1].date,
        month: data[1].month,
        reason: data[1].reason,
      });
      tempArr.push({
        date: data[2].date,
        month: data[2].month,
        reason: data[2].reason,
      });
      setResultData(tempArr);
    } else {
      console.log(type);
    }
  };
  return (
    <Fragment>
      <div className="rosterHead">
        <div className="rosterSelectDiv">
          <div
            type="button"
            // onClick={() => {
            //   handleShift("minus");
            // }}
            className="slidderLeft"
          >
            &#60;
          </div>
          <div>
            <Select
              options={[
                { value: "Week 1", label: "Week 1" },
                { value: "Week 2", label: "Week 2" },
                { value: "Week 3", label: "Week 3" },
              ]}
              className="rosterSelect"
            />
          </div>
          <div
            ype="button"
            // onClick={() => {
            //   handleShift("plus");
            // }}
            className="slidderRight"
          >
            &#62;
          </div>
        </div>
        <div className="weekCountLabel">Jan 19th to 26th</div>
      </div>
      <table>
        <tbody>
          <tr>
            <td
              style={{
                backgroundColor: "#f2f2f2",
                width: "50px",
                border: "1px solid white",
              }}
            >
              <div className="rosterColumn1">
                <label className="dateNum">28 </label>{" "}
                <label
                  style={{
                    marginLeft: "0.5rem",
                  }}
                >
                  Mon
                </label>
              </div>
            </td>
            <td>
              <div className="rosterColumn2">
                <label>8am_9pm </label>
                <div className="rosterContent">General shift</div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </Fragment>
  );
};
export default Roster;
