import { Arrow, Avatar, Modal } from '@components/common';
import { TickSmallIcon } from '@components/Icons';
import { Paper } from '@material-ui/core';
import { User } from '@models/User';
import { convertStringUsernameRelate } from '@utils/convertString';
import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export interface IExpandSearchProps {
    showRecentSearch: boolean;
    usersSearch: User[];
    handleOutsideSearch: () => void;
}

export function ExpandSearch(props: IExpandSearchProps) {
    const { showRecentSearch, usersSearch, handleOutsideSearch } = props;
    console.log('User search', usersSearch);

    return (
        <Container>
            <Paper className="recent-search" elevation={4}>
                <div className="content">
                    {usersSearch.map((user, index) => (
                        <Link onClick={handleOutsideSearch} to={`/${user.user_name}`} className="user-item">
                            <Avatar className="avatar" size="medium_center" url={user.avatar} />
                            <div className="container-info">
                                <div className="user_name_container">
                                    <div className="user_name">{user.user_name}</div>
                                    {!!user.is_tick && <TickSmallIcon className="tick" />}
                                </div>
                                <div className="full_name">
                                    <span>{user.name}</span>
                                    {!!user.followed_by.length && (
                                        <>
                                            <span className="dot"></span>
                                            <span>{`Followed by ${convertStringUsernameRelate(
                                              user.followed_by
                                            )}`}</span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
                <Arrow position="center-top" />
            </Paper>
            <Modal showModal={showRecentSearch} onCloseModal={handleOutsideSearch} />
        </Container>
    );
}

const Container = styled.div`
    .user-item {
        padding: 8px 16px;
        display: flex;
        align-items: center;
        cursor: pointer;
        text-decoration: none;

        .dot {
            display: inline-block;
            margin: 0 4px;
            font-weight: 600;
            width: 4px;
            height: 4px;
            border-radius: 50%;
            background-color: #8e8e8e;
        }

        &:hover {
            background-color: rgb(250, 250, 250);
        }

        .avatar {
            margin-right: 12px;
        }

        .full_name {
            text-decoration: none;
            color: #8e8e8e;
            display: flex;
            align-items: center;
            flex-wrap: nowrap;

            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .user_name_container {
            display: flex;
            align-items: center;

            .user_name {
                margin-right: 2px;
                font-weight: 600;
                color: #262626;
                text-decoration: none;
            }
        }
    }

    .recent-search {
        border-radius: 8px;
        position: absolute;
        width: 375px;
        top: 50px;
        transform: translateX(-50%);
        left: 50%;
        transform-style: preserve-3d;
        z-index: 10001;
        height: 362px;
        overflow: hidden;
        overflow-y: auto;
        .content {
            width: 100%;
            height: 100%;
            position: relative;
        }
    }
`;
