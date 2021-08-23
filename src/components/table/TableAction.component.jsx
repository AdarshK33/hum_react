import React from "react";
import { Button } from "react-bootstrap";
import { Edit2, Eye, Trash, Download } from "react-feather";

const TableActionButton = ({ disabled, type }) => (
  <Button variant="link" disabled={disabled}>
    {type === "edit" ? (
      <Edit2 />
    ) : type === "view" ? (
      <Eye />
    ) : type === "delete" ? (
      <Trash />
    ) : (
      <Download />
    )}
  </Button>
);

export default TableActionButton;
