import React, { useEffect, Fragment, useContext, useState } from 'react'
import moment from 'moment';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import Breadcrumb from "../common/breadcrumb";
import "./roster.css";
import CreateShiftModal from "./createShiftModal";
import EditShiftModal from "./editShiftModal";
import Pagination from 'react-js-pagination';
import { Button } from 'react-bootstrap'
import { RosterContext } from "../../context/RosterState";
import { Edit2 } from 'react-feather'

function ViewShift() {
  useEffect(() => {
    viewShift()
  }, [])
  const [modal, setModal] = useState(false);
  const handleClose = () => setModal(false)
  const handleShow = () => setModal(true)

  const [editModal, setEditModal] = useState(false)
  const handleEditClose = () => setEditModal(false)
  const handleEditShow = () => setEditModal(true)

  const [contractType, setContractType] = useState('');
  const [shiftType, setShiftType] = useState('');
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [breakStartTime, setStartBreakTime] = useState(new Date());
  const [breakEndTime, setBreakEndTime] = useState(new Date());
  const [workingHours, setWorkingHour] = useState();
  const [status, setStatus] = useState('')
  const { shiftList, editShift, viewShift, viewShiftTypes, viewContractTypes, singleShiftList } = useContext(RosterContext);
  //pagenation data


  const [currentPage, setCurrentPage] = useState(1);
  const recordPerPage = 10;
  let totalRecords = 0;
  let indexOfFirstRecord = 0;
  let indexOfLastRecord = 0;
  const pageRange = 10;
  let currentRecords = [];

  if (shiftList !== null) {
    totalRecords = shiftList.length;
    indexOfLastRecord = currentPage * recordPerPage;
    indexOfFirstRecord = indexOfLastRecord - recordPerPage;
    currentRecords = shiftList.slice(indexOfFirstRecord, indexOfLastRecord);
  }


  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
  }

  //pagenation data






  return (
    <Fragment>
      <Breadcrumb title="View Shift" parent="View Shift" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card" style={{ overflowX: "auto" }}>
              <div className="title_bar" >
                <Button className="btn btn-light mr-2" onClick={handleShow}>Create</Button>
                <ReactHTMLTableToExcel
                  className="btn btn-light mr-2"
                  table="table-to-xls"
                  filename="viewshift"
                  sheet="Sheet"
                  buttonText="Export excel" />
              </div>
              <CreateShiftModal handleClose={handleClose} modal={modal} />
              <div className="table-responsive">

                <table id="table-to-xls" className="table table-hover">
                  <thead className="thead-light" style={{ backgroundColor: "#2f3c4e" }}>
                    <tr>
                      <th>S. No</th>
                      <th>Cost Center</th>
                      <th>Shift Timings</th>
                      <th>Working Hours</th>
                      <th>&nbsp;Break Time&nbsp;</th>
                      <th>Contract Type</th>
                      <th>Shift Type</th>
                      <th>Status</th>
                      <th>Edit</th>
                    </tr>
                  </thead>


                  {currentRecords !== undefined && currentRecords !== null &&
                    currentRecords.map((e, i) => {
                      return (
                        <tbody key={i + 1}>
                          <tr>
                            <td>{i + 1 + indexOfFirstRecord}</td>
                            <td>{e.storeId}</td>
                            <td> {moment(e.startTime, ["h:mm A"]).format("HH:mm")}-{moment(e.endTime, ["h:mm A"]).format("HH:mm")}</td>

                            <td>{e.workingHours}</td>
                            <td>{moment(e.breakStartTime, ["h:mm A"]).format("HH:mm")}-{moment(e.breakEndTime, ["h:mm A"]).format("HH:mm")}</td>
                            <td>{e.contractType}</td>
                            <td>{e.shiftType}</td>

                            <td>{e.status === 0 ? "Active" : "Inactive"} </td>
                            <td><Edit2 onClick={() => {
                              viewShift()
                              setEditModal(true);
                              editShift(e.shiftMasterId);
                              setShiftType(e.shiftType);
                              setContractType(e.contractType);
                              setStartTime(e.startTime)
                              setEndTime(e.endTime)
                              setStartBreakTime(e.breakStartTime)
                              setBreakEndTime(e.breakEndTime)
                              setWorkingHour(e.workingHours)
                              setStatus(e.status)
                              viewShiftTypes()
                              viewContractTypes()
                            }} />
                            </td>

                            {/* <td>  <Link to={{ pathname: `EditShift/${e.shiftMasterId}`, data: { id: e.shiftMasterId } }}><Edit2 onClick={() => editShift(e.shiftMasterId)} /></Link></td> */}
                          </tr>

                        </tbody>
                      );
                    })}
                </table>
                <EditShiftModal handleEditClose={handleEditClose}
                  shiftType={shiftType}
                  contractType={contractType}
                  startTime={startTime}
                  endTime={endTime}
                  breakStartTime={breakStartTime}
                  breakEndTime={breakEndTime}
                  workingHours={workingHours}
                  status={status}
                  shiftData={singleShiftList}
                  modal={editModal} />
              </div>

              <div>
                {shiftList !== null && shiftList.length > 10 &&
                  <Pagination
                    itemClass="page-item"
                    linkClass="page-link"
                    activePage={currentPage}
                    itemsCountPerPage={recordPerPage}
                    totalItemsCount={totalRecords}
                    pageRangeDisplayed={pageRange}
                    onChange={handlePageChange}
                  />
                }
              </div>




            </div>
          </div>
        </div>


      </div>
    </Fragment>

  )
}

export default ViewShift

