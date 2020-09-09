import React, { Fragment, useState, useContext,useEffect } from 'react';
import Breadcrumb from '../common/breadcrumb';
import GrantLeaveAdd from './GrantLeaveAdd';
import { AdminContext } from "../../context/AdminState";
const GrantLeaveView = () => {


    const { viewGrantLeave, grantLeaveView } = useContext(AdminContext);

    const [modal, setModal] = useState(false);
    const handleClose = () => setModal(false)
    const handleShow = () => setModal(true)
   

    useEffect(() => {
        viewGrantLeave()
    }, [])
    

    return (
        <Fragment>
            <Breadcrumb title="Grant Leave " parent=" Grant Leave " />
            <div className="container-fluid">
            <div className="title_bar" style={{background:"#006EBB"}} >
               
            <button className="btn btn-light mr-2" onClick={handleShow}>Create</button>
              </div>
              <GrantLeaveAdd handleClose={handleClose} modal={modal} />
               

                <table id="table-to-xls" className="table table-hover">
                  <thead className="thead-light" style={{ backgroundColor: "#2f3c4e" }}>          
                            <tr>
                                <th scope="col">Sr No.</th>
                                <th scope="col">Employee Id</th>
                                
                                <th scope="col">No of Days</th>
                                <th scope="col">Year</th>
                            </tr>
                        </thead>                     
                      {grantLeaveView.map((item, i) => {
                      return (
                        <tbody key={i + 1}>
                          <tr>
                            <td>{i + 1}</td>
                            <td>{item.empId}</td>
                           
                            <td>{item.numOfDays}</td>
                            <td>{item.year}</td>
                          </tr>
                        </tbody>
                      
                      )
                    })}  
               </table>
            </div>
        </Fragment>
    )
}

export default GrantLeaveView;
