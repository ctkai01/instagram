import { Grid } from '@mui/material';
import * as React from 'react';
import styled from 'styled-components';
import ContentChat from '../Components/ContentChat';
import SideBarMessage from '../Components/SideBarMessage';

export interface IMainMessageProps {}

export default function MainMessage(props: IMainMessageProps) {
    return (
        <Container
            container
            // justifyContent={!checkShowSuggestion ? 'space-between' : 'center'}
            style={{ paddingTop: '30px', borderRadius: '6px' }}
        >
            <Grid item lg={4}>
                <SideBarMessage/>
            </Grid>
            <Grid item lg={8}>
                <ContentChat/>
            </Grid>
        </Container>
    );
}

const Container = styled(Grid)`
  border-radius: 6px;

`