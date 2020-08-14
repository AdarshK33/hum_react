import React, { Fragment, useState } from "react";
import Breadcrumb from "../common/breadcrumb";
import DateFromEnd from "./dateFromEnd";
import ShiftModal from "./shiftModal";
import {Modal,ModalHeader} from 'reactstrap';
import RosterTableBody from "./rosterTableBody";
const Roster = () => {
  const [modal, setModal] = useState();
  const toggle = () => {
    setModal(!modal)
  }
  const sendDate = (sdate, edate) => {
    alert(sdate + " " + edate);
  }
  return (
    <Fragment>
      <Breadcrumb title="Roster" parent="Roster page" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card" style={{ overflowX: "auto" }}>
              <div className="card-header">
              <DateFromEnd sendDate={sendDate}/>
              </div>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Employee</th>
                      <th scope="col">Mon 12</th>
                      <th scope="col">Tue 13</th>
                      <th scope="col">Wed 14</th>
                      <th scope="col">Thur 15</th>
                      <th scope="col">Fri 16</th>
                    </tr>
                  </thead>
                  <tbody>
                  <RosterTableBody/>
                  <RosterTableBody/>
                  <RosterTableBody/>
                  <RosterTableBody/>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <Modal isOpen={modal}>
        <ModalHeader  style={{borderBottom:"0px solid #e9ecef",paddingTop:"10px"}} toggle={toggle}>Modal title</ModalHeader>
       <ShiftModal/>
       </Modal>
      </div>
    </Fragment>
  );
};

export default Roster;
