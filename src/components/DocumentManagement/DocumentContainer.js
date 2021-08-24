import React from "react";
import { Container } from "react-bootstrap";
import Breadcrumb from "../common/breadcrumb";
import DocumentForm from "./DocumentForm";

const DocumentContainer = () => {
  return (
    <div className="document_management_container">
      <Breadcrumb title="DOCUMENTS" parent="DOCUMENTS" />
      <Container fluid>
        <div className="card" style={{ borderRadius: "1rem" }}>
          <div className="OnBoardHeading">
            <b className="align-middle">DOCUMENTS </b>
          </div>
          <DocumentForm />
        </div>
      </Container>
    </div>
  );
};

export default DocumentContainer;
