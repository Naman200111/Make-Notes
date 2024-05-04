import React, { useRef } from 'react';
import { Form, useNavigate } from 'react-router-dom';
import './Signup.css';
import { signup } from "../../utils";

const SignUp = () => {
    const navigate = useNavigate();
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const handleSignUp = () => {
        if (passwordRef.current.value !== confirmPasswordRef.current.value) {
            alert('Passwords do not match');
            return;
        }
        if (!emailRegex.test(emailRef.current.value)) {
            alert('Invalid email id value');
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
                    <input ref={passwordRef} className='form-element' type='password' placeholder='Password' required />
                    <input ref={confirmPasswordRef} className='form-element' type='password' placeholder='Confirm Password' required />
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