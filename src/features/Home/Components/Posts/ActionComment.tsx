import { User } from '@models/User';
import * as React from 'react';
import styled from 'styled-components';

export interface IActionCommentProps {
    // userCreate: User;
    handleDeleteComment: () => void;
    handleCloseActionModal: () => void;
}

export default function ActionComment(props: IActionCommentProps) {
    const { handleCloseActionModal, handleDeleteComment } = props;
    const [isBumpContent, setIsBumpContent] = React.useState<boolean>(false);
    console.log('Fukk you');
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

            <div className="action-item red" onClick={handleDeleteComment}>Delete</div>
            <div className="action-item" onClick={handleCloseActionModal}>
                Cancel
            </div>
        </Container>
    );
}

const Container = styled.div`
    border-radius: 10px;
    overflow: hidden;
    width: 400px;
    .action-item {
        min-height: 48px;
        background-color: #fff;
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
            /* opacity: 1; */
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
