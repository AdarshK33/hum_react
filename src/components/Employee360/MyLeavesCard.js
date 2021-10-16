import React, { useState, useContext, useEffect } from "react";
import Chart from "react-google-charts";
import { Row, Col, Form, Cards } from "react-bootstrap";
import { Fragment } from "react";

const MyLeavesCard = () => {
  const [resultData, setResultData] = useState([]);
  const LeavesOption = {
    slices: [
      {
        color: "#5059ab",
      },
      {
        color: "#01cc9b",
      },
    ],
    pieSliceText: "key",
    legend: {
      position: "center",
      alignment: "center",
      textStyle: {
        color: "233238",
        fontSize: 11,
      },
    },
    chartArea: {
      left: 10,
      top: 10,
      width: "100%",
      height: "80%",
    },
  };

  const data = [
    { date: 26, month: "Feb", reason: "aniversary" },
    { date: 27, month: "Feb", reason: "birthday" },
    { date: 28, month: "Feb", reason: "independance" },
    { date: 29, month: "Feb", reason: "republic" },
    { date: 30, month: "Feb", reason: "dhasara" },
  ];
  useEffect(() => {
    let tempArr = [];

    tempArr.push({
      date: data[0].date,
      month: data[0].month,
      reason: data[0].reason,
    });
    tempArr.push({
      date: data[1].date,
      month: data[1].month,
      reason: data[1].reason,
    });
    setResultData(tempArr);
  }, []);

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
      <div>
        <Chart
          width={"100%"}
          height={"150px"}
          chartType="PieChart"
          data={[
            ["Leave Type", "Days"],
            ["Pending", 11],
            ["Applied", 2],
            ["UnPlanned", 2],
          ]}
          legend_toggle
          options={LeavesOption}
        />
      </div>
      {/* upcomming leves */}
      <div>Upcomming Leaves</div>
      <div
        style={{
          display: "flex",
          marginTop: "1rem",
          justifyContent: "flex-start",
        }}
      >
        <div
          type="button"
          onClick={() => {
            handleShift("minus");
          }}
          className="slidderLeft"
        >
          &#60;
        </div>
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

        {/* <div className="dateBox">
          <Row>
            <Col className="dateNum">26</Col>
            <Col className="dateMonth">Feb</Col>
          </Row>
          <Row>
            <Col className="leaveContent">Aniversery</Col>
          </Row>
        </div> */}

        <div
          ype="button"
          onClick={() => {
            handleShift("plus");
          }}
          className="slidderRight"
        >
          &#62;
        </div>
      </div>
      {/* unplanned Leaves */}
      <div>Unplanned Leaves</div>
      <div
        style={{
          display: "flex",
          marginTop: "1rem",
          justifyContent: "flex-start",
        }}
      >
        <div className="slidderLeft">&#60;</div>
        <div className="dateBox">
          <Row>
            <Col className="dateNum">26</Col>
            <Col className="dateMonth">Feb</Col>
          </Row>
          <Row>
            <Col className="leaveContent">Aniversery</Col>
          </Row>
        </div>
        {/* <div className="dateBox">
                            <Row>
                              <Col className="dateNum">26</Col>
                              <Col className="dateMonth">Feb</Col>
                            </Row>
                            <Row>
                              <Col className="leaveContent">Aniversery</Col>
                            </Row>
                          </div> */}

        <div className="slidderRight">&#62;</div>
      </div>
    </Fragment>
  );
};
export default MyLeavesCard;
