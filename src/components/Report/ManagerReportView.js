import React, {Fragment} from 'react';
import {Table, Container, Row} from 'react-bootstrap' 


const ReportView = (props) => {
    const reportList = props.reportList
    return (
        <Fragment>
           <Container>
               <Row style={{marginTop:'2rem'}}>
               <Table className="adminTable">
                        <thead style={{ background: '#006EBB', color: 'white' }}>
                            <tr>
                                <th>Sr No.</th>
                                <th>Employee Id</th>
                                <th>Employee Name</th>
                                <th>Cost Center</th>
                                <th>Work Location</th>
                                <th>Leave Eligible</th>
                                <th>Planned Leaves</th>
                                <th>Unplanned Leaves</th>
                                <th>Leaves Remaining</th>
                                <th>Leave Type</th>
                                <th>LOP</th>
                            </tr>
                        </thead>
                        {reportList.length>0 && 
                        reportList.map((item,i) => {
                            return(
                                <tbody key={i+1}>
                                    <tr>
                                        <td>{i+1}</td>
                                        <td>{item.employeeId}</td>
                                        <td>{item.username}</td>
                                        <td>{item.costCentre}</td>
                                        <td>{item.workLocation}</td>
                                        <td>{item.stateLeaveEligible}</td>
                                        <td>{item.planned}</td>
                                        <td>{item.unPlanned}</td>
                                        <td>{item.leaveremaining}</td>
                                        <td>{item.leaveType}</td>
                                        <td>{item.lop}</td>
                                    </tr>
                                </tbody>
                            )
                        })}
                        
                </Table>
               </Row>
           </Container>
        </Fragment>
    );
};

export default ReportView;