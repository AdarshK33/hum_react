import React, { Fragment,useState } from 'react'
import { TabContent,TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import {ModalBody} from 'reactstrap';
const ShiftModal=(props)=> {
   const [activeTab, setActiveTab] = useState('1');
  return (
    <Fragment>
    
          <ModalBody>
            <Nav tabs className="border-tab-primary">
              <NavItem className="nav nav-tabs" id="myTab" role="tablist">
                <NavLink className={activeTab === '1' ? 'active' : ''} onClick={() => setActiveTab('1')}>
                <h6>Assign Shift</h6>
               </NavLink>
              </NavItem>
              <NavItem className="nav nav-tabs" id="myTab" role="tablist">
                <NavLink className={activeTab === '2' ? 'active' : ''} onClick={() => setActiveTab('2')}>
                <h6>Assign Week Off</h6>
                </NavLink>
              </NavItem>
            </Nav>
            {/* secnod tab */}
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <div className="row py-2 pt-4">
                  <div className="col-sm-6 px-2 font-weight-bold">Pavithra Anand - DSC100023</div>
                  <div className="col-sm-6 px-4 text-danger font-weight-bold">Legal Partner Coach</div>
                </div>
                <div className="row py-2">
                  <div className="col-sm-5 px-2 font-weight-bold">Available Shifts :</div>
                  <div className="col-sm-7 ">
                    <div class="form-group">
                      <select class="form-control" id="exampleFormControlSelect1">
                        <option>8:00 AM- 5:00 PM(Genral Shifts )</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="note text-primary text-center">
                 <button type="button" className="btn btn-square btn-primary btn-cm pl-5 pr-5">Assign</button>
                <h6 className="note text-secondary">Note: Weekly off is mandatory to assign shift</h6> 
              </div>
              </TabPane>
              <TabPane tabId="2">
                <br/>
              Assign Week content will be place here...
              <br/>
              </TabPane>
            </TabContent>
          </ModalBody>
    </Fragment>
  )
}
export default ShiftModal
