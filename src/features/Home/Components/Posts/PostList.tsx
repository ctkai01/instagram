import { selectIsLoading } from '@features/UploadPost/postSlice';
import { Post } from '@models/Post';
import { User } from '@models/User';
// import { Skeleton } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import * as React from 'react';
import Skeleton from 'react-loading-skeleton';
import styled from 'styled-components';
import PostItem from './PostItem';
import PostLoading from './PostLoading';
export interface IPostListProps {
    posts: Post[];
    handleChangeReactPost: (post: Post) => void;
    handleFollowUserPost: (post: Post, userChange: User) => void;
}

// interface VideoRef {
//     post
// }
export function PostList(props: IPostListProps) {
    const { posts, handleChangeReactPost, handleFollowUserPost } = props;

    const videoRefs = React.useRef<any>({});
    const currentVideoRef = React.useRef(null);
    const [currentPost, setCurrentPost] = React.useState(null);
    const [postInViewport, setPostInViewport] = React.useState<Post>();
    const [isPlay, setIsPlay] = React.useState<boolean>(false);

    const setVideoRefByPostId = (postId: number, ref: HTMLVideoElement | null) => {
        videoRefs.current[postId] = ref;
    };

    const getVideoRefByPostId = (postId: number) => {
        return videoRefs.current[postId];
    };

    const handleSetPlay = () => {
        setIsPlay(true);
    };

    const handleSetPause = () => {
        setIsPlay(false);
    };

    const loadingPost = useAppSelector(selectIsLoading);

    const handleWaypointEnter = (post: Post) => {
        console.log('ENTER WAYPOINT', post);
        console.log('VIDEO', videoRefs);
        if (currentPost) return;
        // stopWhenPaused.current = true
        // getVideoRefByPostId(post.id).load()
        getVideoRefByPostId(post.id).play();
        setIsPlay(false);

        // setPostInViewport(post)
    };

    const handleWaypointLeave = (post: Post) => {
        // Don't auto play videos in background
        // when post detail modal is opened
        console.log('Leave WAYPOINT', post);
        console.log('VIDEO', videoRefs);
        if (currentPost) return;
        // stopWhenPaused.current = true
        videoRefs.current[post.id].currentTime = 0;
        getVideoRefByPostId(post.id).pause();
        setIsPlay(true);

        // setPostInViewport(post)
    };

    const handleVideoRef = (ref: HTMLVideoElement | null, post: Post) => {
        setVideoRefByPostId(post.id, ref);
    };

    return (
        <Container>
            {loadingPost ? (
                <PostLoading />
            ) : (
                posts.map((post, index) => (
                    <PostItem
                        key={index}
                        post={post}
                        isPlay={isPlay}
                        handleFollowUserPost={handleFollowUserPost}
                        handleChangeReactPost={handleChangeReactPost}
                        handleSetPlay={handleSetPlay}
                        handleSetPause={handleSetPause}
                        onWaypointEnter={handleWaypointEnter}
                        onWaypointLeave={handleWaypointLeave}
                        getVideoRef={handleVideoRef}
                    />
                ))
            )}
        </Container>
    );
}

const Container = styled.div`
    background-color: #fafafa;

    display: flex;
    flex-direction: column;
`;
