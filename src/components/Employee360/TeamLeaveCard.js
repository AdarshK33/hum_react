import React, { useState, useContext, useEffect } from "react";
import Chart from "react-google-charts";
import { Row, Col, Form, Cards } from "react-bootstrap";
import { Fragment } from "react";
import { Employee360Context } from "../../context/Employee360State";
import LeavesShifting from "./LeavesShifting";
import { useHistory } from "react-router-dom";
import { PermissionContext } from "../../context/PermissionState";

const TeamLeavesCard = () => {
  const [resultData, setResultData] = useState([]);
  const [plannedList, setPlannedList] = useState([]);
  const [plannedCount, setPlannedCount] = useState(1);
  const [totalPlannedCount, setTotalPlannedCount] = useState(0);
  const history = useHistory();
  const [state, setState] = useState({ Pending: 0, Applied: 0, UnPlanned: 0 });
  const {
    TeamLeavesViewPlanned,
    TeamLeavesViewUnplanned,
    teamUnPlannedLeaves,
    teamPlannedLeaves,
  } = useContext(Employee360Context);
  const { rolePermission } = useContext(PermissionContext);
  useEffect(() => {
    TeamLeavesViewPlanned();
  }, []);
  useEffect(() => {
    TeamLeavesViewUnplanned();
  }, []);
  console.log("teamUnPlannedLeaves", teamUnPlannedLeaves);
  console.log("teamPlannedLeaves", teamPlannedLeaves);
  useEffect(() => {
    if (
      teamPlannedLeaves !== null &&
      teamPlannedLeaves !== undefined &&
      Object.keys(teamPlannedLeaves).length !== 0
    ) {
      let tempArr = [];
      teamPlannedLeaves.map((item, i) => {});
      setTotalPlannedCount(tempArr.length);
      setPlannedList(tempArr);
    }
  }, [teamPlannedLeaves]);
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
    if (rolePermission !== "admin") {
    history.push("./managerleaves");
    }else{
      history.push("./adminleaves"); 
    }
  };

  return (
    <Fragment>
      
        <div>
          <div style={{ marginTop: "1rem" }}>
          {((teamPlannedLeaves !== null &&
      teamPlannedLeaves !== undefined &&
      Object.keys(teamPlannedLeaves).length !== 0)||(teamUnPlannedLeaves !== null &&
        teamUnPlannedLeaves !== undefined &&
        Object.keys(teamUnPlannedLeaves).length !== 0)) ? (
            <Chart
              width={"100%"}
              height={"150px"}
              chartType="PieChart"
              data={[
                ["Leave Type", "Days"],
                ["UnPlanned",teamPlannedLeaves !== null &&
                  teamPlannedLeaves !== undefined &&
                  Object.keys(teamPlannedLeaves).length !== 0?teamPlannedLeaves[0].unplanned:teamUnPlannedLeaves[0].unplanned],
                ["Applied",teamPlannedLeaves !== null &&
                  teamPlannedLeaves !== undefined &&
                  Object.keys(teamPlannedLeaves).length !== 0?teamPlannedLeaves[0].applied: teamUnPlannedLeaves[0].applied],
                ["Pending",teamPlannedLeaves !== null &&
                  teamPlannedLeaves !== undefined &&
                  Object.keys(teamPlannedLeaves).length !== 0?teamPlannedLeaves[0].planned:teamUnPlannedLeaves[0].planned],
              ]}
              legend_toggle
              options={LeavesOption}
            />) : (
              <h4 style={{ textAlign: "center", width: "100%", marginTop: "50%" }}>
                No Records Found
              </h4>
            )}
          </div>
          {(teamPlannedLeaves !== null &&
      teamPlannedLeaves !== undefined &&
      Object.keys(teamPlannedLeaves).length !== 0) ?<>
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
          <LeavesShifting Data={teamPlannedLeaves} /></>:""}
          {(teamUnPlannedLeaves !== null &&
        teamUnPlannedLeaves !== undefined &&
        Object.keys(teamUnPlannedLeaves).length !== 0) ?<>
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
          <LeavesShifting Data={teamUnPlannedLeaves} />
          </>:""}
        </div>
    
    </Fragment>
  );
};
export default TeamLeavesCard;
