import { Avatar } from '@components/common';
import * as React from 'react';
import styled from 'styled-components';

export interface IActionUserProps {
    handleCloseActionUser: () => void;
}

export default function ActionUser(props: IActionUserProps) {
    const { handleCloseActionUser } = props
    
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
            <div className="action-item red">Block</div>
            <div className="action-item red">Restrict</div>
            <div className="action-item" onClick={handleCloseActionUser}>Cancel</div>
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
        font-weight: 600;
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
