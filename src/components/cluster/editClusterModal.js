import React, { Fragment, useState, useContext, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { ClusterContext } from "../../context/ClusterState";
import Select from 'react-select';
import { Check } from 'react-feather';
const EditClusterModal = (props) => {

  useEffect(() => {
    viewSports()
    selectClusterLeader()
  }, [])
  const [clusterName, setClusterName] = useState("");
  const [description, setDescription] = useState("");
  const [productTarget, setProductTarget] = useState('');
  const [clusterLeader, setClusterLeader] = useState('');
  const [clusterId,setClusterId] = useState('');
  const [successMsg, setSuccessMsg] = useState("");
  const [selectedSportsId,setSelectedSportsId] = useState();
  const [employee, setEmployee] = useState([])


  const { updateCluster,addCluster, getSingleCluster,viewSports, sportsNames, clusterLeaderNames, selectClusterLeader } = useContext(ClusterContext);


  useEffect(() => {
    setClusterName(getSingleCluster.clusterName)
    setSelectedSportsId(getSingleCluster.selectedSportsId)
    setDescription(getSingleCluster.description)
    setProductTarget(getSingleCluster.productTarget)
    setClusterLeader(getSingleCluster.clusterLeader)
  

   console.log("1---->"+getSingleCluster.employeeIds);
   console.log("2---->"+JSON.stringify(clusterLeaderNames));
   }, [props])

  useEffect(() => {
    setClusterId(props.clusterId)
   }, [props.clusterId])


console.log("===="+JSON.stringify(getSingleCluster));

  const onSubmit = (event) => {

    event.preventDefault();
    const editCluster = {
      clusterId: getSingleCluster.clusterId,
      clusterLeader,
      clusterName,
      description,
      productTarget: parseInt(productTarget),
      storeId: "IN1056",
      sportId:parseInt(selectedSportsId),
      employeeIds: employee.map((e, i) => employee[i].value)
    }
    console.log("^^^^" + JSON.stringify(editCluster));
    const result = updateCluster(editCluster)
      .then((result) => {
        console.log("api response===", result.data.message);

        setSuccessMsg(result.data.message);
      })
      .catch((error) => {
        alert(" In error catch ", error);
      })
    console.log(result, "in competent");
  }

 

  const handleMultiChange1 = (options) => {
    setEmployee(options)
  }

  return (
    <Fragment>
       <Modal show={props.modal} onHide={props.handleEditClose} centered>

        <Modal.Header closeButton>
          <Modal.Title>Create Cluster</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={onSubmit}>
            <div className="row">
              <div className="col-sm-12">
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1"> Select Sports</label>

               {/* <h1>{getSingleCluster.sports.sportNames}</h1>    */}
                  
                  <select
                    className="form-control"
                    required
                    onChange={(e) => setSelectedSportsId(e.target.value)}
                    defaultValue={getSingleCluster.sportName}
                    >
                       
                    {sportsNames.map((e, i) => {
                      return (
                         
                        <option key={e.sportId} value={e.sportId}>
                          {e.sportName}
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
                  <label htmlFor="exampleFormControlInput1">Cluster Name</label>

                  <input type="text" className="form-control"  placeholder="cluster name" required defaultValue={getSingleCluster.clusterName}  onChange={(e) => setClusterName(e.target.value)} />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">Cluster Desc</label>

                  <input type="text" className="form-control digit" placeholder="Desc" required defaultValue={getSingleCluster.description} onChange={(e) => setDescription(e.target.value)} />
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
                    onChange={(e) => setClusterLeader(e.target.value)}>
                   <option value="" disabled selected hidden>{getSingleCluster.clusterLeaderName}</option>
                    {clusterLeaderNames.map((e, i) => {
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
                  <label htmlFor="exampleFormControlInput1">Product Target</label>
               
                  <input type="number" className="form-control digit" required 
                  defaultValue={getSingleCluster.productTarget}
                  onChange={(e) => setProductTarget(e.target.value)} />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1"> Select Employee</label>
                  <Select
                    name="filters"
                    placeholder="Filters"
                    value={employee}
                    options={clusterLeaderNames.map(e => ({ label: e.firstName, value: e.employeeId }))}
                    onChange={handleMultiChange1}
                    placeholder ={getSingleCluster.employeeIds}
                    isMulti
                  />

                </div>
              </div>
            </div>
                  <h3>{getSingleCluster.employeeIds}</h3>
            <button className="btn btn-primary mb-2 mr-2" type="submit" value="Submit">Save</button>
            <h5>{successMsg.length !== 0 && <div className="text-success">{successMsg}</div>}</h5>
          </form>
        </Modal.Body>

      </Modal>
    </Fragment>
  )
}

export default EditClusterModal
