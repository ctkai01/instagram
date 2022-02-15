import * as React from 'react';
// import styled from 'styled-components';
import styled, { createGlobalStyle } from 'styled-components'

export interface IModalProps {
    showModal: boolean;
    onCloseModal: () => void;
    content?: JSX.Element;
    color?: string;
}

const GlobalStyle = createGlobalStyle<Partial<IModalProps>>`
body {
    overflow: ${props => (props.showModal && props.color ? 'hidden' : 'auto')};
}`

export function Modal(props: IModalProps) {
    const { showModal, onCloseModal, content, color } = props;
    
    return (
        <>
            {showModal && (
                <Container>
                    <div className='modal' onClick={onCloseModal} style={{ backgroundColor: color ? color : '' }}/>
                    <div className="content">{content}</div>
                    <GlobalStyle color={color} showModal={showModal}/>
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
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;

    .modal {
        width: 100%;
        height: 100%;
        position: fixed;
    }

    .content {
        position: fixed;
  
    }
`;
