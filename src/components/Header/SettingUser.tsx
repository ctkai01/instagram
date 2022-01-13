import { Paper } from '@material-ui/core';
import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Arrow } from '../common/Arrow';
import { SaveIconIcon, SettingIcon, SwitchIcon, UserIconIcon } from '../Icons';

export interface ISettingUserProps {
    className?: string;
}

export function SettingUser(props: ISettingUserProps) {
    const { className } = props;
    return (
        <Container className={className}>
            <div className="setting-container">
                <Link to='/user' className="setting-item">
                    <UserIconIcon className="icon" />
                    <div className="setting-item-text">Profile</div>
                </Link>
                <Link to='/saved' className="setting-item">
                    <SaveIconIcon className="icon" />
                    <div className="setting-item-text">Saved</div>
                </Link>
                <Link to='/setting' className="setting-item">
                    <SettingIcon className="icon" />
                    <div className="setting-item-text">Settings</div>
                </Link>
                <div className="setting-item">
                    <SwitchIcon className="icon" />
                    <div className="setting-item-text">Switch Accounts</div>
                </div>
            </div>
            <div className="setting-footer">Log Out</div>
            <Arrow position="right-top" />
        </Container>
    );
}

const Container = styled(Paper)`
    .setting-container {
        .setting-item {
            display: flex;
            padding: 8px 16px;
            text-decoration: none;

            &:hover {
                background-color: rgba(var(--b3f,250,250,250),1);
            }
        }

        .icon {
            margin-right: 12px;
        }

        .setting-item-text {
            color: #262626;
        }
    }

    .setting-footer {
        padding: 8px 16px;
        color: #262626;
        border-top: 2px solid #dbdbdb;
    }
`;
