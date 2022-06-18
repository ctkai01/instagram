import { ThereDotIcon } from '@components/Icons';
import * as React from 'react';
import styled from 'styled-components';

export interface IActionPostProps {
    className?: string;
    handleShowActionModal: () => void;

}

export function ActionPost (props: IActionPostProps) {
    const { className, handleShowActionModal } = props
  return (
    <Container onClick={handleShowActionModal} className={className}>
        <ThereDotIcon ariaLabel='More options'/>
    </Container>
  );
}


const Container = styled.div`
    padding: 14px;
    padding-right: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`
