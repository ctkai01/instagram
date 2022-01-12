import { Typography } from '@material-ui/core';
import styled from 'styled-components';

export interface IInstagramTitleProps {}

export function InstagramTitle(props: IInstagramTitleProps) {
    return (
        <Container className="title" variant="h6">
            Instagram
        </Container>
    );
}

const Container = styled(Typography)`
    &.title {
        font-size: 56px;
        margin: 32px auto 12px;
        font-family: 'Vujahday Script', cursive;
        text-align: center;
    }
`;
