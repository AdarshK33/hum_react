import React, {useState, useContext} from 'react';
import { CandidateContext } from "../../context/CandidateState";
function LoginOnboard(props) {
    const [loginData,setLoginData] = useState({username:'',password:''})
    const  {candidateOnBoardLogin} = useContext(CandidateContext);

    const handleLogin =(e)=>{
            e.preventDefault()
        console.log("inside login");
        candidateOnBoardLogin({...loginData,history:props.history})
        
    }
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
                     <button type="submit" className="btn btn-primary" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
}
export default LoginOnboard;
