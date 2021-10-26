import React, { useState, useContext, useEffect } from "react";
import Chart from "react-google-charts";
import { Row, Col, Form, Cards, NavItem } from "react-bootstrap";
import { Edit2, Eye, Search, Download } from "react-feather";
import ScrollArea from "react-scrollbar";
import Select from "react-select";
import { Fragment } from "react";
import { Employee360Context } from "../../context/Employee360State";
import ViewTheLetter from "./view";
import { DocsVerifyContext } from "../../context/DocverificationState";
import LoaderIcon from "../Loader/LoaderIcon";

const ClusterCard = () => {
  const {
    ClusterView,
    ClusterData,
    ClusterSearchByClusterName,
    ClusterEmpList,
    clusterLoader,
    ClusterSearchByEmployeeName,
  } = useContext(Employee360Context);
  const [clusterList, setClusterList] = useState([]);
  const [cluster, setCluster] = useState("");
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    ClusterView();
  }, []);
  console.log("ClusterData", ClusterData);
  console.log("ClusterEmpList", ClusterEmpList);
  useEffect(() => {
    if (
      ClusterData !== null &&
      ClusterData !== undefined &&
      Object.keys(ClusterData).length !== 0
    ) {
      let tempArr = [];
      ClusterData.map((item, index) => {
        tempArr.push({
          label: item.clusterName,
          value: item.clusterName,
        });
      });
      setClusterList(tempArr);
      setCluster(tempArr[0].value);
      //   ClusterSearchByClusterName(tempArr[0].value);
    } else {
      setClusterList([]);
      setCluster("");
    }
  }, [ClusterData]);
  useEffect(() => {
    if (cluster !== "") {
      setSearchInput("");
      ClusterSearchByClusterName(cluster);
    }
  }, [cluster]);

  const searchDataHandler = () => {
    if (cluster !== "" && searchInput !== "") {
      console.log("-----------s");
      ClusterSearchByEmployeeName(cluster, searchInput);
    }
  };

  return (
    <Fragment>
      <Row
        style={{
          marginTop: "1rem",
          marginBottom: "1rem",
          marginLeft: "-5px",
          marginRight: "-10px",
        }}
      >
        <Col sm={6}>
          {/* <label className="itemResult"> Cluster Name </label>
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
          </label> */}
          <Form.Control
            as="select"
            aria-label="Select Transfer Type"
            style={{ border: "1px solid #4f90ff" }}
            value={cluster}
            onChange={(e) => setCluster(e.target.value)}
            className="probation_status_search"
          >
            <option value="" disabled selected hidden>
              Select Cluster
            </option>
            {clusterList.map((item) => {
              return <option key={item.value}>{item.label}</option>;
            })}
          </Form.Control>
        </Col>

        <Col md={6} style={{ marginTop: "7px" }}>
          <Form.Control
            type="text"
            style={{ border: "1px solid #006ebb" }}
            value={searchInput}
            placeholder="Search Employee Name/ID"
            onChange={(e) => setSearchInput(e.target.value)}
            className="form-control searchButton"
          />
          <Search
            className="search-icon mr-1"
            style={{ color: "#313131" }}
            onClick={searchDataHandler}
          />
        </Col>
      </Row>
      {/* <Row style={{ marginTop: "1rem", marginLeft: "1rem" }}> */}
      {clusterLoader ? (
        <LoaderIcon />
      ) : (
        <ScrollArea
          speed={0.4}
          // className="area"
          // contentClassName="content"
          smoothScrolling={true}
          horizontal={false}
          style={{ zIndex: "0", height: "350px" }}
        >
          {/* <div className="circle"></div> */}
          {ClusterEmpList !== null &&
          ClusterEmpList !== undefined &&
          Object.keys(ClusterEmpList).length !== 0 &&
          ClusterEmpList[0] !== null &&
          ClusterEmpList[0] !== undefined &&
          Object.keys(ClusterEmpList[0]).length !== 0 &&
          ClusterEmpList[0].employees !== null &&
          ClusterEmpList[0].employees !== undefined &&
          Object.keys(ClusterEmpList[0].employees).length !== 0 ? (
            <div>
              {ClusterEmpList[0].employees.map((item) => {
                return (
                  <div className="clusterEmpployeeBox">
                    <div style={{ padding: "10px", fontSize: "17px" }}>
                      <label>
                        <b>{item.firstName + " " + item.lastName}</b>
                      </label>
                      <Row style={{ marginTop: "-0.5rem" }}>
                        <Col sm={5}>
                          <label
                            style={{ fontSize: "15px", marginRight: "15px" }}
                          >
                            <b>Employee Id:</b>
                          </label>
                          <label style={{ fontSize: "15px" }}>
                            {item.employeeId}
                          </label>
                        </Col>

                        <Col sm={7}>
                          <p style={{ fontSize: "initial" }}>
                            <span
                              style={{ fontSize: "15px", marginRight: "15px" }}
                            >
                              <b>Email:</b>
                            </span>
                            {item.personalEmail}
                          </p>
                        </Col>
                      </Row>
                      <Row style={{ marginTop: "-1rem" }}>
                        <Col sm={5}>
                          <label
                            style={{ fontSize: "15px", marginRight: "70px" }}
                          >
                            <b>Role:</b>
                          </label>
                          <label style={{ fontSize: "15px" }}>
                            {item.role}
                          </label>
                        </Col>

                        <Col sm={7}>
                          <label
                            style={{ fontSize: "15px", marginRight: "15px" }}
                          >
                            <b>Ph No:</b>
                          </label>
                          <label style={{ fontSize: "15px" }}>
                            {item.phone}
                          </label>
                        </Col>
                      </Row>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <h4
              style={{ textAlign: "center", width: "100%", marginTop: "25%" }}
            >
              No Records Found
            </h4>
          )}
        </ScrollArea>
      )}
    </Fragment>
  );
};
export default ClusterCard;
