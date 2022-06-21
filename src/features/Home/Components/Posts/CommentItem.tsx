import { Avatar, Modal } from '@components/common';
import LoadingWhite from '@components/common/LoadingWhite';
import { HeartIcon, ThereDotIcon, TickSmallIcon } from '@components/Icons';
import { Comment } from '@models/Comment';
import { convertISOTime, convertTime } from '@utils/time';
import * as React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ActionComment from './ActionComment';
// import ReactHtmlParser, { processNodes, convertNodeToElement } from 'react-html-parser';
export interface ICommentItemProps {
    comment: Comment;
    loadingUnLikeComment: boolean;
    loadingLikeComment: boolean;
    currentIdComment: number;
    handleUnLikeComment: (idComment: number) => Promise<void>;
    handleLikeComment: (idComment: number) => Promise<void>;
    handleDeleteCommentPost: (isComment: number, idParentComment: number | null) => Promise<void>;
    handleReplyComment: (userName: string, idCommentParent: number) => void;
}

export default function CommentItem(props: ICommentItemProps) {
    const {
        comment,
        loadingUnLikeComment,
        loadingLikeComment,
        currentIdComment,
        handleDeleteCommentPost,
        handleUnLikeComment,
        handleLikeComment,
        handleReplyComment,
    } = props;

    const timeCreated = convertISOTime(comment.created_at);
    const { format, fromNow } = convertTime(comment.created_at, 7);

    const [showModalActionComment, setShowModalActionComment] = React.useState(false);

    const handleCloseActionModal = () => {
        setShowModalActionComment(false);
    };

    const handleShowActionModal = () => {
        setShowModalActionComment(true);
    };

    const handleDeleteComment = () => {
        console.log(comment.id);
        handleCloseActionModal();
        handleDeleteCommentPost(comment.id, comment.parent_id);
    };
    return (
        <>
            <Container>
                <div className="content-item-wrapper">
                    <div className="content-wrapper">
                        <Avatar size="small-medium" border="none" url={comment.created_by.avatar} />
                        <div className="content-comment-wrapper">
                            <div className="info-wrapper">
                                <span className="info-person">
                                    <span className="text">
                                        <Link
                                            to={`/${comment.created_by.user_name}`}
                                            className="user_name"
                                        >
                                            {comment.created_by.user_name}
                                        </Link>
                                        <TickSmallIcon className="tick-icon" />
                                        {/* {comment.content} */}
                                        {comment.content.split(' ').map((item) => {
                                            if (item.startsWith('@')) {
                                                const userName = item.slice(1);
                                                return (
                                                    <Link
                                                        style={{
                                                            textDecoration: 'none',
                                                            color: 'rgb(0, 55, 107)',
                                                        }}
                                                        to={`/${userName}`}
                                                    >
                                                        {item}
                                                    </Link>
                                                );
                                            } else {
                                                return ' ' + item;
                                            }
                                        })}
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
                                <div
                                    onClick={() => {
                                        const parentId = comment.parent_id
                                            ? comment.parent_id
                                            : comment.id;
                                        handleReplyComment(comment.created_by.user_name, parentId);
                                    }}
                                    className="reply-btn"
                                >
                                    Reply
                                </div>
                                <ThereDotIcon
                                    onClick={handleShowActionModal}
                                    className="icon-action-comment"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="tym-wrapper">
                        {comment.is_like ? (
                            loadingUnLikeComment && currentIdComment === comment.id ? (
                                <LoadingWhite size="vr-small" />
                            ) : (
                                <HeartIcon
                                    onClick={() => {
                                        handleUnLikeComment(comment.id);
                                    }}
                                    className="tym-icon-red"
                                    size={12}
                                    color="red"
                                />
                            )
                        ) : loadingLikeComment && currentIdComment === comment.id ? (
                            <LoadingWhite size="vr-small" />
                        ) : (
                            <>
                                <HeartIcon className="tym-icon-black" size={12} />
                                <HeartIcon
                                    onClick={() => {
                                        handleLikeComment(comment.id);
                                    }}
                                    className="tym-icon-gray"
                                    color="gray"
                                    size={12}
                                />
                            </>
                        )}
                    </div>
                </div>
            </Container>
            <Modal
                content={
                    <ActionComment
                        handleCloseActionModal={handleCloseActionModal}
                        handleDeleteComment={handleDeleteComment}
                    />
                }
                color="rgba(0, 0, 0, 0.65)"
                showModal={showModalActionComment}
                zIndexDepth="second"
                onCloseModal={handleCloseActionModal}
            />
        </>
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

        &:hover .content-comment-wrapper .info-status .icon-action-comment {
            display: block;
        }

        .content-comment-wrapper {
            margin-left: 18px;
            .info-status {
                display: flex;
                margin: 16px 0 4px 0;
                min-height: 24px;
                align-items: center;
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

                .icon-action-comment {
                    cursor: pointer;
                    display: none;
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
    }
`;
