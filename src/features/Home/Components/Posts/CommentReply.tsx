import * as React from 'react';
import styled from 'styled-components';
import CommentItem from './CommentItem';
import { CommentRep } from './CommentList';

export interface ICommentReplyProps {
    comments: CommentRep[]
}

export default function CommentReply(props: ICommentReplyProps) {
    const {comments} =  props
    const [showReplies, setShowReplies] = React.useState(false)

    const handleSHowViewReply = () => {
      setShowReplies(showReplies => !showReplies)
    }

    console.log('Comment', comments)
    console.log('Show', showReplies)
    return (
        <Container className="view-reply-container">
            <div className="view-reply-text" onClick={handleSHowViewReply}>
                <div className="line"></div>
                <div className="text">{showReplies ? 'Hide replies' : `View replies (${comments?.length})`}</div>
            </div>
            {showReplies && (
                  comments.map((comment, index) => (
                      <CommentItem key={index} comment={comment}/>
                    // <div className='DUCK'>111</div>
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
