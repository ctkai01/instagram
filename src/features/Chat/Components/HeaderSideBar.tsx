import * as React from 'react';
import styled from 'styled-components';

export interface IHeaderSideBarProps {
}

export default function HeaderSideBar (props: IHeaderSideBarProps) {
  return (
    <Container>
       nma@2002
    </Container>
  );
}

const Container = styled.div`
 padding: 0 20px;
 display: flex;
 justify-content: center;
 align-items: center;
 height: 60px;
 border-bottom: 1px solid rgb(219, 219, 219);
 color: #262626;
 font-size: 16px;
 font-weight: 600;

`