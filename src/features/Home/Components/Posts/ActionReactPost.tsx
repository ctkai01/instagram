import { Api } from '@api/authApi';
import { CommentIcon, HeartIcon, PlaneIcon, SavePostIcon } from '@components/Icons';
import { Status } from '@constants/status';
import { Comment } from '@models/Comment';
import { Post } from '@models/Post';
import { User } from '@models/User';
import * as React from 'react';
import styled from 'styled-components';
import DetailPost from './DetailPost';
import { CommentPost } from './PostItem';

export interface IActionReactPostProps {
    post: Post;
    loadingUnLikePost: boolean;
    loadingLikePost: boolean;
    isLike: Status;
    isLoadingComment: boolean;
    showModalDetailPost: boolean;
    dataComment: CommentPost;
    activeShowDetailPost?: boolean;
    handleCloseModalDetailPost: () => void;
    handleShowModalDetailPost: (activeShowDetailPost?: boolean) => Promise<void>;
    handleChangeIsLike: (type: Status) => void;
    fetchLikePost: (idPost: number) => Promise<void>;
    fetchUnLikePost: (idPost: number) => Promise<void>;
    handleFollowUserPost: (post: Post, userChange: User) => void;
}

const defaultProps: Partial<IActionReactPostProps> = {
    activeShowDetailPost: true,
};


export function ActionReactPost(props: IActionReactPostProps) {
    props = { ...defaultProps, ...props };

    const {
        post,
        isLike,
        dataComment,
        loadingUnLikePost,
        loadingLikePost,
        isLoadingComment,
        showModalDetailPost,
        activeShowDetailPost,
        handleCloseModalDetailPost,
        handleChangeIsLike,
        handleFollowUserPost,
        handleShowModalDetailPost,
        fetchLikePost,
        fetchUnLikePost,
    } = props;
    // const [showModalDetailPost, setShowModalDetailPost] = React.useState<boolean>(false);
    // const [isLoadingComment, setIsLoadingComment] = React.useState<boolean>(false);
    // const [dataComment, setDataComment] = React.useState<CommentPost>({
    //     currentPage: 0,
    //     lastPage: 0,
    //     data: []
    // });

    // const handleCloseModalDetailPost = () => {
    //     setShowModalDetailPost(false);
    // };


    // const handleShowModalDetailPost = async () => {
    //     if (!showModalDetailPost && activeShowDetailPost) {
    //         setShowModalDetailPost(true);
    //         setIsLoadingComment(true);

    //         const responseComment = await Api.commentsByIdPost(post.id);

    //         setDataComment({
    //             currentPage: responseComment.data.currentPage,
    //             data: responseComment.data.data,
    //             lastPage: responseComment.data.lastPage,
    //         });

    //         setIsLoadingComment(false);
    //     }
    // };

    const handleFetchReactPost = async (idPost: number) => {
        if (post.is_like === Status.ACTIVE) {
            handleChangeIsLike(Status.NO_ACTIVE);
            // await fetchUnLikePost(idPost, Status.NO_ACTIVE);
            await fetchUnLikePost(idPost);
        } else {
            handleChangeIsLike(Status.ACTIVE);

            await fetchLikePost(idPost);
        }
    };

    return (
        <>
            <Container>
                <div className="first-list">
                    <div
                        className="item"
                        onClick={() => {
                            if (!loadingLikePost && !loadingUnLikePost) {
                                handleFetchReactPost(post.id);
                            }
                        }}
                    >
                        {loadingUnLikePost || loadingLikePost ? (
                            isLike ? (
                                <HeartIcon ariaLabel="Like" color="red" />
                            ) : (
                                <>
                                    <HeartIcon
                                        ariaLabel="Like"
                                        color="black"
                                        className="icon-black"
                                    />
                                    <HeartIcon
                                        ariaLabel="Like"
                                        color="gray"
                                        className="icon-gray"
                                    />
                                </>
                            )
                        ) : post.is_like ? (
                            <HeartIcon ariaLabel="Like" color="red" />
                        ) : (
                            <>
                                <HeartIcon ariaLabel="Like" color="black" className="icon-black" />
                                <HeartIcon ariaLabel="Like" color="gray" className="icon-gray" />
                            </>
                        )}

                        {/* {post.is_like  ? (
                            <HeartIcon ariaLabel="Like" color="red" />
                        ) : (
                            <>
                                <HeartIcon ariaLabel="Like" color="black" className="icon-black" />
                                <HeartIcon ariaLabel="Like" color="gray" className="icon-gray" />
                            </>
                        )} */}
                    </div>
                    <div className="item" onClick={() => handleShowModalDetailPost(activeShowDetailPost)}>
                        <CommentIcon ariaLabel="Comment" color="black" className="icon-black" />
                        <CommentIcon ariaLabel="Comment" color="gray" className="icon-gray" />
                    </div>
                    {/* <div className="item">
                    <PlaneIcon ariaLabel="Share Post" color="black" className="icon-black" />
                    <PlaneIcon ariaLabel="Share Post" color="gray" className="icon-gray" />
                </div> */}
                </div>
                <div className="second-list ">
                    <div className="item">
                        <SavePostIcon ariaLabel="Save" color="black" className="icon-black" />
                        <SavePostIcon ariaLabel="Save" color="gray" className="icon-gray" />
                    </div>
                </div>
            </Container>

            <DetailPost
                post={post}
                dataComment={dataComment}
                isLoadingComment={isLoadingComment}
                loadingUnLikePost={loadingUnLikePost}
                loadingLikePost={loadingLikePost}
                isLike={isLike}
                showModalDetailPost={showModalDetailPost}
                handleFollowUserPost={handleFollowUserPost}
                handleChangeIsLike={handleChangeIsLike}
                fetchLikePost={fetchLikePost}
                fetchUnLikePost={fetchUnLikePost}
                handleCloseModalDetailPost={handleCloseModalDetailPost}
                handleShowModalDetailPost={handleShowModalDetailPost}
            />
        </>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px 8px;
    border-left: 1px solid rgba(219, 219, 219, 1);
    border-right: 1px solid rgba(219, 219, 219, 1);
    .first-list {
        display: flex;
        align-items: center;
    }

    .icon-gray {
        display: none;
    }

    .icon-black {
        display: block;
    }

    .item {
        padding: 8px;
        display: flex;
        align-items: center;
        margin-left: -8px;
        cursor: pointer;

        &:hover .icon-black {
            display: none;
        }
        &:hover .icon-gray {
            display: block;
        }
    }
`;
