import React, { useState, useContext, useEffect } from "react";
import Chart from "react-google-charts";
import { Row, Col, Form, Cards, NavItem } from "react-bootstrap";
import { Edit2, Eye, Search, Download } from "react-feather";
import ScrollArea from "react-scrollbar";
import { Fragment } from "react";
import { Employee360Context } from "../../context/Employee360State";
import ViewTheLetter from "./view";
import { DocsVerifyContext } from "../../context/DocverificationState";
import ApprovalsEmp360List from "./ApprovalsEmp360List";

const ApprovalsEmp360Card = () => {
  const { MyDocView, MyDocList, letterShow, SetLetterView } =
    useContext(Employee360Context);
  const [tabIndex, setTabIndex] = useState(0);
  //   useEffect(() => {
  //     MyDocView();
  //   }, []);
  //   console.log("MyDocList", MyDocList);

  return (
    <Fragment>
      <div className="tabsHeading">
        <div
          className={tabIndex === 0 ? "activeTab" : "disabledTab"}
          onClick={(e) => setTabIndex(0)}
        >
          <label>Leaves</label>
        </div>
        <div
          className={tabIndex === 1 ? "activeTab" : "disabledTab"}
          onClick={(e) => setTabIndex(1)}
        >
          <label>Promotions</label>
        </div>
        <div
          className={tabIndex === 2 ? "activeTab" : "disabledTab"}
          onClick={(e) => setTabIndex(2)}
        >
          <label>Transfers</label>
        </div>
      </div>
      <div style={{ width: "100%", height: "100%" }}>
        {(() => {
          switch (tabIndex) {
            case 0:
              return <ApprovalsEmp360List ListType={"Regular Transfer"} />;
            case 1:
              return <ApprovalsEmp360List ListType={"promotion"} />;
            case 2:
              return <ApprovalsEmp360List ListType={"transfer"} />;

            default:
              return <div>nothing</div>;
          }
        })()}
      </div>
      <div style={{ float: "bottom", textAlign: "center" }}>
        <label className="itemResult" onClick={(e) => setTabIndex(2)}>
          View All
        </label>
      </div>
    </Fragment>
  );
};
export default ApprovalsEmp360Card;
