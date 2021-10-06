import React, { useState, useContext, useEffect } from "react";
import Chart from "react-google-charts";
import { Fragment } from "react";

const MyPerformanceCard = () => {
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
      <div>
        <Chart
          width={"100%"}
          height={"150px"}
          chartType="PieChart"
          data={[
            ["Hours Type", "Hours"],
            ["Remaining Hours", 32],
            ["Working Hours", 11],
            ["Additional Hours", 2],
          ]}
          options={PerformanceOption}
        />
      </div>
      <div>
        <label className="workingHours">
          <b>7/365</b>
        </label>

        <label className="AdditionalHours">
          <b> 7/365</b>
        </label>
      </div>
      <div>
        <label className="workingHoursLabel">Working Hours</label>
        <label className="AdditionalHoursLabel">Additional Hours</label>
      </div>
      <div
        style={{
          borderTop: "2px solid #006ebb",
          width: "95%",
          marginLeft: "0.5rem",
          marginRight: "1rem",
          marginTop: "2rem",
          marginBottom: "2rem",
        }}
      ></div>
      <div>
        <label>Total Working Hours </label>
        <label className="totalHours">85/360 </label>
      </div>
    </Fragment>
  );
};
export default MyPerformanceCard;
