import { Grid } from '@material-ui/core';
import * as React from 'react';
import StoriesList from '../Components/StoriesList';

export interface IHomeProps {}

export function Home(props: IHomeProps) {
    return (
        <Grid container justifyContent='space-between' style={{ paddingTop: '30px' }}>
            <Grid item lg={8}>
                <StoriesList/>

            </Grid>
            <Grid item lg={4} style={{ paddingLeft: '28px' }}>Sidebar</Grid>
        </Grid>
    );
}
