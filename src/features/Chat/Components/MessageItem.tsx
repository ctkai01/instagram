import { Avatar } from '@components/common';
import { Message } from '@models/Message';
import * as React from 'react';
import styled from 'styled-components';

export interface IMessageItemProps {
    message: Message;
    type: 'user' | 'me';
}

export default function MessageItem(props: IMessageItemProps) {
    const { message, type } = props;
    return (
        <Container>
            {type === 'user' && (
                <div className="part-user">
                    <Avatar
                        className="avatar"
                        url={message.user.avatar}
                        size="small"
                        border="none"
                    />
                    <div className="content">{message.message}</div>
                </div>
            )}
            {type === 'me' && (
                <div className="part-me">
                    <div className="content">{message.message}</div>
                </div>
            )}
        </Container>
    );
}

const Container = styled.div`
    border-radius: 10px;
    width: 100%;

    .part-user {
        width: 100%;
        display: flex;
        align-items: end;
        .avatar {
            margin: 0 8px 8px 0;
        }

        .content {
            padding: 16px;
            flex: inherit;
            background-color: #fff;
            /* background-color: rgb(239, 239, 239); */
            max-width: 236px;
            border: 1px solid rgb(239, 239, 239);
            border-radius: 22px;
            margin-bottom: 8px;
        }
    }

    .part-me {
        width: 100%;
        justify-content: end;
        display: flex;
        .content {
            margin-bottom: 8px;
            border-radius: 22px;
            flex: inherit;
            padding: 16px;
            background-color: rgb(239, 239, 239);
            width: fit-content;

            max-width: 236px;
        }
    }
`;
