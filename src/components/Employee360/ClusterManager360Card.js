import React, { useState, useContext, useEffect } from "react";
import Chart from "react-google-charts";
import { Row, Col, Form, Cards, NavItem } from "react-bootstrap";
import { Edit2, Eye, Search, Download } from "react-feather";
import ScrollArea from "react-scrollbar";
import { Fragment } from "react";
import { Employee360Context } from "../../context/Employee360State";
import ViewTheLetter from "./view";
import { DocsVerifyContext } from "../../context/DocverificationState";

const ClusterCard = () => {
  const { ClusterView, ClusterData } = useContext(Employee360Context);

  useEffect(() => {
    ClusterView();
  }, []);
  console.log("ClusterData", ClusterData);

  return (
    <Fragment>
      <Row
        style={{
          marginTop: "1rem",
          marginBottom: "1rem",
        }}
      >
        <Col sm={6}>
          <label className="itemResult"> Cluster Name </label>
          <label style={{ marginLeft: "25px" }} className="itemResult">
            {" "}
            Cluster Name{" "}
          </label>
          <hr
            align="center"
            width="100%"
            size="10"
            color="#006ebb"
            className={"lineStyle"}
          />
          <label className="itemResult"> Team Strength </label>
          <label style={{ marginLeft: "25px" }} className="itemResult">
            {" "}
            25{" "}
          </label>
        </Col>
        {/* <Col sm={1}>
                        </Col> */}

        <Col md={6} style={{ marginTop: "7px" }}>
          <Form.Control
            type="text"
            style={{ border: "1px solid #006ebb" }}
            // value={searchInput}
            placeholder="Search"
            // onChange={searchInputHandler}
            className="form-control searchButton"
          />
          <Search
            className="search-icon mr-1"
            style={{ color: "#313131" }}
            // onClick={searchDataHandler}
          />
        </Col>
      </Row>
      {/* <Row style={{ marginTop: "1rem", marginLeft: "1rem" }}> */}
      <ScrollArea
        speed={0.4}
        // className="area"
        // contentClassName="content"
        smoothScrolling={true}
        horizontal={false}
        style={{ zIndex: "0" }}
      >
        <div className="clusterEmpployeeBox">
          <div style={{ padding: "10px" }}>
            <label>Rajasekhar</label>
            <Row>
              <Col>
                <label>Employee Id</label>
              </Col>
              <Col>
                <label>DSI000597</label>
              </Col>
              <Col>
                <label>Email</label>
              </Col>
              <Col>
                <label>raj@gmail.com</label>
              </Col>
            </Row>
            <Row>
              <Col>
                <label>Role</label>
              </Col>
              <Col>
                <label>DSI000597</label>
              </Col>
              <Col>
                <label>Ph No</label>
              </Col>
              <Col>
                <label>raj@gmail.com</label>
              </Col>
            </Row>
          </div>
        </div>
      </ScrollArea>
    </Fragment>
  );
};
export default ClusterCard;
