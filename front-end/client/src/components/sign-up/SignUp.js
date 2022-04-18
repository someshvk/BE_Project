import React, { useState } from "react";
import "./signUp.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const SignUp = () => {

    const navigate = useNavigate();

    const [ user, setUser] = useState({
        name: "",
        email:"",
        password:"",
        reEnterPassword: ""
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value, 
            fileList: []
        });
    } 

    // this function requests for pushing user details in database
    const signup = () => {
        const { name, email, password, reEnterPassword } = user;
        if( name && email && password && (password === reEnterPassword)){
            axios.post("http://localhost:8000/signup", user)
            .then( res => {
                alert(res.data.message);
                navigate("/signin");
            });
        } else {
            alert("invlid input");
        }   
    }

    return (
        <div className="signup">
            <h1>SIGN UP</h1>
            <input type="text" name="name" value={user.name} placeholder="Your Name" onChange={ handleChange }></input>
            <input type="text" name="email" value={user.email} placeholder="Your Email" onChange={ handleChange }></input>
            <input type="password" name="password" value={user.password} placeholder="Your Password" onChange={ handleChange }></input>
            <input type="password" name="reEnterPassword" value={user.reEnterPassword} placeholder="Re-enter Password" onChange={ handleChange }></input>
            <div className="button" onClick={signup} >Sign Up</div>
            <div>or</div>
            <div className="button" onClick={() => navigate('/signin')}>Sign In</div>
        </div>
    );
}

export default SignUp;