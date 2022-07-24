import React, { Fragment, useState, useContext, useEffect } from 'react';
import Breadcrumb from '../common/breadcrumb';
import Pagination from 'react-js-pagination'

import {
    JsonToCsv
} from 'react-json-csv';
import { PermissionContext } from '../../context/PermissionState'
const MasterWorkLocation = () => {


    const { locationDetails, locationDetailsList } = useContext(PermissionContext)
    const [currentPage, setCurrentPage] = useState(1);
    const recordPerPage = 10;
    let totalRecords = 0;
    let indexOfFirstRecord = 0;
    let indexOfLastRecord = 0;
    const pageRange = 10;
    let currentRecords = [];

    if (locationDetailsList !== null) {
        totalRecords = locationDetailsList.length;
        indexOfLastRecord = currentPage * recordPerPage;
        indexOfFirstRecord = indexOfLastRecord - recordPerPage;
        currentRecords = locationDetailsList.slice(indexOfFirstRecord, indexOfLastRecord);
    }


    const handlePageChange = pageNumber => {
        setCurrentPage(pageNumber);
    }

    useEffect(() => {
        locationDetails()
    }, [])

    const filename = 'masterworklocation';
    let fields = {
        "locationId": "S. No",
        "locationName": "Location Name",
        "cityName": "City",
        "stateName": "State",
        "zone": "Zone",
        "plotNo": "Flat/Plot No",
        "street": "Street",
        "locality": "Locality",
        // "addressLine": "Address Line",
        "pinCode": "Pin Code",
        "phoneNumber": "Phone Number",
        "openAt": "Opening Time",
        "closeAt": "Closing Time"
    }
    let data = [];
    for (let i = 0; i < locationDetailsList.length; i++) {
        if (locationDetailsList !== null) {
            data.push({
                locationId: i + 1,
                locationName: locationDetailsList[i].locationName,
                cityName: locationDetailsList[i].cityName,
                stateName: locationDetailsList[i].stateName,
                zone: locationDetailsList[i].zone,
                plotNo: locationDetailsList[i].plotNo,
                street: locationDetailsList[i].street,
                locality: locationDetailsList[i].locality,
                //addressLine: locationDetailsList[i].addressLine,
                pinCode: locationDetailsList[i].pinCode,
                phoneNumber: locationDetailsList[i].phoneNumber,
                openAt: locationDetailsList[i].openAt,
                closeAt: locationDetailsList[i].closeAt,

            })
        }
    }








    return (
        <Fragment>
            <Breadcrumb title="Work Location" parent="Work Location" />
            <div className="container-fluid">
                <div className="title_bar" style={{ background: "#006EBB" }} >

                    <div className="title_bar" >
                        {data.length > 0 &&
                            <JsonToCsv
                                data={data}
                                style={{padding: "2px",border:"none"}}
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
                                <th scope="col">Location Name</th>
                                <th scope="col">City</th>
                                <th scope="col">State</th>
                                <th scope="col">Zone</th>
                                <th scope="col">Flat/Plot No</th>
                                <th scope="col">Street</th>
                                <th scope="col">Locality</th>
                                {/* <th scope="col">Address Line</th> */}
                                <th scope="col">Pin Code</th>
                                <th scope="col">Phone Number</th>
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
                                            <td>{item.locationName}</td>
                                            <td>{item.cityName}</td>
                                            <td>{item.stateName}</td>
                                            <td>{item.zone}</td>
                                            <td>{item.plotNo}</td>
                                            <td>{item.street}</td>
                                            <td>{item.locality}</td>
                                            {/* <td>{item.addressLine}</td> */}
                                            <td>{item.pinCode}</td>
                                            <td>{item.phoneNumber}</td>
                                            <td>{item.openAt}</td>
                                            <td>{item.closeAt}</td>


                                        </tr>
                                    </tbody>

                                )
                            })}
                    </table>
                    {(locationDetailsList === null) ?
                        <p style={{ textAlign: "center" }}>No Record Found</p> : null}

                    {locationDetailsList !== undefined && locationDetailsList !== null && currentRecords.length === 0 ?

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
                    {locationDetailsList !== null && locationDetailsList.length > 10 &&
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

export default MasterWorkLocation;
