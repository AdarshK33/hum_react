import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { Search } from "react-feather";
import { Link } from "react-router-dom";

const HeaderComp = ({
  searchInputHandler,
  searchDataHandler,
  searchInput,
  exportInsuranceNominations,
  yearRange,
}) => {
  return (
    <div className="OnBoardHeading">
      <Row className="m-1">
        <Col md={3}>
          <Form.Control
            as="select"
            className="text-primary"
            aria-label="insuranceYear"
            value={searchInput}
            placeholder="Search by"
            onChange={searchInputHandler}
          >
            <option value="0">All</option>
            {yearRange.length > 0 &&
              yearRange.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
          </Form.Control>
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
