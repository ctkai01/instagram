import LoadingWhite from '@components/common/LoadingWhite';
import { Conversation } from '@models/Conversation';
import { Message } from '@models/Message';
import { User } from '@models/User';
import * as React from 'react';
import styled from 'styled-components';
import MessageItem from './MessageItem';

export interface IMessageListProps {
    // messages: Message[];
    conversations: Conversation[];
    activeConversation: number;
    className?: string;
    authUser: User;
    loading: boolean;
    messageEnd: React.MutableRefObject<HTMLDivElement | null>;
    messageList: React.MutableRefObject<HTMLDivElement | null>;
    handleDeleteMessage: (message: Message) => void;

}

export default function MessageList(props: IMessageListProps) {
    const { conversations, activeConversation, loading, authUser, className, messageEnd, messageList, handleDeleteMessage } = props;
   
   const messages = conversations.find(conversation => conversation.id === activeConversation)?.messages
   console.log('Mess', loading)

    return (
        <Container  className={className} ref={(ref) => (messageList.current = ref)}>
            {loading && <div className='loading-wrapper'><LoadingWhite/></div>}
            {
                messages && (
                    messages.map((message, index) => (
                        <MessageItem
                            type={message.user.id === authUser.id ? 'me' : 'user'}
                            key={index}
                            handleDeleteMessage={handleDeleteMessage}
                            message={message}
                        />
                    ))
                )

            }

        
            <div
                className="last-message"
                style={{ height: '2px' }}
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
