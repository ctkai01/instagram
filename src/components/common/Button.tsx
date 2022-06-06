import * as React from 'react';
import styled from 'styled-components';

export interface IButtonProps {
    children?: React.ReactNode;
    style?: 'primary';
}

interface ButtonStyledProps {
    color: string;
    backGround: string;
}

const defaultProps: Partial<IButtonProps> = {
    style: 'primary',
};
export function Button(props: IButtonProps) {
    props = { ...defaultProps, ...props };

    const { children, style } = props;

    let color = '#fff';
    let backGround = '#000';
    if (style === 'primary') {
        color = '#fff';
        backGround = '#0095f6';
    }

    return (
        <Container backGround={backGround} color={color}>
            {children}
        </Container>
    );
}

const Container = styled.button<ButtonStyledProps>`
    color: ${(props) => `${props.color}`};
    background-color: ${(props) => `${props.backGround}`};
    font-weight: 600;
    border: none;
    border-radius: 4px;
    padding: 5px 9px;
    font-size: 14px;
`;
