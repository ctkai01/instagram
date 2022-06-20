import { Comment } from '@models/Comment';
import * as React from 'react';
import styled from 'styled-components';
import CommentItem from './CommentItem';

export interface ICommentReplyProps {
    comments: Comment[],
    loadingUnLikeComment: boolean;
    loadingLikeComment: boolean;
    handleUnLikeComment: (idComment: number) => Promise<void>,
    handleLikeComment: (idComment: number) => Promise<void>,
    handleDeleteCommentPost: (isComment: number) => Promise<void>
}

export default function CommentReply(props: ICommentReplyProps) {
    const {comments, loadingLikeComment, loadingUnLikeComment, handleUnLikeComment, handleLikeComment, handleDeleteCommentPost} =  props
    const [showReplies, setShowReplies] = React.useState(false)

    const handleSHowViewReply = () => {
      setShowReplies(showReplies => !showReplies)
    }

    return (
        <Container className="view-reply-container">
            <div className="view-reply-text" onClick={handleSHowViewReply}>
                <div className="line"></div>
                <div className="text">{showReplies ? 'Hide replies' : `View replies (${comments?.length})`}</div>
            </div>
            {showReplies && (
                  comments.map((comment, index) => (
                      <CommentItem handleDeleteCommentPost={handleDeleteCommentPost} key={index} loadingLikeComment={loadingLikeComment} loadingUnLikeComment={loadingUnLikeComment} comment={comment} handleUnLikeComment={handleUnLikeComment} handleLikeComment={handleLikeComment}/>
                  ))
                )}
        </Container>
    );
}
const Container = styled.div`
    margin: 16px 0 0 54px;
    .view-reply-text {
        display: flex;
        cursor: pointer;
        width: fit-content;
        align-items: center;
        .line {
            border-bottom: 1px solid rgb(142, 142, 142);
            display: inline-block;
            height: 0;
            margin-right: 16px;
            vertical-align: middle;
            width: 24px;
        }

        .text {
            color: #8e8e8e;
            font-size: 12px;
            font-weight: 600;
        }
    }
`;
