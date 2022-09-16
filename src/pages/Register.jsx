import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from "styled-components";
import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import axios from "axios";
import { registerRoute } from '../utils/APIRoutes';

const Register = () => {
    const navigate = useNavigate();

    const [values, setValues] = React.useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "blue",
    };

    React.useEffect(() => {
        if (localStorage.getItem('chat-app-user')) {
            navigate("/")
        }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (handleValidation()) {
            const { username, email, password } = values;
            const { data } = await axios.post(registerRoute, {
                username,
                email,
                password,
            });
            if (data.status === false) {
                toast.error(data.msg, toastOptions);
            }
            if (data.status === true) {
                localStorage.setItem('chat-app-user', JSON.stringify(data.user));
                navigate("/");
            }
        };
    };

    const handleValidation = () => {
        const { username, email, password, confirmPassword } = values;
        if (password !== confirmPassword) {
            toast.error("Password and Confirm password should be same",
                toastOptions
            );
            return false;
        } else if (username.length < 3) {
            toast.error("Username should be greater than 3 characters",
                toastOptions
            );
            return false;
        } else if (password.length < 5) {
            toast.error("Password should be equal or greater than 5 characters",
                toastOptions
            );
            return false;
        } else if (email === "") {
            toast.error("Email is required",
                toastOptions
            );
            return false;
        }
        return true;
    };

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    return (
        <>
            <FormContainer>
                <form onSubmit={(event) => handleSubmit(event)}>
                    <div className="brand">
                        <img src={Logo} alt="logo" />
                        <h1>Jast chatting V2</h1>
                    </div>
                    <input
                        type='text'
                        placeholder='Username'
                        name="username"
                        onChange={(e) => handleChange(e)}
                    />
                    <input
                        type='email'
                        placeholder='Email'
                        name="email"
                        onChange={(e) => handleChange(e)}
                    />
                    <input
                        type='password'
                        placeholder='Password'
                        name="password"
                        onChange={(e) => handleChange(e)}
                    />
                    <input
                        type='password'
                        placeholder='Confirm Password'
                        name="confirmPassword"
                        onChange={(e) => handleChange(e)}
                    />
                    <button type='submit'>Create User</button>
                    <span>
                        You have an account ? <Link to="/login">Login</Link></span>
                </form>
            </FormContainer>
            <ToastContainer></ToastContainer>
        </>
    )
}

const FormContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction : column;
    justify-content : center;
    gap: 16px;
    align-items: center;
    background-color : #179CDE;

    .brand {
        display: flex;
        align-items: center;
        justify-content : center;
        gap: 16px;

        img {
            height: 80px;
        }

        h1 {
            color: #333333;
            text-transform : uppercase;
        }
    }

    form {
        display: flex;
        flex-direction : column;
        gap: 16px;
        background-color: #FFFFFF;
        border-radius: 10px;
        padding: 48px 50px;

        input {
            background-color: transparent;
            padding: 16px;
            border: 1px solid #8C8C8C;
            border-radius: 7px;
            width: 100%;
            font-size: 16px;
            &:hover {
                border: 1px solid #0088CC;
                outline: none;
            }
            &:focus {
                border: 2px solid #0088CC;
                outline: none;
            }
        }
        button {
            background-color: #179CDE;
            color: white;
            padding: 16px 32px;
            border: none;
            font-weight: bold;
            cursor: pointer;
            border-radius: 10px;
            font-size: 16px;
            text-transform: uppercase;
            transition: 0.5s ease-in-out;
            &:hover {
                background-color: #0088CC;
            }
        }

        span {
            margin: 0 auto;
            text-transform: uppercase;
            a {
                color : #179CDE;
                text-decoration: none;
                font-weight: bold;
            }
        }
    }

`;

export default Register