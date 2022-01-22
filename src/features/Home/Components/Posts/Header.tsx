import { Avatar } from '@components/common';
import * as React from 'react';
import styled from 'styled-components';
import { ActionPost } from './ActionPost';

export interface IHeaderProps {
    urlImage: string;
    userName: string;
}

export function Header(props: IHeaderProps) {
    const { urlImage, userName} = props
    return (
        <Container>
            <header> 
                <Avatar className='avatar-user' url={urlImage} size='small-medium'/> 
                <div className='username'>{userName}</div>
            </header>
            <ActionPost className='action-post'/>
        </Container>
    );
}

const Container = styled.div`
    z-index: 0;
    position: relative;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    border: 1px solid rgba(219, 219, 219, 1);
    border-bottom: none;

    header {
        display: flex;
        align-items: center;
        padding: 14px 4px 14px 16px;
        width: calc(100% - 54px);
        .username {
            margin-left: 14px;
            max-width: calc(100% - 54px);
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }
    }
`;
