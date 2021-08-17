import React from "react";
import Breadcrumb from "../common/breadcrumb";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import InsuranceForm from "./InsuranceForm";

const EditInsurance = () => {
  const { insuranceNominationId } = useParams();
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
          <InsuranceForm
            type="Edit"
            insuranceNominationId={insuranceNominationId}
          />
        </div>
      </Container>
    </div>
  );
};

export default EditInsurance;
