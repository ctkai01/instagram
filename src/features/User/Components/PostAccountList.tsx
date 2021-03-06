import { Modal } from '@components/common';
import { CameraIcon, CommentIcon, GalleryFull, HeartIcon } from '@components/Icons';
import { MediaType } from '@models/commom';
import { Post } from '@models/Post';
import { User } from '@models/User';
import { Skeleton } from '@mui/material';
import * as React from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import GalleryPost from './GalleryPost';

export interface IPostAccountListProps {
    posts?: Post[];
    loadingFetchUser: boolean;
    handleActionPostProfile: (postChange: Post) => void;
    handleFollowUserPostProfile: (post: Post, userChange: User) => void;
}

export default function PostAccountList(props: IPostAccountListProps) {
    const { posts, loadingFetchUser, handleFollowUserPostProfile, handleActionPostProfile } = props;

    const [showGalleryPost, setShowGalleryPost] = React.useState(false);
    const [currentIndexShow, setCurrentIndexShow] = React.useState(-1);

    const handleClickPostItem = (id: number, index: number) => {
        // window.history.pushState(null, '', `/post/${id}`);
        setCurrentIndexShow(index);

        setShowGalleryPost(true);
    };

    const handleCLoseGalleryPost = () => {
        setShowGalleryPost(false);
    };

    const changeCurrentIndexShow = (index: number) => {
        setCurrentIndexShow(index);
    };
    console.log('Post', posts);
    return (
        <Container>
            {loadingFetchUser ? (
                <div style={{ display: 'flex', gap: '35px' }}>
                    <Skeleton width={300} height={300} />
                    <Skeleton width={300} height={300} />
                    <Skeleton width={300} height={300} />
                </div>
            ) : !!posts?.length ? (
                posts.map((post, index) => (
                    <div className="item-post" key={index}>
                        <div
                            className="link-redirect"
                            onClick={() => handleClickPostItem(post.id, index)}
                        >
                            <img
                                src={
                                    post.media[0].type === MediaType.image
                                        ? post.media[0].name
                                        : post.media[0].cover_name
                                }
                                alt=""
                                className="img"
                            />
                            <div className="icon-container">
                                <GalleryFull />
                            </div>
                            <div className="modal-container">
                                <div className="count-container">
                                    <div className="icon-item">
                                        <HeartIcon className="icon" color="white" />
                                        <div className="count">{post.like_count}</div>
                                    </div>
                                    <div className="icon-item">
                                        <CommentIcon className="icon" color="white" />
                                        <div className="count">{post.comment_count}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="none-post-container">
                    <div className="camera-icon-container">
                        <CameraIcon />
                    </div>
                    <div className="text-no-post">No Posts Yet</div>
                </div>
            )}

            <Modal
                closeButton
                content={
                    <GalleryPost
                        handleFollowUserPostProfile={handleFollowUserPostProfile}
                        currentIndexShow={currentIndexShow}
                        posts={posts}
                        handleActionPostProfile={handleActionPostProfile}
                        changeCurrentIndexShow={changeCurrentIndexShow}
                    />
                }
                color="rgba(0, 0, 0, 0.65)"
                showModal={showGalleryPost}
                onCloseModal={handleCLoseGalleryPost}
            />
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 35px;

    .item-post {
        /* margin: 30px; */
        /* flex: 1 0 0%; */
        width: 300px;
        height: 300px;
        /* height: 293px; */
        /* margin-right: 28px; */
        position: relative;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .modal-container {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        pointer-events: none;
        display: none;
        background-color: rgba(0, 0, 0, 0.3);

        .count-container {
            display: flex;
        }

        .icon-item {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 10px;

            .icon {
                margin-right: 6px;
            }

            .count {
                color: #fff;
                font-weight: 600;
                font-size: 16px;
            }
        }
    }

    .icon-container {
        position: absolute;
        right: 8px;
        top: 8px;
        pointer-events: none;
    }

    .link-redirect {
        width: 100%;
        height: 100%;
        cursor: pointer;
    }

    .link-redirect:hover .modal-container {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .none-post-container {
        width: 100%;
        padding: 130px 8px;
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
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 8px;
        }
    }
`;
