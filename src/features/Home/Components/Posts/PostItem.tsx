import { Api } from '@api/authApi';
import { Modal } from '@components/common';
import { Status } from '@constants/status';
import { TypeFollow } from '@constants/type-follow';
import { selectUserAuth } from '@features/Auth/authSlice';
import UnfollowPaper from '@features/User/Components/UnfollowPaper';
import { useFollow } from '@hooks/useFollow';
import { useReactPost } from '@hooks/useReactPost';
import { Comment, CreateComment } from '@models/Comment';
import { MediaType } from '@models/commom';
import { Post } from '@models/Post';
import { User } from '@models/User';
import { useAppSelector } from '@redux/hooks';
import * as React from 'react';
import { toast } from 'react-toastify';
import { Waypoint } from 'react-waypoint';
import styled from 'styled-components';
import ActionPostDetail from './ActionPostDetail';
import { ActionReactPost } from './ActionReactPost';
import { ContentPost } from './ContentPost';
import { Header } from './Header';
import PhotoList from './PhotoList';

export interface IPostItemProps {
    post: Post;
    isPlay: boolean;
    handleSetPlay: () => void;
    handleSetPause: () => void;
    getVideoRef: (ref: HTMLVideoElement | null, post: Post) => void;
    onWaypointEnter: (post: Post) => void;
    onWaypointLeave: (post: Post) => void;
    handleChangeReactPost: (post: Post) => void;
    handleFollowUserPost: (post: Post, userChange: User) => void;
}

export interface CommentPost {
    currentPage: number;
    lastPage: number;
    data: Comment[];
    isCall: boolean;
}

