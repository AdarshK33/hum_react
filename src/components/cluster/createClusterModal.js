import React, { Fragment, useState, useContext, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { ClusterContext } from "../../context/ClusterState";
import Select from 'react-select';
const CreateClusterModal = (props) => {

  useEffect(() => {
    viewSports()
    selectClusterLeader()
  }, [])
  const [clusterName, setClusterName] = useState("");
  const [description, setDescription] = useState("");
  const [productTarget, setProductTarget] = useState('');
  const [clusterLeader, setClusterLeader] = useState('');
  const [clustertButton, setClusterButton] = useState(false);
  const [errormsg, setErrorMsg] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [multiValue, setMultiValue] = useState([])
  const [employee, setEmployee] = useState([])


  const { addCluster, viewCluster, viewSports, sportsNames, clusterLeaderNames, selectClusterLeader } = useContext(ClusterContext);

  const onSubmit = (event) => {
    event.preventDefault();
    const newCluster = {
      clusterId: 0,
      clusterLeader,
      clusterName,
      description,
      productTarget: parseInt(productTarget),
      storeId: "IN1055",
      sportIds: multiValue.map((e, i) => multiValue[i].value),
      employeeIds: employee.map((e, i) => employee[i].value)
    }

    // console.log("^^^^" + JSON.stringify(newCluster));
    const result = addCluster(newCluster)
      .then((result) => {
        console.log("api response===", result.data.message);

        setSuccessMsg(result.data.message);
        viewCluster();
      })
      .catch((error) => {
        alert(" In error catch ", error);
      })
    console.log(result, "in competent");
  }


  const onChangeHandler = event => {
    setClusterName(event.target.value);
    if (multiValue.length === 0) {
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
    if (multiValue.length > 0) {
      setClusterButton(false)
      setErrorMsg(false)
    }
    else {
      setClusterButton(true)

    }
  };
  const onProductTarget = event => {
    setProductTarget(event.target.value);
    if (employee.length === 0) {
      setClusterButton(true)
      setErrorMsg("Provide all input");
    }
    else {
      setClusterButton(false)

    }
  };







  const handleMultiChange = (option) => {
     setClusterButton(false)
    setMultiValue(option)
    setErrorMsg(false)
  }

  const handleMultiChange1 = (options) => {
    setEmployee(options)
    setClusterButton(false)
    setErrorMsg(false)
  }







  return (
    <Fragment>
      <Modal show={props.modal} onHide={props.handleClose} centered>

        <Modal.Header closeButton>
          <Modal.Title>Create Cluster</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={onSubmit}>
            <div className="row">
              <div className="col-sm-12">
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1"> Select Sports</label>
                  <Select

                    name="filters"
                    placeholder="Filters"
                    value={multiValue}
                    options={sportsNames.map(e => ({ label: e.sportName, value: e.sportId }))}
                    onChange={handleMultiChange}
                    isMulti

                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">Cluster Name</label>

                  <input type="text" className="form-control" placeholder="Cluster Name" required value={clusterName} onChange={onChangeHandler} />

                </div>
              </div>
            </div>
            <h6 style={{ color: "red", marginLeft: "20px" }}>{errormsg}</h6>
            <div className="row">
              <div className="col-sm-12">
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">Cluster Desc</label>

                  <input type="text" className="form-control digit" placeholder="Desc" required value={description} onChange={onDescprtion} />
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
                    onChange={(e) => setClusterLeader(e.target.value)} value={clusterLeader}>
                    <option value="">Select Cluster Leader</option>
                    {clusterLeaderNames.map((e, i) => {
                      return (

                        <option key={e.employeeId} value={e.employeeId}>
                          {e.firstName}
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
                  <label htmlFor="exampleFormControlInput1"> Select Employee</label>
                  <Select

                    name="filters"
                    placeholder="Filters"
                    value={employee}
                    options={clusterLeaderNames.map(e => ({ label: e.firstName, value: e.employeeId }))}
                    onChange={handleMultiChange1}
                    isMulti
                  />

                </div>
              </div>
            </div>



            <div className="row">
              <div className="col-sm-12">
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">Product Target</label>

                  <input type="number" className="form-control digit" required value={productTarget} onChange={onProductTarget} />
                </div>
              </div>
            </div>

            <button className="btn btn-primary mb-2 mr-2" type="submit" disabled={clustertButton} value="Submit">Save</button>
            <button className="btn btn-primary mb-2 mr-2" onClick={props.handleClose}>
              close
          </button>
            <h5>{successMsg.length !== 0 && <div className="text-success">{successMsg}</div>}</h5>
          </form>
        </Modal.Body>

      </Modal>
    </Fragment>
  )
}

export default CreateClusterModal