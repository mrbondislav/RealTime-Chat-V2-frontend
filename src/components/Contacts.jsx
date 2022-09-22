import React from 'react';
import styled from "styled-components";
import Logo from "../assets/logo.svg";
const Contacts = ({ contacts, currentUser, changeChat }) => {
    const [currentUserName, setCurrentUserName] = React.useState(undefined);
    const [currentUserImage, setCurrentUserImage] = React.useState(undefined);
    const [currentSelected, setCurrentSelected] = React.useState(undefined);

    // React.useEffect(() => {
    //     if (currentUser) {
    //         setCurrentUserImage(currentUser.avatarImage);
    //         setCurrentUserName(currentUser.username);
    //     }
    // }, [currentUser]);

    React.useEffect(() => {
        const fetchData = async () => {
            const data = await JSON.parse(
                localStorage.getItem("chat-app-user")
            );
            setCurrentUserName(data.username);
            setCurrentUserImage(data.avatarImage);
        };
        fetchData();
    }, []);



    const changeCurrentChat = (index, contact) => {
        setCurrentSelected(index);
        changeChat(contact);
    };


    return (
        <>
            {
                currentUserImage && currentUserName && (
                    <Cotainer>
                        <div className="brand">
                            <img src={Logo} alt="logo" />
                            <h3>Jast chatting V2</h3>
                        </div>
                        <div className="contacts">
                            {
                                contacts.map((contact, index) => {
                                    return (
                                        <div
                                            className={`contact ${index === currentSelected ? "selected" : ""}`}
                                            key={index}
                                            onClick={() => changeCurrentChat(index, contact)}
                                        >
                                            <div className="avatar">
                                                <img src={`data: image/svg+xml; base64, ${contact.avatarImage}`} alt="avatar" />
                                            </div>
                                            <div className="username">
                                                <h3>{contact.username}</h3>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>

                        <div className="current-user">
                            <div className="avatar">
                                <img src={`data: image/svg+xml; base64, ${currentUserImage}`} alt="avatar" />
                            </div>
                            <div className="user-name">
                                <h2>{currentUserName}</h2>
                            </div>
                        </div>
                    </Cotainer>
                )
            }
        </>
    )
}

const Cotainer = styled.div`
    display: grid;
    grid-template-rows: 10% 75% 15%;
    overflow: hidden;
    background-color: #C0AB8E;
    .brand {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 16px;
        img {
            height: 42px;
        }
        h3 {
            color: white;
            text-transform: uppercase;
        }
    }
    .contacts {
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: auto;
        gap: 12px; 
        &::-webkit-scrollbar{
            width: 3px;
            &-thumb {
                background-color: #FFFFFF;
                width: 1px;
                border-radius: 16px;
            }
        }
        .contact {
            background-color: #FFFFFF;
            min-height: 80px;
            width: 90%;
            cursor: pointer;
            border-radius: 5px;
            padding: 6px;
            gap: 16px;
            align-items: center;
            display: flex;
            transition: 0.5s ease-in-out;
            .avatar {
                img {
                    height: 48px;
                }
            }
            .username {
                h3 {
                    color: black;
                }
            }
        }

        .selected {
            background-color: #2E4A62;
        }
    }

    .current-user {
        background-color: #C48F65;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 32px;
        .avatar {
            img {
            height: 64px;
            max-inline-size: 100%;
         }
        }
        .user-name {
            h2 {
                color : white;
            }
        }
        @media screen and (min-width: 720px) and (max-width: 1080px) {
            gap: 8px;
            .user-name {
                h2 {
                    font-size: 16px;
                }
            }
        }
    }
`;

export default Contacts;