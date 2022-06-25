import { Conversation } from '@models/Conversation';
import { User } from '@models/User';
import * as React from 'react';
import styled from 'styled-components';
import HeaderSideBar from './HeaderSideBar';
import UserChatList from './UserChatList';

export interface ISideBarMessageProps {
    conversations: Conversation[];
    activeConversation: number;
    authUser: User;
    handleChangeActiveConversation: (idConversation: number) => void;
}

export default function SideBarMessage(props: ISideBarMessageProps) {
    const { conversations, authUser, activeConversation, handleChangeActiveConversation } = props;
    return (
        <Container>
            <HeaderSideBar authUser={authUser} />
            <UserChatList
                authUser={authUser}
                activeConversation={activeConversation}
                conversations={conversations}
                handleChangeActiveConversation={handleChangeActiveConversation}
            />
        </Container>
    );
}

const Container = styled.div`
    border: 1px solid rgb(219, 219, 219);
    height: 860px;
`;
