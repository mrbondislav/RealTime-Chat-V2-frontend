import React from 'react';
import styled from "styled-components";
import ChatInput from './ChatInput';
import Logout from './Logout';
import Messages from './Messages';
import axios from 'axios';
import { getAllMessagesRoute, sendMessageRoute } from '../utils/APIRoutes';


function ChatContainer({ currentChat, currentUser }) {

    const [messages, setMessages] = React.useState([]);

    React.useEffect(() => {
        const fetchData = async () => {
            const response = await axios.post(getAllMessagesRoute, {
                from: currentUser._id,
                to: currentChat._id,
            })
            setMessages(response.data);
        }

        fetchData();
    }, [currentChat]);

    const handleSendMsg = async (msg) => {
        await axios.post(sendMessageRoute, {
            from: currentUser._id,
            to: currentChat._id,
            message: msg,
        });
    };

    return (
        <>
            {
                currentChat && (
                    <Container>
                        <div className="chat-header">
                            <div className="user-details">
                                <div className="avatar">
                                    <img src={`data: image/svg+xml; base64, ${currentChat.avatarImage}`} alt="avatar" />
                                </div>
                                <div className="username">
                                    <h3>{currentChat.username}</h3>
                                </div>
                            </div>
                            <Logout />
                        </div>
                        <div className="chat-messages">
                            {
                                messages.map((message) => {
                                    return (
                                        <div>
                                            <div className={`message ${message.fromSelf ? "sended" : "recieved"}`}>
                                                <div className="content">
                                                    <p>
                                                        {message.message}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                                )
                            }
                        </div>
                        <ChatInput handleSendMsg={handleSendMsg} />
                    </Container>
                )
            }
        </>
    )
}

const Container = styled.div`
    padding-top: 16px;
    display: grid;
    grid-template-rows: 10% 78% 12%;
    gap: 2px;
    overflow: hidden;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
        grid-auto-rows: 15% 75% 15%;
    }
    .chat-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 32px;
        .user-details {
            display: flex;
            align-items: center;
            gap: 16px;
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
    }

    .chat-messages {
        padding: 16px 32px;
        display: flex;
        flex-direction: column;
        gap: 16px;
        overflow: auto;
        
        .message {
            display: flex;
            align-items: center;
            .content {
                max-width: 40%;
                overflow-wrap: break-word;
                padding: 16px;
                font-size: 18px;
                border-radius: 16px;
                color: #ebe7ff;
            }
        }
    }

    .sended {
        justify-content: flex-end;
        .content {
            background-color: #672E3B;
        }
    }

    .recieved {
        justify-content: flex-start;
        .content {
            background-color: #964659;
        }
    }
`;

export default ChatContainer;