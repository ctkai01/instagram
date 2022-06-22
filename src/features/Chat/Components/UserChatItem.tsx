import { Avatar } from '@components/common';
import * as React from 'react';
import styled from 'styled-components';

export interface IUserChatItemProps {}

export default function UserChatItem(props: IUserChatItemProps) {
    return (
        <Container>
            <Avatar
                className="avatar"
                size="medium"
                url="https://vtv1.mediacdn.vn/thumb_w/640/2018/11/29/photo-1-154348431990377584420.jpg"
            />
            <div className="info-container">
                <div className="name">Tran Manh Hung</div>
                <div className="comment_lasted">My english is a bit poor</div>
            </div>
        </Container>
    );
}

const Container = styled.div`
    padding: 8px 12px;
    display: flex;
    align-items: center;
    cursor: pointer;
    
      .avatar {
        margin-right: 10px;
    }

    .name {
        color: #262626;
    }

    .comment_lasted {
        color: #8e8e8e;
    }
`;
