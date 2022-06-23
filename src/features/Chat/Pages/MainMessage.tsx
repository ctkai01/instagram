import { Grid } from '@mui/material';
import * as React from 'react';
import styled from 'styled-components';
import ContentChat from '../Components/ContentChat';
import SideBarMessage from '../Components/SideBarMessage';
// import socketIOClient from "socket.io-client";
import { io, Socket } from "socket.io-client";
import { lsTokenAuth } from '@utils/storage';
import { User } from '@models/User';
import { Conversation } from '@models/Conversation';
import { useAppSelector } from '@redux/hooks';
import { selectUserAuth } from '@features/Auth/authSlice';

const host = "http://localhost:5000";

export interface IMainMessageProps {}

export default function MainMessage(props: IMainMessageProps) {
  const socketRef = React.useRef<Socket>();
  const [conversations, setConversations] = React.useState<Conversation[]>([])
    React.useEffect(() => {
      socketRef.current = io(host, {
       extraHeaders: {
        Authorization:  lsTokenAuth.getItem()
       }
      });
      socketRef.current.on('conversations', dataGot => {
        setConversations(dataGot)
        // console.log('Fuck you',dataGot)
        // setMess(oldMsgs => [...oldMsgs, dataGot])
        // scrollToBottom()
      })
      socketRef.current.on('newMessage', dataGot => {
        console.log('New Messagge',dataGot)
        // setMess(oldMsgs => [...oldMsgs, dataGot])
        // scrollToBottom()
      })

      socketRef.current.on('messages', dataGot => {
        console.log(' Messagge',dataGot)
        // setMess(oldMsgs => [...oldMsgs, dataGot])
        // scrollToBottom()
      })
    }, [])
    const authUser = useAppSelector(selectUserAuth)
    const handleAddConversation = (user: User) => {
      // socketRef.current?.emit('createConversation', user)
      // socketRef.current?.emit('joinConversation', 1 )
      socketRef.current?.emit('sendMessage', {
        message: 'Hello NaN',
        user: authUser,
        conversation: conversations[0]
      })
      
    }

    console.log(conversations)
    return (
        <Container
            container
            // justifyContent={!checkShowSuggestion ? 'space-between' : 'center'}
            style={{ paddingTop: '30px', borderRadius: '6px' }}
        >   
            <Grid item lg={4}>
                <SideBarMessage conversations={conversations} handleAddConversation={handleAddConversation}/>
            </Grid>
            <Grid item lg={8}>
                <ContentChat/>
            </Grid>
        </Container>
    );
}

const Container = styled(Grid)`
  border-radius: 6px;

`