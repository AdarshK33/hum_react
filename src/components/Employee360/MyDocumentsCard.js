import React, { useState, useContext, useEffect } from "react";
import Chart from "react-google-charts";
import { Row, Col, Form, Cards, NavItem } from "react-bootstrap";
import { Edit2, Eye, Search, Download } from "react-feather";
import ScrollArea from "react-scrollbar";
import { Fragment } from "react";
import { Employee360Context } from "../../context/Employee360State";
import ViewTheLetter from "./view";
import { DocsVerifyContext } from "../../context/DocverificationState";

const MyDocumentsCard = ({ height }) => {
  const { MyDocView, MyDocList, letterShow, SetLetterView } =
    useContext(Employee360Context);
  const { downloadFile } = useContext(DocsVerifyContext);
  const [showLetter, setShowLetter] = useState(false);
  const [LetterName, setLetterName] = useState("");
  const [Name, setName] = useState("");

  useEffect(() => {
    MyDocView();
  }, []);
  console.log("MyDocList", MyDocList);
  const showTheLetter = (e, name) => {
    console.log("check", e);
    setLetterName(e);
    setName(name);
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
      {letterShow ? <ViewTheLetter DocName={LetterName} Name={Name} /> : ""}
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
          style={{ zIndex: "0", height: height }}
        >
          {MyDocList.map((item) => {
            return (
              <Row style={{ marginTop: "1rem" }}>
                <Col>
                  <div className="DocumentsDiv">
                    <div className="DocumentDot"></div>
                    <div className="DocName">
                      <label>
                        {item.documentName !== null &&
                        item.documentName !== undefined
                          ? item.documentName.replace(" ", "").replace(" ", "")
                          : ""}
                      </label>
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
                    onClick={(e) =>
                      showTheLetter(item.documentLink, item.documentName)
                    }
                  />

                  <Download
                    style={{ fontSize: "xx-small", color: "#4f90ff" }}
                    onClick={(e) => downloadTheLetter(item.documentLink)}
                  />
                </Col>
                {/* <Col>
                  <Download
                    style={{ fontSize: "xx-small", color: "#4f90ff" }}
                    onClick={(e) => downloadTheLetter(item.documentLink)}
                  />
                </Col> */}
              </Row>
            );
          })}
        </ScrollArea>
      ) : (
        <h4 style={{ textAlign: "center", width: "100%", marginTop: "30%" }}>
          No Records Found
        </h4>
      )}
    </Fragment>
  );
};
export default MyDocumentsCard;
