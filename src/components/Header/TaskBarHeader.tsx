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
            <Link to="/home">
                {showModal ? <HomeIcon color="white" /> : <HomeIcon color="black" />}
            </Link>
            <Link to="/box">
                <PlaneIcon />
            </Link>
            <Link to="/new-post">
                <PlusSquareIcon />
            </Link>
            <Link to="/find-people">
                <CompassIcon />
            </Link>
            <Link to="/activity-feed">
                <HeartIcon />
            </Link>
            <div onClick={handleShowModal} className="user-current-box">
                <div
                    className="image-user"
                    style={{
                        border: `${showModal ? '1px solid rgba(var(--i1d,38,38,38),1)' : ''}`,
                    }}
                >
                    <img
                        alt="user"
                        src="https://ecdn.game4v.com/g4v-content/uploads/2021/03/Luffy.jpg"
                    />
                </div>
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
    justify-content: space-evenly;
    padding-left: 20px;

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
