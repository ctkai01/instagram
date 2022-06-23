import LoadingWhite from '@components/common/LoadingWhite';
import { Message } from '@models/Message';
import { User } from '@models/User';
import * as React from 'react';
import styled from 'styled-components';
import MessageItem from './MessageItem';

export interface IMessageListProps {
    messages: Message[];
    className?: string;
    authUser: User;
    loading: boolean;
    messageEnd: React.MutableRefObject<HTMLDivElement | null>;
}

export default function MessageList(props: IMessageListProps) {
    const { messages, loading, authUser, className, messageEnd } = props;
    return (
        <Container className={className}>
            {loading && <div className='loading-wrapper'><LoadingWhite/></div>}

            {messages.map((message, index) => (
                <MessageItem
                    type={message.user.id === authUser.id ? 'me' : 'user'}
                    key={index}
                    message={message}
                />
            ))}
            <div
                className="last-message"
                style={{ float: 'left', clear: 'both' }}
                ref={(ref) => (messageEnd.current = ref)}
            ></div>
        </Container>
    );
}

const Container = styled.div`
    padding: 20px 20px 0;

    .loading-wrapper {
        height: 1000px;
        /* display: flex; */
    }
`;
