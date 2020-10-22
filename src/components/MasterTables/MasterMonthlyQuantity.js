import React, { Fragment, useState, useContext, useEffect } from 'react';
import Breadcrumb from '../common/breadcrumb';
import Pagination from 'react-js-pagination'
import { PermissionContext } from '../../context/PermissionState'
import { Button, Modal,Form, Table, Row, Container } from "react-bootstrap";
import { DashboardContext } from "../../context/DashboardState";
import moment from "moment";

const MasterMonthlyQuantity = () => {

    const { cosCentreList, viewCostCentre } = useContext(DashboardContext);
    const { monthlyQtyDetails, monthlyQtyDetailsList } = useContext(PermissionContext)

    const [date, setDate] = useState();
    const [month, setMonth] = useState();
    const [year, setYear] = useState();
    const [costCenter, setCostCenter] = useState();

    var monthsNumber = new Array();
    monthsNumber["01"] = "Jan";
    monthsNumber["02"] = "Feb";
    monthsNumber["03"] = "Mar";
    monthsNumber["04"] = "Apr";
    monthsNumber["05"] = "May" ;
    monthsNumber["06"] = "Jun" ;
    monthsNumber["07"] = "Jul" ;
    monthsNumber["08"] = "Aug" ;
    monthsNumber["09"] = "Sep" ;
    monthsNumber["10"] = "Oct" ;
    monthsNumber["11"] = "Nov" ;
    monthsNumber["12"] = "Dec" ;


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

    const costCenterHandler = e => {
        // console.log(e.target.value);
        setCostCenter(e.target.value);
      }
    
      const dateHandler = (d) =>{
        setDate(d);        
        // setMonth(monthsNumber[moment(date, ["YYYY-MM"]).format("M")]);
        // setYear(moment(date, ["MMM Do YY"]).format("YYYY"));     
      }
    
      const onSubmit = (e) =>{
        e.preventDefault();
        const mon = monthsNumber[moment(date, ["YYYY-MM"]).format("M")];
        const y = moment(date, ["MMM Do YY"]).format("YYYY");
        monthlyQtyDetails(costCenter, mon, y);
      }



    useEffect(() => {
        viewCostCentre()
    }, [])

    


    return (
        <Fragment>
            <Breadcrumb title="Monthly Quantity" parent="Monthly Quantity" />
            <div className="container-fluid">
            <Form 
                onSubmit={onSubmit}
                >
                <Row>
                    <div className="col-sm-4">
                    <Form.Group>
                        <Form.Label>Select Month and Year</Form.Label><span style = {{color:'red'}}>*</span>
                        <input 
                        type="month" 
                        style={{ fontSize: "0.8rem" }} 
                        className="form-control digit"                   
                        placeholder="Enter Date"
                        required 
                        onChange={(e) => dateHandler(e.target.value)} 
                        value={date} 
                        />
                    </Form.Group>
                    </div>
                    <div className="col-sm-4">
                    <Form.Group>
                        <Form.Label>Cost Center</Form.Label><span style = {{color:'red'}}>*</span>
                        <Form.Control as="select" 
                        required 
                        value={costCenter}  
                        onChange={(e) => costCenterHandler(e)}
                        >
                        <option value="">Select</option>
                            {cosCentreList.map((e, i) => {
                            return (
                                <option key={i + 1} value={e.costCentreName}>{e.costCentreName}</option>)
                            })}

                        </Form.Control>
                    </Form.Group>
                    </div>
                </Row>

                <Button 
                    type="submit"              
                    className="submitButton"
                    // style={{paddingBottom:"10px"}}            
                >
                    Submit</Button>
          

        </Form>
                <div className="title_bar" style={{ background: "#006EBB" }} >
                </div>
                <div className="table-responsive">
                    <br />
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
