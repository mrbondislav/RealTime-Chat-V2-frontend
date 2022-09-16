import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import loader from "../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import axios from "axios";
import { setAvatarRoute } from '../utils/APIRoutes';
import { Buffer } from "buffer";

const SetAvatar = () => {

    const api = "https://api.multiavatar.com/45678945";
    const navigate = useNavigate();
    const [avatars, setAvatars] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [selectedAvatar, setSelectedAvatar] = React.useState(undefined);
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "blue",
    };

    React.useEffect(() => {
        if (!localStorage.getItem("chat-app-user")) {
            navigate("/login");
        }
    }, []);

    const setProfilePicture = async () => {
        if (selectedAvatar === undefined) {
            toast.error("Please select an avatar", toastOptions);
        } else {
            const user = await JSON.parse(localStorage.getItem("chat-app-user"));
            const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
                image: avatars[selectedAvatar],
            });

            if (data.isSet) {
                user.isAvatarImageSet = true;
                user.avatarImage = data.image;
                localStorage.setItem("chat-app-user", JSON.stringify(user));
                navigate('/');
            } else {
                toast.error("Error setting avatar. Please try again", toastOptions);
            }
        }
    };



    React.useEffect(() => {
        const fetchData = async () => {
            const data = [];
            for (let i = 0; i < 4; i++) {
                const image = await axios.get(
                    `${api}/${Math.round(Math.random() * 100)}`
                );
                const buffer = new Buffer(image.data);
                data.push(buffer.toString("base64"));
            }

            setAvatars(data);
            setIsLoading(false);
        };

        fetchData();
    }, []);
    return (
        <>
            {
                isLoading ? <Container>
                    <img src={loader} alt="loader" className='loader' />
                </Container> : (
                    <Container>
                        <div className="title-container">
                            <h1>
                                Pick an avatar as yuor profile picture
                            </h1>
                        </div>
                        <div className="avatars">
                            {
                                avatars.map((avatar, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className=
                                            {`avatar ${selectedAvatar === index
                                                ? "selected"
                                                : ""}`}
                                        >
                                            <img src={`data: image/svg+xml; base64, ${avatar}`} alt="avatar"
                                                onClick={() => setSelectedAvatar(index)}
                                            />
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <button
                            className='submit-btn'
                            onClick={setProfilePicture}
                        >
                            Set as Profile Picture
                        </button>
                    </Container>
                )
            }
            <ToastContainer />
        </>
    )
}



const Container = styled.div`
    display: flex;
    flex-direction : column;
    justify-content : center;
    gap: 48px;
    align-items: center;
    background-color : #179CDE;
    height : 100vh;
    width: 100 vw;
    
    .loader {
        max-inline-size: 100%;
    }

    .title-container {
        h1 {
            color: white;
        }
    }

    .avatars {
        display: flex;
        gap: 32px;
        .avatar {
            border : 6px solid transparent;
            padding: 6px;
            border-radius: 80px;
            display: flex;
            justify-content : center;
            align-items: center;
            transition : 0.5 ease-in-out;
            img {
                height: 96px;
            }
        }
        .selected {
            border : 6px solid #FFFFFF;
        }
    }

    .submit-btn {
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

`;

export default SetAvatar;