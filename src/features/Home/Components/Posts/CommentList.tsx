import { Status } from '@constants/status';
import { useReactComment } from '@hooks/useReactComment';
import { Comment } from '@models/Comment';
import * as React from 'react';
import styled from 'styled-components';
import CommentItem from './CommentItem';
import CommentReply from './CommentReply';
import { CommentPost } from './PostItem';
export interface ICommentListProps {
    dataComment: CommentPost;
    isLoadingComment: boolean;
    handleChangeDataComment: (commentChange: Comment) => void;
    handleDeleteCommentPost: (isComment: number) => Promise<void>
}

// export interface Comment {
//     user_name: string;
//     comment: string;
//     replies: CommentRep[];

// }

// export interface CommentRep {
//     user_name: string;
//     comment: string;
// }

export default function CommentList(props: ICommentListProps) {
    const { dataComment, isLoadingComment, handleChangeDataComment, handleDeleteCommentPost } = props;
    
    const [dataLikeComment, loadingLikeComment, fetchLikeComment] = useReactComment({
        type: Status.ACTIVE,
    });

    const [dataUnLikeComment, loadingUnLikeComment, fetchUnLikeComment] = useReactComment({
        type: Status.NO_ACTIVE,
    });

    React.useEffect(() => {
        if (dataUnLikeComment) {
            handleChangeDataComment(dataUnLikeComment)
        }
    }, [dataUnLikeComment]);

    React.useEffect(() => {
        if (dataLikeComment) {
            handleChangeDataComment(dataLikeComment)
        }

    }, [dataLikeComment]);

    const handleLikeComment = async (idComment: number) => {
        await fetchLikeComment(idComment);
    };

    const handleUnLikeComment = async (idComment: number) => {
        await fetchUnLikeComment(idComment);
    };

    return (
        <Container>
            {dataComment.data.length && !isLoadingComment ? (
                dataComment.data.map((comment, index) => (
                    <div key={index}>
                        <CommentItem handleDeleteCommentPost={handleDeleteCommentPost} loadingUnLikeComment={loadingUnLikeComment} loadingLikeComment={loadingLikeComment} handleUnLikeComment={handleUnLikeComment} handleLikeComment={handleLikeComment} comment={comment} />
                        {comment.childComments.length > 0 && <CommentReply handleDeleteCommentPost={handleDeleteCommentPost} loadingUnLikeComment={loadingUnLikeComment} loadingLikeComment={loadingLikeComment} handleUnLikeComment={handleUnLikeComment} handleLikeComment={handleLikeComment} comments={comment.childComments} />}
                    </div>
                ))
            ) : (
                <div>11</div>
            )}

            {}
        </Container>
    );
}

const Container = styled.div``;
