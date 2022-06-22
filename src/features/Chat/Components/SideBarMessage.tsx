import * as React from 'react';
import styled from 'styled-components';
import HeaderSideBar from './HeaderSideBar';
import UserChatList from './UserChatList';

export interface ISideBarMessageProps {
}

export default function SideBarMessage (props: ISideBarMessageProps) {
  return (
    <Container>
      <HeaderSideBar/>
      <UserChatList/>
    </Container>
  );
}

const Container = styled.div`
    border: 1px solid rgb(219, 219, 219);
    height: 860px;
`