import React from "react";
import Breadcrumb from "../common/breadcrumb";
import { Container } from "react-bootstrap";
import InsuranceForm from "./InsuranceForm";

const AddInsurance = () => {
  return (
    <div className="insurance-form-container">
      <Breadcrumb
        title="INSURANCE NOMINATION CONFIGURATION"
        parent="INSURANCE NOMINATION CONFIGURATION"
      />
      <Container fluid>
        <div className="card" style={{ borderRadius: "1rem" }}>
          <div className="OnBoardHeading">
            <b className="text-uppercase text-center pt-1">
              INSURANCE NOMINATION CONFIGURATION
            </b>
          </div>
          <InsuranceForm type="add" />
        </div>
      </Container>
    </div>
  );
};

export default AddInsurance;
