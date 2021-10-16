import React, { useState, useContext, useEffect } from "react";
import Chart from "react-google-charts";
import { Row, Col, Form, Cards, NavItem } from "react-bootstrap";
import { Edit2, Eye, Search, Download } from "react-feather";
import ScrollArea from "react-scrollbar";
import { Fragment } from "react";
import { Employee360Context } from "../../context/Employee360State";
import ViewTheLetter from "./view";
import { DocsVerifyContext } from "../../context/DocverificationState";

const MyDocumentsCard = () => {
  const { MyDocView, MyDocList, letterShow, SetLetterView } =
    useContext(Employee360Context);
  const { downloadFile } = useContext(DocsVerifyContext);
  const [showLetter, setShowLetter] = useState(false);
  const [LetterName, setLetterName] = useState("");

  useEffect(() => {
    MyDocView();
  }, []);
  console.log("MyDocList", MyDocList);
  const showTheLetter = (e) => {
    console.log("check", e);
    setLetterName(e);
    setShowLetter(true);
    SetLetterView(true);
    // return <ViewTheLetter DocName={e} />;
  };
  const downloadTheLetter = (e) => {
    console.log("check", e);
    downloadFile(e);
  };
  return (
    <Fragment>
      {letterShow ? <ViewTheLetter DocName={LetterName} /> : ""}
      {MyDocList !== null &&
      MyDocList !== undefined &&
      MyDocList !== "" &&
      Object.keys(MyDocList).length !== 0 ? (
        <ScrollArea
          speed={0.4}
          // className="area"
          // contentClassName="content"
          smoothScrolling={true}
          horizontal={false}
          style={{ zIndex: "0" }}
        >
          {MyDocList.map((item) => {
            return (
              <Row style={{ marginTop: "1rem" }}>
                <Col>
                  <div className="DocumentsDiv">
                    <div className="DocumentDot"></div>
                    <div className="DocName">
                      <label>{item.documentName}</label>
                    </div>
                  </div>
                </Col>
                <Col
                  style={{
                    textAlign: "right",
                  }}
                >
                  <Eye
                    style={{
                      textAlign: "right",
                      fontSize: "xx-small",
                      color: "#4f90ff",
                    }}
                    onClick={(e) => showTheLetter(item.documentLink)}
                  />

                  {/* <div
                      style={{ display: "none" }}
                      name={item.documentName}
                      onChange={showTheLetter}
                      onClick={(e) => showTheLetter(item.documentName)}
                    /> */}
                </Col>
                <Col>
                  <Download
                    style={{ fontSize: "xx-small", color: "#4f90ff" }}
                    onClick={(e) => downloadTheLetter(item.documentLink)}
                  />
                </Col>
              </Row>
            );
          })}
        </ScrollArea>
      ) : (
        ""
      )}
    </Fragment>
  );
};
export default MyDocumentsCard;
