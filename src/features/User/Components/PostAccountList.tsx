import { CommentIcon, GalleryFull, HeartIcon } from '@components/Icons';
import { MediaType } from '@models/commom';
import { Post } from '@models/Post';
import { Skeleton } from '@mui/material';
import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export interface IPostAccountListProps {
    posts?: Post[];
}

export default function PostAccountList(props: IPostAccountListProps) {
    const { posts } = props;
    return (
        <Container>
            {posts ? (
                posts.map((post, index) => (
                    <div className="item-post">
                        <Link className="link-redirect" to="a">
                            <img
                                src={
                                    post.media[0].type === MediaType.image
                                        ? post.media[0].name
                                        : post.media[0].cover_name
                                }
                                alt=""
                                className="img"
                            />
                            <div className="icon-container">
                                <GalleryFull />
                            </div>
                            <div className="modal-container">
                                <div className="count-container">
                                    <div className="icon-item">
                                        <HeartIcon className="icon" color="white" />
                                        <div className="count">39.4K</div>
                                    </div>
                                    <div className="icon-item">
                                        <CommentIcon className="icon" color="white" />
                                        <div className="count">83</div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))
            ) : (
                <div style={{ display: 'flex', gap: '35px' }}>
                    <Skeleton width={300} height={300} />
                    <Skeleton width={300} height={300} />
                    <Skeleton width={300} height={300} />
                </div>
            )}
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 35px;

    .item-post {
        /* margin: 30px; */
        /* flex: 1 0 0%; */
        width: 300px;
        height: 300px;
        /* height: 293px; */
        /* margin-right: 28px; */
        position: relative;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .modal-container {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        pointer-events: none;
        display: none;
        background-color: rgba(0, 0, 0, 0.3);

        .count-container {
            display: flex;
        }

        .icon-item {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 10px;

            .icon {
                margin-right: 6px;
            }

            .count {
                color: #fff;
                font-weight: 600;
                font-size: 16px;
            }
        }
    }

    .icon-container {
        position: absolute;
        right: 8px;
        top: 8px;
        pointer-events: none;
    }

    .link-redirect:hover .modal-container {
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;
