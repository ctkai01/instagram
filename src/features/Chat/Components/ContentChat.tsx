import { Avatar } from '@components/common';
import { MessageIcon } from '@components/Icons';
import { Conversation } from '@models/Conversation';
import { Message } from '@models/Message';
import { User } from '@models/User';
import { PATH_MESSAGE_LIST } from '@routes/index';
import * as React from 'react';
import { useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import HeaderContent from './HeaderContent';
import InputChat from './InputChat';
import MessageItem from './MessageItem';
import MessageList from './MessageList';

export interface IContentChatProps {
    conversations: Conversation[];
    activeConversation: number;
    // messages: Message[];
    authUser: User;
    loading: boolean;
    messageEnd: React.MutableRefObject<HTMLDivElement | null>;
    messageList: React.MutableRefObject<HTMLDivElement | null>;
    isDetail: boolean;
    handleSubmitMessage: (text: string) => void;
    handleSendImage: (base64: string) => void;
    handleDeleteMessage: (message: Message) => void;
    handleShowDetail: () => void;
    handleCloseDetail: () => void;
}

export default function ContentChat(props: IContentChatProps) {
    const {
        conversations,
        loading,
        messageEnd,
        messageList,
        authUser,
        activeConversation,
        // messages,
        isDetail,
        handleSubmitMessage,
        handleSendImage,
        handleDeleteMessage,
        handleShowDetail, 
        handleCloseDetail
    } = props;

    const matchMeMessage = useRouteMatch(PATH_MESSAGE_LIST);

    const user = conversations.find((conversation) => conversation.id === activeConversation)
        ?.users[0];
    if (matchMeMessage) {
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

   
    return (
        <Wrapper>
            <HeaderContent
                isDetail={isDetail}
                user={user}
                handleShowDetail={handleShowDetail}
                handleCloseDetail={handleCloseDetail}
            />
            {isDetail ? (
                <div className="member-wrapper">
                    <div className="title">Members</div>
                    <div className="info-member">
                        <Avatar
                            border="none"
                            className="avatar-member"
                            url={user ? user.avatar : ''}
                            size="medium"
                        />
                        <div className="info-name">
                            <div className="user-name">{user?.user_name}</div>
                            <div className="name">{user?.name}</div>
                        </div>
                    </div>
                    <div className="action-chat">
                        <div className="action-item">Delete Chat</div>
                        <div className="action-item">Block</div>
                    </div>
                </div>
            ) : (
                <div className="content">
                    <MessageList
                        handleDeleteMessage={handleDeleteMessage}
                        loading={loading}
                        messageEnd={messageEnd}
                        messageList={messageList}
                        authUser={authUser}
                        conversations={conversations}
                        activeConversation={activeConversation}
                        className='message-list'
                        // messages={messages}
                    />
                    <InputChat
                        handleSendImage={handleSendImage}
                        handleSubmitMessage={handleSubmitMessage}
                        className="input-chat"
                    />
                </div>
            )}
        </Wrapper>
    );
}

const Wrapper = styled.div`
    width: 100%;
    border: 1px solid rgb(219, 219, 219);
    border-left: none;
    height: 860px;

    .action-chat {
        border-bottom: 1px solid rgb(219, 219, 219);

        .action-item {
            padding: 16px;
            cursor: pointer;
            color: rgb(237, 73, 86);
            font-size: 14px;

            &:active {
                opacity: 0.5;
            }
        }
    }

    .member-wrapper {
        padding: 16px 0;

        .info-member {
            padding: 8px 16px;
            display: flex;
            align-items: center;

            border-bottom: 1px solid rgb(219, 219, 219);
            .user-name {
                color: #262626;
                font-size: 14px;
                font-weight: 600;
            }

            .name {
                color: #8e8e8e;
                font-size: 14px;
            }
        }

        .avatar-member {
            margin-right: 12px;
        }

        .title {
            padding: 8px 16px;
            color: #262626;
            font-size: 16px;
            font-weight: 700;
        }
    }

    .content {
        flex-grow: 1;
        flex-shrink: 0;
        display: flex;
        flex-direction: column;
        min-height: calc(100% - 64px);
        max-height: calc(100% - 64px);
    }

    .message-list {
        /* max-height: calc(100% - 32px); */
        flex-grow: 1;
        flex-shrink: 1;
        /* order: 1; */
        overflow: hidden;
        overflow-y: scroll;
    }



    .input-chat {
        /* flex: 0 0 auto; */
    }
`;
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
