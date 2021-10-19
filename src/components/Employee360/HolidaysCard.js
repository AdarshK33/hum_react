import React, { useState, useContext, useEffect } from "react";
import Chart from "react-google-charts";
import { Row, Col, Form, Cards } from "react-bootstrap";
import ScrollArea from "react-scrollbar";
import { Fragment } from "react";
import { Employee360Context } from "../../context/Employee360State";

const HolidaysCard = () => {
  const { HolidaysView, HolidaysList } = useContext(Employee360Context);

  useEffect(() => {
    HolidaysView();
  }, []);
  console.log("HolidaysList", HolidaysList);
  return (
    <Fragment>
      {HolidaysList !== null &&
      HolidaysList !== undefined &&
      HolidaysList !== "" &&
      Object.keys(HolidaysList).length !== 0 ? (
        <ScrollArea
          speed={0.4}
          // className="area"
          // contentClassName="content"
          smoothScrolling={true}
          horizontal={false}
          style={{ zIndex: "0" }}
        >
          <table style={{ width: "96%" }}>
            <tbody>
              {HolidaysList.map((item) => {
                return (
                  <tr>
                    <td
                      style={{
                        backgroundColor: "#f2f2f2",
                        width: "50px",
                        border: "1px solid white",
                      }}
                    >
                      <div className="rosterColumn1">
                        <label
                          className={
                            item.date.length === 1 ? "dateNumAdj" : "dateNum"
                          }
                        >
                          {item.date.length === 1 ? "0" + item.date : item.date}{" "}
                        </label>{" "}
                        <label
                          style={{
                            marginLeft: "0.5rem",
                          }}
                        >
                          {item.monthName}
                        </label>
                      </div>
                    </td>
                    <td>
                      <div className="holidayColumn2">
                        <label>{item.day}</label>
                        <div className="rosterContent">{item.holidayName}</div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </ScrollArea>
      ) : (
        <h4 style={{ textAlign: "center", width: "100%", marginTop: "50%" }}>
          No Records Found
        </h4>
      )}
    </Fragment>
  );
};
export default HolidaysCard;
