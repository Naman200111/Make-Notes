import React, { useRef, useState } from 'react';
import { Form, useNavigate } from 'react-router-dom';
import './Login.css';
import { login } from "../../utils";

const Login = () => {
    const navigate = useNavigate();
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const [emailError, setEmailError] = useState();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleLogin = () => {
        if (!emailRegex.test(emailRef.current.value)) {
            setEmailError('Enter valid email id');
            return;
        }
        login(emailRef.current.value, passwordRef.current.value, navigate);
    }
    const handleSignUp = () => {
        navigate('/signup');
    }

    return (
        <div className="login">
            <h1>Login</h1>
            <div className='form'>
                <Form method="post" action="/notes">
                    <input ref={emailRef} className='form-element' type='text' placeholder='Email' />
                    {emailError && <p className='errorText'>{emailError}</p>}
                    <input ref={passwordRef} className='form-element' type='password' placeholder='Password' />
                </Form>
            </div>
            <div className='login-btns'>
                <button className='login-btn' onClick={handleLogin}>Login</button>
                <button className='login-btn' onClick={handleSignUp}>SignUp</button>
            </div>
        </div>
    );
};

export default Login;