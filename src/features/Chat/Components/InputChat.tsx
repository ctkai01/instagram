import { GalleryFull, HeartIcon, ImageGallery, SmileFaceIcon } from '@components/Icons';
import { TextareaAutosize } from '@mui/material';
import * as React from 'react';
import styled from 'styled-components';

import EmojiData from 'react-twemoji-picker/data/twemoji.json';
import 'react-twemoji-picker/dist/EmojiPicker.css';
import { EmojiObject, EmojiPicker } from 'react-twemoji-picker';
import { GalleryIcon } from '@components/Icons/GalleryIcon';
import { Modal } from '@components/common';

export interface IInputChatProps {
    className?: string;
    handleSubmitMessage: (text: string) => void;
}

export default function InputChat(props: IInputChatProps) {
    const { className, handleSubmitMessage } = props;

    const [input, setInput] = React.useState('');
    const [showEmoji, setShowEmoji] = React.useState(false);
    // const [isLoading, setIsLoading] = React.useState(false);
    let refInput = React.useRef<HTMLTextAreaElement>(null);

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
    console.log('shoe', showEmoji);
    return (
        <Container className={className}>
            <div className="content-input">
                <button className="button-emoji" onClick={handleClickShowEmoji}>
                    <SmileFaceIcon size="normal" ariaLabel="Emoji" />
                </button>
                <TextareaAutosize
                    maxRows={7}
                    placeholder="Message..."
                    className="text-input"
                    value={input}
                    ref={refInput}
                    style={{
                        lineHeight: '24px',
                        fontSize: '16px',
                        fontFamily: 'inherit',
                    }}
                    onChange={handleChangeInput}
                />
                {!input.length && (
                    <button className="button-gallery">
                        <ImageGallery />
                    </button>
                )}

                {!input.length && (
                    <button className="button-heart">
                        <HeartIcon />
                    </button>
                )}
                {!!input.length && (
                    <button onClick={() => {
                        handleSubmitMessage(input)
                        setInput('')
                    }} className="button-send">
                        Send
                    </button>
                )}
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

const Container = styled.div`
    padding: 20px;
    position: relative;

    .button-send {
        height: 100%;
        font-size: 14px;
        font-weight: 600;
        color: rgb(0, 149, 246);
        background: 0 0;
        border: none;
        outline: none;
        cursor: pointer;
    }

    .button-emoji,
    .button-gallery,
    .button-heart {
        padding: 8px;
        background: 0 0;
        border: none;
        /* flex: 1; */
        outline: none;
        cursor: pointer;
        display: flex;
        align-items: center;
    }

    .emoji-wrapper {
        position: absolute;
        top: 0;
        transform: translateY(-100%);
        left: 2px;
        z-index: 10001;

        & .emoji-picker-scroll > div {
            height: 255px !important;
        }
    }

    .content-input {
        border: 1px solid rgb(219, 219, 219);
        border-radius: 22px;
        min-height: 44px;
        padding-left: 11px;
        padding-right: 8px;
        display: flex;
        align-items: center;
    }

    .text-input {
        border: none;
        /* flex: 24; */
        flex: 1;
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
`;
