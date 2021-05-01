import React, { useState, useContext, useEffect } from "react";
import { CandidateContext } from "../../context/CandidateState";
import { OnBoardContext } from "../../context/OnBoardState";
import { ToastContainer, toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import "./Login.css";
import "react-toastify/dist/ReactToastify.css";
import { AlignCenter } from "react-feather";

function LoginOnboard(props) {
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const { candidateOnBoardLogin } = useContext(CandidateContext);
  const { CandidateProfile, candidateProfileData, candidateData } = useContext(
    OnBoardContext
  );

  useEffect(() => {
    CandidateProfile();
  }, [candidateData, candidateProfileData]);

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("inside login");
    candidateOnBoardLogin({ ...loginData, history: props.history });
    CandidateProfile();
    loginRedirect();
  };

  const loginRedirect = () => {
    console.log("candidateProfileData.status", candidateProfileData.status);
    if (
      candidateProfileData !== undefined &&
      candidateProfileData !== null &&
      candidateProfileData.status === 2
    ) {
      props.history.push("/onboard");
    } else {
      props.history.push("/offer");
    }
  };

  return (
    <div className="Login">
      <form>
        <h3 className="header">CANDIDATE LOGIN</h3>
        <br />
        <div className="form-group text-left">
          <label htmlFor="exampleInputEmail1">Username</label>
          <input
            type="text"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={(e) =>
              setLoginData({ ...loginData, username: e.target.value })
            }
          />
        </div>
        <div className="form-group text-left">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
          />
        </div>
        <Button block size="lg" type="submit" onClick={handleLogin}>
          Login{" "}
        </Button>
        <ToastContainer />
      </form>
    </div>
  );
}
export default LoginOnboard;
