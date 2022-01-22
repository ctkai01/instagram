import * as React from 'react';
import styled from 'styled-components';

export interface IModalProps {
    showModal: boolean;
    onCloseModal: () => void
}

export function Modal(props: IModalProps) {
    const { showModal, onCloseModal } = props;
    
    return <>{showModal && <Container className='ha' onClick={onCloseModal} />}</>;
}

const Container = styled.div`
    bottom: 0;
    left: 0;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 2;
`;
