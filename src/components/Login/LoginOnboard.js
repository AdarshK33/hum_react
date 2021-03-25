import React, {useState} from 'react';
import { candidate } from '../../utils/canditateLogin';
import { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { setDefaultCandidiateHeader } from "../../utils/canditateLogin";

function LoginOnboard(props) {
    const [loginData,setLoginData] = useState({username:'',password:''})
    let history = useHistory();
    const goToFom = () => {
        
        history.push('/onboard')
    }
    const handleLogin =(e)=>{
            e.preventDefault()
        console.log("inside login");
        candidate.post('/auth/candidate/login', loginData)
        .then((response) => {
            console.log(response,"candidate login 333333333333")
            const token = response.data.token
            setDefaultCandidiateHeader(token);
            console.log(response,response.data.token, "loginonboARD")
        return goToFom()

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