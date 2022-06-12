import { Avatar } from '@components/common';
import { HeartIcon, TickSmallIcon } from '@components/Icons';
import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { CommentRep } from './CommentList';

export interface ICommentItemProps {
    comment: CommentRep;
}

export default function CommentItem(props: ICommentItemProps) {
    const { comment } = props;
    return (
        <Container>
            <div className="content-item-wrapper">
                <div className="content-wrapper">
                    <Avatar
                        size="small-medium"
                        border="none"
                        url="http://localhost:5000/uploads/posts/9f8f7b21-521d-42f7-a813-542a21e18c71.jpg"
                    />
                    <div className="content-comment-wrapper">
                        <div className="info-wrapper">
                            <span className="info-person">
                                <span className="text">
                                    <Link to="aa" className="user_name">
                                        {comment.user_name}
                                    </Link>
                                    <TickSmallIcon className="tick-icon" />
                                    {comment.comment}
                                </span>
                            </span>
                        </div>
                        <div className="info-status">
                            <div className="time">2d</div>
                            <div className="count_like">4 likes</div>
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