export default function PostItem(props: IPostItemProps) {
    const {
        post,
        isPlay,
        handleChangeReactPost,
        getVideoRef,
        onWaypointEnter,
        onWaypointLeave,
        handleSetPlay,
        handleSetPause,
        handleFollowUserPost,
    } = props;
    const [showAction, setShowAction] = React.useState(false);
    const [showUnfollow, setShowUnfollow] = React.useState<boolean>(false);
    const [showModalDetailPost, setShowModalDetailPost] = React.useState<boolean>(false);

    const [isLoadingComment, setIsLoadingComment] = React.useState<boolean>(false);

    const [dataComment, setDataComment] = React.useState<CommentPost>({
        currentPage: 0,
        lastPage: 0,
        data: [],
        isCall: false,
    });

    const [dataUnfollow, loadingUnfollow, fetchUnFollowUser] = useFollow({
        type: TypeFollow.UNFOLLOW,
    });

    const [dataFollow, loadingFollow, fetchFollowUser] = useFollow({
        type: TypeFollow.FOLLOW,
    });

    const [dataLikePost, loadingLikePost, fetchLikePost] = useReactPost({
        type: Status.ACTIVE,
    });

    const [dataUnLikePost, loadingUnLikePost, fetchUnLikePost] = useReactPost({
        type: Status.NO_ACTIVE,
    });
    const [isLike, setIsLike] = React.useState<Status>(post.is_like);

    const checkFirstVideo = post.media[0].type === MediaType.video;
    React.useEffect(() => {
        if (dataLikePost) {
            console.log('Fetch Data: ', dataLikePost);
            handleChangeReactPost(dataLikePost);
        }
    }, [dataLikePost]);

    React.useEffect(() => {
        if (dataUnLikePost) {
            handleChangeReactPost(dataUnLikePost);
        }
    }, [dataUnLikePost]);

    const handleChangeIsLike = (type: Status) => {
        setIsLike(type);
    };

    const handleShowActionModal = () => {
        setShowAction(true);
    };

    const handleCloseActionModal = () => {
        setShowAction(false);
    };

    React.useEffect(() => {
        if (dataFollow) {
            handleFollowUserPost(post, dataFollow);
        }
    }, [dataFollow]);

    React.useEffect(() => {
        if (dataUnfollow) {
            handleFollowUserPost(post, dataUnfollow);
        }
    }, [dataUnfollow]);

    const handleUnfollowUser = async (idUser: number) => {
        handleCloseUnfollow();
        await fetchUnFollowUser(idUser);
    };

    const handleCloseUnfollow = () => {
        setShowUnfollow(false);
        setShowAction(false);
    };

    const handleFollowUser = async (user: User) => {
        await fetchFollowUser(user.id);
    };

    const handleShowUnfollow = () => {
        setShowUnfollow(true);
    };

    const userAuth = useAppSelector(selectUserAuth);

    const handleChangeDataComment = (commentChange: Comment) => {
        setDataComment((dataComment) => {
            const cloneDataComment = { ...dataComment };
            const checkDataComment = cloneDataComment.data.find(
                (comment) => comment.id === commentChange.id
            );
            if (checkDataComment) {
                checkDataComment.like_count = commentChange.like_count;
                checkDataComment.is_like = commentChange.is_like;
                cloneDataComment.data[
                    cloneDataComment.data.findIndex((comment) => comment.id === commentChange.id)
                ] = checkDataComment;
                return cloneDataComment;
            } else {
                return cloneDataComment;
            }
        });
    };

    const handleShowModalDetailPost = async (activeShowDetailPost?: boolean) => {
        if (!showModalDetailPost && activeShowDetailPost) {
            setShowModalDetailPost(true);

            if (!dataComment.isCall) {
                setIsLoadingComment(true);

                const responseComment = await Api.commentsByIdPost(post.id);

                setDataComment({
                    currentPage: responseComment.data.currentPage,
                    data: responseComment.data.data,
                    lastPage: responseComment.data.lastPage,
                    isCall: true,
                });

                setIsLoadingComment(false);
            }
        }
    };

    const handleCloseModalDetailPost = () => {
        setShowModalDetailPost(false);
    };

    const handlePostComment = async (content: string) => {
        const data: CreateComment = {
            content: content,
        };
        const responseCreateComment = await Api.createComment(post.id, data);

        setDataComment((dataComment) => {
            const cloneDataComment = { ...dataComment };
            cloneDataComment.data.push(responseCreateComment.data)
            return cloneDataComment;
        });
    };

    const handleDeleteCommentPost = async (idComment: number) => {
        setDataComment((dataComment) => {
            const cloneDataComment = { ...dataComment };
            const checkIndexDataComment = cloneDataComment.data.findIndex(
                (comment) => comment.id === idComment
            );
            if (checkIndexDataComment !== -1) {
                cloneDataComment.data.splice(checkIndexDataComment, 1)
                return cloneDataComment;
            } else {
                return cloneDataComment;
            }
        });
        await Api.deleteComment(idComment);
    };

    return (
        <>
            <Container>
                <Header
                    handleFollowUser={handleFollowUser}
                    loadingFollow={loadingFollow}
                    loadingUnfollow={loadingUnfollow}
                    post={post}
                    userAuth={userAuth}
                    handleShowActionModal={handleShowActionModal}
                    urlImage={post.created_by.avatar}
                    userName={post.created_by.user_name}
                />
                <PhotoList
                    post={post}
                    isPlay={isPlay}
                    handleSetPlay={handleSetPlay}
                    handleSetPause={handleSetPause}
                    getVideoRef={getVideoRef}
                    media={post.media}
                    checkFirstVideo={checkFirstVideo}
                />
                <ActionReactPost
                    isLoadingComment={isLoadingComment}
                    dataComment={dataComment}
                    showModalDetailPost={showModalDetailPost}
                    handleCloseModalDetailPost={handleCloseModalDetailPost}
                    handleShowModalDetailPost={handleShowModalDetailPost}
                    handleChangeIsLike={handleChangeIsLike}
                    isLike={isLike}
                    loadingUnLikePost={loadingUnLikePost}
                    loadingLikePost={loadingLikePost}
                    fetchLikePost={fetchLikePost}
                    fetchUnLikePost={fetchUnLikePost}
                    handleFollowUserPost={handleFollowUserPost}
                    handleChangeDataComment={handleChangeDataComment}
                    handlePostComment={handlePostComment}
                    handleDeleteCommentPost={handleDeleteCommentPost}
                    post={post}
                />
                <ContentPost
                    countComment={post.comment_count}
                    content={post.caption}
                    countLike={post.like_count}
                    time={post.created_at}
                    author={post.created_by.user_name}
                    isLike={isLike}
                    loadingUnLikePost={loadingUnLikePost}
                    loadingLikePost={loadingLikePost}
                    handlePostComment={handlePostComment}
                    handleShowModalDetailPost={handleShowModalDetailPost}
                />

                {checkFirstVideo && (
                    <Waypoint
                        // topOffset={data.computed_top_offset}
                        // bottomOffset={data.computed_bottom_offset}
                        onEnter={() => onWaypointEnter(post)}
                        onLeave={() => onWaypointLeave(post)}
                    >
                        <div className="waypoint_item" />
                    </Waypoint>
                )}
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
        </>
    );
}

const Container = styled.div`
    background-color: #fff;
    margin-bottom: 24px;
    position: relative;

    .waypoint_item {
        width: 10px;
        height: 10px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 9999;
        /* background: red; */
    }
`;
