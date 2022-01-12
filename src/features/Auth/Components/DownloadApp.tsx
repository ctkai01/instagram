import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export interface IDownloadAppProps {}

export default function DownloadApp(props: IDownloadAppProps) {
    return (
        <Container>
            <Link to="apple" className="icon-app-store">
                <img src="/images/apple-dow.png" alt="" />
            </Link>
            <Link to="google" className="icon-app-ch-play">
                <img src="/images/google-play-dow.png" alt="" />
            </Link>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    img {
        width: 136px;
        height: 40px;
    }

    .icon-app-store {
        margin-right: 10px;
    }
`;
