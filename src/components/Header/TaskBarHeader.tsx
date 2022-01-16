import { Avatar } from '@components/common';
import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { CompassIcon, HeartIcon, HomeIcon, PlaneIcon, PlusSquareIcon } from '../Icons';
import { SettingUser } from './SettingUser';

export interface ITaskBarHeaderProps {
    className: string;
    handleLogout: () => void;
}

export default function TaskBarHeader(props: ITaskBarHeaderProps) {
    const { className, handleLogout } = props;

    const [showModal, setShowModal] = React.useState<boolean>(false);

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleShowModal = () => {
        if (!showModal) {
            setShowModal(true);
        }
    };

    return (
        <Container className={className}>
            <Link to="/home" className='item-taskbar'>
                {showModal ? <HomeIcon color="white" /> : <HomeIcon color="black" />}
            </Link>
            <Link to="/box" className='item-taskbar'>
                <PlaneIcon />
            </Link>
            <Link to="/new-post" className='item-taskbar'>
                <PlusSquareIcon />
            </Link>
            <Link to="/find-people" className='item-taskbar'>
                <CompassIcon />
            </Link>
            <Link to="/activity-feed"className='item-taskbar'>
                <HeartIcon />
            </Link>
            <div onClick={handleShowModal} className="user-current-box item-taskbar">
                <Avatar className='image-user' size='small' thicknessBorder={1} border={showModal ? 'normal' : 'none'} url='https://ecdn.game4v.com/g4v-content/uploads/2021/03/Luffy.jpg'/>
                {showModal ? (
                    <SettingUser
                        className="setting-user"
                        onLogout={handleLogout}
                        showModal={showModal}
                        handleCloseModal={handleCloseModal}
                    />
                ) : (
                    ''
                )}
            </div>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    padding-left: 20px;
    justify-content: flex-end;

    .item-taskbar:not(:first-child) {
        margin-left: 30px;
    }

    .setting-user {
        position: absolute;
        top: 42px;
        min-width: 230px;
        transform-style: preserve-3d;
        transform: translateX(-100%) translateX(54px);
    }

    .user-current-box {
        width: 24px;
        height: 24px;
        cursor: pointer;
        position: relative;

        .image-user {
            width: 100%;
            height: 100%;
            border-radius: 50%;
        }

        .image-user img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
        }
    }
`;
