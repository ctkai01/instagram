import { Grid } from '@material-ui/core';
import * as React from 'react';
import { PostList } from '../Components/Posts/PostList';
import { FooterSideBar } from '../Components/Sidebar/FooterSideBar';
import { SuggestForYou } from '../Components/Sidebar/SuggestForYou';
import { SwitchAccount } from '../Components/Sidebar/SwitchAccount';
import StoriesList from '../Components/Stories/StoriesList';

export interface IHomeProps {}

export function Home(props: IHomeProps) {
    return (
        <Grid container justifyContent="space-between" style={{ paddingTop: '30px' }}>
            <Grid item lg={8}>
                <StoriesList />
                <PostList />
            </Grid>
            <Grid item lg={4} style={{ position: 'fixed', right: '20.1%' }}>
                <SwitchAccount />
                <SuggestForYou />
                <FooterSideBar/>
            </Grid>
        </Grid>
    );
}
