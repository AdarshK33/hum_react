import React, { Fragment, useState, useContext, useEffect } from 'react';
import Breadcrumb from '../common/breadcrumb';
import { Edit2, Search } from 'react-feather';
import { Button } from 'react-bootstrap'
const TicketListingPage = () => {

    return (
        <Fragment>
            <Breadcrumb title="View Ticket Status" parent="Ticket status" />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card" style={{ overflowX: "auto" }}>
                            <div className="title_bar" >
                                <div className="job-filter">
                                    <div className="faq-form mr-2">
                                        <input className="form-control searchButton" type="text" placeholder="Search.." />
                                        <Search className="search-icon" style={{ color: "#313131" }} />
                                    </div>
                                </div>
                                <Button className="btn btn-light mr-2" >Create</Button>

                            </div>

                            <div className="table-responsive">

                                <table id="table-to-xls" className="table table-hover">
                                    <thead className="thead-light" style={{ backgroundColor: "#2f3c4e" }}>

                                        <tr>
                                            <th scope="col">S. No</th>
                                            <th scope="col">Ticket Id</th>
                                            <th scope="col">Cost Center</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Role</th>
                                            <th scope="col">Issue Category</th>
                                            <th scope="col">Priority</th>
                                            <th scope="col">Completion Status</th>
                                            <th scope="col">Ticket Status</th>
                                            <th scope="col">Updated Date</th>
                                            <th scope="col">Created Date</th>
                                            <th scope="col">Edit</th>
                                        </tr>

                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>1001</td>
                                            <td>IN1035</td>
                                            <td>Ranjith</td>
                                            <td>Manager</td>
                                            <td>Operational</td>
                                            <td>High</td>
                                            <td>Fulfiled office</td>
                                            <td>open</td>
                                            <td>10-05-2020</td>
                                            <td>30-05-2020</td>
                                            <td><Edit2></Edit2></td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>1002</td>
                                            <td>IN1035</td>
                                            <td>Ranjith</td>
                                            <td>Manager</td>
                                            <td>Operational</td>
                                            <td>High</td>
                                            <td>Fulfiled office</td>
                                            <td>open</td>
                                            <td>10-05-2020</td>
                                            <td>30-05-2020</td>
                                            <td><Edit2></Edit2></td>
                                        </tr>
                                    </tbody>



                                </table>
                                {/* {(shiftList === null) ?
                                    <p style={{ textAlign: "center" }}>No Record Found</p> : null}

                                {shiftList !== undefined && shiftList !== null && currentRecords.length === 0 ?

                                    <div className="loader-box loader" style={{ width: "100% !important" }}>
                                        <div className="loader">
                                            <div className="line bg-primary"></div>
                                            <div className="line bg-primary"></div>
                                            <div className="line bg-primary"></div>
                                            <div className="line bg-primary"></div>
                                        </div>
                                    </div>
                                    :
                                    null} */}

                                {/* <EditShiftModal handleEditClose={handleEditClose}
                                    shiftType={shiftType}
                                    contractType={contractType}
                                    startTime={startTime}
                                    endTime={endTime}
                                    breakStartTime={breakStartTime}
                                    breakEndTime={breakEndTime}
                                    workingHours={workingHours}
                                    status={status}
                                    shiftData={singleShiftList}
                                    modal={editModal} /> */}
                            </div>

                            <div>
                                {/* {shiftList !== null && shiftList.length > 10 &&
                                    <Pagination
                                        itemClass="page-item"
                                        linkClass="page-link"
                                        activePage={currentPage}
                                        itemsCountPerPage={recordPerPage}
                                        totalItemsCount={totalRecords}
                                        pageRangeDisplayed={pageRange}
                                        onChange={handlePageChange}
                                    />
                                } */}
                            </div>




                        </div>
                    </div>
                </div>


            </div>
        </Fragment >
    );
};

export default TicketListingPage;