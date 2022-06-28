import { PATH_ACCOUNT_SETTING, PATH_ACCOUNT_PASSWORD_SETTING } from '@routes/index';
import * as React from 'react';
import { Link, match, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';

export interface ISidebarSettingProps {
    matchSettingAccount: match<{}> | null;
}

export default function SidebarSetting(props: ISidebarSettingProps) {
    const { matchSettingAccount } = props;
    return (
        <Container>
            <Link className="link-redirect" to={PATH_ACCOUNT_SETTING}>
                <div className={`button-setting ${matchSettingAccount ? 'active' : ''}`}>
                    <div className="content">Edit Profile</div>
                </div>
            </Link>
            <Link className="link-redirect" to={PATH_ACCOUNT_PASSWORD_SETTING}>
                <div className={`button-setting ${matchSettingAccount ? '' : 'active'}`}>
                    <div className="content">Change Password</div>
                </div>
            </Link>
        </Container>
    );
}

const Container = styled.div`
    border: 1px solid rgb(219, 219, 219);
    height: 750px;

    .link-redirect {
        text-decoration: none;
    }
    .button-setting {
        cursor: pointer;
        &:not(.active):hover .content {
            margin-left: 0;
        }

        &.active {
            border-left: 2px solid #000;
        }

        &.active .content {
            font-weight: 600;
        }

        &:not(.active):hover {
            border-left: 2px solid #dbdbdb;
            background-color: rgba(235, 229, 229, 0.945);
        }

        /* &.active:hover {
            
        } */
        .content {
            padding: 16px 16px 16px 32px;
            margin-left: 2px;

            color: #262626;
            font-size: 16px;
        }

        .content {
        }
    }
`;
