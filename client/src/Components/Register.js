import React, { useState } from 'react';
import axios from "axios";
import { useHistory } from "react-router-dom";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
    let history = useHistory();



    const onregister = (e) => {
        e.preventDefault();
        console.log(name,email,phone,address)
        axios.post("/students",{
            name:name,
            email:email,
            phone:phone,
            address:address,
            password:password
        })
        setName("");
        setEmail("");
        setPhone("");
        setAddress("");
        setPassword("");
        alert("Register Successfully!")
        history.push("/login")
    }




    return (
        <div>
            <div className="container my-3">
            <h1>Register Here!</h1>
            <form onSubmit={onregister}>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Name</label>
                <input type="text" className="form-control" value={name} name="name" onChange={(e)=>setName(e.target.value)} placeholder="Enter Name"/>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email Address</label>
                <input type="email" className="form-control" value={email} name="email" onChange={(e)=>setEmail(e.target.value)} placeholder="Enter email"/>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Phone</label>
                <input type="number" className="form-control" value={phone} onChange={(e)=>{setPhone(e.target.value)}} placeholder="Phone Number" autoComplete="on"/>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Address</label>
                <input type="text" className="form-control" value={address} onChange={(e)=>{setAddress(e.target.value)}} placeholder="Address" autoComplete="on"/>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" className="form-control" value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder="Password" autoComplete="on"/>
            </div>
            <button type="submit" className="btn btn-primary my-3">Register</button>
            </form>
            
        </div>
            
        </div>
    )
}

export default Register
