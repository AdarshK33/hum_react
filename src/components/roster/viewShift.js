import React, { useEffect,Fragment,useContext} from 'react'
import { Link } from 'react-router-dom';
import Breadcrumb from "../common/breadcrumb";
import {RosterContext} from "../../context/RosterState";
import { Delete, Edit2 } from 'react-feather'

function ViewShift() {
  useEffect(() => {
   viewShift()
  }, [])

  const {shiftList,deleteShift,viewShift,editShift} = useContext(RosterContext);

  console.log(shiftList, "in viewShift");
    return (
      <Fragment>
      <Breadcrumb title="View Shift" parent="View Shift" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card" style={{ overflowX: "auto" }}>
             <div className="table-responsive">
                <table className="table table-hover">
                  <thead className="thead-light" style={{backgroundColor:"#2f3c4e"}}>
                    <tr>
                      <th>No</th>
                      <th scope="col">Shift Name</th>
                      <th scope="col">Shift Timeings</th>
                      <th scope="col">Working Hours</th>
                      <th scope="col">Break Time</th>
                      <th scope="col">Product Target</th>
                      <th scope="col">Contract Type</th>
                      <th scope="col">Edit</th>
                      <th scope="col">Delete</th>
                      
                    </tr>
                  </thead>
                  {shiftList.length>0  &&
                      shiftList.map((e,i)=> {
                        return (
                          <tbody key={i+1}>
                            <tr>
                              <td>{i+1}</td>
                              <td>{e.shiftName}</td>
                              <td>{e.startTime}-{e.endTime}</td>
                              <td>{e.workingHours}</td>
                              <td>{e.breakStartTime}-{e.breakEndTime}</td>
                              <td>{e.productTarget}</td>
                              <td>{e.contractType}</td>
                              <td>  <Link to={{pathname: `EditShift/${e.shiftMasterId}`, data: {id: e.shiftMasterId}}}><Edit2 onClick={()=>editShift(e.shiftMasterId)}  /></Link></td>
                              <td><Delete onClick={()=>deleteShift(e.shiftMasterId)}   /></td>

                            </tr>
                          </tbody>
                        );
                      })}
                </table>
              </div>
         
            </div>
          </div>
        </div>
      

      </div>
    </Fragment>
      
    )
}

export default ViewShift

