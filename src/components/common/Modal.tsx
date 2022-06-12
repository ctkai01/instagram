import { CancelIcon } from '@components/Icons';
import * as React from 'react';
// import styled from 'styled-components';
import styled, { createGlobalStyle } from 'styled-components';

export interface IModalProps {
    showModal: boolean;
    onCloseModal: () => void;
    content?: JSX.Element;
    color?: string;
    zIndexDepth?: 'first' | 'second';
    closeButton?: boolean;
}

const GlobalStyle = createGlobalStyle<Partial<IModalProps>>`
body {
    overflow: ${(props) => (props.showModal && props.color ? 'hidden' : 'auto')};
}`;

export function Modal(props: IModalProps) {
    const { showModal, onCloseModal, content, color, zIndexDepth, closeButton } = props;
    let zIndex;
    if (zIndexDepth === 'first' || !zIndexDepth) {
        zIndex = 10000;
    } else if (zIndexDepth === 'second') {
        zIndex = 10001;
    }

    return (
        <>
            {showModal && (
                <Container style={{ zIndex }}>
                    <div
                        className="modal"
                        onClick={onCloseModal}
                        style={{ backgroundColor: color ? color : '' }}
                    />
                    <div className="content">{content}</div>
                    <GlobalStyle color={color} showModal={showModal} />
                    {closeButton && (
                        <div className="button-close" onClick={onCloseModal}>
                            <CancelIcon ariaLabel="Close" />
                        </div>
                    )}
                </Container>
            )}
        </>
    );
}

const Container = styled.div<Partial<IModalProps>>`
    bottom: 0;
    left: 0;
    position: fixed;
    right: 0;
    top: 0;
    /* z-index: 10000; */
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: auto;

    .button-close {
        padding: 8px;
        position: absolute;
        top: 10px;
        right: 14px;
        cursor: pointer;
    }

    .modal {
        width: 100%;
        height: 100%;
        position: fixed;
    }

    .content {
        position: fixed;
    }
`;
