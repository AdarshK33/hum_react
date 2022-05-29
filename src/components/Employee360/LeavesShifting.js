import React, { useState, useContext, useEffect } from "react";
import { Row, Col, Form, Button, Modal, Container } from "react-bootstrap";

import { Fragment } from "react";

const LeavesShifting = ({ Data }) => {
  const [resultData, setResultData] = useState([]);
  const [plannedList, setPlannedList] = useState([]);
  const [plannedCount, setPlannedCount] = useState(1);
  const [totalPlannedCount, setTotalPlannedCount] = useState(0);
  useEffect(() => {
    if (Data !== null && Data !== undefined && Object.keys(Data).length !== 0) {
      let tempArr = [];
      Data.map((item, i) => {
        if (
          Data[i].dates !== null &&
          Data[i].dates !== undefined &&
          Object.keys(Data[i].dates).length !== 0
        ) {
          Data[i].dates.map((SUBitem, j) => {
            let splitObj = Data[i].dates[j].split(" ");
            tempArr.push({
              date: splitObj[0],
              month: splitObj[1],
              reason: Data[i].reason,
            });
          });
        }
      });
      setTotalPlannedCount(tempArr.length);
      setPlannedList(tempArr);
    }
  }, [Data]);
  console.log("plannedList", plannedList, totalPlannedCount);
  useEffect(() => {
    if (
      plannedList !== null &&
      plannedList !== undefined &&
      Object.keys(plannedList).length !== 0
    ) {
      let tempArr = [];

      tempArr.push({
        date: plannedList[0].date,
        month: plannedList[0].month,
        reason: plannedList[0].reason,
      });
console.log("plannedList check",parseInt(Object.keys(plannedList).length));
      if(parseInt(Object.keys(plannedList).length)>1){
        tempArr.push({
          date: plannedList[1].date,
          month: plannedList[1].month,
          reason: plannedList[1].reason,
        });
      }
      setResultData(tempArr);
    }
  }, [plannedList]);
  const shifting = (count, type) => {
    if (type === "Decrement") {
      if (
        plannedList !== null &&
        plannedList !== undefined &&
        Object.keys(plannedList).length !== 0 &&
        count !== 0
      ) {
        console.log(count);
        let tempArr = [];
        for (let i = count; i > count - 2; i--) {
          tempArr.push({
            date: plannedList[i].date,
            month: plannedList[i].month,
            reason: plannedList[i].reason,
          });
        }
        setResultData(tempArr.reverse());
        // setPlannedCount(count - 1);
      }
    } else {
      if (
        plannedList !== null &&
        plannedList !== undefined &&
        Object.keys(plannedList).length !== 0 &&
        totalPlannedCount !== count + 1
      ) {
        console.log(count);
        let tempArr = [];
        for (let i = count; i < count + 2; i++) {
          tempArr.push({
            date: plannedList[i].date,
            month: plannedList[i].month,
            reason: plannedList[i].reason,
          });
        }
        setResultData(tempArr);
        // setPlannedCount(plannedCount + 1);
      }
    }
  };
  const handleShift = (type) => {
    if (type === "minus") {
      if (plannedCount !== 0) {
        console.log(type);
        setPlannedCount(plannedCount - 1);
        shifting(plannedCount, "Decrement");
      }
    } else {
      if (totalPlannedCount !== plannedCount + 1) {
        setPlannedCount(plannedCount + 1);
        shifting(plannedCount + 1, "Increment");
      }
    }
  };
  return (
    <Fragment>
      {Data &&
      Data !== null &&
      Data !== undefined &&
      Object.keys(Data).length !== 0 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          {(parseInt(Object.keys(Data).length)>1 ||
          (parseInt(Object.keys(Data).length) !== 0 && Data[0].dates.length > 2))?
          <div
            type="button"
            onClick={() => {
              handleShift("minus");
            }}
            className="slidderLeft"
          >
            &#60;
          </div>
          :null}
          {resultData.map((item) => {
            return (
              <div className="dateBox">
                <Row>
                  <Col className="dateNum">{item.date}</Col>
                  <Col className="dateMonth">{item.month}</Col>
                </Row>
                <Row>
                  <marquee className="leaveContent">{item.reason}</marquee>
                </Row>
              </div>
            );
          })}
{(parseInt(Object.keys(Data).length)>1 ||
          (parseInt(Object.keys(Data).length) !== 0 && Data[0].dates.length > 2))?
          <div
            ype="button"
            onClick={() => {
              handleShift("plus");
            }}
            className="slidderRight"
          >
            &#62;
          </div>:null}
        </div>
      ) : (
        ""
      )}
    </Fragment>
  );
};

export default LeavesShifting;
