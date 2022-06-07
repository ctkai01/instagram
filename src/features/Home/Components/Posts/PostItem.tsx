import { MediaType } from '@models/commom';
import { Post } from '@models/Post';
import * as React from 'react';
import { Waypoint } from 'react-waypoint';
import styled from 'styled-components';
import { ActionReactPost } from './ActionReactPost';
import { ContentPost } from './ContentPost';
import { Header } from './Header';
import PhotoList from './PhotoList';

export interface IPostItemProps {
    post: Post;
    getVideoRef: (ref: HTMLVideoElement | null, post: Post) => void;
    onWaypointEnter: (post: Post) => void;
    onWaypointLeave: (post: Post) => void;
}

export default function PostItem(props: IPostItemProps) {
    const { post, getVideoRef, onWaypointEnter, onWaypointLeave } = props;

    const checkFirstVideo = post.media[0].type === MediaType.video;

    return (
        <Container>
            <Header urlImage={post.created_by.avatar} userName={post.created_by.user_name} />
            <PhotoList post={post} getVideoRef={getVideoRef} media={post.media} checkFirstVideo={checkFirstVideo}/>
            <ActionReactPost />
            <ContentPost
                content={post.caption}
                time={post.created_at}
                author={post.created_by.user_name}
            />

            {checkFirstVideo && (
                <Waypoint
                // topOffset={data.computed_top_offset}
                // bottomOffset={data.computed_bottom_offset}
                onEnter={() => onWaypointEnter(post)}
                onLeave={() => onWaypointLeave(post)}
                >
                    <div className="waypoint_item" />
                </Waypoint>
            )}
        </Container>
    );
}

const Container = styled.div`
    background-color: #fff;
    margin-bottom: 24px;
    position: relative;

    .waypoint_item {
        width: 10px;
        height: 10px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 9999;
        background: red;
    }
`;
