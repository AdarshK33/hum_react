import React, { Fragment, useState, useContext, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { ClusterContext } from "../../context/ClusterState";
// import Select from 'react-select';
import { Multiselect } from 'multiselect-react-dropdown';
const EditClusterModal = (props) => {

  useEffect(() => {
    viewSports()
    selectClusterLeader()
  }, [])
  const [clusterName, setClusterName] = useState("");
  const [description, setDescription] = useState("");
  const [clusterLeader, setClusterLeader] = useState('');
  const [clusterId, setClusterId] = useState('');
  const [successMsg, setSuccessMsg] = useState("");
  const [selectedSportsId, setSelectedSportsId] = useState();
  const [employee, setEmployee] = useState([])
  const [errormsg, setErrorMsg] = useState(false);
  const [sportsList, setSportsList] = useState([])
  const [clustertButton, setClusterButton] = useState(false);
  //const [defaultClusterSports, setDefaultClusterSports] = useState([])



  const setClear = () => {
    setClusterName('')
    setDescription('')
    setClusterLeader('')
    setClusterButton('')
    setErrorMsg('')
    setSuccessMsg('')
    setSportsList('')
    setSuccessMsg('');
    setEmployee('')
  }


  const { updateCluster, viewCluster, getSingleCluster, viewSports, sportsNames, clusterLeaderNames, getSingleCluster1, selectClusterLeader } = useContext(ClusterContext);

  useEffect(() => {
    setClusterName(getSingleCluster.clusterName)
    setSelectedSportsId(getSingleCluster.selectedSportsId)
    setDescription(getSingleCluster.description)
    setClusterLeader(getSingleCluster.clusterLeader)
    setEmployee(getSingleCluster.employeeId)
    setSportsList(getSingleCluster.sportId)

    //console.log("1---->"+getSingleCluster.employeeIds);
    // console.log("2---->"+JSON.stringify(clusterLeaderNames));
  }, [getSingleCluster.clusterLeader, getSingleCluster.clusterName, getSingleCluster.description, getSingleCluster.employeeId, getSingleCluster.selectedSportsId, getSingleCluster.sportId, props])

  useEffect(() => {
    setClusterId(props.clusterId)
  }, [props.clusterId])

  // useEffect(() => {
  //   let editSportsList = getSingleCluster1.map(arr => {
  //     return {
  //       label: arr.sportName, value: arr.sportId
  //     }
  //   })
  //   console.log("Edit sports list", editSportsList);
  //   console.log('Options for edit sports', sportsNames)
  //   setDefaultClusterSports(editSportsList)
  // }, [getSingleCluster1])




  // useEffect(() => {
  //   let editSportsList = getSingleCluster1.map(arr => {
  //     return {
  //       label: arr.sportName, value: arr.sportId
  //     }
  //   })
  //   console.log("Edit sports list", editSportsList);
  //   console.log('Options for edit sports', sportsNames)
  //   setDefaultClusterSports(editSportsList)
  // }, [getSingleCluster1])






  // console.log("in edit cluster Modal employee ids"+JSON.stringify(getSingleCluster.employeeIds));
  // console.log("in edit cluster Modal employee ids"+JSON.stringify(getSingleCluster.sportsNames));

  const onSubmit = (event) => {

    event.preventDefault();
    const editCluster = {
      clusterId: getSingleCluster.clusterId,
      clusterLeader,
      clusterName,
      description,
      storeId: "IN1056",
      sportIds: getSingleCluster1.map((e, i) => getSingleCluster1[i].value),
      employeeIds: employee.map((e, i) => employee[i].value)
    }

    console.log("^^^^" + JSON.stringify(editCluster));
    const result = updateCluster(editCluster)
      .then((result) => {
        console.log("api response===", result.data.message);

        setSuccessMsg(result.data.message);
        setTimeout(() => {
          callTimer();
        }, 4000);
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
    if (setSportsList.length === 0) {
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
    if (setSportsList.length > 0) {
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
    // alert(JSON.stringify(sportsList));
    setErrorMsg(false)
  }

  const handleMultiChange1 = (options) => {
    setEmployee(options)
    setClusterButton(false)
    setErrorMsg(false)
  }
  //Timer to close modal 
  const callTimer = () => {
    const setModal = props.handleClose;
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

                  {/* <h5>{results}</h5> */}
                  {/* <Select
                    style={{ fontSize: "0.8rem" }}
                    value={defaultClusterSports}
                    options={sportsNames.map(e => ({ label: e.sportName, value: e.sportId }))}
                    onChange={handleMultiChange}
                    isMulti
                  /> */}
                  <Multiselect
                   options={sportsNames}
                   displayValue="sportName"
                   selectedValues={getSingleCluster1}
            />  

                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">Cluster Name</label>

                  <input type="text" className="form-control" required value={clusterName} defaultValue={getSingleCluster.clusterName} onChange={onChangeHandler} />

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






            <h3>{getSingleCluster.employeeIds}</h3>

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
                    placeholder={getSingleCluster.employeeIds}
                    isMulti
                  /> */}

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
                    // defaultValue={getSingleCluster.employeeId}
                    onChange={clusterLeaderSelect}>
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
