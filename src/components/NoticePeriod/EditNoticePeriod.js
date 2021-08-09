import React from "react";
import Breadcrumb from "../common/breadcrumb";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import NoticePeriodForm from "./NoticePeriodForm";

const EditNoticePeriod = () => {
  const { noticePeriodId } = useParams();
  return (
    <div className="notice-period-form-container">
      <Breadcrumb
        title="NOTICE PERIOD CONFIGURATION"
        parent="NOTICE PERIOD CONFIGURATION"
      />
      <Container fluid>
        <div className="card" style={{ borderRadius: "1rem" }}>
          <div className="OnBoardHeading">
            <b className="text-uppercase text-center pt-1">
              Notice Period Configuration
            </b>
          </div>
          <NoticePeriodForm type="edit" noticePeriodId={noticePeriodId} />
        </div>
      </Container>
    </div>
  );
};

export default EditNoticePeriod;
