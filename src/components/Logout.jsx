import React from 'react';
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { BiLogOut } from "react-icons/bi";

const Logout = () => {

    const navigate = useNavigate();
    const handleClick = () => {
        console.log('logout');
    }

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
    background-color: green;
    border: none;
    cursor: pointer;
    svg {
        font-size: 18px;
        color: #ebe7ff;
    }
`;

export default Logout;