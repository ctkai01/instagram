import { Avatar, Modal } from '@components/common';
import LoadingWhite from '@components/common/LoadingWhite';
import { ThereDotIcon, TickSmallIcon } from '@components/Icons';
import { Status } from '@constants/status';
import { TypeFollow } from '@constants/type-follow';
import { selectUserAuth } from '@features/Auth/authSlice';
import UnfollowPaper from '@features/User/Components/UnfollowPaper';
import { useFollow } from '@hooks/useFollow';
import { Comment } from '@models/Comment';
import { Post } from '@models/Post';
import { ViewStory } from '@models/Story';
import { User } from '@models/User';
import { Avatar as AvatarMui, AvatarGroup, Button, Tooltip } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { convertISOTime, convertTime } from '@utils/time';
import { userInfo } from 'os';
import * as React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import ActionPostDetail from './ActionPostDetail';
import { ActionReactDetailPost } from './ActionReactDetailPost';
import { ActionReactPost } from './ActionReactPost';
import CommentList from './CommentList';
import InputPost from './InputPost';
import PhotoListDetail from './PhotoListDetail';
import { CommentPost } from './PostItem';

export interface IPostContentModalProps {
    loadingUnLikePost: boolean;
    loadingLikePost: boolean;
    isLike: Status;
    post: Post;
    dataComment: CommentPost;
    isLoadingComment: boolean;
    fetchLikePost: (idPost: number) => Promise<void>;
    fetchUnLikePost: (idPost: number) => Promise<void>;
    handleChangeIsLike: (type: Status) => void;
    handleFollowUserPost: (post: Post, userChange: User) => void;
    handleChangeDataComment: (commentChange: Comment) => void;
    handlePostComment: (content: string, parentId?: number) => Promise<void>;
    handleDeleteCommentPost: (isComment: number, idParentComment: number | null) => Promise<void>;
}

export interface ReplyInput {
    text: string;
    status: boolean;
    parentIdComment: number;
}

