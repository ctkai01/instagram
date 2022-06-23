import { Conversation } from '@models/Conversation';
import * as React from 'react';
import styled from 'styled-components';
import UserChatItem from './UserChatItem';

export interface IUserChatListProps {
    conversations: Conversation[]
}

export default function UserChatList (props: IUserChatListProps) {
    const { conversations } = props
  return (
    <Container>
        {conversations.map(conversation => (
                <UserChatItem conversation={conversation}/>
            
       ))}
    </Container>
  );
}

const Container = styled.div`
    
`