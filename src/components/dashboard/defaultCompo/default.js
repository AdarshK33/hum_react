import React, { Fragment } from 'react';
import Breadcrumb from '../../common/breadcrumb';

const Default = () => {

    return (
        <Fragment>
            <Breadcrumb parent="Dashboard" title="Default" />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-header">
                                <h5>Dashboard</h5><span>lorem ipsum dolor sit amet, consectetur adipisicing elit</span>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Default;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// function Default() {

//     const [post, setPost] = useState({})
//     const [loading, setLoading] = useState(true)
//     const [error, setError] = useState("")
//     const [msg, setMsg] = useState("Every thing is okay..!", true)


//     useEffect(() => {


//         const headers = {
//                      'Content-Type': 'application/json',
//                      'Access-Control-Allow-Origin': '*',
//                      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbmlzdHJhdG9yIiwiZXhwIjoxNTk3NzYyMzYwLCJpYXQiOjE1OTc3MjYzNjB9.6WkevPuVE-Vsup3lZvjxeZG57OyCdWhm7aF2mEZqkZU' 
//                    }
//         axios.get('http://humine.theretailinsights.co/shift/view',{headers})
//             .then(response => {
//                 console.log(response);
//                 setLoading(false)
//                 setPost(response.data)
//             })
//             .catch(error => {
//                 console.log(error);
//                 setError("SOMETHING WENT WRONG..! ")
//                 setMsg(false);
//             })
//     }, [])

//     return (
//         <div>
//             <div className="col-sm-12">
//                 <div className="card">
//                 <h1>HOOK API CALL</h1>
//                 {}
//                 {loading ? 'Loading' : post.title}
//                 {error ? error : null}
//                 <br />
//                 {msg}
//             </div>
//         </div>
//     </div >
//   );
// }
// export default Default;
