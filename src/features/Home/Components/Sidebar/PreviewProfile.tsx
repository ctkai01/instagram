import { Avatar } from '@components/common';
import { Button } from '@material-ui/core';
import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export interface IPreviewProfileProps {}

export function PreviewProfile(props: IPreviewProfileProps) {
    return (
        <Container>
            <header>
                <Link to="username" className="avatar-user">
                    <Avatar url="https://picsum.photos/56/56?random=5" />
                </Link>
                <div className="name-wrapper">
                    <div className="username">
                        <Link to="username">ctkaino1</Link>
                    </div>
                    <div className="full-name">Nam Lại</div>
                </div>
            </header>
            <div className="info-statistical">
                <div className="item-statistical">
                    <div className="count">34</div>
                    <div className="title">posts</div>
                </div>
                <div className="item-statistical">
                    <div className="count">156</div>
                    <div className="title">followers</div>
                </div>
                <div className="item-statistical">
                    <div className="count">379</div>
                    <div className="title">following</div>
                </div>
            </div>
            <div className='post-photo-list'>
                <div className="post-photo-item">
                    <img src='https://picsum.photos/130/130?random=1' alt=''/>
                </div>
                <div className="post-photo-item">
                    <img src='https://picsum.photos/130/130?random=2' alt=''/>
                </div>
                <div className="post-photo-item">
                    <img src='https://picsum.photos/130/130?random=3' alt=''/>
                </div>
            </div>
            <div className="follow-wrapper">
                <Button className='follow-button'>
                    Follow
                </Button>
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

            &:hover img {
                opacity: 0.8;
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
