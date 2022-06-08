import { Post } from '@models/Post';
import * as React from 'react';
import styled from 'styled-components';
import PostItem from './PostItem';

export interface IPostListProps {
    posts: Post[]
}

// interface VideoRef {
//     post
// }
export function PostList(props: IPostListProps) {
    const { posts } = props;

    const videoRefs = React.useRef<any>({})
    const currentVideoRef = React.useRef(null)
    const [currentPost, setCurrentPost] = React.useState(null)
    const [postInViewport, setPostInViewport] = React.useState<Post>()
    const [isPlay, setIsPlay] = React.useState<boolean>(false);

    const setVideoRefByPostId = (postId: number, ref: HTMLVideoElement | null) => {
        videoRefs.current[postId] = ref
    }

    const getVideoRefByPostId = (postId: number) => {
        return videoRefs.current[postId]
    }

    // const getCurrentPostIndex = () => {
    //     // @ts-ignore: Object is possibly 'null'.
    //     return posts.findIndex(post => post.id === currentPost.id)
    // }

    // const scrollPostIntoView = React.useCallback((post: Post) => {
    //     const videoRef = getVideoRefByPostId(post.id)
    //     if (videoRef) {
    //         videoRef.scrollIntoView({ block: 'center' })
    //     }
    // }, [])
    
    const handleSetPlay = () => {
        setIsPlay(true)
    }

    const handleSetPause = () => {
        setIsPlay(false)
    }

    const handleWaypointEnter = (post: Post) => {
        // Don't auto play videos in background
        // when post detail modal is opened
        console.log('ENTER WAYPOINT', post)
        console.log('VIDEO', videoRefs)
        if (currentPost) return
        // stopWhenPaused.current = true
        // getVideoRefByPostId(post.id).load()
        getVideoRefByPostId(post.id).play()
        setIsPlay(false)

        // setPostInViewport(post)
    }

    const handleWaypointLeave= (post: Post) => {
        // Don't auto play videos in background
        // when post detail modal is opened
        console.log('Leave WAYPOINT', post)
        console.log('VIDEO', videoRefs)
        if (currentPost) return
        // stopWhenPaused.current = true
        videoRefs.current[post.id].currentTime = 0
        getVideoRefByPostId(post.id).pause()
        setIsPlay(true)


        // setPostInViewport(post)
    }


    // React.useEffect(() => {
    //     if (!currentPost) return
    //     scrollPostIntoView(currentPost)
    // }, [currentPost, scrollPostIntoView])

    const handleVideoRef = (ref: HTMLVideoElement | null, post: Post) => {
        setVideoRefByPostId(post.id, ref)
    }

    return (
        <Container>
            {posts.map((post, index) => (
                <PostItem
                    key={index}
                    post={post}
                    isPlay={isPlay}
                    handleSetPlay={handleSetPlay}
                    handleSetPause={handleSetPause}
                    onWaypointEnter={handleWaypointEnter}
                    onWaypointLeave={handleWaypointLeave}
                    getVideoRef={handleVideoRef}
                />
            ))}
        </Container>
    );
}

const Container = styled.div`
    background-color: #fafafa;
`;
