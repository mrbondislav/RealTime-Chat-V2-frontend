import React from 'react';
import styled from "styled-components";
import Picker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";
const ChatInput = ({ handleSendMsg }) => {

    const [showEmojiPicker, setShowEmojiPicker] = React.useState(false);
    const [msg, setMsg] = React.useState("");

    const handlePicker = () => {
        setShowEmojiPicker(!showEmojiPicker);
    };

    const handleEmojiClick = (event, emoji) => {
        let message = msg;
        message += emoji.emoji;
        setMsg(message);
    };

    const sendChat = (event) => {
        event.preventDefault();
        if (msg.length > 0) {
            handleSendMsg(msg);
            setMsg("");
        }
    };

    return (
        <Container>
            <div className="button-container">
                <div className="emoji">
                    <BsEmojiSmileFill onClick={handlePicker} />
                    {
                        showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />
                    }
                </div>
            </div>
            <form className='input-container' onSubmit={(event) => sendChat(event)}>
                <input
                    type="text"
                    placeholder='type your message here'
                    value={msg}
                    onChange={(event) => setMsg(event.target.value)}
                />
                <button className='submit'>
                    <IoMdSend />
                </button>
            </form>
        </Container>

    )
}

const Container = styled.div`
display: grid;
grid-template-columns: 5% 95%;
align-items: center;
background-color: #C48F65;
padding: 0 32px;
padding-bottom: 4px;

@media screen and (min-width: 350px) and (max-width: 450px) {
    padding: 0px 8px;
        gap: 8px;
}

@media screen and (min-width: 720px) and (max-width: 1080px) {
     padding: 0px 16px;
        gap: 16px;
    }

 .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 16px;
    
    .emoji {
        
        position: relative;
        svg {
            font-size: 24px;
            color: yellow;
            cursor: pointer;
            @media screen and (min-width: 350px) and (max-width: 450px) {
                font-size: 16px;
            }
        }
        .emoji-picker-react {
            position: absolute;
            top: -350px;
            background-color: #F0EDE5;
            box-shadow: 0 5px 10px #dad5c9;
            border-color: #F0EDE5;
            @media screen and (min-width: 350px) and (max-width: 450px) {
                width: 230px;
                height: 300px;
            }

            .emoji-scroll-wrapper::-webkit-scrollbar {
                background-color: #F0EDE5;
                width: 5px;
                &-thumb {
                    background-color: #dad5c9;
                    border-radius: 15px;
                }
            }

            .emoji-categories {
                button {
                    filter: contrast(0);
                }
            }
            .emoji-search {
                background-color: transparent;
                border-color: #F0EDE5;
            }

            .emoji-group:before {
                background-color: #F0EDE5;
            }
        }
    }
 }
 
 .input-container {
    width: 100%;
    border-radius: 32px;
    display: flex;
    align-content: center;
    gap: 32px;
    background-color: #672E3B;
    @media screen and (min-width: 350px) and (max-width: 450px) {
        gap: 0px;
}
    
    input {
        width: 90%;
        background-color: transparent;
        color: white;
        border: none;
        padding-left: 16px;
        font-size: 20px;
        &::selection {
            background-color: #c45b5b;
        }
        &:focus {
            outline: none;
        }
        @media screen and (min-width: 350px) and (max-width: 450px) {
        font-size: 12px;
}
    }
    button {
        padding: 5px 32px;
        border-radius: 32px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #531d2a;
        border: none;
        cursor: pointer;
        

        @media screen and (min-width: 720px) and (max-width: 1080px) {
            padding: 5px 16px;
            svg {
                font-size: 16px;
            }
    }

    @media screen and (min-width: 350px) and (max-width: 450px) {
            padding: 5px 10px;
}

        svg {
            color: #ebe7ff;
            font-size: 32px;
        }
    }
 }

`;

export default ChatInput;