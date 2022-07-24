import React, { Fragment, useState, useContext, useEffect } from 'react';
import Breadcrumb from '../common/breadcrumb';
import Pagination from 'react-js-pagination';
import {
    JsonToCsv
} from 'react-json-csv';
import { AdminContext } from '../../context/AdminState'
const MasterCostCenter = () => {


    const { CostCenter, costCenterList } = useContext(AdminContext)
    const [currentPage, setCurrentPage] = useState(1);
    const recordPerPage = 10;
    let totalRecords = 0;
    let indexOfFirstRecord = 0;
    let indexOfLastRecord = 0;
    const pageRange = 10;
    let currentRecords = [];

    if (costCenterList !== null) {
        totalRecords = costCenterList.length;
        indexOfLastRecord = currentPage * recordPerPage;
        indexOfFirstRecord = indexOfLastRecord - recordPerPage;
        currentRecords = costCenterList.slice(indexOfFirstRecord, indexOfLastRecord);
    }


    const handlePageChange = pageNumber => {
        setCurrentPage(pageNumber);
    }

    useEffect(() => {
        CostCenter()
    }, []) 

    const filename = 'masterCostCenter';
    let fields = {
        "locationId": "S. No",
        "costCenterName": "Cost Center Name",
        // "cityName": "City",
        // "stateName": "State",
        "zone": "Zone",
        "managerId": "Manager ID",
        "superManagerId": "Super Manager ID",
        "locality": "Locality",
        // "addressLine": "Address Line",
        // "pinCode": "Pin Code",
        // "phoneNumber": "Phone Number",
        "openAt": "Opening Time",
        "closeAt": "Closing Time"
    }
    let data = [];
    for (let i = 0; i < costCenterList.length; i++) {
        data.push({
            locationId: i + 1,
            costCenterName: costCenterList[i].costCentreName,
            // cityName: costCenterList[i].cityName,
            // stateName: costCenterList[i].stateName,
            zone: costCenterList[i].costCentreZone,
            managerId: costCenterList[i].managerId,
            superManagerId: costCenterList[i].superManagerId,
            locality: costCenterList[i].locality,
            //addressLine: costCenterList[i].addressLine,
            // pinCode: costCenterList[i].pinCode,
            // phoneNumber: costCenterList[i].phoneNumber,
            openAt: costCenterList[i].openAt,
            closeAt: costCenterList[i].closeAt,

        })
    }
    

    return (
        <Fragment>
            <Breadcrumb title="Cost Center" parent="Cost Center" />
            <div className="container-fluid">
                <div className="title_bar" style={{ background: "#006EBB" }} >

                    <div className="title_bar" >
                        {data.length > 0 &&
                            <JsonToCsv
                                data={data}
                                style={{padding: " 6px 12px;",border:"none", lineheight: "27px",marginright: "5px",fontfamily:"Cairo"}}
                                filename={filename}
                                fields={fields}
                                text="Export excel"
                            />}
                    </div>
                </div>


                <div className="table-responsive">
                    <table id="table-to-xls" className="table table-hover">
                        <thead className="thead-light" style={{ backgroundColor: "#2f3c4e" }}>
                            <tr>
                                <th scope="col">S. No</th>
                                <th scope="col">Cost Center Name</th>
                                {/* <th scope="col">City</th> */}
                                {/* <th scope="col">State</th> */}
                                <th scope="col">Zone</th>
                                <th scope="col">Manager ID</th>
                                <th scope="col">Super Manager ID</th>
                                <th scope="col">Locality</th>
                                {/* <th scope="col">Address Line</th> */}
                                {/* <th scope="col">Pin Code</th>
                                <th scope="col">Phone Number</th> */}
                                <th scope="col">Opening Time</th>
                                <th scope="col">Closing Time</th>
                            </tr>
                        </thead>
                        {currentRecords !== null &&
                            currentRecords.map((item, i) => {
                                return (
                                    <tbody key={i + 1}>
                                        <tr>
                                            <td>{i + 1 + indexOfFirstRecord}</td>
                                            <td>{item.costCentreName}</td>
                                            {/* <td>{item.cityName}</td> */}
                                            {/* <td>{item.stateName}</td> */}
                                            <td>{item.costCentreZone}</td>
                                            <td>{item.managerId}</td>
                                            <td>{item.superManagerId}</td>
                                            <td>{item.locality}</td>
                                            {/* <td>{item.addressLine}</td> */}
                                            {/* <td>{item.pinCode}</td>
                                            <td>{item.phoneNumber}</td> */}
                                            <td>{item.openAt}</td>
                                            <td>{item.closeAt}</td>


                                        </tr>
                                    </tbody>

                                )
                            })}
                    </table>
                    {(costCenterList === null) ?
                        <p style={{ textAlign: "center" }}>No Record Found</p> : null}
                    
                    {costCenterList !== undefined && costCenterList !== null && currentRecords.length === 0 ?

                        <div className="loader-box loader" style={{ width: "100% !important" }}>
                            <div className="loader">
                                <div className="line bg-primary"></div>
                                <div className="line bg-primary"></div>
                                <div className="line bg-primary"></div>
                                <div className="line bg-primary"></div>
                            </div>
                        </div>
                        :
                            null}
                </div>
                <div>
                    {costCenterList !== null && costCenterList.length > 10 &&
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

export default MasterCostCenter;
