import * as React from 'react';
import styled from 'styled-components';
import UserChatItem from './UserChatItem';

export interface IUserChatListProps {
}

export default function UserChatList (props: IUserChatListProps) {
  return (
    <Container>
      <UserChatItem/>
    </Container>
  );
}

const Container = styled.div`
    
`