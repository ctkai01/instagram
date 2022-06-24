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
import { useParams } from 'react-router-dom';
import { Api } from '@api/authApi';

const host = 'http://localhost:5000';
interface Params {
    user_name: string;
}
export interface IMainMessageProps {}

export default function MainMessage(props: IMainMessageProps) {

    const socketRef = React.useRef<Socket>();
    const [conversations, setConversations] = React.useState<Conversation[]>([]);
    // const [messages, setMessages] = React.useState<Message[]>([]);
    const [loading, setLoading] = React.useState<boolean>(false);
    const messageEnd = React.useRef<HTMLDivElement>(null);
    const messageList = React.useRef<HTMLDivElement>(null);
    const [activeConversation, setActiveConversation] = React.useState<number>(-1);
    const [foundUser, setFoundUser] = React.useState<boolean>(true);
    const [user, setUser] = React.useState<User>();

    let { user_name } = useParams<Params>();

    React.useEffect(() => {
        const fetchUser = async () => {
            try {
                const responseUser= await Api.getUserByUserName(user_name)
                  
                // console.log(responseUser);
                setUser(responseUser.data);

                setFoundUser(true);
                // const userList =
            } catch (err) {
                console.log(err);
                setFoundUser(false);
            }
        };

        if (user_name) {
            fetchUser()
        }

    }, [user_name])

    React.useEffect(() => {
        socketRef.current = io(host, {
            extraHeaders: {
                Authorization: lsTokenAuth.getItem(),
            },
        });
        socketRef.current.on('conversations', (conversationsFetch: Conversation[]) => {
            console.log(conversationsFetch)
            const conversationExist = conversationsFetch.find(conversation => conversation.users[0].user_name === user_name)
            if (conversationExist) {
                console.log('VLLLLL')
                setActiveConversation(conversationExist.id)
            }
            setConversations(conversationsFetch);
            // scrollToBottom()
        });
        socketRef.current.on('newMessage', (messageNew: Message) => {
            console.log('FUCKKKKKKKKK')
            setConversations(conversation => {
                const conversationClone = [...conversation]
                let checkConversation
                if (messageNew.conversation) {
                    checkConversation = conversationClone.find(conversation => conversation.id === messageNew.conversation?.id)

                }
                console.log('Active', activeConversation)
                if (checkConversation) {
                    const messageClone = [...checkConversation.messages]
                    console.log('Before', messageClone)
                    messageClone.push(messageNew)
                    console.log('After', messageClone)

                    // checkConversation.messages = messageClone
                    console.log(checkConversation.messages)
                    conversationClone[conversationClone.findIndex(conversation => conversation.id === messageNew.conversation?.id)].messages = messageClone
                    console.log('HA', conversationClone[conversationClone.findIndex(conversation => conversation.id === messageNew.conversation?.id)].messages)
                  
                    return conversationClone
                } else {
                    return conversationClone
                }

            })

            // setMessages((messages) => [...messages, messageNew]);
            scrollToBottom();

            console.log('New Messagge', messageNew);
        });

        socketRef.current.on('messages', (messages: Message[]) => {
            // setMessages(messages);
            scrollToBottom()
            setLoading(false);
        });

        socketRef.current.on('deletedMessage', (idDeletedMessage: number) => {
            // setMessages((messages) => {
            //     return messages.filter((message) => message.id !== idDeletedMessage);
            // });
            setConversations(conversation => {
                const conversationClone = [...conversation]
                const checkConversation = conversationClone.find(conversation => conversation.id === idDeletedMessage)
                if (checkConversation) {
                    const messageClone = [...checkConversation.messages].filter(message => message.id !== idDeletedMessage)
                    checkConversation.messages = messageClone

                    conversationClone[conversationClone.findIndex(conversation => conversation.id === idDeletedMessage)] = checkConversation
                    return conversationClone
                } else {
                    return conversationClone
                }

            })
          
        });

        return () => {
            if (socketRef.current) {
                socketRef?.current.disconnect();
            }
        };
    }, []);

    // React.useEffect(() => {
    //     scrollToBottom();
    // }, [messages]);

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

    const handleSendImage = (base64: string) => {
        socketRef.current?.emit('sendMessage', {
            image: base64,
            user: authUser,
            conversation: conversations.find(
                (conversation) => conversation.id === activeConversation
            ),
        });
    };
    console.log('ACTIVE SS', activeConversation)
    const handleChangeActiveConversation = (idConversation: number) => {
        setActiveConversation(idConversation);
        console.log(222)
        setLoading(true);
        socketRef.current?.emit(
            'joinConversation',
            conversations.find((conversation) => conversation.id === idConversation)?.users[0].id
        );
    };

    const handleDeleteMessage = (message: Message) => {
        message['conversation'] = conversations.find(
            (conversation) => conversation.id === activeConversation
        )
        socketRef.current?.emit('deleteMessage', message);
    };

    console.log(conversations);
    const scrollToBottom = () => {
        // if (messageEnd.current) {
        //     console.log(messageEnd)
        //     messageEnd.current.scrollIntoView({ behavior: 'smooth' });
        // }

        if (messageList.current) {
            console.log(messageList);
            // messageList.current.scrollTop = messageList.current.scrollHeight;
            // messageList.current.scrollTop = messageList.current.scrollHeight;
            // while ()

            messageList.current.scrollTo({
                top: messageList.current.scrollHeight,
                behavior: 'smooth',
            });

            // messageList.current.scrollTo({
            //     top: 729,
            //     behavior: 'smooth',
            // })


            // messageList.current.scrollTo({
            //     top: messageList.current.scrollHeight,
            //     behavior: 'smooth'
            // })
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
                    handleDeleteMessage={handleDeleteMessage}
                    handleSendImage={handleSendImage}
                    loading={loading}
                    authUser={authUser}
                    messageEnd={messageEnd}
                    messageList={messageList}
                    handleSubmitMessage={handleSubmitMessage}
                    // messages={messages}
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
