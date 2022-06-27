import * as React from 'react';
import styled from 'styled-components';
import 'react-loading-skeleton/dist/skeleton.css';
import Skeleton from 'react-loading-skeleton';

export interface IPostLoadingProps {}

export default function PostLoading(props: IPostLoadingProps) {
    return (
        <Container>
            {[1, 2, 3, 4].map((el, index) => (
                <div key={index} className="item-loading">
                    <Skeleton className="header-loading" height={500} />
                    <Skeleton className="body-loading" height={50} />
                </div>
            ))}
        </Container>
    );
}

const Container = styled.div`
    width: 100%;

    .item-loading {
        margin-bottom: 50px;

    }

    .header-loading {
        margin-bottom: 10px;
    }
`;
