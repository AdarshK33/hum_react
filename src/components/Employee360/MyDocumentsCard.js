import React, { useState, useContext, useEffect } from "react";
import Chart from "react-google-charts";
import { Row, Col, Form, Cards } from "react-bootstrap";
import { Edit2, Eye, Search, Download } from "react-feather";
import ScrollArea from "react-scrollbar";
import { Fragment } from "react";

const MyDocumentsCard = () => {
  return (
    <Fragment>
      <ScrollArea
        speed={0.4}
        className="area"
        contentClassName="content"
        smoothScrolling={true}
        horizontal={false}
      >
        <Row style={{ marginTop: "1rem" }}>
          <Col>
            <div className="DocumentsDiv">
              <div className="DocumentDot"></div>
              <div className="DocName">
                <label>Documents</label>
              </div>
            </div>
          </Col>
          <Col
            style={{
              textAlign: "right",
            }}
          >
            <Eye
              style={{
                textAlign: "right",
                fontSize: "xx-small",
              }}
            />
          </Col>
          <Col>
            <Download style={{ fontSize: "xx-small" }} />
          </Col>
        </Row>
        <Row style={{ marginTop: "1rem" }}>
          <Col>
            <div className="DocumentsDiv">
              <div className="DocumentDot"></div>
              <div className="DocName">
                <label>Documents</label>
              </div>
            </div>
          </Col>
          <Col
            style={{
              textAlign: "right",
            }}
          >
            <Eye
              style={{
                textAlign: "right",
                fontSize: "xx-small",
              }}
            />
          </Col>
          <Col>
            <Download style={{ fontSize: "xx-small" }} />
          </Col>
        </Row>
      </ScrollArea>
    </Fragment>
  );
};
export default MyDocumentsCard;
