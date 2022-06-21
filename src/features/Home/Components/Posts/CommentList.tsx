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
    handleDeleteCommentPost: (isComment: number, idParentComment: number | null) => Promise<void>
    handleReplyComment: (userName: string, idCommentParent: number) => void;
}


export default function CommentList(props: ICommentListProps) {
    const { dataComment, isLoadingComment, handleChangeDataComment, handleDeleteCommentPost, handleReplyComment } = props;
    const [currentIdComment, setCurrentIdComment] = React.useState<number>(0);
    
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
        setCurrentIdComment(idComment)
        await fetchLikeComment(idComment);
    };

    const handleUnLikeComment = async (idComment: number) => {
        setCurrentIdComment(idComment)
        await fetchUnLikeComment(idComment);
    };

    return (
        <Container>
            {dataComment.data.length && !isLoadingComment ? (
                dataComment.data.map((comment, index) => (
                    <div key={index}>
                        <CommentItem currentIdComment={currentIdComment} handleReplyComment={handleReplyComment} handleDeleteCommentPost={handleDeleteCommentPost} loadingUnLikeComment={loadingUnLikeComment} loadingLikeComment={loadingLikeComment} handleUnLikeComment={handleUnLikeComment} handleLikeComment={handleLikeComment} comment={comment} />
                        {comment.childComments.length > 0 && <CommentReply currentIdComment={currentIdComment}  handleReplyComment={handleReplyComment} handleDeleteCommentPost={handleDeleteCommentPost} loadingUnLikeComment={loadingUnLikeComment} loadingLikeComment={loadingLikeComment} handleUnLikeComment={handleUnLikeComment} handleLikeComment={handleLikeComment} comments={comment.childComments} />}
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
