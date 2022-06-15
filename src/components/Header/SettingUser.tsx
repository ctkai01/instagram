import { Arrow, Modal } from '@components/common';
import { Paper } from '@material-ui/core';
import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { SaveIconIcon, SettingIcon, SwitchIcon, UserIconIcon } from '../Icons';

export interface ISettingUserProps {
    className?: string;
    showModal: boolean;
    onLogout: () => void;
    handleCloseModal: () => void;
}

export const SettingUser = (props: ISettingUserProps) => {
    const { className, showModal, handleCloseModal, onLogout } = props;
    
    return (
        <Wrapper>
            <Container className={className}>
                <div className="setting-container">
                    <Link to="/user" className="setting-item">
                        <UserIconIcon className="icon" ariaLabel='Profile'/>
                        <div className="setting-item-text">Profile</div>
                    </Link>
                    <Link to="/saved" className="setting-item">
                        <SaveIconIcon className="icon" ariaLabel='Saved'/>
                        <div className="setting-item-text">Saved</div>
                    </Link>
                    <Link to="/setting" className="setting-item">
                        <SettingIcon className="icon" ariaLabel='Settings'/>
                        <div className="setting-item-text">Settings</div>
                    </Link>
                    <div className="setting-item">
                        <SwitchIcon className="icon" ariaLabel='Switch Account'/>
                        <div className="setting-item-text">Switch Accounts</div>
                    </div>
                    <div className="setting-item setting-footer" onClick={onLogout}>
                        <div className="setting-item-text">Log Out</div>
                    </div>
                </div>
                <Arrow position="right-top" />
            </Container>
            <Modal showModal={showModal} onCloseModal={handleCloseModal}/>
        </Wrapper>
    );
};

const Wrapper = styled.div`

`

const Container = styled(Paper)`
    z-index: 99999999;
    .setting-container {
        .setting-item {
            display: flex;
            padding: 8px 16px;
            text-decoration: none;

            &:hover {
                background-color: rgba(var(--b3f, 250, 250, 250), 1);
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
