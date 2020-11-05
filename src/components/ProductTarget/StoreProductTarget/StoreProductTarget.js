import React, { Fragment, useState, useContext, useEffect } from 'react';
import Breadcrumb from '../../common/breadcrumb';
import { Row, Col, Table, Button } from 'react-bootstrap'
import { Edit2, Search } from 'react-feather'
import EditTarget from './EditTarget';
import AddTarget from './AddTarget';
import Pagination from 'react-js-pagination';
import { StoreProductContext } from "../../../context/StoreProductState";
import '../../../assets/css/search.css'



const StoreProductTarget = () => {
    const [modal, setModal] = useState(false);
    const [TodayDate, setTodayDate] = useState();
    const [month, setMonth] = useState();
    const [Year, setYear] = useState();
    const [editModal, setEditModal] = useState(false);
    const { storeProductList, viewStoreProduct, editTargetHandler, editTarget } = useContext(StoreProductContext);

    const handleClose = () => {
        viewStoreProduct();
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
        viewStoreProduct()
    }, []);

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

    const [currentPage, setCurrentPage] = useState(1);

    const recordPerPage = 10;
    let totalRecords = 0
    const pageRange = 10;

    let indexOfLastRecord = 1;
    let indexOfFirstRecord = 1;
    let currentRecords = [];

    if (storeProductList !== null) {


        totalRecords = storeProductList.length;
        // const pageRange = 10;

        indexOfLastRecord = currentPage * recordPerPage;
        indexOfFirstRecord = indexOfLastRecord - recordPerPage;
        currentRecords = storeProductList.slice(indexOfFirstRecord, indexOfLastRecord);
    }


    const handlePageChange = pageNumber => {
        setCurrentPage(pageNumber);
    }

    return (
        <Fragment>
            <Breadcrumb title="Store Product Target" parent="Store Product Target" />
            <div className="container-fluid">

                <Row className="apply-button-row">
                    <Col className="leaveApplications">Store Product Target</Col>

                    <Col>
                        <Row>
                            <Col xs={3}></Col>
                            <Col >
                                {/* <div className="job-filter">
                                    <div className="faq-form">
                                        <input className="form-control searchButton" type="text" placeholder="Search.." />
                                        <Search className="search-icon"/>
                                    </div>
                                </div> */}
                            </Col>
                            <Col xs={4}>
                                <Button className="apply-button btn btn-light"
                                    onClick={() => { setModal(true) }}>Add Target</Button>
                            </Col>
                        </Row>
                    </Col>
                    <AddTarget handleClose={handleClose} modal={modal} />
                </Row>

                <div className="table-responsive">
                    {currentRecords !== undefined && currentRecords !== null && currentRecords.length > 0 ?
                        <Table id="table-to-xls" className="table table-hover" style={{ textAlign: "center" }}>

                            <thead className="thead-light" style={{ backgroundColor: "#2f3c4e" }}>
                                <tr>
                                    <th>S.No.</th>
                                    <th>Cost Center ID</th>

                                    <th>State</th>
                                    <th>Month</th>
                                    <th>Year</th>
                                    <th>Weekday Target</th>
                                    <th>Weekend Target</th>
                                    <th>Growth Percentage</th>
                                    <th></th>

                                </tr>
                            </thead>

                            {/* {storeProductList !== null && storeProductList !== undefined &&
                             storeProductList.length > 0 &&
                            storeProductList.map((item, i) => { */}
                            {currentRecords !== undefined && currentRecords !== null &&
                                currentRecords.map((item, i) => {
                                    return (
                                        <tbody key={i + 1 + indexOfFirstRecord}>
                                            <tr>
                                                <td>{i + 1}</td>
                                                <td>{item.costCenter}</td>
                                                <td>{item.stateName}</td>
                                                <td>{item.monthName}</td>
                                                <td>{item.year}</td>
                                                <td>{item.weekday}</td>
                                                <td>{item.weekend}</td>
                                                <td>{item.growth}</td>
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
                                })}
                        </Table>
                        : storeProductList !== undefined && storeProductList !== null && currentRecords.length === 0 ?

                            <div className="loader-box loader" style={{ width: "100% !important" }}>
                                <div className="loader">
                                    <div className="line bg-primary"></div>
                                    <div className="line bg-primary"></div>
                                    <div className="line bg-primary"></div>
                                    <div className="line bg-primary"></div>
                                </div>
                            </div>
                            :
                            <p style={{ textAlign: "center" }}>N0 RECORDS EXIST</p>
                    }
                    {/* {storeProductList === undefined && storeProductList === null ? (
                    <p style={{ textAlign: "center" }}>N0 RECORDS EXIST</p>
                  ) : null} */}


                    {editTarget !== null && editTarget !== undefined &&
                        editTarget.length !== 0 ? <EditTarget handleEditClose={handleEditClose}
                            modal={editModal}
                            editData={editTarget}
                        /> : ""}

                </div>

                <div>
                    {storeProductList !== undefined && storeProductList !== null && storeProductList.length > 0 &&
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


export default StoreProductTarget;