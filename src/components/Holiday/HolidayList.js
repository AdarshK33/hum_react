import React, { Fragment ,useEffect,useContext} from 'react';
import Breadcrumb from '../common/breadcrumb';
import { Card, Row, Col, Table, Button, Modal } from 'react-bootstrap'
import { LeaveContext } from '../../context/LeaveState';
import '../Leaves/Leaves.css'
const HolidayList = () => {
 
   const {getHoliday,holidayDataList}   = useContext(LeaveContext);
  
  useEffect(() => {
      getHoliday()  
  }, [])
  console.log("holida",holidayDataList)
  
    return (
      <Fragment>
      <Breadcrumb title="Hoilday List" parent="Holiday List" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card" style={{ overflowX: "auto" }}>

            <Row className="apply-button-row">
                    {/* <Col className="leaveApplications">Leave Applications</Col> */}
                    <Col>
                        <Button className="apply-button" >Upload</Button>
                    </Col>
                    {/* <LeaveAdd handleClose={handleClose} modal={modal} /> */}
                </Row>
 
              <div className="table-responsive">
                <table id="table-to-xls" className="table table-hover">
                  <thead className="thead-light" style={{ backgroundColor: "#2f3c4e" }}>
                    <tr>
                      <th>No</th>
                      <th scope="col"> Name</th>
                      <th scope="col"> Department</th>
                      <th scope="col">Holiday Date</th>
                      <th scope="col">State</th>
                    </tr>
                  </thead>
                  {holidayDataList.length > 0 &&
                            holidayDataList.map((item, i) => {
                                return (
                                    <tbody key={i + 1}>
                                        <tr>
                                            <td>{i + 1}</td>
                                            <td>{item.holidayName}</td>
                                            <td>{item.department}</td>
                                            <td>{item.holidayDate}</td>
                                            <td>{item.state}</td>
                                        </tr>
                                    </tbody>
                                )
                            })}
                  
                </table>
                
              </div>

            </div>
          </div>
        </div>


      </div>
    </Fragment>
    );
    
};

export default HolidayList;