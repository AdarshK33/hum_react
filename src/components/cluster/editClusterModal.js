import React, { Fragment, useState, useContext, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { ClusterContext } from "../../context/ClusterState";
import Select from 'react-select';
import { Multiselect } from 'multiselect-react-dropdown';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const EditClusterModal = (props) => {

  useEffect(() => {
    viewSports()
    selectClusterLeader()
    selectAllClusterLeaderForEdit()
  }, [])
  const [clusterName, setClusterName] = useState("");
  const [description, setDescription] = useState("");
  const [clusterLeader, setClusterLeader] = useState('');
  const [clusterId,setClusterId] = useState('');
  const [successMsg, setSuccessMsg] = useState("");
  const [employee, setEmployee] = useState([])
  const [errormsg, setErrorMsg] = useState(false);
  const [sportsList, setSportsList] = useState([])
  const [clustertButton, setClusterButton] = useState(false);
  const [status, setStatus] = useState(0)



  const setClear = () => {
    setClusterName('')
    setDescription('')
    setClusterLeader('')
    setClusterButton('')
    setErrorMsg('')
    setSuccessMsg('')
    setSportsList('');
    setSuccessMsg('');
    setEmployee('')
  }


  const { updateCluster,viewCluster, getSingleCluster,viewSports, sportsNames, clusterLeaderNames,getClusterEmployees, getSingleCluster1,selectClusterLeader,selectAllClusterLeaderForEdit,clusterAllLeaderNames,getEmployeesNames } = useContext(ClusterContext);

  useEffect(() => {
    setClusterName(getSingleCluster.clusterName)
   // setSelectedSportsId(getSingleCluster.selectedSportsId)
    setDescription(getSingleCluster.description)
    setClusterLeader(getSingleCluster.clusterLeader)
    setEmployee(getSingleCluster.employeeId)
    setSportsList(getSingleCluster1.map((e)=> e.sportId))  
    setStatus(getSingleCluster.status)
   }, [props])

  useEffect(() => {
    setClusterId(props.clusterId)
   }, [props.clusterId])



  const onSubmit = (event) => {
    event.preventDefault();
    const editCluster = {
      clusterId: getSingleCluster.clusterId,
      clusterLeader,
      clusterName,
      description,
      storeId: "IN1055",
      sportId:sportsList.map((e)=> e.sportId),
      employeeIds:getEmployeesNames.map((e)=>e.employeeId)
    }

    console.log("^^^^" + JSON.stringify(editCluster));
    const result = updateCluster(editCluster)
      .then((result) => {
        console.log("api response===", result.data.message);

        toast.info(result.data.message);
        setTimeout(() => {
          callTimer();
         }, 1000);
         viewCluster();
      })
      .catch((error) => {
        alert(" In error catch ", error);
      })
    console.log(result, "in competent");
  }



  const clusterLeaderSelect = event => {
    setClusterLeader(event.target.value);
    if (employee.length === 0) {
      setClusterButton(true)
      setErrorMsg("Provide all input");
    }
    else {
      setClusterButton(false)

    }
  };

  const onChangeHandler = event => {
    setClusterName(event.target.value);
    if (sportsList.length === 0) {
      setClusterButton(true)
      setErrorMsg("Provide all input");
    }
    else {
      setClusterButton(false)
      setErrorMsg(false)
    }
  };
  const onDescprtion = event => {
    setDescription(event.target.value);
    if (sportsList.length > 0) {
      setClusterButton(false)
      setErrorMsg(false)
    }
    else {
      setClusterButton(true)

    }
  };


  const handleMultiChange = (option) => {
    setClusterButton(false)
    setSportsList(option)
    console.log(sportsList);
   setErrorMsg(false)
 }

  const onRemove=(option)=>{
    alert(JSON.stringify(option));
    setSportsList(option)
  }


 const handleMultiChange1 = (options) => {
  setEmployee(options)
  setClusterButton(false)
  setErrorMsg(false)
}

//Timer to close modal 
const callTimer =()=>{
  const setModal = props.handleEditClose;
  setClear()
  setModal()
}

// edit api need to integrate 

  return (
    <Fragment>
       <Modal show={props.modal} onHide={props.handleEditClose} centered>

        <Modal.Header closeButton>
          <Modal.Title>Edit Cluster</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={onSubmit}>
            <div className="row">
              <div className="col-sm-12">
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1"> Select Sports</label>
            
                <Multiselect
                 placeholder="Select Sports"
                 style={{overflow:"scroll"}}
                 options={sportsNames}
                 value={sportsList}
                 selectedValues={getSingleCluster1}
                 displayValue="sportName"
                 onRemove={onRemove}
                 onSelect={handleMultiChange}
                 isMulti
                 />

                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">Cluster Name</label>
                  <input type="text" className="form-control"  required value={clusterName}  defaultValue={getSingleCluster.clusterName} onChange={onChangeHandler} />
                </div>
              </div>
            </div>

            <h6 style={{ color: "red", marginLeft: "20px" }}>{errormsg}</h6>   
            <div className="row">
              <div className="col-sm-12">
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">Cluster Description</label>

                  <input type="text" className="form-control digit" placeholder="Desc" defaultValue={getSingleCluster.description} required value={description} onChange={onDescprtion} />
                </div>
              </div>
            </div>

            {/* <h3>{getSingleCluster.employeeIds}</h3> */}

            <div className="row">
              <div className="col-sm-12">
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1"> Select Employee</label>
                  {/* <Select
                    name="filters"
                   // placeholder="select Employees"
                    defaultValue={[getSingleCluster.employeeIds]}
                    value={employee}
                    options={clusterLeaderNames.map(e => ({ label: e.firstName, value: e.employeeId, id: e.id }))}
                    onChange={handleMultiChange1}
                    placeholder ={getSingleCluster.employeeIds}
                    isMulti
                  /> */}
                <Multiselect
                 placeholder="Select Employee"
                 options={getClusterEmployees}
                 value={employee}
                 selectedValues={getEmployeesNames}
                 displayValue="firstName"
                 onSelect={handleMultiChange1}
                 isMulti
                 />






                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1"> Cluster Leader</label>
                 <select
                    className="form-control"
                    required
                    defaultValue={getSingleCluster.employeeId}
                    value={clusterLeader}
                    onChange={clusterLeaderSelect}>
                      
                   {clusterAllLeaderNames.map((e, i) => {
                      return (
                         
                        <option key={e.employeeId} value={e.employeeId}>
                          {e.firstName}{e.lastName}
                        </option> 
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>



            <div className="row">
                    <div className="col-sm-12">
                      <div className="form-group">
                        <label htmlFor="exampleFormControlInput1"> Shift Status</label>
                        <select
                          className="form-control"
                          value={status}
                          defaultValue={getSingleCluster.status}
                          onChange={(e) => setStatus(e.target.value)}>
                          <option value="0">Active</option>
                          <option value="1">Inactive</option>

                        </select>
                      </div>
                    </div>
                  </div>




                
            <button className="myclass mb-2 mr-2" type="submit" disabled={clustertButton} value="Submit">Save</button>
            <button className="myclass mb-2 mr-2" onClick={props.handleClose}>Close</button>
            <h5>{successMsg.length !== 0 && <div className="text-success">{successMsg}</div>}</h5>
          </form>
        </Modal.Body>

      </Modal>
    </Fragment>
  )
}

export default EditClusterModal
