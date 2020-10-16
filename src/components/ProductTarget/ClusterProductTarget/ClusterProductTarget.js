import React, { Fragment, useState, useContext,useEffect } from 'react';
import {  Row, Col, Table, Button } from 'react-bootstrap'
import Breadcrumb from '../../common/breadcrumb';
import { Edit2 } from 'react-feather';
import AddTarget from './AddTarget';
import EditTarget from './EditTarget';
import Loader from "../../common/loader";
import { ClusterProductContext } from "../../../context/ClusterProductState";
import './styles.css';
import Pagination from 'react-js-pagination';

function ClusterProductTarget(){

  const { clusterProductList,singleClusterTarget, viewClusterTarget, viewSingleClusterTarget } = useContext(ClusterProductContext);

  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [TodayDate, setTodayDate] = useState();
  const [month, setMonth] = useState();
  const [Year, setYear] = useState();


  //pagenation data

  const [currentPage, setCurrentPage] = useState(1);
  const recordPerPage = 10;
  const totalRecords = clusterProductList.length;
  const pageRange = 10;

  const indexOfLastRecord = currentPage * recordPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordPerPage;
  const currentRecords = clusterProductList.slice(indexOfFirstRecord, indexOfLastRecord);

  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
  }

  //pagenation data


  const handleClose = () => {
      viewClusterTarget();
      setModal(false);
  }
  useEffect(() => {
    let date = new Date();
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0');
    var yyyy = date.getFullYear();
    setTodayDate(dd);
    setMonth(mm);
    setYear(yyyy);
    viewClusterTarget();
  }, []);


  var monthsNumber = new Array();
    monthsNumber["Jan"] = "01";
    monthsNumber["Feb"] = '02';
    monthsNumber["Mar"] = '03';
    monthsNumber["Apr"] = '04';
    monthsNumber["May"] = '05' ;
    monthsNumber["Jun"] = '06' ;
    monthsNumber["Jul"] = '07' ;
    monthsNumber["Aug"] = '08' ;
    monthsNumber["Sep"] = '09' ;
    monthsNumber["Oct"] = '10' ;
    monthsNumber["Nov"] = '11' ;
    monthsNumber["Dec"] = '12' ;

  const handleEditClose = () => setEditModal(false);

  return(
    <Fragment>
            <Breadcrumb title="View Cluster" parent="View Cluster" />
            <div className="container-fluid">

                <Row className="apply-button-row">
                    <Col className="leaveApplications">Cluster Target</Col>
                    <Col>
                        <Button className="apply-button btn btn-light" 
                        onClick={() => {setModal(true) }}>Add Target</Button>
                    </Col>
                    <AddTarget handleClose={handleClose} modal={modal} />
                </Row>

                <div className="table-responsive">
                     <Table id="table-to-xls" className="table table-hover">
                        <thead className="thead-light" style={{ backgroundColor: "#2f3c4e" }}>
                            <tr>
                                <th>S. No</th>
                                <th>Cost Center ID</th>
                                <th>Store Name</th>
                                <th>Cluster Name</th>
                                <th>Month</th>
                                <th>Year</th>
                                <th>Productivity Target</th>

                                <th></th>
                                <th></th>
                            </tr>
                        </thead>

                        {currentRecords.length > 0 ?
                            currentRecords.map((item, i) => {
                                return (
                                   <tbody key={i + 1}>
                                        <tr>
                                            <td>{i + 1+ indexOfFirstRecord}</td>
                                            <td>{item.storeName}</td>
                                            <td>{item.storeName}</td>
                                            <td>{item.clusterName}</td>
                                            <td>{item.monthName}</td>
                                            <td>{item.year}</td>
                                            <td>{item.productTarget}</td>

                                            {Year > item.year?
                                            <td><Edit2 disabled style={{color:'lightgrey'}} /></td>
                                             :
                                             Year === item.year && monthsNumber[item.month] <= month
                                             ?
                                             <td><Edit2 disabled style={{color:'lightgrey'}} /></td>
                                             :
                                             Year === item.year && monthsNumber[item.month] <= month && TodayDate > 20
                                             ?
                                             <Edit2 disabled style={{color:'lightgrey'}} /> :
                                            <td><Edit2
                                            style={{color:'#006EBB'}}
                                            onClick={() => {
                                                setEditModal(true);
                                                viewSingleClusterTarget(item.targetId)
                                             }}

                                             />
                                            </td> }

                                            <td></td>

                                            {/* <td><Edit2 onClick={() => {
                                                setEditModal(true);
                                                viewSingleClusterTarget(item.targetId);
                                                // setCostCenter(item.storeName);
                                                // setCluster(item.clusterName);
                                                // setDate(item.monthName);
                                                // setTargetWeekdays(item.weekDayTarget)
                                                // setTargetWeekend(item.weekEndTarget)

                                            }} /></td>                                                                                      */}

                                         </tr>
                                    </tbody>
                                 )
                            }) : ""
                            // <div id="loader"><Loader /></div>
                            }
                    </Table> 

                    <EditTarget
                     handleEditClose={handleEditClose}
                     modal={editModal}
                     singleClusterTarget = {singleClusterTarget}
                     />

                </div>

                <div>
                    {clusterProductList !== null && clusterProductList.length > 0 &&
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
        </Fragment>
  )
}

export default ClusterProductTarget;
