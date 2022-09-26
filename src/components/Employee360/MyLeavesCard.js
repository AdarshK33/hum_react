import React, { useState, useContext, useEffect } from "react";
import Chart from "react-google-charts";
import { Row, Col, Form, Cards } from "react-bootstrap";
import { Fragment } from "react";
import { Employee360Context } from "../../context/Employee360State";
import LeavesShifting from "./LeavesShifting";
import { useHistory } from "react-router-dom";

const MyLeavesCard = () => {
  const [resultData, setResultData] = useState([]);
  const [plannedList, setPlannedList] = useState([]);
  const [plannedCount, setPlannedCount] = useState(1);
  const [totalPlannedCount, setTotalPlannedCount] = useState(0);
  const history = useHistory();
  const [state, setState] = useState({ Pending: 0, Applied: 0, UnPlanned: 0 });
  const {
    MyLeavesViewPlanned,
    MyLeavesViewUnplanned,
    unPlannedLeaves,
    plannedLeaves,
  } = useContext(Employee360Context);

  useEffect(() => {
    MyLeavesViewPlanned();
  }, []);
  useEffect(() => {
    MyLeavesViewUnplanned();
  }, []);

  console.log("unPlannedLeaves", unPlannedLeaves);
  console.log("plannedLeaves", plannedLeaves);
  useEffect(() => {
    if (
      plannedLeaves !== null &&
      plannedLeaves !== undefined &&
      Object.keys(plannedLeaves).length !== 0
    ) {
      let tempArr = [];
      plannedLeaves.map((item, i) => {});
      setTotalPlannedCount(tempArr.length);
      setPlannedList(tempArr);
    }
  }, [plannedLeaves]);
  console.log("plannedList", plannedList, totalPlannedCount);

  const LeavesOption = {
    slices: [
      {
        color: "#eb409b",
      },
      {
        color: "#3ab16d",
      },
      {
        color: "#51bfff",
      },
    ],
    pieSliceText: "value",
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
  const GoToLeaves = (e) => {
    history.push("./my-leaves");
  };

  return (
    <Fragment>
     
        <div>
          <div style={{ marginTop: "1rem" }}>
          {((plannedLeaves !== null &&
      plannedLeaves !== undefined &&
      Object.keys(plannedLeaves).length !== 0) ||
      (unPlannedLeaves !== null &&
        unPlannedLeaves !== undefined &&
        Object.keys(unPlannedLeaves).length !== 0))? ( <Chart
              width={"100%"}
              height={"150px"}
              chartType="PieChart"
              data={[
                ["Leave Type", "Days"],
                ["UnPlanned", (plannedLeaves !== null &&
                  plannedLeaves !== undefined &&
                Object.keys(plannedLeaves)?.length !== 0)?plannedLeaves[0]?.unplanned:plannedLeaves[0]?.unplanned],
                ["Applied",(plannedLeaves !== null &&
                  plannedLeaves !== undefined &&
                  Object.keys(plannedLeaves)?.length !== 0)?plannedLeaves[0]?.applied: plannedLeaves[0]?.applied],
                ["Pending", (plannedLeaves !== null &&
                  plannedLeaves !== undefined &&
                  Object.keys(plannedLeaves)?.length !== 0)?plannedLeaves[0]?.pendingLeaves:plannedLeaves[0]?.pendingLeaves],
              ]}
              legend_toggle
              options={LeavesOption}
            />): (
              <h4 style={{ textAlign: "center", width: "100%", marginTop: "50%" }}>
                No Records Found
              </h4>
            )}
          </div>
          {plannedLeaves !== null &&
      plannedLeaves !== undefined &&
      Object.keys(plannedLeaves).length !== 0 ? (
        <>
          <div style={{ marginTop: "2rem" }}>
            <label>Upcomming Leaves</label>
            <label
              style={{ float: "right" }}
              onClick={(e) => GoToLeaves(e)}
              className="itemResult"
            >
              View All
            </label>
          </div>
          <LeavesShifting Data={plannedLeaves} />
          </>):""}
        {unPlannedLeaves !== null &&
      unPlannedLeaves !== undefined &&
      Object.keys(unPlannedLeaves).length !== 0?(<>
          <div style={{ marginTop: "2rem" }}>
            <label>Unplanned Leaves</label>
            <label
              style={{ float: "right" }}
              onClick={(e) => GoToLeaves(e)}
              className="itemResult"
            >
              View All
            </label>
          </div>
          <LeavesShifting Data={unPlannedLeaves} />
          </>) :""}
        </div>
     
    </Fragment>
  );
};
export default MyLeavesCard;
