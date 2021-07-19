import React, { useState } from 'react'
import axios from "axios";
import { useHistory } from "react-router-dom";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    let history = useHistory();



    const onlogin = (e) => {
        e.preventDefault();
        // console.log(email,password)
        axios.post("/students/login",{
            email:email,
            password:password
        }).then((res)=>{
            alert("Login Successfull");
            console.log("Login Success",res.data);
            localStorage.setItem("name",res.data.user.name);
            localStorage.setItem('token',res.data.token);
            history.push("/dashboard");
        }).catch((error)=>{
            alert("Login Failed!");
            console.log(error);
        })
        
    }



    return (
        <div>
            <div className="container my-3">
            <h1>Login Here!</h1>
            <form onSubmit={onlogin}>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email Address</label>
                <input type="email" className="form-control" value={email} name="email" onChange={(e)=>setEmail(e.target.value)} placeholder="Enter email"/>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" className="form-control" value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder="Password" autoComplete="on"/>
            </div>
            <button type="submit" className="btn btn-primary my-3">Login</button>
            </form>
        </div>
        </div>
    )
}

export default Login
