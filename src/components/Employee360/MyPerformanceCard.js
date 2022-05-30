import React, { useState, useContext, useEffect } from "react";
import Chart from "react-google-charts";
import { Row, Col, Form, Button, Container, Modal } from "react-bootstrap";
import { Fragment } from "react";

import { Employee360Context } from "../../context/Employee360State";

const MyPerformanceCard = () => {
  const { MyPerformanceView, myPerformanceData } =
    useContext(Employee360Context);
  useEffect(() => {
    MyPerformanceView();
  }, []);
  const PerformanceOption = {
    slices: [
      {
        color: "#bbb",
      },
      {
        color: "#006ebb",
      },
      {
        color: "orange",
      },
    ],
    legend: "none",
    chartArea: {
      left: 10,
      top: 10,
      width: "100%",
      height: "80%",
    },
    pieSliceText: "none",
    pieHole: 0.6,
  };
  return (
    <Fragment>
      {myPerformanceData !== null &&
      myPerformanceData !== undefined &&
      Object.keys(myPerformanceData).length !== 0 &&
      myPerformanceData.totalWorkingHours !== 0 ? (
        <div>
          <div style={{ marginTop: "1rem" }}>
            <Chart
              width={"100%"}
              height={"150px"}
              chartType="PieChart"
              data={[
                ["Hours Type", "Hours"],
                [
                  "Remaining Hours",
                  (((isNaN(parseInt(myPerformanceData.totalWorkingHours)) == true)?0:parseInt(myPerformanceData.totalWorkingHours)) -
                  ((isNaN(parseInt(myPerformanceData.workedHours)) == true)?0:parseInt(myPerformanceData.workedHours))), 
                  // +
                  // (isNaN(parseInt(myPerformanceData.additionalHours)) == true)?0:parseInt(myPerformanceData.additionalHours)),
                ],
                ["Working Hours",(isNaN(parseInt(myPerformanceData.workedHours)) == true)?0:parseInt(myPerformanceData.workedHours)],
                // ["Additional Hours",((isNaN(parseInt(myPerformanceData.additionalHours)) == true)?0:parseInt(myPerformanceData.additionalHours))],
              ]}
              options={PerformanceOption}
            />
          </div>

          <Row style={{ marginTop: "3rem" }}>
            <Col sm={12}>
              <label className="workingHours">
                <b>
                  {(isNaN(parseInt(myPerformanceData.workedHours)) == true)?0:parseInt(myPerformanceData.workedHours)}/
                  {((isNaN(parseInt(myPerformanceData.totalWorkingHours)) == true)?0:parseInt(myPerformanceData.totalWorkingHours))}
                </b>
              </label>

              <label className="AdditionalHours">
                <b>
                  {" "}
                  {(isNaN(parseInt(myPerformanceData.additionalHours)) == true)?0:parseInt(myPerformanceData.additionalHours)}
                  {/* /
                  {((isNaN(parseInt(myPerformanceData.totalWorkingHours)) == true)?0:parseInt(myPerformanceData.totalWorkingHours))} */}
                </b>
              </label>
            </Col>
          </Row>
          <Row>
            <Col>
              <label className="workingHoursLabel">Working Hours</label>
              <label className="AdditionalHoursLabel">Additional Hours</label>
            </Col>
          </Row>
          <Row
            style={{
              borderTop: "2px solid #006ebb",
              width: "95%",
              marginLeft: "0.5rem",
              marginRight: "1rem",
              marginTop: "2rem",
              marginBottom: "2rem",
            }}
          ></Row>
          <Row style={{ marginTop: "4rem", marginLeft: "1rem" }}>
            <label>{"Total Working Hours  " + "  "} </label>{" "}
            &nbsp;&nbsp;&nbsp;
            <label className="totalHours">
              {" "}
              {(isNaN(parseInt(myPerformanceData.workedHours)) == true)?0:parseInt(myPerformanceData.workedHours) +
                (isNaN(parseInt(myPerformanceData.additionalHours)) == true)?0:parseInt(myPerformanceData.additionalHours)}
              {/* /{((isNaN(parseInt(myPerformanceData.totalWorkingHours)) == true)?0:parseInt(myPerformanceData.totalWorkingHours))} */}
            </label>
          </Row>
        </div>
      ) : (
        <h4 style={{ textAlign: "center", width: "100%", marginTop: "50%" }}>
          No Records Found
        </h4>
      )}
    </Fragment>
  );
};
export default MyPerformanceCard;
