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
import { AppContext } from "../../context/AppState";

const Remuneration = () => {
  const { user } = useContext(AppContext);
  const {
    RemunerationView,
    remunerationData,
    CostCentreSplitView,
    costCentreSplitData,
    UpdateRemuneration,
  } = useContext(EmployeeProfileContext);
  const [state, setState] = useState({
    salaryType: "",
    fixedGross: "",
    monthlyBonus: "",
    otherBonus: "",
  });
  const [vpfValue, setVpfValue] = useState("");
  const [vpfError, setVpfError] = useState(false);
  useEffect(() => {
    RemunerationView(user.employeeId);
    CostCentreSplitView(user.employeeId);
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
      setVpfValue(remunerationData.vpf);
    }
  }, [remunerationData]);
  const VpfValidation = () => {
    if (vpfValue !== "" && vpfValue !== null && vpfValue !== undefined) {
      setVpfError(false);
      return true;
    } else {
      setVpfError(true);
      return false;
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
    console.log("insideSubmit");
    if (
      VpfValidation() === true &&
      remunerationData !== null &&
      remunerationData !== undefined &&
      remunerationData !== "" &&
      Object.keys(remunerationData).length !== 0
    ) {
      console.log(".....", remunerationData);

      const data = {
        employeeId: remunerationData.employeeId,
        esicNumber: remunerationData.esicNumber,
        fixedGross: state.fixedGross,
        maxBonus: state.monthlyBonus,
        paymentType: state.salaryType,
        pfNumber: remunerationData.pfNumber,
        remunerationId: remunerationData.remunerationId,
        salaryTransferType: state.salaryType,
        uanNumber: remunerationData.uanNumber,
        vpf: vpfValue,
        withEffectiveFrom: new Date(),
      };
      UpdateRemuneration(data);
    } else {
      console.log("error");
    }
  };
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
                      <label className="itemResult">{state.salaryType==="Stipend"?"Fixed Gross":state.salaryType}</label>
                    </Col>
                    <Col sm={3}>
                    <label>
                        <b>{state.salaryType==="Stipend"?"Monthly Stipend":state.salaryType==="Fixed Gross"?"Monthly Fixed Gross":state.salaryType==="Hourly"?"Hourly Fixed Gross":"Monthly Fixed Gross"}</b>
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

                  <Row>
                    <Col sm={3}>
                      <label>
                        <b>VPF %</b>
                      </label>
                      <br />
                      <Form.Group>
                        <Form.Control
                          type="number"
                          name="emailId"
                          className="text-primary"
                          value={vpfValue}
                          onChange={(e) => setVpfValue(e.target.value)}
                          required
                          placeholder="VPF %"
                          // disabled={disabled}
                          style={vpfError ? { borderColor: "red" } : {}}
                        />
                        {vpfError ? (
                          <p style={{ color: "red" }}>
                            Please enter valid VPF %
                          </p>
                        ) : (
                          <p></p>
                        )}
                      </Form.Group>
                    </Col>
                    <div
                      style={{
                        marginTop: "2rem",
                        marginBottom: "1rem",
                        textAlign: "right",
                      }}
                    >
                      <button
                        className="profileButtons"
                        onClick={submitHandler}
                      >
                        Update
                      </button>
                    </div>
                  </Row>
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
