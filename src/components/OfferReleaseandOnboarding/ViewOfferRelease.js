import React, { Fragment, useState, useEffect, useContext } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import Breadcrumb from "../common/breadcrumb";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
import "../Offers/offers.css";
import ViewEmployeeForm from "./viewEmployeeForm";
import ViewWorkInformation from "./viewWorkInformationForm";
import ViewRemunerationInformation from "./viewRemunerationInformation";
import CandidateOfferLetter from "./candidateOfferLetter";
import VerifyCandidateDocs from "./verifyCandidateDocs";
import CandidateOnboarding from "./candidateOnboarding";
import { DocsVerifyContext } from "../../context/DocverificationState";
import { OfferContext } from "../../context/OfferState";

const ViewOfferRelease = () => {
  const { personalInfo, personalInfoData } = useContext(DocsVerifyContext);
  const { candidateView, candidateData, viewCandidateId } = useContext(
    OfferContext
  );
  const { candidateList } = useContext(OfferContext);
  const [activeStep5, setActiveStep5] = useState(false);
  const [activeStep6, setActiveStep6] = useState(false);
  const [checkStep5, setCheckStep5] = useState(false);
  const [checkStep6, setCheckStep6] = useState(false);
  // useEffect(() => {
  //   viewCandidateId(0);
  // }, [candidateData]);

  useEffect(() => {
    if (
      candidateData &&
      candidateData.candidateInformation &&
      candidateData.candidateInformation.candidateId !== null
    ) {
      console.log("------>", candidateData.candidateInformation.candidateId);
      console.log("List----->", candidateList);
      personalInfo(candidateData.candidateInformation.candidateId);
    }
  }, [candidateData]);
  useEffect(() => {
    if (
      personalInfoData !== null &&
      Object.keys(personalInfoData).length !== 0 &&
      personalInfoData !== undefined
    ) {
      if (personalInfoData.verificationStatus === 0) {
        setActiveStep6(false);
        console.log("--->Data,", personalInfoData);
      } else {
        console.log("else");
        console.log("--->Data,", personalInfoData);
        setActiveStep6(true);
      }
    }
  }, [personalInfoData]);
  useEffect(() => {
    if (
      candidateList !== undefined &&
      candidateList !== null &&
      candidateList.length > 0 &&
      candidateData &&
      candidateData.candidateInformation &&
      candidateData.candidateInformation.candidateId !== null &&
      personalInfoData !== null &&
      Object.keys(personalInfoData).length !== 0 &&
      personalInfoData !== undefined
    ) {
      candidateList.map((item, i) => {
        if (
          item.candidateId === candidateData.candidateInformation.candidateId
        ) {
          if (
            item.status === 5 &&
            item.statusDesc !== "Rejected" &&
            item.statusDesc !== "Approved" &&
            item.statusDesc === "Offer Released" &&
            personalInfoData.documentUploaded === 1
          ) {
            console.log("-->", item);
            setActiveStep5(true);
          } else {
            setActiveStep5(false);
          }
        }
      });
    }
  }, [candidateList, candidateData, personalInfoData]);
  console.log(activeStep5);
  return (
    <Fragment>
      <Container fluid className="container-accordion">
        <div className="mb-5">
          <div className="OnBoardHeading">
            <b>ONBOARDING </b>
          </div>
        </div>
        <Accordion preExpanded={["a"]}>
          <AccordionItem uuid="a">
            <AccordionItemHeading>
              <AccordionItemButton>
                <i
                  style={{
                    color: "green",
                    backgroundColor: "white",
                    borderRadius: "50%",
                    fontSize: "19px",
                  }}
                  className="fa fa-check-circle"
                  aria-hidden="true"
                ></i>
                Step 1: Candidate Information
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <ViewEmployeeForm />
            </AccordionItemPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton>
                <i
                  style={{
                    color: "green",
                    backgroundColor: "white",
                    borderRadius: "50%",
                    fontSize: "19px",
                  }}
                  className="fa fa-check-circle"
                  aria-hidden="true"
                ></i>
                Step 2: Candidate Work Information
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <ViewWorkInformation />
            </AccordionItemPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton>
                <i
                  style={{
                    color: "green",
                    backgroundColor: "white",
                    borderRadius: "50%",
                    fontSize: "19px",
                  }}
                  className="fa fa-check-circle"
                  aria-hidden="true"
                ></i>
                Step 3:Candidate Remuneration Information
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <ViewRemunerationInformation />
            </AccordionItemPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton>
                <i
                  style={{
                    color: "green",
                    backgroundColor: "white",
                    borderRadius: "50%",
                    fontSize: "19px",
                  }}
                  className="fa fa-check-circle"
                  aria-hidden="true"
                ></i>
                Step 4: Generate Candidate Offer Letter
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <CandidateOfferLetter />
            </AccordionItemPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton
                style={activeStep5 ? {} : { background: "#aaa" }}
              >
                {checkStep5 === true && activeStep5 === true ? (
                  <div>
                    {" "}
                    <i
                      style={{
                        color: "green",
                        backgroundColor: "white",
                        borderRadius: "50%",
                        fontSize: "19px",
                      }}
                      className="fa fa-check-circle"
                      aria-hidden="true"
                    ></i>
                    Step 5: Verify Candidate Documents{" "}
                  </div>
                ) : (
                  "Step 5: Verify Candidate Documents"
                )}
              </AccordionItemButton>
            </AccordionItemHeading>
            {activeStep5 === true ? (
              <AccordionItemPanel>
                <VerifyCandidateDocs />
              </AccordionItemPanel>
            ) : (
              ""
            )}
          </AccordionItem>
          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton
                style={activeStep6 ? {} : { background: "#aaa" }}
              >
                {" "}
                {checkStep6 === true && activeStep6 === true ? (
                  <div>
                    {" "}
                    <i
                      style={{
                        color: "green",
                        backgroundColor: "white",
                        borderRadius: "50%",
                        fontSize: "19px",
                      }}
                      className="fa fa-check-circle"
                      aria-hidden="true"
                    ></i>
                    Step 6: Candidate Onboarding{" "}
                  </div>
                ) : (
                  "Step 6: Candidate Onboarding"
                )}
              </AccordionItemButton>
            </AccordionItemHeading>
            {activeStep6 === true ? (
              <AccordionItemPanel>
                <CandidateOnboarding />
              </AccordionItemPanel>
            ) : (
              ""
            )}
          </AccordionItem>
        </Accordion>
        {/* </Accordion> */}
      </Container>
    </Fragment>
  );
};

export default ViewOfferRelease;
