import * as React from 'react';
import styled from 'styled-components';

export interface ISearchItemLocationProps {
    address: string;
    name: string;
    handleClickLocationItem: (nameLocation: string) => void;
}

export default function SearchItemLocation(props: ISearchItemLocationProps) {
    const { address, name, handleClickLocationItem } = props;
    return (
        <Container onClick={() => handleClickLocationItem(name)}>
            <div className="name">{name}</div>
            <div className="address">{address}</div>
        </Container>
    );
}

const Container = styled.div`
    border-bottom: 1px solid #ccc;
    padding: 2px 16px;
    cursor: pointer;

    &:hover {
        background-color: #afffba;
    }

    &:hover > .address {
        color: #f11f1f;
    }

    .address {
        color: '#c7c7c7';
    }

    .name {
        font-weight: 6000;
    }

    .name,
    .address {
        white-space: nowrap;
        overflow: hidden !important;
        text-overflow: ellipsis;
    }
`;
