import { Avatar, Modal } from '@components/common';
import { HeartIcon, ThereDotIcon } from '@components/Icons';
import { Tooltip } from '@material-ui/core';
import { Message } from '@models/Message';
import * as React from 'react';
import styled from 'styled-components';
import { HEART_ICON } from './InputChat';

export interface IMessageItemProps {
    message: Message;
    type: 'user' | 'me';
    handleDeleteMessage: (message: Message) => void;
}

export default function MessageItem(props: IMessageItemProps) {
    const { message, type, handleDeleteMessage } = props;

    const [open, setOpen] = React.useState(false);

    const handleTooltipClose = () => {
        setOpen(false);
    };

    const handleTooltipOpen = () => {
        setOpen(true);
    };

    return (
        <Container>
            {type === 'user' && (
                <div className="part-user">
                    <Avatar
                        className="avatar"
                        url={message.user.avatar}
                        size="small"
                        border="none"
                    />
                    {message.image ? (
                        <div className="content-img">
                            <img src={message.image} />
                        </div>
                    ) : message.message === HEART_ICON ? (
                        <div className="heart-icon">
                            <HeartIcon size={44} color="red" />
                        </div>
                    ) : (
                        <div className="content">{message.message}</div>
                    )}
                </div>
            )}
            {type === 'me' && (
                <div className="part-me">
                    <div
                        onClick={() => {
                            handleTooltipClose()
                            handleDeleteMessage(message);
                        }}
                        className="action-method"
                        style={{ display: `${open ? 'block' : 'none'}` }}
                    >
                        Delete
                    </div>
                    <Modal showModal={open} onCloseModal={handleTooltipClose} />

                    <div
                        style={{ display: `${open ? 'block' : ''}` }}
                        onClick={handleTooltipOpen}
                        className="action-message"
                    >
                        <ThereDotIcon />
                    </div>
                    {message.image ? (
                        <div className="content-img">
                            <img src={message.image} />
                        </div>
                    ) : message.message == HEART_ICON ? (
                        <div className="heart-icon">
                            <HeartIcon size={44} color="red" />
                        </div>
                    ) : (
                        <div className="content">{message.message}</div>
                    )}
                </div>
            )}
        </Container>
    );
}

const Container = styled.div`
    border-radius: 10px;
    width: 100%;

    .heart-icon {
        margin-bottom: 8px;
    }

    .action-method {
        background: #262626;
        color: #fff;
        padding: 8px 12px;
        font-weight: 600;
        cursor: pointer;
        border-radius: 8px;
        z-index: 999999999999999;
    }

    .part-user {
        width: 100%;
        display: flex;
        align-items: end;
        .avatar {
            margin: 0 8px 8px 0;
        }

        .content {
            padding: 16px;
            flex: inherit;
            background-color: #fff;
            /* background-color: rgb(239, 239, 239); */
            max-width: 236px;
            border: 1px solid rgb(239, 239, 239);
            border-radius: 22px;
            margin-bottom: 8px;
        }

        .content-img {
            max-width: 236px;
            border-radius: 22px;
            margin-bottom: 8px;
            img {
                width: 100%;
                border-radius: 22px;
            }
        }
    }

    .part-me {
        width: 100%;
        justify-content: end;
        display: flex;
        align-items: center;

        &:hover .action-message {
            display: block;
        }

        .action-message {
            display: none;
            cursor: pointer;
        }

        .content {
            margin-bottom: 8px;
            margin-left: 10px;
            border-radius: 22px;
            flex: inherit;
            padding: 16px;
            background-color: rgb(239, 239, 239);
            width: fit-content;

            max-width: 236px;
        }

        .content-img {
            max-width: 236px;
            border-radius: 22px;
            margin-left: 10px;

            margin-bottom: 8px;
            img {
                width: 100%;
                border-radius: 22px;
            }
        }
    }
`;
