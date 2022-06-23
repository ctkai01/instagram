import { Avatar } from '@components/common';
import { Conversation } from '@models/Conversation';
import * as React from 'react';
import styled from 'styled-components';

export interface IUserChatItemProps {
    conversation: Conversation;
    activeConversation: number;
    handleChangeActiveConversation: (idConversation: number) => void;
}

export default function UserChatItem(props: IUserChatItemProps) {
    const { conversation, activeConversation, handleChangeActiveConversation } = props;
    console.log('User', conversation);

    return (
        <Container
            onClick={() => handleChangeActiveConversation(conversation.id)}
            style={{
                background: `${activeConversation === conversation.id ? 'rgb(239, 239, 239)' : ''}`,
            }}
        >
            <Avatar border='none' className="avatar" size="medium" url={conversation.users[0].avatar} />
            <div className="info-container">
                <div className="name">{conversation.users[0].name}</div>
                <div className="comment_lasted">My english is a bit poor</div>
            </div>
        </Container>
    );
}

const Container = styled.div`
    padding: 8px 20px;
    display: flex;
    align-items: center;
    cursor: pointer;

    &:active {
        background-color: rgb(239, 239, 239);
    }

    .avatar {
        margin-right: 10px;
    }

    .name {
        color: #262626;
    }

    .comment_lasted {
        color: #8e8e8e;
    }
`;
