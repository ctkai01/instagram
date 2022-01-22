import { CommentIcon, HeartIcon, PlaneIcon, SavePostIcon } from '@components/Icons';
import * as React from 'react';
import styled from 'styled-components';

export interface IActionReactPostProps {}

export function ActionReactPost(props: IActionReactPostProps) {
    return (
        <Container>
            <div className="first-list">
                    <div className="item">
                        <HeartIcon ariaLabel="Like" color="black" className="icon-black" />
                        <HeartIcon ariaLabel="Like" color="gray" className="icon-gray" />
                    </div>
                <div className="item">
                    <CommentIcon ariaLabel="Comment" color="black" className="icon-black" />
                    <CommentIcon ariaLabel="Comment" color="gray" className="icon-gray" />
                </div>
                <div className="item">
                    <PlaneIcon ariaLabel="Share Post" color="black" className="icon-black" />
                    <PlaneIcon ariaLabel="Share Post" color="gray" className="icon-gray" />
                </div>
            </div>
            <div className="second-list ">
                <div className="item">
                    <SavePostIcon ariaLabel="Save" color="black" className="icon-black" />
                    <SavePostIcon ariaLabel="Save" color="gray" className="icon-gray" />
                </div>
            </div>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px 8px;
    border-left: 1px solid rgba(219,219,219,1);
    border-right: 1px solid rgba(219,219,219,1);
    .first-list {
        display: flex;
        align-items: center;
    }

    .icon-gray {
        display: none;
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
