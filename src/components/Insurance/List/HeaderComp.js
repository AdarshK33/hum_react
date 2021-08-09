import React, { useMemo } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { Search } from "react-feather";
import { Link } from "react-router-dom";
import { JsonToExcel } from "react-json-excel";
import { toast } from "react-toastify";

const HeaderComp = ({
  searchInputHandler,
  searchDataHandler,
  searchInput,
  exportInsuranceNominations,
}) => {
  return (
    <div className="OnBoardHeading">
      <Row className="m-1">
        <Col md={3}>
          <Form.Control
            type="number"
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
        <Col md={5}>
          <b className="text-uppercase text-center">Insurance Listing</b>
        </Col>
        <Col md={2}>
          <Link to="/master/add-insurance" className="text-decoration-none">
            <Button className="btn btn-light">Add Insurance</Button>
          </Link>
        </Col>
        <Col md={2}>
          <Button
            className="btn btn-light px-4"
            onClick={exportInsuranceNominations}
          >
            Export
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default HeaderComp;
