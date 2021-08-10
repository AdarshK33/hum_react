import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { Search } from "react-feather";
import { Link } from "react-router-dom";

const HeaderComp = ({ searchInputHandler, searchDataHandler, searchInput }) => {
  return (
    <div className="OnBoardHeading">
      <Row className="m-1">
        <Col md={3}>
          <Form.Control
            type="text"
            value={searchInput}
            placeholder="Search"
            className="form-control searchButton"
            onChange={searchInputHandler}
          />
          <Search
            className="search-icon mr-1"
            style={{ color: "#313131" }}
            onClick={searchDataHandler}
          />
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
