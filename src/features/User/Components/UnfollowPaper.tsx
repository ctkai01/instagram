import { Avatar } from '@components/common';
import { User } from '@models/User';
import { Skeleton } from '@mui/material';
import * as React from 'react';
import styled from 'styled-components';

export interface IUnfollowPaperProps {
    user?: User;
    handleCloseUnfollow: () => void;
    handleUnfollowUser: (idUser: number) => void;
}

export default function UnfollowPaper(props: IUnfollowPaperProps) {
    const { user, handleCloseUnfollow, handleUnfollowUser } = props;

    const [isBumpContent, setIsBumpContent] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (!isBumpContent) {
            setIsBumpContent(true);
        } else {
            const timer = setTimeout(() => {
                setIsBumpContent(false);
            }, 300);

            return () => {
                clearTimeout(timer);
            };
        }
    }, []);

    return (
        <Container className={isBumpContent ? 'bump' : ''}>
            <div className="avatar-container">
                {user ? (
                    <Avatar size="large-medium" border="none" url={user.avatar} />
                ) : (
                    <Skeleton variant="circular" height={150} width={150} />
                )}
            </div>
            <div className="text">{`Unfollow @${user ? user.user_name : ''}?`}</div>

            <div
                className="action-item red"
                onClick={() => {
                    // @ts-ignore: Object is possibly 'null'.

                    handleUnfollowUser(user.id);
                }}
            >
                Unfollow
            </div>
            <div className="action-item" onClick={handleCloseUnfollow}>
                Cancel
            </div>
        </Container>
    );
}

const Container = styled.div`
    width: 400px;
    border-radius: 10px;
    overflow: hidden;
    background: #fff;
    .avatar-container {
        padding: 32px 16px 16px;
        display: flex;
        justify-content: center;
    }

    .text {
        padding: 16px 32px;
        color: #262626;
        text-align: center;
        margin-bottom: 16px;
    }

    .action-item {
        min-height: 48px;
        color: #262626;
        font-weight: 600;
        user-select: none;
        display: flex;
        justify-content: center;
        align-items: center;
        border-top: 1px solid rgb(219, 219, 219);
        cursor: pointer;
        &.red {
            color: #ed4956;
        }

        &:active {
            background-color: #e0dfdf;
        }
    }

    &.bump {
        animation: bump 300ms ease-out;
    }
    @keyframes bump {
        0% {
            transform: scale(1);
        }
        10% {
            transform: scale(0.9);
        }
        30% {
            transform: scale(1.1);
        }
        50% {
            transform: scale(1.15);
        }
        100% {
            transform: scale(1);
        }
    }
`;
