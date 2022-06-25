import { Conversation } from '@models/Conversation';
import { User } from '@models/User';
import * as React from 'react';
import styled from 'styled-components';
import UserChatItem from './UserChatItem';

export interface IUserChatListProps {
    conversations: Conversation[];
    activeConversation: number;
    authUser: User;
    handleChangeActiveConversation: (idConversation: number) => void
}

export default function UserChatList (props: IUserChatListProps) {
    const { authUser, conversations, activeConversation, handleChangeActiveConversation } = props
  return (
    <Container>
        {conversations.map((conversation, index) => (
                <UserChatItem key={index} authUser={authUser} activeConversation={activeConversation} handleChangeActiveConversation={handleChangeActiveConversation} conversation={conversation}/>
            
       ))}
    </Container>
  );
}

const Container = styled.div`
    
`