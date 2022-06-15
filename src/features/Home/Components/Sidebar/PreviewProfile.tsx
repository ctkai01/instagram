import { Avatar } from '@components/common';
import { CameraIcon } from '@components/Icons';
import { Button } from '@material-ui/core';
import { User } from '@models/User';
import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export interface IPreviewProfileProps {
    user: User;
}

export function PreviewProfile(props: IPreviewProfileProps) {
    const { user } = props;

    return (
        <Container>
            <header>
                <Link to="username" className="avatar-user">
                    <Avatar url={user.avatar} />
                </Link>
                <div className="name-wrapper">
                    <div className="username">
                        <Link to={`/${user.user_name}`}>{user.user_name}</Link>
                    </div>
                    <div className="full-name">{user.name}</div>
                </div>
            </header>
            <div className="info-statistical">
                <div className="item-statistical">
                    <div className="count">{user.posts?.length}</div>
                    <div className="title">posts</div>
                </div>
                <div className="item-statistical">
                    <div className="count">{user.count_follower}</div>
                    <div className="title">followers</div>
                </div>
                <div className="item-statistical">
                    <div className="count">{user.count_following}</div>
                    <div className="title">following</div>
                </div>
            </div>
            <div className="post-photo-list">
                {user.posts?.length ? (
                    user.posts.map((post, index) => (
                        <div className="post-photo-item">
                            <img src={post.media[0].name} alt="" />
                        </div>
                    ))
                ) : (
                    <div className='none-post-container'>
                            <div className="camera-icon-container">
                                <CameraIcon/>
                            </div>
                            <div className="text-no-post">
                            No Posts Yet
                            </div>
                            <div className="remind-text">
                            {`When ${user.user_name} posts, you'll see their photos and videos here.`}
                            </div>
                    </div>
                )}
            </div>
            <div className="follow-wrapper">
                <Button className="follow-button">Follow</Button>
            </div>
        </Container>
    );
}

const Container = styled.div`
    width: 390px;
    margin-left: -9px;
    header {
        padding: 16px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid rgba(219, 219, 219, 1);
        z-index: 0;
        position: relative;

        .name-wrapper {
            margin-left: 16px;
        }
        .username {
            a {
                text-decoration: none;
                color: #262626;
                font-size: 14px;
            }
        }

        .full-name {
            color: #8e8e8e;
            font-size: 14px;
        }
    }

    .info-statistical {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px 0;
        border-bottom: 1px solid rgba(219,219,219,1);
        .item-statistical {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }

        .count {
            color: #262626;
            font-size: 14px;
        }

        .title {
            color: #8e8e8e;
            font-size: 14px;
        }
    }
    .post-photo-list {
        display: flex;
        .post-photo-item {
            height: 130px;
            cursor: pointer;

            img {
                height: 130px;
                width: 130px;
                object-fit: cover;
            }

            &:hover img {
                opacity: 0.8;
            }
        }

        .none-post-container {
            width: 100%;
            padding: 16px 8px;
            display: flex;
            flex-direction: column;
            align-items: center;

            .camera-icon-container {
                margin-bottom: 8px;
                width: 44px;
                height: 44px;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .text-no-post {
                color: rgb(38, 38, 38);
                font-size: 14px;
                font-weight: 600;
                margin-bottom: 8px;
            }

            .remind-text {
                color:  rgb(142, 142, 142);
                font-size: 12px;
            }
        }
    }

    .follow-wrapper {
        padding: 16px;
        .follow-button {
            background-color: #0095f6;
            height: 30px;
            color: #fff;
            width: 100%;
            text-transform: capitalize;
        }
    }
`;
