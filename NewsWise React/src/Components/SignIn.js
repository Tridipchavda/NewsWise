import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import logo from "../logo.png";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignIn() {

  const [signInName,setSignInName] = useState("");
  const [signInUser,setSignInUser] = useState("");
  const [signInPassword,setSignInPassword] = useState("");
  const [signInEmail,setSignInEmail] = useState("");

  const [logInUser,setLogInUser] = useState("");
  const [logInPassword,setLogInPassword] = useState("");

  const nav = useNavigate();

  const handleSignIn = () =>{
    console.log(signInPassword);
    axios.post("http://localhost:3333/signin",{
      username: signInUser,
      password:signInPassword,
      name: signInName,
      email: signInEmail
    }).then((res)=>{
      console.log(res);
      alert(res.data);
      if(res.data == "success"){
        const loginBtn = document.getElementById("tab-login");
        loginBtn.click();
      }
    }).catch((e)=>{
      console.log(e);
    })
  }

  const handleLogIn = () =>{
    console.log(signInPassword);
    axios.post("http://localhost:3333/login",{
      username: logInUser,
      password:logInPassword,
    }).then((res)=>{
      console.log(res);
      if(res.data == "success"){
        localStorage.setItem("user",logInUser);
        nav("/home");
      }
    }).catch((e)=>{
      console.log(e);
    })
  }
  return (
    <center>
        <h1 style={{marginTop:15,marginBottom:15}}>Welcome to <img src={logo} width="100px" />NewsWise</h1>
      <div style={{ width: "400px" }}>
        <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
          <li className="nav-item" role="presentation">
            <a
              className="nav-link active"
              id="tab-login"
              data-mdb-toggle="pill"
              href="#pills-login"
              role="tab"
              aria-controls="pills-login"
              aria-selected="true"
            >
              Login
            </a>
          </li>
          <li className="nav-item" role="presentation">
            <a
              className="nav-link"
              id="tab-register"
              data-mdb-toggle="pill"
              href="#pills-register"
              role="tab"
              aria-controls="pills-register"
              aria-selected="false"
            >
              Register
            </a>
          </li>
        </ul>

        <div className="tab-content">
          <div
            className="tab-pane fade show active"
            id="pills-login"
            role="tabpanel"
            aria-labelledby="tab-login"
          >
            <form>
              <div className="form mb-4">
                <input
                  type="email"
                  id="loginName"
                  className="form-control"
                  value={logInUser}
                  onChange={(e)=>{setLogInUser(e.target.value)}}
                  placeholder="Enter username"
                />
              </div>

              <div className="form mb-4">
                <input
                  type="password"
                  id="loginPassword"
                  className="form-control"
                  value={logInPassword}
                  onChange={(e)=>{setLogInPassword(e.target.value)}}
                  placeholder="Password"
                />
              </div>

              <div className="row mb-4">
                <div className="col-md-6 d-flex justify-content-center">
                  <div className="form-check mb-3 mb-md-0">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="loginCheck"
                      checked
                      readOnly
                    />
                    <label className="form-check-label" htmlFor="loginCheck">
                      {" "}
                      Remember me{" "}
                    </label>
                  </div>
                </div>

                <div className="col-md-6 d-flex justify-content-center">
                  <a href="#!">Forgot password?</a>
                </div>
              </div>
              <button type="button" onClick={()=>{handleLogIn()}} className="btn btn-primary btn-block mb-4">
                Sign in
              </button>

              <div className="text-center">
                <p>
                  Not a member? <a href="#!">Register</a>
                </p>
              </div>
            </form>
          </div>
          <div
            className="tab-pane fade"
            id="pills-register"
            role="tabpanel"
            aria-labelledby="tab-register"
          >
            <form>
              <div className=" mb-4">
                <input
                  type="text"
                  id="registerName"
                  className="form-control"
                  placeholder="Name"
                  onChange={(e)=>setSignInName(e.target.value)}
                  value={signInName}
                />
              </div>

              <div className=" mb-4">
                <input
                  type="text"
                  id="registerUsername"
                  className="form-control"
                  onChange={(e)=>setSignInUser(e.target.value)}
                  value={signInUser}
                  placeholder="Username"
                />
              </div>

              <div className=" mb-4">
                <input
                  type="email"
                  id="registerEmail"
                  className="form-control"
                  onChange={(e)=>setSignInEmail(e.target.value)}
                  value={signInEmail}
                  placeholder="Email"
                />
              </div>

              <div className=" mb-4">
                <input
                  type="text"
                  id="registerPassword"
                  className="form-control"
                  onChange={(e)=>setSignInPassword(e.target.value)}
                  value={signInPassword}
                  placeholder="Password"
                />
              </div>

              <div className=" mb-4">
                <input
                  type="text"
                  id="registerRepeatPassword"
                  className="form-control"
                  placeholder="Repeat password"
                />
              </div>

              <div className="form-check d-flex justify-content-center mb-4">
                <input
                  className="form-check-input me-2"
                  type="checkbox"
                  value=""
                  id="registerCheck"
                  checked
                  readOnly
                  aria-describedby="registerCheckHelpText"
                />
                <label className="form-check-label" htmlFor="registerCheck">
                  I have read and agree to the terms
                </label>
              </div>

              <button type="button" className="btn btn-primary btn-block mb-3" onClick={()=>{handleSignIn()}}>
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </center>
  );
}
