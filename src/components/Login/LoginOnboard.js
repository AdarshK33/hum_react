import React, {useState} from 'react';
import { client } from '../../utils/axios';
import { useEffect } from 'react';
import { useHistory } from "react-router-dom";

function LoginOnboard(props) {
    const [loginData,setLoginData] = useState({username:'',password:''})
    let history = useHistory();
    const goToFom = () => {
        
        history.push('/onboard')
    }
    const handleLogin =(e)=>{
            e.preventDefault()
        console.log("inside login");
        client.post('/auth/candidate/login', loginData)
        .then((response) => {
            console.log(response, "loginonboARD")
        return goToFom

        })
        .catch((error) => {
            console.log(error)
        })
    }
    useEffect(()=>{
    },[])
  return(
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
            <form>
                <div className="form-group text-left">
                <label htmlFor="exampleInputEmail1">Username</label>
                <input type="text" 
                       className="form-control" 
                       id="email" 
                       aria-describedby="emailHelp" 
                       placeholder="Enter email"
                       onChange={e=>setLoginData({...loginData,username:e.target.value})}
                />
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" 
                        className="form-control" 
                        id="password" 
                        placeholder="Password"
                        onChange={e=>setLoginData({...loginData,password:e.target.value})}

                    />
                </div>
                <button 
                    type="submit" 
                    className="btn btn-primary"
                    onClick={handleLogin}
                >
                    Login
                </button>
            </form>
        </div>
    )
}
export default LoginOnboard