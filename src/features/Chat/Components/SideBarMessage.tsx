import { Conversation } from '@models/Conversation';
import { User } from '@models/User';
import * as React from 'react';
import styled from 'styled-components';
import HeaderSideBar from './HeaderSideBar';
import UserChatList from './UserChatList';

export interface ISideBarMessageProps {
    handleAddConversation: (user: User) => void;
    conversations: Conversation[]
}

export default function SideBarMessage(props: ISideBarMessageProps) {
    const { conversations, handleAddConversation } = props;
    return (
        <Container>
            <HeaderSideBar handleAddConversation={handleAddConversation}/>
            <UserChatList conversations={conversations}/>
        </Container>
    );
}

const Container = styled.div`
    border: 1px solid rgb(219, 219, 219);
    height: 860px;
`;
