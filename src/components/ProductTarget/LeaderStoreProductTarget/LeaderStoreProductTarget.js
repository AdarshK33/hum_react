import React, { Fragment, useState, useContext, useEffect } from 'react';
import Breadcrumb from '../../common/breadcrumb';
import { Card, Row, Col, Table, Button } from 'react-bootstrap'
import { Edit2, Slash, Trash2 } from 'react-feather'
import EditLeaderTarget from './EditLeaderTarget';
import AddLeaderTarget from './AddLeaderTarget';
import { StoreProductContext } from "../../../context/StoreProductState";
import { AppContext } from "../../../context/AppState";

const LeaderStoreProductTarget = () => {
    const [modal, setModal] = useState(false);
    const [TodayDate, setTodayDate] = useState();
    const [month, setMonth] = useState();
    const [Year, setYear] = useState();
    const [editModal, setEditModal] = useState(false);
    const { storeLeaderProductList,LeaderTargetList,editTargetHandler,editTarget } = useContext(StoreProductContext);
    const { user } = useContext(AppContext);
    
    const handleClose = () => {
        LeaderTargetList(user.costCentre);
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
        LeaderTargetList(user.costCentre)
    }, []);
    
    const targetEditHandler = (id) => {
       
        editTargetHandler(id);
        
       
    }

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
            <Breadcrumb title="Store Leader Product Target" parent="Store Leader Product Target" />
            <div className="container-fluid">
                
                <Row className="apply-button-row">
                    <Col className="leaveApplications">Store Leader Product Target</Col>
                    <Col>
                        <Button className="apply-button btn btn-light" 
                        onClick={() => {setModal(true) }}>Add Target</Button>
                    </Col>
                    <AddLeaderTarget handleClose={handleClose} modal={modal} /> 
                </Row>

                <div className="table-responsive">
                    <Table id="table-to-xls" className="table table-hover">
                        <thead className="thead-light" style={{ backgroundColor: "#2f3c4e" }}>
                            <tr>
                                <th>S.No.</th>
                                <th>Store ID</th>
                                
                                <th>State</th>
                                <th>Month</th>
                                <th>Year</th>
                                <th>Weekday Target</th>
                                <th>Weekend Target</th>
                                <th></th>
                                
                            </tr>
                        </thead>

                        {storeLeaderProductList !== null && storeLeaderProductList.length > 0 &&
                            storeLeaderProductList.map((item, i) => {
                                return (
                                   <tbody key={i + 1}>
                                        <tr>
                                            <td>{i + 1}</td>
                                            <td>{item.costCenter}</td>
                                            <td>{item.stateName}</td>
                                            <td>{item.monthName}</td>
                                            <td>{item.year}</td>
                                            <td>{item.weekday}</td>
                                            <td>{item.weekend}</td>
                                            {Year > item.year  ?<td><Edit2 disabled style={{color:'lightgrey'}} /></td> : Year == item.year && monthsNumber[item.month] <= month  ?<td><Edit2 disabled style={{color:'lightgrey'}} /></td> :Year == item.year && monthsNumber[item.month] <= month && TodayDate > 20 ? <td><Edit2 disabled style={{color:'lightgrey'}} /></td> : 
                                            <td><Edit2 
                                            onClick={() => {
                                                setEditModal(true);
                                            targetEditHandler(item.targetId) 
                                             }}
                                            
                                             />
                                            </td> }
                                            
                                            


                                        </tr>
                                    </tbody>
                                 )
                            })} 
                    </Table>
                   
                    {editTarget.length !== 0 ? <EditLeaderTarget handleEditClose={handleEditClose}
                     modal={editModal}
                     editData = {editTarget}
                         /> : ""}
                         
                </div>

            </div>
        </Fragment>
        );

}


export default LeaderStoreProductTarget;