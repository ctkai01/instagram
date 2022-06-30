import { Status } from '@constants/status';
import { TypeFollow } from '@constants/type-follow';
import { useFollow } from '@hooks/useFollow';
import { useReactPost } from '@hooks/useReactPost';
import { Post } from '@models/Post';
import * as React from 'react';
import PostContentModal from '@features/Home/Components/Posts/PostContentModal';
import styled from 'styled-components';
import { CommentPost } from '@features/Home/Components/Posts/PostItem';
import { Api } from '@api/authApi';
import { Comment, CreateComment } from '@models/Comment';
import { User } from '@models/User';
import { useDispatch } from 'react-redux';
import { postActions, UserPost } from '@features/UploadPost/postSlice';

export interface IGalleryPostItemProps {
    post: Post;
    currentIndexShow: number
    index: number;
    handleFollowUserPostProfile: (post: Post, userChange: User) => void
    handleActionPostProfile: (postChange: Post) => void;

}

export default function GalleryPostItem(props: IGalleryPostItemProps) {
    const { post, currentIndexShow, index, handleFollowUserPostProfile, handleActionPostProfile } = props;

    const dispatch = useDispatch()

    const [dataComment, setDataComment] = React.useState<CommentPost>({
        currentPage: 0,
        lastPage: 0,
        data: [],
        isCall: false,
    });
    const [isLoadingComment, setIsLoadingComment] = React.useState<boolean>(false);


    const [dataUnfollow, loadingUnfollow, fetchUnFollowUser] = useFollow({
        type: TypeFollow.UNFOLLOW,
    });

    const [dataFollow, loadingFollow, fetchFollowUser] = useFollow({
        type: TypeFollow.FOLLOW,
    });

    const [isLike, setIsLike] = React.useState<Status>(post.is_like);

    const [dataLikePost, loadingLikePost, fetchLikePost] = useReactPost({
        type: Status.ACTIVE,
    });

    const [dataUnLikePost, loadingUnLikePost, fetchUnLikePost] = useReactPost({
        type: Status.NO_ACTIVE,
    });

    const handleChangeIsLike = (type: Status) => {
        setIsLike(type);
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

    //Action Post
    React.useEffect(() => {
        if (dataLikePost) {
            handleActionPostProfile(dataLikePost);
        }
    }, [dataLikePost]);

    React.useEffect(() => {
        if (dataUnLikePost) {
            handleActionPostProfile(dataUnLikePost);
        }
    }, [dataUnLikePost]);

    
    React.useEffect(() => {
        handleShowModalDetailPost()

    }, [])

    const handleShowModalDetailPost = async () => {
        if (currentIndexShow === index) {

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

    const handleDeleteCommentPost = async(isComment: number, idParentComment: number | null) => {
        await Api.deleteComment(isComment);

    }

    const handlePostComment = async (content: string, parentId?: number) => {
        const data: CreateComment = {
            content: content,
            parent_id: parentId,
        };
        const responseCreateComment = await Api.createComment(post.id, data);

        setDataComment((dataComment) => {
            const cloneDataComment = { ...dataComment };
            if (parentId) {
                cloneDataComment.data
                    .find((comment) => comment.id === parentId)
                    ?.childComments.push(responseCreateComment.data);
            } else {
                cloneDataComment.data.push(responseCreateComment.data);
            }
            return cloneDataComment;
        });
    };

    const handleChangeDataComment = (commentChange: Comment) => {
        setDataComment((dataComment) => {
            const cloneDataComment = { ...dataComment };

            if (commentChange.parent_id) {
                const checkIndexDataCommentParent = cloneDataComment.data.findIndex(
                    (comment) => comment.id === commentChange.parent_id
                );

                if (checkIndexDataCommentParent !== -1) {
                    const checkDataCommentChild = cloneDataComment.data[
                        checkIndexDataCommentParent
                    ].childComments.find((comment) => comment.id === commentChange.id);

                    if (checkDataCommentChild) {
                        checkDataCommentChild.like_count = commentChange.like_count;
                        checkDataCommentChild.is_like = commentChange.is_like;

                        cloneDataComment.data[checkIndexDataCommentParent].childComments[
                            cloneDataComment.data[checkIndexDataCommentParent].childComments.findIndex(
                                (comment) => comment.id === commentChange.id
                            )
                        ] = checkDataCommentChild;
                        console.log('CHil', checkDataCommentChild)
                        console.log('DataALl', cloneDataComment)
                        return cloneDataComment;
                    } else {
                        return cloneDataComment;
                    }
                } else {
                    return cloneDataComment;
                }
            } else {
                console.log('FUCKKds', commentChange)

                const checkDataComment = cloneDataComment.data.find(
                    (comment) => comment.id === commentChange.id
                );
                if (checkDataComment) {
                    checkDataComment.like_count = commentChange.like_count;
                    checkDataComment.is_like = commentChange.is_like;
                    cloneDataComment.data[
                        cloneDataComment.data.findIndex(
                            (comment) => comment.id === commentChange.id
                        )
                    ] = checkDataComment;
                    return cloneDataComment;
                } else {
                    return cloneDataComment;
                }
            }
        });
    };

    const handleFollowUserPost = (post: Post, userChange: User) => {
        const data: UserPost = {
            post,
            user: userChange,
        };

        handleFollowUserPostProfile(post, userChange)
        dispatch(postActions.changeDataUserPost(data));
    };


    console.log('Comment Data', dataComment)

    return (
       <PostContentModal
        post={post}
        loadingUnLikePost={loadingUnLikePost}
        loadingLikePost={loadingLikePost}
        isLike={isLike}
        fetchLikePost={fetchLikePost}
        fetchUnLikePost={fetchUnLikePost}
        handleChangeIsLike={handleChangeIsLike}
        dataComment={dataComment}
        isLoadingComment={isLoadingComment}
handleDeleteCommentPost={handleDeleteCommentPost}
handlePostComment={handlePostComment}
handleChangeDataComment={handleChangeDataComment}
handleFollowUserPost={handleFollowUserPost}
       />
    );
}

