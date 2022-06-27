import * as React from 'react';
import 'react-loading-skeleton/dist/skeleton.css';
import Skeleton from 'react-loading-skeleton';
import styled from 'styled-components';

export interface ILoadingSuggestForYouProps {
}

export default function LoadingSuggestForYou (props: ILoadingSuggestForYouProps) {
  return (
    <Container>
        <Skeleton className='item-suggest-loading' height={40}/>
        <Skeleton className='item-suggest-loading' height={40}/>
        <Skeleton className='item-suggest-loading' height={40}/>
        <Skeleton className='item-suggest-loading' height={40}/>
        <Skeleton className='item-suggest-loading' height={40}/>
    </Container>
  );
}

const Container = styled.div`
    .item-suggest-loading {
        margin-bottom: 10px;
    }
`
