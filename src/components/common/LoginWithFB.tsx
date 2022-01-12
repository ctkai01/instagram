import * as React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import FacebookIcon from '@material-ui/icons/Facebook';
import { Typography } from '@material-ui/core';

export interface ILoginWithFBProps {
    text: string;
    className?: string;
    colorIcon?: string;
}

export function LoginWithFB(props: ILoginWithFBProps) {
    const { text, className, colorIcon } = props;
    const theme = {
        color: colorIcon ? colorIcon : '#385185',
    };
    return (
        <ThemeProvider theme={theme}>
            <Wrapper className={className}>
                <FacebookIcon className="icon" />
                <Typography component="span">{text}</Typography>
            </Wrapper>
        </ThemeProvider>
    );
}

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    .icon {
        /* color: #385185; */
        color: ${(props) => props.theme.color};
        margin-right: 6px;
    }

    span {
        font-weight: 500;
    }
`;
