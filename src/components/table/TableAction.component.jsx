import React from "react";
import { Col, Button } from "react-bootstrap";
import { Edit2, Eye, Trash } from "react-feather";

const TableActionButton = ({ disabled, type }) => (
  <Col className="p-0">
    <Button variant="link" disabled={disabled}>
      {type === "edit" ? <Edit2 /> : type === "view" ? <Eye /> : <Trash />}
    </Button>
  </Col>
);

export default TableActionButton;