const PostContentModal = (props: IPostContentModalProps) => {
    const {
        post,
        loadingUnLikePost,
        isLike,
        loadingLikePost,
        dataComment,
        isLoadingComment,
        handleDeleteCommentPost,
        handlePostComment,
        handleChangeDataComment,
        handleFollowUserPost,
        handleChangeIsLike,
        fetchLikePost,
        fetchUnLikePost,
    } = props;
    const [showAction, setShowAction] = React.useState(false);

    const [dataUnfollow, loadingUnfollow, fetchUnFollowUser] = useFollow({
        type: TypeFollow.UNFOLLOW,
    });

    const [dataFollow, loadingFollow, fetchFollowUser] = useFollow({
        type: TypeFollow.FOLLOW,
    });

    const [showUnfollow, setShowUnfollow] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (dataFollow) {
            handleFollowUserPost(post, dataFollow);
        }
    }, [dataFollow]);

    const [statusReply, setStatusReply] = React.useState<ReplyInput>({
        status: false,
        text: '',
        parentIdComment: 0,
    });

    const userAuth = useAppSelector(selectUserAuth);

    React.useEffect(() => {
        if (dataUnfollow) {
            handleFollowUserPost(post, dataUnfollow);
        }
    }, [dataUnfollow]);

    const countLike = post.like_count;
    const handleShowActionModal = () => {
        setShowAction(true);
    };

    const handleCloseActionModal = () => {
        setShowAction(false);
    };

    const handleUnfollowUser = async (idUser: number) => {
        handleCloseUnfollow();
        await fetchUnFollowUser(idUser);
    };

    const handleCloseUnfollow = () => {
        setShowUnfollow(false);
        setShowAction(false);
    };

    const handleDefaultStatusReply = () => {
        setStatusReply({
            status: false,
            text: '',
            parentIdComment: 0,
        });
    };

    const handleFollowUser = async (user: User) => {
        await fetchFollowUser(user.id);
    };

    const handleShowUnfollow = () => {
        setShowUnfollow(true);
    };

    const timeCreated = convertISOTime(post.created_at);
    const { format, fromNow } = convertTime(post.created_at, 7);

    const handleReplyComment = (userName: string, idCommentParent: number) => {
        setStatusReply({
            status: true,
            text: `@${userName} `,
            parentIdComment: idCommentParent,
        });
    };

    return (
        <>
            <Container>
                <div className="list-gallery">
                    <PhotoListDetail media={post.media} post={post} colorNextPre="white" />
                </div>
                <div className="content-wrapper">
                    <div className="header-wrapper">
                        <div className="header-content">
                            {post.created_by.view_all_story === ViewStory.NONE ? (
                                <>
                                    <Link to={`/${post.created_by.user_name}`}>
                                        <Avatar
                                            border="none"
                                            size="small-medium"
                                            url={post.created_by.avatar}
                                        />
                                    </Link>
                                    <div className="user_name_wrapper">
                                        <Link
                                            className="user_name"
                                            to={`/${post.created_by.user_name}`}
                                        >
                                            {post.created_by.user_name}
                                        </Link>

                                        {!!post.created_by.is_tick && (
                                            <TickSmallIcon className="tick" />
                                        )}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <Link to={`/stories/${userAuth.user_name}`}>
                                        <Avatar
                                            border={`${
                                                post.created_by.view_all_story === ViewStory.SEE
                                                    ? 'watch'
                                                    : 'watched'
                                            }`}
                                            size="small-medium"
                                            url={post.created_by.avatar}
                                        />
                                    </Link>
                                    <div className="user_name_wrapper">
                                        <Link
                                            className="user_name"
                                            to={`/${post.created_by.user_name}`}
                                        >
                                            {post.created_by.user_name}
                                        </Link>

                                        {!!post.created_by.is_tick && (
                                            <TickSmallIcon className="tick" />
                                        )}
                                    </div>
                                </>
                            )}

                            {userAuth.id !== post.created_by.id && (
                                <div className="following-text-wrapper">
                                    <span></span>
                                    {post.created_by.is_following ? (
                                        <div>
                                            {loadingUnfollow ? <LoadingWhite /> : 'Following'}
                                        </div>
                                    ) : (
                                        <div
                                            onClick={() => handleFollowUser(post.created_by)}
                                            style={{ cursor: 'pointer', color: '#0095f6' }}
                                        >
                                            {loadingFollow ? <LoadingWhite /> : 'Follow'}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                        <div className="action-wrapper" onClick={handleShowActionModal}>
                            <ThereDotIcon />
                        </div>
                    </div>
                    <div className="body-wrapper">
                        <div className="comment-wrapper">
                            {Boolean(!dataComment.lastPage) && isLoadingComment ? (
                                <LoadingWhite />
                            ) : !dataComment.data.length ? (
                                <div className="text-empty-comment-wrapper">
                                    <h2 className="text-comment">No comments yet.</h2>
                                    <div className="text">Start the conversation.</div>
                                </div>
                            ) : (
                                <CommentList
                                    isLoadingComment={isLoadingComment}
                                    dataComment={dataComment}
                                    handleDeleteCommentPost={handleDeleteCommentPost}
                                    handleChangeDataComment={handleChangeDataComment}
                                    handleReplyComment={handleReplyComment}
                                />
                            )}
                        </div>
                        <div className="action-post-wrapper">
                            <ActionReactDetailPost
                                handleChangeIsLike={handleChangeIsLike}
                                fetchUnLikePost={fetchUnLikePost}
                                fetchLikePost={fetchLikePost}
                                isLike={isLike}
                                loadingLikePost={loadingLikePost}
                                loadingUnLikePost={loadingUnLikePost}
                                post={post}
                            />
                        </div>
                        <div className="like-wrapper">
                            {/* <div className="list-avatar">
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
                            </div> */}
                            {/* <div className='text-like'> */}
                            {!!(loadingUnLikePost || loadingLikePost
                                ? loadingUnLikePost
                                    ? countLike - 1
                                    : countLike + 1
                                : countLike) && (
                                <div className="text-like">
                                    {loadingUnLikePost || loadingLikePost
                                        ? loadingUnLikePost
                                            ? `${countLike - 1} ${
                                                  countLike - 1 > 0 ? 'likes' : 'like'
                                              }`
                                            : `${countLike + 1} ${
                                                  countLike + 1 > 0 ? 'likes' : 'like'
                                              }`
                                        : `${countLike} ${countLike > 0 ? 'likes' : 'like'}`}
                                    {/* {countLike} likes */}
                                </div>
                            )}
                            {/* </div> */}
                            {/* <div className="text-like">Liked by may__lily and 31,612 others</div> */}
                        </div>
                        <div className="time-wrapper">
                            <Moment format={format} fromNow={fromNow}>
                                {timeCreated}
                            </Moment>
                        </div>
                        <div className="input-wrapper">
                            <InputPost
                                handleDefaultStatusReply={handleDefaultStatusReply}
                                statusReply={statusReply}
                                handlePostComment={handlePostComment}
                            />
                        </div>
                    </div>
                </div>
            </Container>
            <Modal
                content={
                    <ActionPostDetail
                        userCreate={post.created_by}
                        handleShowUnfollow={handleShowUnfollow}
                        handleCloseActionModal={handleCloseActionModal}
                    />
                }
                color="rgba(0, 0, 0, 0.65)"
                showModal={showAction}
                zIndexDepth="second"
                onCloseModal={handleCloseActionModal}
            />
            <Modal
                content={
                    <UnfollowPaper
                        handleCloseUnfollow={handleCloseUnfollow}
                        handleUnfollowUser={handleUnfollowUser}
                        user={post.created_by}
                    />
                }
                zIndexDepth="second"
                color="rgba(0, 0, 0, 0.65)"
                showModal={showUnfollow}
                onCloseModal={handleCloseUnfollow}
            />
            <GlobalStyle />
        </>
    );
};
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
    z-index: 10001;
    .list-gallery {
        width: 59%;
        height: 100%;
    }

    .input-wrapper {
        margin-top: 14px;
        order: 6;
    }

    .text-like {
        color: #262626;
        font-weight: 600;
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
        text-transform: uppercase;
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
            .user_name_wrapper {
                margin-left: 14px;
                font-weight: 600;
                color: #262626;
                display: flex;
                align-items: center;
            }

            .user_name {
                text-decoration: none;
                color: #262626;
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
