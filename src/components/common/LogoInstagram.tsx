import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface ILogoInstagram {
    className?: string;
}

export function LogoInstagram(props: ILogoInstagram) {
    const { className } = props;
    return (
        <Container to={'/'} className={className}>
            <img src={`${process.env.REACT_APP_URL}/images/logo-insta.png`} alt='logo'/>
        </Container>
    );
}

const Container = styled(Link)`
    display: flex;
    align-items: center;
`;
