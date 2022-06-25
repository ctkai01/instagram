import { Avatar } from '@components/common';
import { HeartIcon, TickSmallIcon } from '@components/Icons';
import { Conversation } from '@models/Conversation';
import { User } from '@models/User';
import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { HEART_ICON } from './InputChat';

export interface IUserChatItemProps {
    conversation: Conversation;
    activeConversation: number;
    authUser: User;
    handleChangeActiveConversation: (idConversation: number) => void;
}

export default function UserChatItem(props: IUserChatItemProps) {
    const { conversation, authUser, activeConversation, handleChangeActiveConversation } = props;
    // console.log('User', conversation.users[0]);
    let lastMessage;
    if (conversation.messages) {
        lastMessage = conversation.messages[conversation.messages.length - 1];
    }

    return (
        <Container
            to={`/message/${conversation.users[0].user_name}`}
            onClick={() => handleChangeActiveConversation(conversation.id)}
            style={{
                background: `${activeConversation === conversation.id ? 'rgb(239, 239, 239)' : ''}`,
            }}
        >
            <Avatar
                border="none"
                className="avatar"
                size="medium"
                url={conversation.users[0].avatar}
            />
            <div className="info-container">
                <div className="name">
                    {conversation.users[0].name}
                    {!!conversation.users[0].is_tick && <TickSmallIcon className="tick" />}
                </div>
                <div className="comment_lasted">
                    {lastMessage
                        ? lastMessage.message
                            
                            ? (lastMessage.message === HEART_ICON ? <HeartIcon size={15} color="red" /> : lastMessage.message)
                            : lastMessage.user.id === authUser.id
                            ? 'You sent a image'
                            : 'You received a image'
                        : ''}
                </div>
            </div>
        </Container>
    );
}

const Container = styled(Link)`
    padding: 8px 20px;
    display: flex;
    align-items: center;
    cursor: pointer;
    text-decoration: none;
    &:active {
        background-color: rgb(239, 239, 239);
    }

    .avatar {
        margin-right: 10px;
    }

    .name {
        color: #262626;
        display: flex;
        align-items: center;

        .tick {
            margin-left: 5px;
        }
    }

    .comment_lasted {
        color: #8e8e8e;
    }
`;
