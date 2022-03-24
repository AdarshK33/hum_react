import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { Search } from "react-feather";
import { Link } from "react-router-dom";

const HeaderComp = ({ searchInputHandler, searchInput, departmentList }) => {
  return (
    <div className="OnBoardHeading">
      <Row className="m-1">
        <Col md={3}>
          <Form.Control
            as="select"
            className="text-primary"
            aria-label="noticePeriodDept"
            value={searchInput}
            placeholder="Search by"
            onChange={searchInputHandler}
          >
            <option value="All">All</option>
            {departmentList !== null &&
              departmentList !== undefined &&
              departmentList.length > 0 &&
              departmentList.map((item) => {
                return (
                  <option key={item.deptId} value={item.departmentName}>
                    {item.departmentName}
                  </option>
                );
              })}
          </Form.Control>
        </Col>
        <Col md={6}>
          <b className="text-uppercase text-center">Notice Period Listing</b>
        </Col>
        <Col md={{ span: 2, offset: 1 }}>
          <Link to="/master/add-notice-period" className="text-decoration-none">
            <Button className="btn btn-light">Add New</Button>
          </Link>
        </Col>
      </Row>
    </div>
  );
};

export default HeaderComp;
