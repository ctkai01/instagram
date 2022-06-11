import { CommentIcon, HeartIcon, PlaneIcon, SavePostIcon } from '@components/Icons';
import { Post } from '@models/Post';
import * as React from 'react';
import styled from 'styled-components';
import DetailPost from './DetailPost';

export interface IActionReactPostProps {
    post: Post
    activeShowDetailPost?: boolean
}

const defaultProps : Partial<IActionReactPostProps> = {
    activeShowDetailPost: true
};

export function ActionReactPost(props: IActionReactPostProps) {
    props = { ...defaultProps, ...props };

    const { post, activeShowDetailPost} = props
    const [showModalDetailPost, setShowModalDetailPost] = React.useState<boolean>(false);

    const handleCloseModalDetailPost = () => {
        setShowModalDetailPost(false);
    };

    const handleShowModalDetailPost = () => {
        if (!showModalDetailPost && activeShowDetailPost) {
            setShowModalDetailPost(true);
        }
    };
    return (
        <>
        <Container>
            <div className="first-list">
                <div className="item">
                    <HeartIcon ariaLabel="Like" color="black" className="icon-black" />
                    <HeartIcon ariaLabel="Like" color="gray" className="icon-gray" />
                </div>
                <div className="item" onClick={handleShowModalDetailPost}>
                    <CommentIcon ariaLabel="Comment" color="black" className="icon-black" />
                    <CommentIcon ariaLabel="Comment" color="gray" className="icon-gray" />
                </div>
                {/* <div className="item">
                    <PlaneIcon ariaLabel="Share Post" color="black" className="icon-black" />
                    <PlaneIcon ariaLabel="Share Post" color="gray" className="icon-gray" />
                </div> */}
            </div>
            <div className="second-list ">
                <div className="item">
                    <SavePostIcon ariaLabel="Save" color="black" className="icon-black" />
                    <SavePostIcon ariaLabel="Save" color="gray" className="icon-gray" />
                </div>
            </div>

        </Container>

        <DetailPost post={post} showModalDetailPost={showModalDetailPost} handleCloseModalDetailPost={handleCloseModalDetailPost}/>

        </>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px 8px;
    border-left: 1px solid rgba(219, 219, 219, 1);
    border-right: 1px solid rgba(219, 219, 219, 1);
    .first-list {
        display: flex;
        align-items: center;
    }

    .icon-gray {
        display: none;
    }


    .icon-black {
        display: block;
    }

    .item {
        padding: 8px;
        display: flex;
        align-items: center;
        margin-left: -8px;
        cursor: pointer;

        &:hover .icon-black {
            display: none;
        }
        &:hover .icon-gray {
            display: block;
        }
    }
`;
