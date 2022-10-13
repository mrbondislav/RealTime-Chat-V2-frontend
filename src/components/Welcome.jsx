import React from 'react';
import styled from "styled-components";
import Robot from "../assets/robot.gif";
import Logout from '../components/Logout';
const Welcome = ({ currentUser }) => {

    return (
        <Container>
            <img src={Robot} alt="robot" />
            <h1>
                Welcome, <span>{currentUser.username}</span>
            </h1>
            <h3>Please select a chat to Start Messaging</h3>
            <Logout />
        </Container>
    )
}

const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
color: black;
@media screen and (min-width: 350px) and (max-width: 450px) {
        h1 {
            text-align: center;
        }
        h3 {
            text-align: center;
        }
}

img {
    height: 320px;
    @media screen and (min-width: 350px) and (max-width: 450px) {
        height: 250px;
}
}
span {
    color: #2E4A62;
}
`;

export default Welcome;