import ArrowLeftCopyIcon from '@components/Icons/ArrowLeftCopyIcon';
import CopyIcon from '@components/Icons/CopyIcon';
import * as React from 'react';
import styled from 'styled-components';

export interface IInputCopyProps {
    text: string;
    className?: string;
    onMouseOver?: (e: React.MouseEvent<HTMLButtonElement>, changeActive: () => void) => void;
    onMouseOut?: (e: React.MouseEvent<HTMLButtonElement>, changeInActive: () => void) => void;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>, changeShowCopy: () => void, changeHiddenCopy: () => void) => void
}

export default function InputCopy(props: IInputCopyProps) {
    const { text, className, onMouseOver, onMouseOut, onClick } = props;
    const [isActive, setIsActive] = React.useState(false);
    const [isCopied, setIsCopied] = React.useState(false);

    const changeActive = () => {
        setIsActive(true);
    };

    const changeInActve = () => {
        setIsActive(false);
    };

    const changeShowCopy = () => {
        setIsCopied(true);
    };

    const changeHiddenCopy = () => {
        setIsCopied(false);
    };
    return (
        <Container 
        onClick={(e) => {
            if (onClick) {
                onClick(e , changeShowCopy, changeHiddenCopy)
            }
        }}

        onMouseOver={(e) => {
            if (onMouseOver) {
                onMouseOver(e, changeActive)
            }
        }}
        onMouseOut={(e) => {
            if (onMouseOut) {
                onMouseOut(e, changeInActve)
            }
        }}

         className={className}
         >
            <div className="icon-arrow">
                <ArrowLeftCopyIcon />
            </div>
            <div className="text">{text}</div>
            {isActive && (
                <div className="icon-copy">
                    <CopyIcon />
                </div>
            )}
            {isCopied &&
                <div className="copied-text">
                    Copied!
                </div>
            }
            
        </Container>
    );
}

const Container = styled.button`
    background-color: transparent;
    padding: 5px 9px;
    border-radius: 3px;
    border: 1px solid rgb(219, 219, 219);
    color: #262626;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
    display: flex;
    align-items: center;
    position: relative;
    padding-right: 30px;
    padding-left: 20px;

    &:hover {
        background: hsl(120, 100%, 93%);
        /* border-color: #00C642; */
    }
    .copied-text {
        position: absolute;
        right: -60px;
        top: 50%;
        transform: translateY(-50%);
        color: red
    }

    .icon-arrow {
        width: 12px;
        height: 12px;
        transform: translateY(-50%);
        top: 50%;
        left: 8px;
        position: absolute;
        display: flex;
        align-items: center;
    }

    .icon-copy {
        width: 12px;
        height: 12px;
        /* margin-left: 10px; */
        position: absolute;
        right: 3px;
        top: 50%;
        transform: translateY(-50%);
    }
`;
