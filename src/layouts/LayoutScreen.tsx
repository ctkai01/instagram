import { Container, makeStyles } from '@material-ui/core';
import React, { ReactChild, ReactChildren } from 'react';

export interface ILayoutScreenProps {
    children: ReactChild | ReactChild[] | ReactChildren | ReactChildren[];
    className?: string;
}

const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.up('md')]: {
            maxWidth: '1050px',
            padding: '0 20px',
        },
    },
}));

export function LayoutScreen(props: ILayoutScreenProps) {
    const classes = useStyles();
    const { children, className } = props;
    return (
        <Container maxWidth="md" className={`${classes.root} ${className}`}>
            {children}
        </Container>
    );
}
