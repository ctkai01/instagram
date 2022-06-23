import { Grid } from '@mui/material';
import * as React from 'react';
import styled from 'styled-components';
import ContentChat from '../Components/ContentChat';
import SideBarMessage from '../Components/SideBarMessage';
// import socketIOClient from "socket.io-client";
import { io, Socket } from 'socket.io-client';
import { lsTokenAuth } from '@utils/storage';
import { User } from '@models/User';
import { Conversation } from '@models/Conversation';
import { useAppSelector } from '@redux/hooks';
import { selectUserAuth } from '@features/Auth/authSlice';
import { Message } from '@models/Message';

const host = 'http://localhost:5000';

export interface IMainMessageProps {}

export default function MainMessage(props: IMainMessageProps) {
    const socketRef = React.useRef<Socket>();
    const [conversations, setConversations] = React.useState<Conversation[]>([]);
    const [messages, setMessages] = React.useState<Message[]>([]);
    const [loading, setLoading] = React.useState<boolean>(false);
    const messageEnd = React.useRef<HTMLDivElement>(null);
    const [activeConversation, setActiveConversation] = React.useState<number>(-1);
    React.useEffect(() => {
        socketRef.current = io(host, {
            extraHeaders: {
                Authorization: lsTokenAuth.getItem(),
            },
        });
        socketRef.current.on('conversations', (dataGot) => {
            setConversations(dataGot);
            // console.log('Fuck you',dataGot)
            // setMess(oldMsgs => [...oldMsgs, dataGot])
            // scrollToBottom()
        });
        socketRef.current.on('newMessage', (messageNew: Message) => {
            setMessages((messages) => [...messages, messageNew]);
            scrollToBottom();
            
            console.log('New Messagge', messageNew);
            // setMess(oldMsgs => [...oldMsgs, dataGot])
            // scrollToBottom()
        });

        socketRef.current.on('messages', (messages: Message[]) => {
            setMessages(messages);
            // console.log(' Messagge',dataGot)
            // setMess(oldMsgs => [...oldMsgs, dataGot])
            // scrollToBottom()
            setLoading(false);
            scrollToBottom();
        });

        return () => {
            if (socketRef.current) {
                socketRef?.current.disconnect();
            }
        };
    }, []);
    const authUser = useAppSelector(selectUserAuth);
    const handleSubmitMessage = (text: string) => {
        // socketRef.current?.emit('createConversation', user)
        socketRef.current?.emit('sendMessage', {
            message: text,
            user: authUser,
            conversation: conversations.find(
                (conversation) => conversation.id === activeConversation
            ),
        });
    };

    const handleChangeActiveConversation = (idConversation: number) => {
        setActiveConversation(idConversation);
        setLoading(true);
        socketRef.current?.emit(
            'joinConversation',
            conversations.find((conversation) => conversation.id === idConversation)?.users[0].id
        );
    };
    console.log(messageEnd);
    console.log(conversations);
    const scrollToBottom = () => {
        if (messageEnd.current) {
            messageEnd.current.scrollIntoView({ behavior: 'smooth' });
        }
    };
    return (
        <Container
            container
            // justifyContent={!checkShowSuggestion ? 'space-between' : 'center'}
            style={{ paddingTop: '30px', borderRadius: '6px' }}
        >
            <Grid item lg={4}>
                <SideBarMessage
                    authUser={authUser}
                    activeConversation={activeConversation}
                    conversations={conversations}
                    handleChangeActiveConversation={handleChangeActiveConversation}
                />
            </Grid>
            <Grid item lg={8}>
                <ContentChat
                    loading={loading}
                    authUser={authUser}
                    messageEnd={messageEnd}
                    handleSubmitMessage={handleSubmitMessage}
                    messages={messages}
                    activeConversation={activeConversation}
                    conversations={conversations}
                />
            </Grid>
        </Container>
    );
}

const Container = styled(Grid)`
    border-radius: 6px;
    background-color: #fff;
`;
