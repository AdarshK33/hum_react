import React, { useState, useContext, useEffect } from "react";
import Chart from "react-google-charts";
import { Row, Col, Form, Cards } from "react-bootstrap";
import ScrollArea from "react-scrollbar";
import { Fragment } from "react";

const HolidaysCard = () => {
  return (
    <Fragment>
      <ScrollArea
        speed={0.4}
        className="area"
        contentClassName="content"
        smoothScrolling={true}
        horizontal={false}
      >
        <table style={{ width: "96%" }}>
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
                <div className="holidayColumn2">
                  <label>Monday </label>
                  <div className="rosterContent">Independence day</div>
                </div>
              </td>
            </tr>
            <tr>Hiii</tr>
            <tr>Hiii</tr>
            <tr>Hiii</tr>
            <tr>Hiii</tr>
            <tr>Hiii</tr>
            <tr>Hiii</tr>
            <tr>Hiii</tr>
            <tr>Hiii</tr>
            <tr>Hiii</tr>
            <tr>Hiii</tr>
            <tr>Hiii</tr>
            <tr>Hiii</tr>
            <tr>Hiii</tr>
            <tr>Hiii</tr>
            <tr>Hiii</tr>
            <tr>Hiii</tr>
            <tr>Hiii</tr>
            <tr>Hiii</tr>
          </tbody>
        </table>
      </ScrollArea>
    </Fragment>
  );
};
export default HolidaysCard;
