import { Avatar, TooltipHTML } from '@components/common';
import { convertStringUsernameRelate } from '@utils/index';
import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { PreviewProfile } from './PreviewProfile';
interface SuggestUser {
    url: string;
    username: string;
}
export interface ISuggestItemProps {
    account: SuggestUser;
    relateUserName: string[] | [];
}

export function SuggestItem(props: ISuggestItemProps) {
    const { account, relateUserName } = props;
    const nameUserRelate = convertStringUsernameRelate(relateUserName);

    return (
        <Container>
            <div className="account-wrapper">
                {/* <TooltipHTML placement="bottom-start" content={<PreviewProfile />}>
                    <div>
                        <Avatar
                            className="avatar-account"
                            border="none"
                            size="small-medium"
                            url={account.url}
                        />
                    </div>
                </TooltipHTML>
                <div className="name-account-wrapper">
                    <TooltipHTML placement="bottom-start" content={<PreviewProfile />}>
                        <Link to="username" className="username">
                            {account.username}
                        </Link>
                    </TooltipHTML>

                    <div className="relate-user">
                        {relateUserName.length > 0 && 'Followed by'}
                        &nbsp;
                        {nameUserRelate}
                    </div>
                </div> */}
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
        }
    }

    .follow-button {
        color: #0095f6;
        cursor: pointer;
        font-size: 12px;
        font-weight: 600;
    }
`;
