import { Paper, Typography } from '@material-ui/core';
import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export interface IAskAuthProps {
    path: string;
    text: string;
    textLink: string;
}

export function AskAuth(props: IAskAuthProps) {
    const { path, text, textLink } = props;
    return (
        <Container>
            <Typography component='div'>
                {text}
                <Link className='sign-up-link' style={{ color: '#0095f6' }} to={path}> {textLink}</Link>
            </Typography>
        </Container>
    );
}

const Container = styled(Paper)`
    padding: 25px 0;
    text-align: center;
    font-size: 14px;
    box-shadow: none !important;
    border: 1px solid rgba(var(--b6a, 219, 219, 219), 1);

    .sign-up-link {
        color: '#0095f6';
        font-weight: 500;
        text-decoration: none;
    }
`;
