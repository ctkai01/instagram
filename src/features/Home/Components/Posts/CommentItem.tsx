import { Avatar } from '@components/common';
import { HeartIcon, TickSmallIcon } from '@components/Icons';
import { Comment } from '@models/Comment';
import { convertISOTime, convertTime } from '@utils/time';
import * as React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export interface ICommentItemProps {
    comment: Comment;
}

export default function CommentItem(props: ICommentItemProps) {
    const { comment } = props;

    const timeCreated = convertISOTime(comment.created_at);
    const { format, fromNow } = convertTime(comment.created_at, 7);

    return (
        <Container>
            <div className="content-item-wrapper">
                <div className="content-wrapper">
                    <Avatar size="small-medium" border="none" url={comment.created_by.avatar} />
                    <div className="content-comment-wrapper">
                        <div className="info-wrapper">
                            <span className="info-person">
                                <span className="text">
                                    <Link to="aa" className="user_name">
                                        {comment.created_by.user_name}
                                    </Link>
                                    <TickSmallIcon className="tick-icon" />
                                    {comment.content}
                                </span>
                            </span>
                        </div>
                        <div className="info-status">
                            <div className="time">
                                <Moment format={format} fromNow={fromNow}>
                                    {timeCreated}
                                </Moment>
                            </div>
                            <div className="count_like">
                                {!!comment.like_count &&
                                    (comment.like_count > 1
                                        ? `${comment.like_count} likes`
                                        : '1 like')}
                            </div>
                            <div className="reply-btn">Reply</div>
                        </div>
                    </div>
                </div>
                <div className="tym-wrapper">
                    <HeartIcon className="tym-icon-black" size={12} />
                    <HeartIcon className="tym-icon-gray" color="gray" size={12} />
                </div>
            </div>
        </Container>
    );
}
const Container = styled.div`
    .content-item-wrapper {
        padding-top: 12px;
        display: flex;
    }

    .tym-wrapper {
        margin-left: 10px;
        cursor: pointer;

        .tym-icon-gray {
            display: none;
        }

        &:hover .tym-icon-gray {
            display: block;
        }

        &:hover .tym-icon-black {
            display: none;
        }
    }

    .content-wrapper {
        display: flex;
        flex: 1;
    }

    .content-comment-wrapper {
        margin-left: 18px;
        .info-status {
            display: flex;
            margin: 16px 0 4px 0;

            .time,
            .count_like,
            .reply-btn {
                font-size: 12px;
            }

            .count_like,
            .reply-btn {
                font-weight: 600;
            }

            & > div {
                margin-right: 12px;
                color: #8e8e8e;
                cursor: pointer;
            }
        }

        .info-wrapper {
            display: flex;

            .info-person {
                /* display: flex; */
                align-items: center;
                display: inline-flex;
            }
            .user_name {
                color: #262626;
                font-weight: 600;
                text-decoration: none;
                margin-right: 4px;
            }
            .tick-icon {
                display: inline-block;
                margin-right: 4px;
            }
        }
    }
`;
