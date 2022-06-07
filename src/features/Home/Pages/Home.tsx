import { Api, AuthApi } from '@api/authApi';
import { postActions, selectPosts } from '@features/UploadPost/postSlice';
import { Grid } from '@material-ui/core';
import { Post } from '@models/Post';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import * as React from 'react';
import { PostList } from '../Components/Posts/PostList';
import { FooterSideBar } from '../Components/Sidebar/FooterSideBar';
import { SuggestForYou } from '../Components/Sidebar/SuggestForYou';
import { SwitchAccount } from '../Components/Sidebar/SwitchAccount';
import StoriesList from '../Components/Stories/StoriesList';

export interface IHomeProps {}

export function Home(props: IHomeProps) {
    // const [posts, setPosts] = React.useState<Post[]>([]);
    const dispatch = useAppDispatch();
    const posts= useAppSelector(selectPosts);

    React.useEffect(() => {
        dispatch(postActions.fetchData());
    }, [])

    


    console.log(posts);
    return (
        <Grid container justifyContent="space-between" style={{ paddingTop: '30px' }}>
            <Grid item lg={8}>
                <StoriesList />
                <PostList posts={posts}/>
            </Grid>
            <Grid item lg={4} style={{ position: 'fixed', right: '20.1%' }}>
                <SwitchAccount />
                <SuggestForYou />
                <FooterSideBar />
            </Grid>
        </Grid>
    );
}
