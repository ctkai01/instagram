import { Avatar } from '@components/common';
import { Conversation } from '@models/Conversation';
import * as React from 'react';
import styled from 'styled-components';

export interface IUserChatItemProps {
  conversation: Conversation
}

export default function UserChatItem(props: IUserChatItemProps) {
  const { conversation } = props
  console.log('User', conversation)

    return (
        <Container>
            <Avatar
                className="avatar"
                size="medium"
                url={conversation.users[0].avatar}
            />
            <div className="info-container">
                <div className="name">{conversation.users[0].name}</div>
                <div className="comment_lasted">My english is a bit poor</div>
            </div>
        </Container>
    );
}

const Container = styled.div`
    padding: 8px 12px;
    display: flex;
    align-items: center;
    cursor: pointer;
    
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
