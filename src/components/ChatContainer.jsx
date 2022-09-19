import React from 'react';
import styled from "styled-components";
import Logout from './Logout';

function ChatContainer({ currentChat }) {
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
                            <div className="chat-input"></div>
                        </div>
                    </Container>
                )
            }
        </>
    )
}

const Container = styled.div`
    padding-top: 16px;
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
                    color: white;
                }
            }
        }
    }
`;

export default ChatContainer;