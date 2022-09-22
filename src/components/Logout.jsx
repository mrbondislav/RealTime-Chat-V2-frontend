import React from 'react';
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { BiLogOut } from "react-icons/bi";
import { logoutRoute } from '../utils/APIRoutes';

const Logout = () => {

    const navigate = useNavigate();
    const handleClick = async () => {
        const id = await JSON.parse(
            localStorage.getItem("chat-app-user")
        )._id;
        const data = await axios.get(`${logoutRoute}/${id}`);
        if (data.status === 200) {
            localStorage.clear();
            navigate("/login");
        }
    };

    return (
        <Button onClick={handleClick} >
            <BiLogOut />
        </Button>
    )
}

const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px;
    border-radius: 8px;
    background-color: #531d2a;
    border: none;
    cursor: pointer;
    svg {
        font-size: 18px;
        color: #ebe7ff;
    }
`;

export default Logout;