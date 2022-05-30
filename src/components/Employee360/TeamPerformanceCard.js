import React, { useState, useContext, useEffect } from "react";
import Chart from "react-google-charts";
import { Row, Col, Form, Button, Container, Modal } from "react-bootstrap";
import { Fragment } from "react";

import { Employee360Context } from "../../context/Employee360State";

const TeamPerformanceCard = () => {
  const { TeamPerformanceView, teamPerformanceData } =
    useContext(Employee360Context);
    console.log("teamPerformanceData",teamPerformanceData);
  useEffect(() => {
    TeamPerformanceView();
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
      {teamPerformanceData !== null &&
      teamPerformanceData !== undefined &&
      Object.keys(teamPerformanceData).length !== 0 &&
      teamPerformanceData.totalWorkingHours !== 0 ? (
        <div>
          <div style={{ marginTop: "1rem" }}>
            <Chart
              width={"100%"}
              height={"150px"}
              chartType="PieChart"
              data={[
                ["Hours Type", "Hours"],
                [
                  "Remaining Hours",(((isNaN(parseInt(teamPerformanceData.totalWorkingHours)) == true)?0:parseInt(teamPerformanceData.totalWorkingHours))-
                    ((isNaN(parseInt(teamPerformanceData.workedHours)) == true)?0:parseInt(teamPerformanceData.workedHours))),
                    // +
                    // ((isNaN(parseInt(teamPerformanceData.additionalHours)) == true)?0:parseInt(teamPerformanceData.additionalHours)),
                ],
                ["Working Hours",((isNaN(parseInt(teamPerformanceData.workedHours)) == true)?0:parseInt(teamPerformanceData.workedHours))],
                // ["Additional Hours",((isNaN(parseInt(teamPerformanceData.additionalHours)) == true)?0:parseInt(teamPerformanceData.additionalHours))],
              ]}
              options={PerformanceOption}
            />
          </div>

          <Row style={{ marginTop: "3rem" }}>
            <Col sm={12}>
              <label className="workingHours">
                <b>
                  {((isNaN(parseInt(teamPerformanceData.workedHours)) == true)?0:parseInt(teamPerformanceData.workedHours))
                  }/
                  {((isNaN(parseInt(teamPerformanceData.totalWorkingHours)) == true)?0:parseInt(teamPerformanceData.totalWorkingHours))}
                </b>
              </label>

              <label className="AdditionalHours">
                <b>
                  {" "}
                  {((isNaN(parseInt(teamPerformanceData.additionalHours)) == true)?0:parseInt(teamPerformanceData.additionalHours))}
                          {/* /
                  {((isNaN(parseInt(teamPerformanceData.totalWorkingHours)) == true)?0:parseInt(teamPerformanceData.totalWorkingHours))} */}
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
            <label>{"Total Working Hours" + "  "} </label>{" "}
            <label className="totalHours">
              {" "}
              {
                ((isNaN(parseInt(teamPerformanceData.workedHours)) == true)?0:parseInt(teamPerformanceData.workedHours)) +
                ((isNaN(parseInt(teamPerformanceData.additionalHours)) == true)?0:parseInt(teamPerformanceData.additionalHours))}
              {/* /{((isNaN(parseInt(teamPerformanceData.totalWorkingHours)) == true)?0:parseInt(teamPerformanceData.totalWorkingHours))} */}
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
export default TeamPerformanceCard;
