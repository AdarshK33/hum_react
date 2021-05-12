import React, {
  Fragment,
  useState,
  useContext,
  useEffect,
  useMemo,
} from "react";
import {
  Container,
  Col,
  Row,
  Button,
  Form,
  Modal,
  Table,
} from "react-bootstrap";
import Breadcrumb from "../common/breadcrumb";
import { Edit2, Eye, Search } from "react-feather";
import BonusForm from "./BonusForm";
import { BonusContext } from "../../context/BonusState";

const ViewBonus = () => {
  const { bonusDetails, total, loader, viewBonus } = useContext(BonusContext);
  const [pageCount, setPageCount] = useState(0);
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };
  useEffect(() => {
    viewBonus("all", pageCount);
  }, []);
  return (
    console.log(bonusDetails),
    console.log(total),
    (
      <Fragment>
        <BonusForm show={show} handleClose={handleClose} />
        <Breadcrumb title="Bonus Structure" parent="Bonus Structure" />
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className="card" style={{ borderRadius: "1rem" }}>
                <div className="OnBoardHeading">
                  <b>Bonus Structure </b>
                </div>
              </div>
            </div>
          </div>
          <Row>
            <Col sm={4}>
              <div className="faq-form mr-2">
                <input
                  className="form-control "
                  type="text"
                  placeholder="Search.."
                  // onChange={(e) => searchHandler(e)}
                />
                <Search
                  className="search-icon"
                  style={{ color: "#313131" }}
                  // onClick={searchDataHandler}
                />
              </div>
            </Col>
            <Col>
              <Button onClick={handleShow}>Create</Button>
            </Col>
            <Col>
              <Button>Export</Button>
            </Col>
          </Row>
          <Table className="mt-3">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Department</th>
                <th>Contract Type</th>
                <th>Designation</th>
                <th>Bonus %</th>
                <th>Month</th>
                <th>Year</th>
                <th>Edit</th>
              </tr>
            </thead>
            {/* {loader === true && bonusDetails !== null && bonusDetails !== undefined ?} */}
          </Table>
        </div>
      </Fragment>
    )
  );
};
export default ViewBonus;
