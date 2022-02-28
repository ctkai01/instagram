import { Avatar, Modal } from '@components/common';
import { User } from '@models/User';
import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { CompassIcon, HeartIcon, HomeIcon, PlaneIcon, PlusSquareIcon } from '@components/Icons';
import { SettingUser } from './SettingUser';
import { ModalPost } from '@features/UploadPost/Components';

export interface ITaskBarHeaderProps {
    className: string;
    handleLogout: () => void;
    userAuth: User;
}

export default function TaskBarHeader(props: ITaskBarHeaderProps) {
    const { className, userAuth, handleLogout } = props;

    const [showModal, setShowModal] = React.useState<boolean>(false);
    const [showModalCreatePost, setShowModalCreatePost] = React.useState<boolean>(false);

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleCloseModalCreatePost = () => {
        setShowModalCreatePost(false);
    };

    const handleShowModalCreatePost = () => {
        if (!showModalCreatePost) {
            setShowModalCreatePost(true);
        }
    };

    const handleShowModal = () => {
        if (!showModal) {
            setShowModal(true);
        }
    };

    return (
        <Container className={className}>
            <Link to="/home" className='item-taskbar'>
                {showModal ? <HomeIcon ariaLabel='Home' color="white" /> : <HomeIcon ariaLabel='Home' color="black" />}
            </Link>
            <Link to="/box" className='item-taskbar'>
                <PlaneIcon ariaLabel='Direct'/>
            </Link>
            <div className='item-taskbar' onClick={handleShowModalCreatePost}>
                <PlusSquareIcon ariaLabel='New Post'/>
                <ModalPost showModalCreatePost={showModalCreatePost} handleCloseModalCreatePost={handleCloseModalCreatePost}/>
            </div>
            <Link to="/find-people" className='item-taskbar'>
                <CompassIcon ariaLabel='Find People'/>
            </Link>
            <Link to="/activity-feed"className='item-taskbar'>
                <HeartIcon ariaLabel='Activity Feed'/>
            </Link>
            <div onClick={handleShowModal} className="user-current-box item-taskbar">
                <Avatar className='image-user' size='small' thicknessBorder={1} border={showModal ? 'normal' : 'none'} url={userAuth.avatar}/>
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

    .item-taskbar {
        cursor: pointer;
    }

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

        /* .image-user {
            width: 100%;
            height: 100%;
            border-radius: 50%;
        }

        .image-user img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
        } */
    }
`;
