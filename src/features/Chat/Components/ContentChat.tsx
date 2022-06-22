import { MessageIcon } from '@components/Icons';
import * as React from 'react';
import styled from 'styled-components';

export interface IContentChatProps {}

export default function ContentChat(props: IContentChatProps) {
    return (
        <Container>
            <div className="empty-user">
                <MessageIcon />
                <div className="text-message">Your Message</div>
                <div className="text-content">Message is empty.</div>
            </div>
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    height: 100%;
    border: 1px solid rgb(219, 219, 219);
    border-left: none;

    .empty-user {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        .text-message {
            color: #262626;
            font-size: 22px;
            font-weight: 600;
        }

        .text-content {
            font-size: 14px;
            color: #8e8e8e;
        }
    }
`;
