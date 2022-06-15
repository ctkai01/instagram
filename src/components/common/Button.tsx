import * as React from 'react';
import styled from 'styled-components';

export interface IButtonProps {
    children?: React.ReactNode;
    style?: 'primary' | 'border';
    handleOnClick?: () => void
}

interface ButtonStyledProps {
    color: string;
    backGround: string;
    border: boolean
}

const defaultProps: Partial<IButtonProps> = {
    style: 'primary',
};
export function Button(props: IButtonProps) {
    props = { ...defaultProps, ...props };

    const { children, style, handleOnClick } = props;

    let color = '#fff';
    let backGround = '#000';
    let border = false
    if (style === 'primary') {
        color = '#fff';
        backGround = '#0095f6';
    } else if ('border') {
        color = '#262626';
        backGround = '#fff';
        border = true
    }

    return (
        <Container onClick={handleOnClick} backGround={backGround} color={color} border={border}>
            {children}
        </Container>
    );
}

const Container = styled.button<ButtonStyledProps>`
    color: ${(props) => `${props.color}`};
    background-color: ${(props) => `${props.backGround}`};
    font-weight: 600;
    border: ${(props) => `${props.border ? '1px solid rgb(219, 219, 219)' : 'none'}`};;
    border-radius: 4px;
    padding: 5px 9px;
    font-size: 14px;
    height: min-content;
    cursor: pointer;
`;
