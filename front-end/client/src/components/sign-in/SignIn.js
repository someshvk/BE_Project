import React, {useState} from "react";
import "./signIn.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const SignIn = ({ setLoginUser}) => {

    const navigate = useNavigate();

    const [ user, setUser] = useState({
        email:"",
        password:""
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    }

    const signin = () => {
        axios.post("http://localhost:8000/signin", user)
        .then(res => {
            // alert(res.data.message);
            setLoginUser(res.data.user);
            navigate('/home');
        })
    }

    return (
        <div className="signin">
            <h1>SIGN IN</h1>
            <input type="text" name="email" value={user.email} onChange={handleChange} placeholder="Enter your Email" required></input>
            <input type="password" name="password" value={user.password} onChange={handleChange}  placeholder="Enter your Password" required></input>
            <div className="button" onClick={signin}>Sign In</div>
            <div>or</div>
            <div className="button" onClick={() => navigate('/signup')}>Sign Up</div>
        </div>
    )
}

export default SignIn;