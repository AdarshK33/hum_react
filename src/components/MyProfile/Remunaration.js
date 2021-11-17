import React, {
  Fragment,
  useState,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
import { EmployeeProfileContext } from "../../context/EmployeeProfileState";

const Remuneration = () => {
  const {
    RemunerationView,
    remunerationData,
    CostCentreSplitView,
    costCentreSplitData,
  } = useContext(EmployeeProfileContext);
  const [state, setState] = useState({
    salaryType: "",
    fixedGross: "",
    monthlyBonus: "",
    otherBonus: "",
  });
  useEffect(() => {
    RemunerationView();
    CostCentreSplitView();
  }, []);
  useEffect(() => {
    if (
      remunerationData !== null &&
      remunerationData !== undefined &&
      Object.keys(remunerationData).length !== 0
    ) {
      setState({
        salaryType: remunerationData.salaryTransferType,
        fixedGross: remunerationData.fixedGross,
        monthlyBonus: remunerationData.maxBonus,
        otherBonus: remunerationData.maxBonus,
      });
    }
  }, [remunerationData]);
  return (
    <Fragment>
      <ToastContainer />

      <Row style={{ marginBottom: "2rem" }}>
        <Container fluid className="container-accordion">
          <Accordion preExpanded={["a"]}>
            <AccordionItem uuid="a">
              <AccordionItemHeading>
                <AccordionItemButton>Salary</AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <Form>
                  {/* <label>
                    <b>Personal :</b>
                  </label>
                  <Row
                    style={{
                      borderTop: "2px solid #006ebb",
                      width: "98%",
                      marginRight: "1rem",
                      marginBottom: "1rem",
                      marginLeft: "-2px",
                    }}
                  ></Row> */}
                  <Row
                    style={{
                      marginBottom: "2rem",
                    }}
                  >
                    <Col sm={3}>
                      <label>
                        <b>Salary Type</b>
                      </label>
                      <br />
                      <label className="itemResult">{state.salaryType}</label>
                    </Col>
                    <Col sm={3}>
                      <label>
                        <b>Monthly Fixed Gross</b>
                      </label>
                      <br />
                      <label className="itemResult">{state.fixedGross}</label>
                    </Col>
                    <Col sm={3}>
                      <label>
                        <b>Max Eligible Monthly Bonus % </b>
                      </label>
                      <br />
                      <label className="itemResult">{state.monthlyBonus}</label>
                    </Col>
                    <Col sm={3}>
                      <label>
                        <b>Any Other Bonus</b>
                      </label>
                      <br />
                      <label className="itemResult">---</label>
                    </Col>
                  </Row>
                  {costCentreSplitData !== null &&
                  costCentreSplitData !== undefined &&
                  Object.keys(costCentreSplitData).length !== 0 &&
                  costCentreSplitData.costCentreA !== null &&
                  costCentreSplitData.costCentreA !== undefined ? (
                    <div>
                      <Row>
                        <Col sm={3}>
                          <label>
                            <b>Cost Centre Split 1 :</b>
                          </label>
                        </Col>
                      </Row>
                      <Row
                        style={{
                          marginBottom: "2rem",
                        }}
                      >
                        <Col sm={3}>
                          <label>
                            <b>Cost Centre</b>
                          </label>
                          <br />
                          <label className="itemResult">
                            {costCentreSplitData.costCentreA}
                          </label>
                        </Col>
                        <Col sm={3}>
                          <label>
                            <b>Month</b>
                          </label>
                          <br />
                          <label className="itemResult">
                            {costCentreSplitData.startMonthNameA}
                          </label>
                        </Col>
                        <Col sm={3}>
                          <label>
                            <b>Year</b>
                          </label>
                          <br />
                          <label className="itemResult">
                            {costCentreSplitData.startYearA}
                          </label>
                        </Col>
                      </Row>
                    </div>
                  ) : (
                    ""
                  )}
                  {costCentreSplitData !== null &&
                  costCentreSplitData !== undefined &&
                  Object.keys(costCentreSplitData).length !== 0 &&
                  costCentreSplitData.costCentreB !== null &&
                  costCentreSplitData.costCentreB !== undefined ? (
                    <div>
                      <Row>
                        <Col sm={3}>
                          <label>
                            <b>Cost Centre Split 2 :</b>
                          </label>
                        </Col>
                      </Row>
                      <Row
                        style={{
                          marginBottom: "2rem",
                        }}
                      >
                        <Col sm={3}>
                          <label>
                            <b>Cost Centre</b>
                          </label>
                          <br />
                          <label className="itemResult">
                            {costCentreSplitData.costCentreB}
                          </label>
                        </Col>
                        <Col sm={3}>
                          <label>
                            <b>Month</b>
                          </label>
                          <br />
                          <label className="itemResult">
                            {costCentreSplitData.startMonthNameB}
                          </label>
                        </Col>
                        <Col sm={3}>
                          <label>
                            <b>Year</b>
                          </label>
                          <br />
                          <label className="itemResult">
                            {costCentreSplitData.startYearB}
                          </label>
                        </Col>
                      </Row>
                    </div>
                  ) : (
                    ""
                  )}
                  {costCentreSplitData !== null &&
                  costCentreSplitData !== undefined &&
                  Object.keys(costCentreSplitData).length !== 0 &&
                  costCentreSplitData.costCentreC !== null &&
                  costCentreSplitData.costCentreC !== undefined ? (
                    <div>
                      <Row>
                        <Col sm={3}>
                          <label>
                            <b>Cost Centre Split 3 :</b>
                          </label>
                        </Col>
                      </Row>
                      <Row
                        style={{
                          marginBottom: "2rem",
                        }}
                      >
                        <Col sm={3}>
                          <label>
                            <b>Cost Centre</b>
                          </label>
                          <br />
                          <label className="itemResult">
                            {costCentreSplitData.costCentreC}
                          </label>
                        </Col>
                        <Col sm={3}>
                          <label>
                            <b>Month</b>
                          </label>
                          <br />
                          <label className="itemResult">
                            {costCentreSplitData.startMonthNameC}
                          </label>
                        </Col>
                        <Col sm={3}>
                          <label>
                            <b>Year</b>
                          </label>
                          <br />
                          <label className="itemResult">
                            {costCentreSplitData.startYearC}
                          </label>
                        </Col>
                      </Row>
                    </div>
                  ) : (
                    ""
                  )}
                  {costCentreSplitData !== null &&
                  costCentreSplitData !== undefined &&
                  Object.keys(costCentreSplitData).length !== 0 &&
                  costCentreSplitData.costCentreD !== null &&
                  costCentreSplitData.costCentreD !== undefined ? (
                    <div>
                      <Row>
                        <Col sm={3}>
                          <label>
                            <b>Cost Centre Split 4 :</b>
                          </label>
                        </Col>
                      </Row>
                      <Row
                        style={{
                          marginBottom: "2rem",
                        }}
                      >
                        <Col sm={3}>
                          <label>
                            <b>Cost Centre</b>
                          </label>
                          <br />
                          <label className="itemResult">
                            {costCentreSplitData.costCentreD}
                          </label>
                        </Col>
                        <Col sm={3}>
                          <label>
                            <b>Month</b>
                          </label>
                          <br />
                          <label className="itemResult">
                            {costCentreSplitData.startMonthNameD}
                          </label>
                        </Col>
                        <Col sm={3}>
                          <label>
                            <b>Year</b>
                          </label>
                          <br />
                          <label className="itemResult">
                            {costCentreSplitData.startYearD}
                          </label>
                        </Col>
                      </Row>
                    </div>
                  ) : (
                    ""
                  )}
                  {costCentreSplitData !== null &&
                  costCentreSplitData !== undefined &&
                  Object.keys(costCentreSplitData).length !== 0 &&
                  costCentreSplitData.costCentreE !== null &&
                  costCentreSplitData.costCentreE !== undefined ? (
                    <div>
                      <Row>
                        <Col sm={3}>
                          <label>
                            <b>Cost Centre Split 5 :</b>
                          </label>
                        </Col>
                      </Row>
                      <Row
                        style={{
                          marginBottom: "2rem",
                        }}
                      >
                        <Col sm={3}>
                          <label>
                            <b>Cost Centre</b>
                          </label>
                          <br />
                          <label className="itemResult">
                            {costCentreSplitData.costCentreE}
                          </label>
                        </Col>
                        <Col sm={3}>
                          <label>
                            <b>Month</b>
                          </label>
                          <br />
                          <label className="itemResult">
                            {costCentreSplitData.startMonthNameE}
                          </label>
                        </Col>
                        <Col sm={3}>
                          <label>
                            <b>Year</b>
                          </label>
                          <br />
                          <label className="itemResult">
                            {costCentreSplitData.startYearE}
                          </label>
                        </Col>
                      </Row>
                    </div>
                  ) : (
                    ""
                  )}
                </Form>
              </AccordionItemPanel>
            </AccordionItem>
          </Accordion>
        </Container>
      </Row>
    </Fragment>
  );
};
export default Remuneration;
