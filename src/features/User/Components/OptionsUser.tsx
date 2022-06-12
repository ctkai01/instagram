import { Avatar } from '@components/common';
import * as React from 'react';
import styled from 'styled-components';

export interface IOptionsUserProps {
    handleCloseOptionsUser: () => void;
}

export default function OptionsUser(props: IOptionsUserProps) {
    const { handleCloseOptionsUser } = props
    
    const [isBumpContent, setIsBumpContent] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (!isBumpContent) {
            setIsBumpContent(true);
        } else {
            const timer = setTimeout(() => {
                setIsBumpContent(false);
            }, 300);

            return () => {
                clearTimeout(timer);
            };
        }
    }, []);
    
    return (
        <Container className={isBumpContent ? 'bump' : ''}>
            <div className="action-item">Change password</div>
            <div className="action-item">Log Out</div>
            <div className="action-item" onClick={handleCloseOptionsUser}>Cancel</div>
        </Container>
    );
}

const Container = styled.div`
    width: 400px;
    border-radius: 10px;
    overflow: hidden;
    background: #fff;

    .text {
        padding: 16px 32px;
        color: #262626;
        text-align: center;
        margin-bottom: 16px;
    }

    .action-item {
        min-height: 48px;
        color: #262626;
        user-select: none;
        display: flex;
        justify-content: center;
        align-items: center;
        border-top: 1px solid rgb(219, 219, 219);
        cursor: pointer;
        &.red {
            color: #ed4956;
        }

        &:active {
            background-color: #e0dfdf;
        }
    }

    &.bump {
        animation: bump 300ms ease-out;
    }
    @keyframes bump {
        0% {
            transform: scale(1);
        }
        10% {
            transform: scale(0.9);
        }
        30% {
            transform: scale(1.1);
        }
        50% {
            transform: scale(1.15);
        }
        100% {
            transform: scale(1);
        }
    }
`;
