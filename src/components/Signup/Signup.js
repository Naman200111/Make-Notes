import React, { useRef, useState } from 'react';
import { Form, useNavigate } from 'react-router-dom';
import './Signup.css';
import { signup } from "../../utils";

const SignUp = () => {
    const navigate = useNavigate();
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);

    const [pwdError, setPwdError] = useState();
    const [emailError, setEmailError] = useState();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const handleSignUp = () => {
        if (!emailRegex.test(emailRef.current.value)) {
            setEmailError('Enter valid email id');
            return;
        }
        if (passwordRef.current.value !== confirmPasswordRef.current.value) {
            setPwdError('Passwords do not match');
            return;
        }
        signup(nameRef.current.value, emailRef.current.value, passwordRef.current.value, navigate);
    }
    const handleLogin = () => {
        navigate('/login');
    }
    return (
        <div className="signup">
            <h1>Sign Up</h1>
            <div className='form'>
                <Form method="post">
                    <input ref={nameRef} className='form-element' type='text' placeholder='Name' required />
                    <input ref={emailRef} className='form-element' type='text' placeholder='Email' required />
                    {emailError && <p className='errorText'>{emailError}</p>}
                    <input ref={passwordRef} className='form-element' type='password' placeholder='Password' required />
                    <input ref={confirmPasswordRef} className='form-element' type='password' placeholder='Confirm Password' required />
                    {pwdError && <p className='errorText'>{pwdError}</p>}
                </Form>
            </div>
            <div className='signup-btns'>
                <button className='signup-btn' onClick={handleSignUp}>Sign up</button>
                <button className='signup-btn' onClick={handleLogin}>Login</button>
            </div>
        </div>
    );
};

export default SignUp;