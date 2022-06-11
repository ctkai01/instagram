import { Avatar, Modal } from '@components/common';
import { ThereDotIcon, TickSmallIcon } from '@components/Icons';
import { Post } from '@models/Post';
import { Avatar as AvatarMui, AvatarGroup, Button, Tooltip } from '@mui/material';
import * as React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import ActionPostDetail from './ActionPostDetail';
import { ActionReactPost } from './ActionReactPost';
import CommentList from './CommentList';
import InputPost from './InputPost';
import PhotoListDetail from './PhotoListDetail';

export interface IPostContentModalProps {
    post: Post;
    index?: number;
}

const PostContentModal = React.forwardRef((props: IPostContentModalProps, refGallery: any) => {
    const { post, index } = props;
    const [showAction, setShowAction] = React.useState(false);

    const handleShowActionModal = () => {
        setShowAction(true);
    };

    const handleCloseActionModal = () => {
        setShowAction(false);
    };

    return (
        <>
            <Container
                ref={(el) => {
                    // @ts-ignore: Object is possibly 'null'.
                    refGallery.current[index] = el;
                }}
            >
                <div className="list-gallery">
                    <PhotoListDetail media={post.media} post={post} colorNextPre="white" />
                </div>
                <div className="content-wrapper">
                    <div className="header-wrapper">
                        <div className="header-content">
                            <Avatar
                                size="small-medium"
                                url="http://localhost:5000/uploads/posts/4b25b28a-953b-4ac6-aac9-35450d7f4fe4.png"
                            />
                            <div className="user_name">
                                ctkaino1
                                {true && <TickSmallIcon className="tick" />}
                            </div>
                            <div className="following-text-wrapper">
                                <span></span>
                                Following
                            </div>
                        </div>
                        <div className="action-wrapper" onClick={handleShowActionModal}>
                            <ThereDotIcon />
                        </div>
                    </div>
                    <div className="body-wrapper">
                        <div className="comment-wrapper">
                            {/* <div className="text-empty-comment-wrapper">
                                <h2 className="text-comment">No comments yet.</h2>
                                <div className="text">Start the conversation.</div>
                            </div> */}

                            <CommentList />
                        </div>
                        <div className="action-post-wrapper">
                            <ActionReactPost post={post} activeShowDetailPost={false} />
                        </div>
                        <div className="like-wrapper">
                            <div className="list-avatar">
                                <AvatarGroup max={3}>
                                    <AvatarMui
                                        sx={{ width: 20, height: 20 }}
                                        src="http://localhost:5000/uploads/posts/4b25b28a-953b-4ac6-aac9-35450d7f4fe4.png"
                                    />
                                    <AvatarMui
                                        sx={{ width: 20, height: 20 }}
                                        src="http://localhost:5000/uploads/posts/9f8f7b21-521d-42f7-a813-542a21e18c71.jpg"
                                    />
                                    <AvatarMui
                                        sx={{ width: 20, height: 20 }}
                                        src="http://localhost:5000/uploads/posts/9f8f7b21-521d-42f7-a813-542a21e18c71.jpg"
                                    />
                                </AvatarGroup>
                            </div>
                            <div className="text-like">Liked by may__lily and 31,612 others</div>
                        </div>
                        <div className="time-wrapper">14 HOURS AGO</div>
                        <div className="input-wrapper">
                            <InputPost />
                        </div>
                    </div>
                </div>
            </Container>
            <Modal
                content={<ActionPostDetail handleCloseActionModal={handleCloseActionModal} />}
                color="rgba(0, 0, 0, 0.65)"
                showModal={showAction}
                zIndexDepth="second"
                onCloseModal={handleCloseActionModal}
            />
            <GlobalStyle />
        </>
    );
});
export default PostContentModal;
const GlobalStyle = createGlobalStyle`
  body {
      overflow: hidden !important;
  }
`;

const Container = styled.div`
    width: 1248px;
    height: 931px;
    display: flex;
    position: relative;
    z-index: 9999999;
    .list-gallery {
        width: 59%;
        height: 100%;
    }

    .input-wrapper {
        margin-top: 14px;
        order: 6;
    }

    .action-post-wrapper {
        order: 3;
        border-top: 1px solid rgb(239, 239, 239);
    }

    .time-wrapper {
        order: 5;
        padding-left: 16px;
        letter-spacing: 0.2px;
        font-size: 10px;
        color: rgb(142, 142, 142);
    }

    .like-wrapper {
        display: flex;
        padding: 0 16px;
        margin-bottom: 8px;
        order: 4;
        .list-avatar {
            display: flex;
        }
    }

    .content-wrapper {
        width: 41%;
        height: 100%;
        background-color: #fff;
        overflow: hidden;
        border-radius: 0 4px 4px 0;
        .header-wrapper {
            display: flex;
            border-bottom: 1px solid rgb(239, 239, 239);
        }

        .header-content {
            display: flex;
            align-items: center;
            padding: 10px 4px 10px 16px;
            flex: 1;
            .user_name {
                margin-left: 14px;
                font-weight: 600;
                color: #262626;
                display: flex;
                align-items: center;
            }

            .tick {
                margin-left: 4px;
            }
        }

        .action-wrapper {
            padding: 8px;
            display: flex;
            align-items: center;
            cursor: pointer;
        }

        .following-text-wrapper {
            color: #262626;
            font-weight: 600;
            display: flex;
            align-items: center;
            span {
                display: inline-block;
                margin: 0 4px;
                font-weight: 600;
                width: 4px;
                height: 4px;
                border-radius: 50%;
                background-color: #000;
            }
        }

        .body-wrapper {
            height: calc(100% - 63px);
            flex-grow: 1;
            flex-shrink: 0;
            display: flex;
            flex-direction: column;
            .comment-wrapper {
                flex-grow: 1;
                flex-shrink: 1;
                order: 1;
                padding: 16px;
                height: calc(100% - 32px);
                overflow-y: scroll;

                &::-webkit-scrollbar {
                    display: none;
                }
            }

            .text-empty-comment-wrapper {
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                height: 100%;
                .text-comment {
                }

                .text {
                }
            }
        }
    }
`;
