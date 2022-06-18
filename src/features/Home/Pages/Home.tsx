import { Api, AuthApi } from '@api/authApi';
import { selectUserAuth } from '@features/Auth/authSlice';
import { postActions, selectPosts } from '@features/UploadPost/postSlice';
import { Grid } from '@material-ui/core';
import { Post } from '@models/Post';
import { User } from '@models/User';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import * as React from 'react';
import { PostList } from '../Components/Posts/PostList';
import { FooterSideBar } from '../Components/Sidebar/FooterSideBar';
import { SuggestForYou } from '../Components/Sidebar/SuggestForYou';
import { SwitchAccount } from '../Components/Sidebar/SwitchAccount';
import StoriesList from '../Components/Stories/StoriesList';
import SuggestionsForYou from '../Components/SuggestionsForYou';

export interface IHomeProps {}

export function Home(props: IHomeProps) {
    const [usersSuggest, setUsersSuggest] = React.useState<User[]>([]);
    const dispatch = useAppDispatch();
    const posts = useAppSelector(selectPosts);
    const userAuth = useAppSelector(selectUserAuth);
    const checkPostUser = posts.find((post) => post.created_by.id === userAuth.id);

    React.useEffect(() => {
        dispatch(postActions.fetchData());

        const fetchUserSuggested = async () => {
            if (checkPostUser) {
                const response = await Api.usersSuggested(5);
                setUsersSuggest(response.data);
            } else {
                const response = await Api.usersSuggested(20);
                setUsersSuggest(response.data);
            }
        };

        fetchUserSuggested();
    }, []);

    console.log('SUGGEST', usersSuggest);

    return (
        <Grid
            container
            justifyContent={checkPostUser ? 'space-between' : 'center'}
            style={{ paddingTop: '30px' }}
        >
            {checkPostUser ? (
                <>
                    <Grid item lg={8}>
                        <StoriesList />
                        <PostList posts={posts} />
                    </Grid>
                    <Grid item lg={4} style={{ position: 'fixed', right: '20.1%' }}>
                        <SwitchAccount />
                        <SuggestForYou usersSuggest={usersSuggest} />
                        <FooterSideBar />
                    </Grid>
                </>
            ) : (
                <Grid item lg={7}>
                    <SuggestionsForYou usersSuggest={usersSuggest}/>
                </Grid>
            )}
        </Grid>
    );
}
