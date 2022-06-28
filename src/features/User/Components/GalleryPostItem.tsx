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

export interface IGalleryPostItemProps {
    post: Post;
    currentIndexShow: number
}

export default function GalleryPostItem(props: IGalleryPostItemProps) {
    const { post } = props;

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
            // handleFollowUserPost(post, dataFollow);
        }
    }, [dataFollow]);

    React.useEffect(() => {
        if (dataUnfollow) {
            // handleFollowUserPost(post, dataUnfollow);
        }
    }, [dataUnfollow]);
    

    const handleShowModalDetailPost = async (activeShowDetailPost?: boolean) => {
        if (activeShowDetailPost) {

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

    return (
    //    <PostContentModal
    //     post={post}
    //     loadingUnLikePost={loadingUnLikePost}
    //     loadingLikePost={loadingLikePost}
    //     isLike={isLike}
    //     fetchLikePost={fetchLikePost}
    //     fetchUnLikePost={fetchUnLikePost}
    //     handleChangeIsLike={handleChangeIsLike}

    //    />
    <div>1</div>
    );
}

