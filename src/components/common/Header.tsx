import { LayoutScreen } from '@layouts/index';
import * as React from 'react';
import styled from 'styled-components';
import { LogoInstagram } from './LogoInstagram';

export interface IHeaderProps {}

export function Header(props: IHeaderProps) {
    return (
        <Container>
            <LayoutScreen className='content-header'>
                <LogoInstagram className='logo'/>
                <LogoInstagram />
                <LogoInstagram />
            </LayoutScreen>
        </Container>
    );
}

const Container = styled.header`
    position: fixed;
    top: 0;
    width: 100vw;
    left: 0;
    height: 60px;
    border-bottom: 1px solid rgba(219, 219, 219);

    .content-header {
      display: flex;
      justify-content: center;
      align-items: center;
      height: inherit;
      .logo {
        flex: 1;
      }
    }
`;
