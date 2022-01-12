import { Typography } from '@material-ui/core';
import * as React from 'react';
import styled from 'styled-components';
import DownloadApp from './DownloadApp';

export interface IGetAppDownloadProps {}

export default function GetAppDownload(props: IGetAppDownloadProps) {
    return (
        <Container>
            <Typography className="get-app-text" component="div">
                Get the app.
            </Typography>
            <DownloadApp />
        </Container>
    );
}

const Container = styled.div`
    .get-app-text {
        color: #000;
        text-align: center;
        margin-top: 20px;
    }
`;
