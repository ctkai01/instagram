import { SmileFaceIcon } from '@components/Icons';
import { TextareaAutosize } from '@material-ui/core';
import * as React from 'react';
import styled from 'styled-components';

import EmojiData from 'react-twemoji-picker/data/twemoji.json';
import 'react-twemoji-picker/dist/EmojiPicker.css';
import { EmojiObject, EmojiPicker } from 'react-twemoji-picker';
import { Modal } from '@components/common';

export interface IInputPostProps {}

export default function     InputPost(props: IInputPostProps) {
    const [input, setInput] = React.useState('');
    const [showEmoji, setShowEmoji] = React.useState(false);

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
    return (
        <Container>
            <div className="form">
                <div>
                    <button className="button-emoji" onClick={handleClickShowEmoji}>
                        <SmileFaceIcon ariaLabel="Emoji" />
                    </button>
                    <TextareaAutosize
                        maxRows={4}
                        placeholder="Add a comment..."
                        className="text-input"
                        value={input}
                        onChange={handleChangeInput}
                    />
                </div>
                <button className="button-post">Post</button>
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
        z-index: 3;
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
        }

        div {
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
