import { SmileFaceIcon } from '@components/Icons';
import { TextareaAutosize } from '@material-ui/core';
import * as React from 'react';
import styled from 'styled-components';

import EmojiData from 'react-twemoji-picker/data/twemoji.json';
import 'react-twemoji-picker/dist/EmojiPicker.css';
import { EmojiObject, EmojiPicker } from 'react-twemoji-picker';
import { Modal } from '@components/common';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingWhite from '@components/common/LoadingWhite';
export interface IInputPostProps {
    handlePostComment: (content: string) => Promise<void>;
}

export default function InputPost(props: IInputPostProps) {
    const { handlePostComment } = props;
    const [input, setInput] = React.useState('');
    const [showEmoji, setShowEmoji] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    const handleChangeInput = (e: any) => {
        setInput(e.target.value);
    };

    const emojiData = Object.freeze(EmojiData);
    const handleEmojiSelect = (emoji: EmojiObject) => {
        setInput((value: string) => {
            const characterEmoji = String.fromCodePoint(parseInt(emoji.unicode, 16));
            return value + characterEmoji;
        });
    };

    const handleClickShowEmoji = () => {
        setShowEmoji(true);
    };

    const handleClickHideEmoji = () => {
        setShowEmoji(false);
    };

    // const notify = () => toast('Wow so easy!');
    const handleCreateComment = async () => {
        if (input.length > 250) {
            toast('Content comment not larger 250 characters');
        } else {
            setIsLoading(true)
            await handlePostComment(input);
            setIsLoading(false)
            setInput('');
        }
    };
    return (
        <>
            <Container>
                <div className="form">
                    <div className='form-container'>
                        <button className="button-emoji" onClick={handleClickShowEmoji}>
                            <SmileFaceIcon ariaLabel="Emoji" />
                        </button>
                        {isLoading && (
                            <div className="loading-input">
                                <LoadingWhite />
                            </div>
                        )}

                        <TextareaAutosize
                            style={{ color: `${isLoading ? '#8e8e8e' : '#262626'}`}}
                            maxRows={4}
                            placeholder="Add a comment..."
                            className="text-input"
                            value={input}
                            onChange={handleChangeInput}
                        />
                    </div>    
                    <button  style={{ opacity: `${isLoading ? '0.5' : '1'}`}} onClick={handleCreateComment} className="button-post">
                        Post
                    </button>
                </div>
                {showEmoji && (
                    <div>
                        <div className="emoji-wrapper">
                            <EmojiPicker
                                theme="light"
                                emojiData={emojiData}
                                onEmojiSelect={handleEmojiSelect}
                            />
                        </div>
                        <Modal showModal={showEmoji} onCloseModal={handleClickHideEmoji} />
                    </div>
                )}
            </Container>
            <ToastContainer
                position="bottom-center"
                hideProgressBar
                theme="dark"
                closeButton={false}
                limit={1}
            />
        </>
    );
}
const Container = styled.section`
    padding: 6px 16px;
    border-top: 1px solid rgba(239, 239, 239, 1);
    position: relative;

    .emoji-wrapper {
        position: absolute;
        top: 0;
        transform: translateY(-100%);
        left: 2px;
        z-index: 10001;
    }

    .form {
        display: flex;
        justify-content: space-between;
        .text-input {
            border: none;
            flex: 24;
            outline: none;
            resize: none;
            overflow-y: scroll;
            background: 0 0;
            font-size: 14px;
            font-family: Arial, Helvetica, sans-serif;

            &::placeholder {
                font-family: Arial, Helvetica, sans-serif;
            }
        }

        .loading-input {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
        }

        .form-container {
            display: flex;
            flex: 20;
            align-items: center;
        }
    }
    .button-emoji {
        padding: 8px 16px 8px 0;
        background: 0 0;
        border: none;
        flex: 1;
        outline: none;
        cursor: pointer;
    }

    .button-post {
        color: #0095f6;
        border: none;
        background: 0 0;
        font-weight: 600;
        font-size: 14px;
        flex: 1;
        cursor: pointer;
    }
`;
