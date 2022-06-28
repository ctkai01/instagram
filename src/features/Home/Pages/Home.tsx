import { Api } from '@api/authApi';
import { selectUserAuth } from '@features/Auth/authSlice';
import { postActions, selectPosts, UserPost } from '@features/UploadPost/postSlice';
import { Grid } from '@material-ui/core';
import { Post } from '@models/Post';
import { User } from '@models/User';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import * as React from 'react';
import { PostList } from '../Components/Posts/PostList';
import { FooterSideBar } from '../Components/Sidebar/FooterSideBar';
import { SuggestForYou } from '../Components/Sidebar/SuggestForYou';
import { SwitchAccount } from '../Components/Sidebar/SwitchAccount';
import ModalCreateStory from '../Components/Stories/CreateStory/ModalCreateStory';
import StoriesList from '../Components/Stories/StoriesList';
import SuggestionsForYou from '../Components/SuggestionsForYou';
import { selectStories, storyActions } from '../storySlice';

export interface IHomeProps {}

export function Home(props: IHomeProps) {
    const [usersSuggest, setUsersSuggest] = React.useState<User[]>([]);
    const [checkShowSuggestion, setCheckShowSuggestion] = React.useState<boolean>(false);
    const dispatch = useAppDispatch();
    const posts = useAppSelector(selectPosts);
    const storyUser = useAppSelector(selectStories);
    const userAuth = useAppSelector(selectUserAuth);
    // const checkShowSuggestion =
    const [showCreateStory, setShowCreateStory] = React.useState(false);
    const [loadingSuggestForYou, setLoadingSuggestForYou] = React.useState(false);

    React.useEffect(() => {
        // Promise.all([dispatch(postActions.fetchData()), dispatch(storyActions.fetchData())])
        setLoadingSuggestForYou(true)
        dispatch(postActions.fetchData())
        const fetchUserSuggested = async () => {
            const responseCheckFollowing = await Api.checkHasFollowing();

            const checkShowSuggest =
                !posts.find((post) => post.created_by.id === userAuth.id) &&
                !responseCheckFollowing.data;

            setCheckShowSuggestion(checkShowSuggest);
            if (!checkShowSuggest) {
                const response = await Api.usersSuggested(5);
                setUsersSuggest(response.data);
            } else {
                const response = await Api.usersSuggested(20);
                setUsersSuggest(response.data);
            }
            setLoadingSuggestForYou(false)

        };

        const featchAll = async () => {
            await  Promise.all([fetchUserSuggested(), dispatch(storyActions.fetchData())])
        }
        featchAll()

        // fetchUserSuggested();
    }, []);

    console.log('SUGGEST', usersSuggest);

    console.log('checkShowSuggestion', checkShowSuggestion);
    const handleChangeUserSuggested = (userChanged: User) => {
        setUsersSuggest((usersSuggest) => {
            const cloneUsersSuggest = [...usersSuggest];
            const checkUserExist = cloneUsersSuggest.find(
                (cloneUserSuggest) => cloneUserSuggest.id === userChanged.id
            );
            if (checkUserExist) {
                checkUserExist.is_following = userChanged.is_following;
                checkUserExist.count_follower = userChanged.count_follower;
                checkUserExist.count_following = userChanged.count_following;
                cloneUsersSuggest[
                    cloneUsersSuggest.findIndex(
                        (cloneUserSuggest) => cloneUserSuggest.id === userChanged.id
                    )
                ] = checkUserExist;

                return cloneUsersSuggest;
            } else {
                return cloneUsersSuggest;
            }
        });
    };

    const handleChangeReactPost = (post: Post) => {
        dispatch(postActions.changeDataPost(post));
    };

    const handleFollowUserPost = (post: Post, userChange: User) => {
        const data: UserPost = {
            post,
            user: userChange,
        };
        dispatch(postActions.changeDataUserPost(data));
    };

    const handleShowCreateStory = () => {
        setShowCreateStory(true);
    };

    const handleCloseCreateStory = () => {
        setShowCreateStory(false);
        console.log('WTF')
    };

    return (
        <Grid
            container
            justifyContent={!checkShowSuggestion ? 'space-between' : 'center'}
            style={{ paddingTop: '30px' }}
        >
            {!checkShowSuggestion ? (
                <>
                    <Grid item lg={8}>
                        {/* <Modal
                            closeButton
                            content={
                                <div>11</div>
                            }
                            color="rgba(0, 0, 0, 0.65)"
                            showModal={showCreateStory}
                            onCloseModal={handleCloseCreateStory}
                        /> */}
                        <ModalCreateStory showCreateStory={showCreateStory} handleCloseCreateStory={handleCloseCreateStory}/>
                        <StoriesList storyUser={storyUser} handleShowCreateStory={handleShowCreateStory}/>
                        <PostList
                            handleChangeReactPost={handleChangeReactPost}
                            handleFollowUserPost={handleFollowUserPost}
                            posts={posts}
                        />
                    </Grid>
                    <Grid item lg={4} style={{ position: 'fixed', right: '20.1%' }}>
                        <SwitchAccount />
                        <SuggestForYou handleChangeUserSuggested={handleChangeUserSuggested} usersSuggest={usersSuggest} loadingSuggestForYou={loadingSuggestForYou}/>
                        <FooterSideBar />
                    </Grid>
                </>
            ) : (
                <Grid item lg={7}>
                    <SuggestionsForYou
                        handleChangeUserSuggested={handleChangeUserSuggested}
                        usersSuggest={usersSuggest}
                    />
                </Grid>
            )}
        </Grid>
    );
}
