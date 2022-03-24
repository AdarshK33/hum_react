import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { Edit2, Eye, Trash, Download, AlertCircle } from "react-feather";
import { E_signContext } from "../../context/E_signState";

const TableActionButton = ({ disabled, type, refId }) => {
  const { getReference, notification } = useContext(E_signContext);
  const GoToLetterView = (refId) => {
    console.log(refId);
    getReference(refId);
  };
  return (
    <Button variant="link" disabled={disabled}>
      {type === "edit" ? (
        <Edit2 />
      ) : type === "view" ? (
        <Eye />
      ) : type === "delete" ? (
        <Trash />
      ) : type === "alert" ? (
        <AlertCircle
          onClick={() => {
            GoToLetterView(refId);
          }}
        />
      ) : (
        <Download />
      )}
    </Button>
  );
};

export default TableActionButton;
