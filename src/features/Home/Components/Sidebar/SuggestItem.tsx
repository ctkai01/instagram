import { Avatar, TooltipHTML } from '@components/common';
import { User } from '@models/User';
import { convertStringUsernameRelate } from '@utils/index';
import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { PreviewProfile } from './PreviewProfile';
export interface ISuggestItemProps {
    user: User;
    index: number;
}

export function SuggestItem(props: ISuggestItemProps) {
    const { user, index } = props;

    const userRelated: string[] = user.followed_by ? user.followed_by : [];
    const nameUserRelate = convertStringUsernameRelate(userRelated);

    return (
        <Container>
            <div className="account-wrapper">
                {/* <TooltipHTML placement="bottom-start" content={<PreviewProfile index={index} />}> */}
                    <div>
                        <Avatar
                            className="avatar-account"
                            border="none"
                            size="small-medium"
                            url={user.avatar}
                        />
                    </div>
                {/* </TooltipHTML> */}
                <div className="name-account-wrapper">
                    {/* <TooltipHTML placement="bottom-start" content={<PreviewProfile index={index} />}> */}
                        <Link to={`/${user.user_name}`} className="username">
                            {user.user_name}
                        </Link>
                    {/* </TooltipHTML> */}

                    <div className="relate-user">
                        {userRelated.length > 0 && 'Followed by'}
                        &nbsp;
                        {nameUserRelate ? nameUserRelate :  'Popular'}
                    </div>
                </div>
            </div>
            <div className="follow-button">Follow</div>
        </Container>
    );
}

const Container = styled.div`
    z-index: 0;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;

    .account-wrapper {
        display: flex;
        align-items: center;

        .avatar-account {
            cursor: pointer;
        }

        .name-account-wrapper {
            margin-left: 15px;
        }

        .username {
            font-weight: 600;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            max-width: 210px;
            color: #262626;
            text-decoration: none;

            &:hover {
                text-decoration: underline;
            }
        }

        .relate-user {
            color: #8e8e8e;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            max-width: 210px;
            font-size: 12px;
        }
    }

    .follow-button {
        color: #0095f6;
        cursor: pointer;
        font-size: 12px;
        font-weight: 600;
    }
`;
