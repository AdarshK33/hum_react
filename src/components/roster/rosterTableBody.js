import React,{Fragment,useState} from 'react'
import { Button} from 'reactstrap';
const RosterTableBody=()=> {
    const [modal, setModal] = useState();
    const toggle = () => {
        setModal(!modal)
      }
    return (
        <Fragment>
                <tr>
                      <td>
                        <div className="row">
                          <div className="box" style={{ display: "flex", flexDirection: "row", width: "250px" }}>
                            <i
                              className="box fa fa-user-circle fa-4x m-r-10 m-l-10 py-1" aria-hidden="true"></i>
                            <div className="box name f-w-600">Pavithra Anand
                              <br />
                              <span className="text-danger d-block">DSI000174{" "}
                                <span className="text-primary">Permanent</span>
                              </span>
                              <p>Legal Partner Coach</p>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <button className="btn btn-square btn-warning btn-sm" type="button">08:00 Am - 05:00 Pm</button>
                      </td>
                      <td>
                        <button className="btn btn-square btn-warning btn-sm" type="button">08:00 Am - 05:00 Pm</button>
                      </td>
                      <td>
                        <Button className="btn btn-square btn-light btn-sm pl-5 pr-5" onClick={toggle}>+</Button>
                      </td>
                      <td>
                        <button className="btn btn-square btn-warning btn-sm" type="button">08:00 Am - 05:00 Pm</button>
                      </td>
                      <td>
                        <button className="btn btn-square btn-danger btn-sm pl-5 pr-5" type="button">Leave</button>
                      </td>
                    </tr>
        </Fragment>
    )
}

export default RosterTableBody
