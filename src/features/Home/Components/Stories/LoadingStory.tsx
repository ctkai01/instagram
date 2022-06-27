import { Skeleton } from '@mui/material';
import * as React from 'react';
import styled from 'styled-components';

export interface ILoadingStoryProps {}

export default function LoadingStory(props: ILoadingStoryProps) {
    return (
        <Container>
            {[1,2,3,4,5,6,7].map((el, index) => (
                <div key={index}>
                    <Skeleton variant="circular" width={66} height={66} />
                    <Skeleton width={66} height={20} />
                </div>
            ))}
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;

`