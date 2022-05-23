import React, { useState, useContext, useEffect } from "react";
import Chart from "react-google-charts";
import { Row, Col, Form, Cards } from "react-bootstrap";
import Select from "react-select";
import ScrollArea from "react-scrollbar";
import { Fragment } from "react";
import moment from "moment";
import { Employee360Context } from "../../context/Employee360State";
import LoaderIcon from "../Loader/LoaderIcon";

const Roster = () => {
  const [resultData, setResultData] = useState([]);
  const [rosterMnth, setRosterMnth] = useState(0);
  const [weekOptions, setWeekOptions] = useState([
    { value: "1", label: "Week 1" },
    { value: "2", label: "Week 2" },
    { value: "3", label: "Week 3" },
    { value: "4", label: "Week 4" },
  ]);
  const [weekStartDate, setWeekStartDate] = useState("");
  const [weekEndDate, setWeekEndDate] = useState("");
  const [weekNum, setWeekNum] = useState(weekOptions[0]);
  const [weekNumFromApi,setWeekNumFromApi]= useState(null)
  const data = [];
  const {
    RosterMonthSearch,
    WeeksList,
    SearchByWeekName,
    WeeksInfoList,
    rosterLoader,
    RosterMonthSearchYear,
        YearsList
  } = useContext(Employee360Context);

  // useEffect(() => {
  //   shifting(rosterMnth, "Increment");
  // }, []);
  useEffect(() => {
    RosterMonthSearchYear()
  },[])
  useEffect(() => {
    if (
      YearsList !== null &&
      YearsList !== undefined &&
      Object.keys(YearsList).length !== 0
    ) {
      // let tempArr = [];
      // YearsList.map((item, i) => {
      //   tempArr.push({
      //     label: item.weekName,
      //     value: item.weekName,
      //   });
      // });
      // setWeekOptions(tempArr);
      // SearchByWeekName(tempArr[0].value);
      var currentDate = new Date();
      var startDate = new Date(currentDate.getFullYear(), 0, 1);
      var days = Math.floor((currentDate - startDate) /
          (24 * 60 * 60 * 1000));
          
            
      var weekNumber = Math.ceil(
          (currentDate.getDay() + 1 + days) / 7) ;
          console.log("weekNumber",weekNumber)
          console.log("YearsList",YearsList)
          YearsList.map((item,i)=>{
            if(item.weekName){
              let refWeekNumber = item.weekName.split(' ');
              console.log("refWeekNumber",refWeekNumber)
              if(parseInt(refWeekNumber[1]) === parseInt(weekNumber)){
                console.log("refWeekNumber[1]",refWeekNumber[1])
                shifting(parseInt(item.monthNo-1), "Increment");
                setRosterMnth(parseInt(item.monthNo-1))
                setWeekNumFromApi(item.weekName);
                // SearchByWeekName(weekNumber)
                setWeekNum({
                  label: item.weekName,
                  value: item.weekName,
                })
              }
            }
          })
     
    }
  }, [YearsList]);
  useEffect(() => {
    if (
      WeeksList !== null &&
      WeeksList !== undefined &&
      Object.keys(WeeksList).length !== 0
    ) {
      let tempArr = [];
      WeeksList.map((item, i) => {
        tempArr.push({
          label: item.weekName,
          value: item.weekName,
        });
      });
      setWeekOptions(tempArr);
      if(weekNumFromApi) {
        console.log("weekNumFromApi true" )
        SearchByWeekName(weekNumFromApi)
      }else{
        console.log("weekNumFromApi false" )
        SearchByWeekName(tempArr[0].value);
        setWeekNum(tempArr[0]);
      }
      
     
    }
  }, [WeeksList]);

  useEffect(() => {
    if (
      WeeksInfoList !== null &&
      WeeksInfoList !== undefined &&
      Object.keys(WeeksInfoList).length !== 0
    ) {
      console.log("-----");
      console.log(WeeksInfoList[0].toDate);
      if (
        WeeksInfoList[0].toDate !== null &&
        WeeksInfoList[0].toDate !== undefined
      ) {
        let arr = WeeksInfoList[0].toDate.split(" ");

        console.log(arr);
        console.log(arr[1] + " " + arr[2]);
        setWeekEndDate(arr[1] + " " + arr[2]);
      } else {
        setWeekEndDate("");
      }
      if (
        WeeksInfoList[0].fromDate !== null &&
        WeeksInfoList[0].fromDate !== undefined
      ) {
        let arr1 = WeeksInfoList[0].fromDate.split(" ");
        console.log(arr1[1] + " " + arr1[2]);
        setWeekStartDate(arr1[1] + " " + arr1[2]);
      } else {
        setWeekStartDate("");
      }
    }
  }, [weekNum, WeeksInfoList]);
  console.log("WeeksList", WeeksList);
  console.log("WeeksInfoList", WeeksInfoList);

  const ChangeWeekNum = (option) => {
    console.log("option", option.value);
    setWeekNumFromApi(null)
    setWeekNum(option);
    SearchByWeekName(option.value);
  };
  const handleShift = (type) => {
    setWeekNumFromApi(null)
    if (type === "minus") {
      if (rosterMnth !== 0) {
        console.log(type);
        setRosterMnth(rosterMnth - 1);
        shifting(rosterMnth, "Decrement");
      }
    } else {
      if (rosterMnth !== 11) {
        setRosterMnth(rosterMnth + 1);
        shifting(rosterMnth + 1, "Increment");
      }
    }
  };

  const shifting = (rosterMnth, val) => {
    setWeekNumFromApi(null)
    if (val === "Increment") {
      let todayDate = new Date();
      let StartDate = moment(
        new Date(todayDate.getFullYear(), rosterMnth, "1")
      ).format("YYYY-MM-DD");
      let EndDate = moment(
        new Date(todayDate.getFullYear(), rosterMnth + 1, "0")
      ).format("YYYY-MM-DD");
      console.log("Dates", rosterMnth, StartDate, EndDate);
      RosterMonthSearch(StartDate, EndDate);
    } else if (val === "Decrement") {
      let todayDate = new Date();
      let StartDate = moment(
        new Date(todayDate.getFullYear(), rosterMnth - 1, "1")
      ).format("YYYY-MM-DD");
      let EndDate = moment(
        new Date(todayDate.getFullYear(), rosterMnth, "0")
      ).format("YYYY-MM-DD");
      console.log("Dates", rosterMnth, StartDate, EndDate);
      RosterMonthSearch(StartDate, EndDate);
    }
  };
  const tConvert = (time) => {
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      time = time.slice(1);
      time[5] = +time[0] < 12 ? "am" : "pm"; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join("");
  };

  Date.prototype.getWeek = function() {
    var onejan = new Date(this.getFullYear(),0,1);
    var today = new Date(this.getFullYear(),this.getMonth(),this.getDate());
    console.log("check today",today,onejan);
    var dayOfYear = ((today - onejan + 86400000)/86400000);
    return Math.ceil(dayOfYear/7)
  };
    console.log("currentWeekNumber",new Date().getWeek());

  return (
    <Fragment>
      <div className="rosterHead">
        <div className="rosterSelectDiv">
          <div
            type="button"
            onClick={() => {
              handleShift("minus");
            }}
          >
            {/* {rosterMnth !== 0 ? */}
            <p className="slidderLeftRoster">&#60;</p>
            {/* : ""} */}
          </div>
          <div style={{ textAlign: "center" }}>
            <Select
              name="Week"
              options={
                weekOptions !== null
                  ? weekOptions.map((item) => ({
                      label: item.label,
                      value: item.value,
                    }))
                  : []
              }
              value={weekNum}
              onChange={ChangeWeekNum}
              isSearchable
              className="rosterSelect"
            ></Select>
          </div>
          <div
            type="button"
            onClick={() => {
              handleShift("plus");
            }}
          >
            {rosterMnth !== 11 ? (
              <p className="slidderRightRoster">&#62;</p>
            ) : (
              ""
            )}
          </div>
        </div>
        {WeeksInfoList !== null &&
        WeeksInfoList !== undefined &&
        Object.keys(WeeksInfoList).length !== 0 ? (
          // <div className="weekCountLabel">
          //   {WeeksInfoList[0].toDate} to {WeeksInfoList[0].fromDate}
          // </div>
          <div className="weekCountLabel">
            {weekStartDate} to {weekEndDate}
          </div>
        ) : (
          ""
        )}
      </div>
      {rosterLoader ? (
        <LoaderIcon />
      ) : WeeksInfoList !== null &&
        WeeksInfoList !== undefined &&
        Object.keys(WeeksInfoList).length !== 0 ? (
        // <ScrollArea
        //   speed={0.4}
        //   // className="area"
        //   // contentClassName="content"
        //   smoothScrolling={true}
        //   horizontal={false}
        //   style={{ zIndex: "0" }}
        // >
        <table style={{ width: "100%" }}>
          <tbody>
            {WeeksInfoList.map((item) => {
              return (
                <tr>
                  <td
                    style={
                      // } // border: "1px solid white", // width: "50px", // backgroundColor:, // {
                      item.weekOff === true
                        ? {
                            backgroundColor: "orange",
                            width: "50px",
                            border: "1px solid white",
                          }
                        : item.holiday !== null && item.holiday !== undefined
                        ? {
                            backgroundColor: "yellow",
                            width: "50px",
                            border: "1px solid white",
                          }
                        : {
                            backgroundColor: "#f2f2f2",
                            width: "50px",
                            border: "1px solid white",
                          }
                    }
                  >
                    <div className="rosterColumn1">
                      <label className="dateNum">
                        {item.date.length === 1 ? "0" + item.date : item.date}
                      </label>{" "}
                      <label
                        style={{
                          marginLeft: "0.5rem",
                        }}
                      >
                        {item.day}
                      </label>
                    </div>
                  </td>
                  <td>
                    <div className="rosterColumn2">
                      {item.weekOff === true ? (
                        <label> </label>
                      ) : item.holiday !== null &&
                        item.holiday !== undefined ? (
                        <label> </label>
                      ) : item.leave !== null && item.leave !== undefined?(
                        <label> </label>
                      ):item.startTime !== null &&
                        item.startTime !== undefined ? (
                        <label>
                          {tConvert(item.startTime.slice(0, -3))}-
                          {tConvert(item.endTime.slice(0, -3))}
                          {/* {item.startTime.slice(0, -3)} */}
                        </label>
                      ) : (
                        <label></label>
                      )}
                      <div className="rosterContent">
                        {item.weekOff === true
                          ? "Week Off"
                          : item.holiday !== null && item.holiday !== undefined
                          ? item.holiday
                          : item.leave !== null && item.leave !== undefined
                          ? item.leave
                          : item.shiftName}
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        // </ScrollArea>
        <h4 style={{ textAlign: "center", width: "100%", marginTop: "50%" }}>
          No Records Found
        </h4>
      )}
    </Fragment>
  );
};
export default Roster;
