import { CommentIcon, GalleryFull, HeartIcon } from '@components/Icons';
import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export interface IPostAccountListProps {}

export default function PostAccountList(props: IPostAccountListProps) {
    return (
        <Container>
            {Array.from(Array(7).keys()).map((el, index) => (
                <div className="item-post">
                    <Link className="link-redirect" to="a">
                        <img
                            src={`https://picsum.photos/300/300?random=${el + 1}`}
                            alt=""
                            className="img"
                        />
                        <div className="icon-container">
                            <GalleryFull />
                        </div>
                        <div className="modal-container">
                            <div className="count-container">
                                <div className="icon-item">
                                    <HeartIcon className='icon' color='white'/>
                                    <div className="count">39.4K</div>
                                </div>
                                <div className="icon-item">
                                    <CommentIcon className='icon' color='white'/>
                                    <div className="count">83</div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            ))}
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