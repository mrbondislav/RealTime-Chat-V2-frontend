import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from "styled-components";
import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import axios from "axios";
import { loginRoute } from '../utils/APIRoutes';

const Login = () => {
    const navigate = useNavigate();

    const [values, setValues] = React.useState({
        username: "",
        password: "",
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
            const { username, password } = values;
            const { data } = await axios.post(loginRoute, {
                username,
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
        const { username, password } = values;
        if (password === "") {
            toast.error("Email and Password is required", toastOptions);
            return false;
        } else if (username.length === "") {
            toast.error("Email and Password is required", toastOptions);
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
                        min="3"
                    />
                    <input
                        type='password'
                        placeholder='Password'
                        name="password"
                        onChange={(e) => handleChange(e)}
                    />
                    <button type='submit'>Login In</button>
                    <span>
                        Don't have an account ? <Link to="/register">Register</Link></span>
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

export default Login