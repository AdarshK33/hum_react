import React, { Fragment, useState, useContext, useEffect } from 'react';
import Breadcrumb from '../common/breadcrumb';
import Pagination from 'react-js-pagination'
import { PermissionContext } from '../../context/PermissionState'
const MasterMonthlyQuantity = () => {


    const { monthlyQtyDetails, monthlyQtyDetailsList } = useContext(PermissionContext)


    const [currentPage, setCurrentPage] = useState(1);
    const recordPerPage = 10;
    let totalRecords = 0;
    let indexOfFirstRecord = 0;
    let indexOfLastRecord = 0;
    const pageRange = 10;
    let currentRecords = [];

    if (monthlyQtyDetailsList !== null) {
        totalRecords = monthlyQtyDetailsList.length;
        indexOfLastRecord = currentPage * recordPerPage;
        indexOfFirstRecord = indexOfLastRecord - recordPerPage;
        currentRecords = monthlyQtyDetailsList.slice(indexOfFirstRecord, indexOfLastRecord);
    }


    const handlePageChange = pageNumber => {
        setCurrentPage(pageNumber);
    }



    useEffect(() => {
        monthlyQtyDetails()
    }, [])
    return (
        <Fragment>
            <Breadcrumb title="Monthly Quantity" parent="Monthly Quantity" />
            <div className="container-fluid">
                <div className="title_bar" style={{ background: "#006EBB" }} >
                </div>
                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead className="thead-light" style={{ background: '#006EBB', color: 'white' }}>
                            <tr>
                                <th scope="col">S. No</th>
                                <th scope="col">Store ID</th>
                                <th scope="col">Store</th>
                                <th scope="col">Year</th>
                                <th scope="col">Month</th>

                                <th scope="col">Hour</th>
                                <th scope="col">Turnover</th>
                                <th scope="col">Quantity</th>

                            </tr>
                        </thead>
                        {currentRecords !== null &&
                            currentRecords.map((item, i) => {
                                return (
                                    <tbody key={i + 1}>
                                        <tr>
                                            <td>{i + 1 + indexOfFirstRecord}</td>
                                            <td>{item.storeId}</td>
                                            <td>{item.store}</td>
                                            <td>{item.year}</td>
                                            <td>{item.month}</td>
                                            <td>{item.hour}</td>
                                            <td>{item.turnover}</td>
                                            <td>{item.quantity}</td>
                                        </tr>
                                    </tbody>

                                )
                            })}
                    </table>
                </div>
                <div>
                    {monthlyQtyDetailsList !== null && monthlyQtyDetailsList.length > 10 &&
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

export default MasterMonthlyQuantity;
