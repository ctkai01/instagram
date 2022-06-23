import { Api } from '@api/authApi';
import { User } from '@models/User';
import * as React from 'react';
import styled from 'styled-components';

export interface IHeaderSideBarProps {
    handleAddConversation: (user: User) => void;

}

export default function HeaderSideBar (props: IHeaderSideBarProps) {
    const { handleAddConversation } = props;
    const [user, setUser] = React.useState<User>()
    React.useEffect(() => {
        const fetchUser =  async () => {
            const user = await Api.getUserByUserName('ctkaino1')
            setUser(user.data)
        }
        fetchUser()
    }, [])
    console.log(user)
  return (
    <Container>
            <button onClick={() => {
                if (user) {
                    handleAddConversation(user)
                }
            }}>Add conversation</button>
       nma@2002
    </Container>
  );
}

const Container = styled.div`
 padding: 0 20px;
 display: flex;
 justify-content: center;
 align-items: center;
 height: 60px;
 border-bottom: 1px solid rgb(219, 219, 219);
 color: #262626;
 font-size: 16px;
 font-weight: 600;

`