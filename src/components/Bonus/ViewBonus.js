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
import Pagination from "react-js-pagination";

import Breadcrumb from "../common/breadcrumb";
import { Edit, Edit2, Eye, Search } from "react-feather";
import BonusForm from "./BonusForm";
import { BonusContext } from "../../context/BonusState";
import EditBonus from "./EditBonus";
const ViewBonus = () => {
  const {
    bonusDetails,
    total,
    loader,
    viewBonus,
    viewBonusById,
    exportBonusList,
    getBonusDetailsById,
  } = useContext(BonusContext);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const recordPerPage = 10;
  const pageRange = 10;

  const totalRecords = total;

  const [show, setShow] = useState(false);
  const [editmodal, setEditModal] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [currentRecords, setCurrentRecords] = useState([]);
  const indexOfLastRecord = currentPage * recordPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordPerPage;
  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };
  const handleEditClose = () => {
    setEditModal(false);
  };
  /*-----------------pagination ------------------*/
  const handlePageChange = (pageNumber) => {
    setPageCount(pageNumber - 1);
    setCurrentPage(pageNumber);
    if (searchValue !== "") {
      viewBonus(searchValue, pageNumber - 1);
    } else {
      viewBonus("all", pageNumber - 1);
    }
    setCurrentRecords(bonusDetails);
  };
  /*--------------------Search -------------------*/
  const searchHandler = (e) => {
    setSearchValue(e.target.value);
  };

  const searchDataHandler = () => {
    if (searchValue !== "") {
      viewBonus(searchValue, pageCount);
    } else {
      viewBonus("all", pageCount);
    }
  };
  /*-----------Search Code End---------------*/
  /*-----------Export------------------*/
  const handleExport = (e) => {
    console.log(e.target.value);
    exportBonusList();
  };
  useEffect(() => {
    viewBonus("all", pageCount);
  }, []);
  useEffect(() => {
    if (bonusDetails !== null && bonusDetails !== undefined) {
      setCurrentRecords(bonusDetails);
    }
  }, [bonusDetails, currentRecords]);
  return (
    console.log(bonusDetails),
    console.log(currentRecords),
    console.log(total),
    (
      <Fragment>
        <BonusForm show={show} handleClose={handleClose} />
        <EditBonus editmodal={editmodal} handleEditClose={handleEditClose} />
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
                  onChange={(e) => searchHandler(e)}
                />
                <Search
                  className="search-icon"
                  style={{ color: "#313131" }}
                  onClick={searchDataHandler}
                />
              </div>
            </Col>
            <Col style={{ textAlign: "end" }}>
              <Button onClick={handleShow}>Create</Button>
            </Col>
            <Col style={{ float: "right" }}>
              <Button onClick={handleExport}>Export</Button>
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
            {loader === true &&
            bonusDetails !== null &&
            bonusDetails !== undefined ? (
              <tbody>
                <tr>
                  <td colSpan="12">
                    <div
                      className="loader-box loader"
                      style={{ width: "100% !important" }}
                    >
                      <div className="loader">
                        <div className="line bg-primary"></div>
                        <div className="line bg-primary"></div>
                        <div className="line bg-primary"></div>
                        <div className="line bg-primary"></div>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            ) : (
              bonusDetails !== undefined &&
              bonusDetails !== null &&
              bonusDetails.map((item, i) => {
                return (
                  <tbody key={i}>
                    <tr>
                      <td>{i + 1 + indexOfFirstRecord}</td>
                      <td>{item.department}</td>

                      <td>{item.contractType}</td>
                      <td>{item.designation}</td>
                      <td>{item.bonus}</td>
                      <td>{item.month}</td>
                      <td>{item.year}</td>
                      <td>
                        <Edit2
                          onClick={() => {
                            setEditModal(true);
                            viewBonusById(item.bonusId);
                          }}
                        ></Edit2>
                      </td>
                    </tr>
                  </tbody>
                );
              })
            )}
          </Table>
        </div>
        {bonusDetails !== null && bonusDetails !== undefined && (
          <Pagination
            itemClass="page-item"
            linkClass="page-link"
            activePage={currentPage}
            itemsCountPerPage={recordPerPage}
            totalItemsCount={totalRecords}
            pageRangeDisplayed={pageRange}
            onChange={handlePageChange}
            firstPageText="First"
            lastPageText="Last"
          />
        )}
      </Fragment>
    )
  );
};
export default ViewBonus;
