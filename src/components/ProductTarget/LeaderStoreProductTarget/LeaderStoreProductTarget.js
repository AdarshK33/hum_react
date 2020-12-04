import React, { Fragment, useState, useContext, useEffect } from 'react';
import Breadcrumb from '../../common/breadcrumb';
import { Row, Col, Table, Button } from 'react-bootstrap'
import { Edit2 } from 'react-feather'
import EditLeaderTarget from './EditLeaderTarget';
import AddLeaderTarget from './AddLeaderTarget';
import { StoreProductContext } from "../../../context/StoreProductState";
import { AppContext } from "../../../context/AppState";
import Pagination from 'react-js-pagination';

const LeaderStoreProductTarget = () => {
    const [modal, setModal] = useState(false);
    const [TodayDate, setTodayDate] = useState();
    const [month, setMonth] = useState();
    const [Year, setYear] = useState();
    const [editModal, setEditModal] = useState(false);
    const { storeLeaderProductList, LeaderTargetList, editTargetHandler, editTarget, loader } = useContext(StoreProductContext);
    const { user } = useContext(AppContext);

    const handleClose = () => {
        LeaderTargetList(user.costCentre);
        setModal(false);
        setCurrentPage(1);
    }
    useEffect(() => {
        let date = new Date();
        var dd = String(date.getDate()).padStart(2, '0');
        var mm = String(date.getMonth() + 1).padStart(2, '0');
        var yyyy = date.getFullYear();
        setTodayDate(dd);
        setMonth(mm);
        setYear(yyyy);
        if (user.costCentre !== undefined) {
            LeaderTargetList(user.costCentre);
        }

    }, [user.costCentre]);

    const targetEditHandler = (id) => {

        editTargetHandler(id);


    }

    var monthsNumber = new Array();
    monthsNumber["Jan"] = "01";
    monthsNumber["Feb"] = '02';
    monthsNumber["Mar"] = '03';
    monthsNumber["Apr"] = '04';
    monthsNumber["May"] = '05';
    monthsNumber["Jun"] = '06';
    monthsNumber["Jul"] = '07';
    monthsNumber["Aug"] = '08';
    monthsNumber["Sep"] = '09';
    monthsNumber["Oct"] = '10';
    monthsNumber["Nov"] = '11';
    monthsNumber["Dec"] = '12';

    const handleEditClose = () => setEditModal(false);
    // Pagination

    const [currentPage, setCurrentPage] = useState(1);
    const recordPerPage = 10;
    let totalRecords = 0
    const pageRange = 10;

    let indexOfLastRecord = 1;
    let indexOfFirstRecord = 1;
    let currentRecords = [];

    if (storeLeaderProductList !== null) {


        totalRecords = storeLeaderProductList.length;
        // const pageRange = 10;

        indexOfLastRecord = currentPage * recordPerPage;
        indexOfFirstRecord = indexOfLastRecord - recordPerPage;
        currentRecords = storeLeaderProductList.slice(indexOfFirstRecord, indexOfLastRecord);
    }


    const handlePageChange = pageNumber => {
        setCurrentPage(pageNumber);
    }

    return (
        <Fragment>
            <Breadcrumb title="Store Leader Product Target" parent="Store Leader Product Target" />
            <div className="container-fluid">

                <Row className="apply-button-row">
                    <Col className="leaveApplications">Store Leader Product Target</Col>
                    <Col>
                        <Button className="apply-button btn btn-light"
                            onClick={() => { setModal(true) }}>Add Target</Button>
                    </Col>
                    <AddLeaderTarget handleClose={handleClose} modal={modal} />
                </Row>

                <div className="table-responsive">

                    <Table id="table-to-xls" className="table table-hover">
                        <thead className="thead-light" style={{ backgroundColor: "#2f3c4e" }}>
                            <tr>
                                <th>S.No.</th>
                                <th>Cost Center</th>

                                <th>State</th>
                                <th>Month</th>
                                <th>Year</th>
                                <th>Weekday Target</th>
                                <th>Weekend Target</th>
                                <th></th>

                            </tr>
                        </thead>
                        {loader === true && currentRecords !== undefined && currentRecords !== null ?
                            <tbody>
                                <tr>
                                    <td colspan='6'>
                                        <div className="loader-box loader" style={{ width: "100% !important" }}>
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
                            :
                            currentRecords !== undefined && currentRecords !== null && currentRecords.length > 0 ?
                                currentRecords.map((item, i) => {
                                    return (
                                        <tbody key={i + 1}>
                                            <tr>
                                                <td>{i + 1 + indexOfFirstRecord}</td>
                                                <td>{item.costCenter}</td>
                                                <td>{item.stateName}</td>
                                                <td>{item.monthName}</td>
                                                <td>{item.year}</td>
                                                <td>{item.weekday}</td>
                                                <td>{item.weekend}</td>
                                                {Year > item.year ?
                                                    <td><Edit2 disabled style={{ color: 'lightgrey' }} /></td>
                                                    : Year === item.year && monthsNumber[item.month] < month ?
                                                        <td><Edit2 disabled style={{ color: 'lightgrey' }} /></td>
                                                        : Year === item.year && monthsNumber[item.month] === month && TodayDate > 20 ?
                                                            <td><Edit2 disabled style={{ color: 'lightgrey' }} /></td>
                                                            :
                                                            <td><Edit2 style={{ color: '#376ebb' }}
                                                                onClick={() => {
                                                                    setEditModal(true);
                                                                    targetEditHandler(item.targetId)
                                                                }}

                                                            />
                                                            </td>
                                                }




                                            </tr>
                                        </tbody>
                                    )
                                }) :
                                <tbody>
                                    <tr>
                                        <td colspan='8'>No Record Found</td>
                                    </tr>
                                </tbody>
                        }
                    </Table>


                    {/* {(storeLeaderProductList === null) ?
                        <p style={{ textAlign: "center" }}>No Record Found</p> : null}

                    {storeLeaderProductList !== undefined && storeLeaderProductList !== null && currentRecords.length === 0 ?

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

                    {editTarget !== null && editTarget !== undefined &&
                        editTarget.length !== 0 ? <EditLeaderTarget handleEditClose={handleEditClose}
                            modal={editModal}
                            editData={editTarget}
                        /> : ""}

                </div>
                <div>
                    {storeLeaderProductList !== undefined && storeLeaderProductList !== null && storeLeaderProductList.length > 10 &&
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
    );

}


export default LeaderStoreProductTarget;