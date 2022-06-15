import { Avatar, Button, TooltipHTML } from '@components/common';
import { TickIcon } from '@components/Icons';
import { PreviewProfile } from '@features/Home/Components/Sidebar/PreviewProfile';
import { User } from '@models/User';
import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export interface IInfoUserProps {
    user: User;
    index: number;
}

export default function InfoUser(props: IInfoUserProps) {
    const { user, index } = props;
    return (
        <Container>
            <div className="info-container">
                <TooltipHTML placement="bottom-start" content={<PreviewProfile key={`${index}@`}  user={user}/>}>
                    <Avatar
                        className="avatar"
                        size="small-medium"
                        // url="https://picsum.photos/200/300?random=3"
                        url={user.avatar}
                    />
                </TooltipHTML>

                <div className="info-name">
                    <TooltipHTML placement="bottom-start" content={<PreviewProfile key={`${index}@`} user={user}/>}>
                        <div className="user_name-container">
                            <Link className="user_name" to={`/${user.user_name}`}>
                                {user.user_name}
                            </Link>
                            <TickIcon />
                        </div>
                    </TooltipHTML>

                    <div className="name-user">{user.name}</div>
                </div>
            </div>
            {user.is_following ? (
                <Button style="border">Following</Button>
            ) : (
                <Button>Follower</Button>
            )}
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    padding: 8px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .user_name-container {
        display: flex;
        align-content: center;
    }

    .name-user {
        color: #8e8e8e;
    }

    .user_name {
        font-weight: 600;
        color: #262626;
        text-decoration: none;
        margin-right: 5px;

        &:hover {
            text-decoration: underline;
        }
    }

    .avatar {
        margin: 4px 13px 4px 4px;
    }
    .info-container {
        display: flex;
        align-items: center;
    }
`;
