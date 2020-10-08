import React, { useEffect, Fragment, useContext, useState } from 'react'
import moment from 'moment';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import Breadcrumb from "../common/breadcrumb";
import "./roster.css";
import CreateShiftModal from "./createShiftModal";
import EditShiftModal from "./editShiftModal";
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

  // variables
  const { shiftList, editShift, viewShift, viewShiftTypes, viewContractTypes, singleShiftList } = useContext(RosterContext);
  //console.log(shiftList, "in viewShift");


  //=====================Pagination ===================
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentShiftList = shiftList.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = pageNumber => setCurrentPage(pageNumber);

  useEffect(() =>{
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentShiftList = shiftList.slice(indexOfFirstPost, indexOfLastPost);
  }, [currentPage])

  const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
    const pageNumbers = [];
  
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
      pageNumbers.push(i);
    }
  
    return (
      <nav>
        <ul className='pagination'>
          {pageNumbers.map(number => (
            <li key={number} className='page-item'>
              <a onClick={() => paginate(number)} className='page-link'>
                {number}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  };

  //=====================Pagination ===================


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
              <div className="table-responsive tableFixHead">

                <table id="table-to-xls" className="table table-hover">
                  <thead className="thead-light" style={{ backgroundColor: "#2f3c4e" }}>
                    <tr>
                      <th>S. No</th>
                      <th>Shift Timings</th>
                      <th>Break Time</th>
                      <th>Working Hours</th>
                      <th>Contract Type</th>
                      <th>Shift Type</th>
                      <th>Status</th>
                      <th>Edit</th>
                    </tr>
                  </thead>


                  {currentShiftList !== null &&
                    currentShiftList.map((e, i) => {
                      return (
                        <tbody key={i + 1}>
                          <tr>
                            <td>{i + 1 + indexOfFirstPost}</td>

                            <td> {moment(e.startTime, ["h:mm A"]).format("HH:mm")}-{moment(e.endTime, ["h:mm A"]).format("HH:mm")}</td>
                            <td>{moment(e.breakStartTime, ["h:mm A"]).format("HH:mm")}-{moment(e.breakEndTime, ["h:mm A"]).format("HH:mm")}</td>
                            <td>{e.workingHours}</td>
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
            </div>
            <div className="pagination">
                 <Pagination
                    postsPerPage={postsPerPage}
                    totalPosts={shiftList.length}
                    paginate={paginate}
                />
            </div>
            
          </div>
        </div>


      </div>
    </Fragment>

  )
}

export default ViewShift

