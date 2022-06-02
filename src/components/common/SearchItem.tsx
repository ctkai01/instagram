import { CancelIcon, CloseCircleIcon, CloseIcon } from '@components/Icons';
import { ActiveSearchUser, TagUserPost } from '@features/UploadPost/Components/EditPost';
import * as React from 'react';
import styled from 'styled-components';
import { Avatar } from '.';

export interface ISearchItemProps {
    url: string;
    user_name: string;
    full_name: string;
    is_tick?: boolean;
    currentIndexSlider: number;
    activeSearchUser?: ActiveSearchUser;
    is_video?: boolean;
    modeShowTag?: boolean;
    handleDeleteUseTag?: (userName: string, indexSlide: number) => void;
    handleClickUserSearch: (tagUserPost: TagUserPost, indexSlider: number) => void;
}

const defaultProps: Partial<ISearchItemProps> = {
    is_tick: false,
};

export default function SearchItem(props: ISearchItemProps) {
    props = { ...defaultProps, ...props };
    const {
        full_name,
        url,
        user_name,
        currentIndexSlider,
        is_tick,
        activeSearchUser,
        is_video,
        modeShowTag,
        handleDeleteUseTag,
        handleClickUserSearch,
    } = props;
    return (
        <Container
            onClick={() => {
                const dataUserSearch: TagUserPost = {
                    user_name,
                    full_name,
                    url,
                };

                if (!is_video) {
                    dataUserSearch['x'] = activeSearchUser ? activeSearchUser.x : 0;
                    dataUserSearch['y'] = activeSearchUser ? activeSearchUser.y : 0;
                }

                if (!modeShowTag) {
                    handleClickUserSearch(dataUserSearch, currentIndexSlider);
                }
            }}
        >
            <Avatar border="none" className="avatar" size="medium_center" url={url} />
            <div className="info-user">
                <div className="user_name">
                    {user_name}
                    {is_tick && <div className="tick"></div>}
                </div>
                <div className="full_name">{full_name}</div>
            </div>
            {(is_video && handleDeleteUseTag) && (
                <button className="btn-delete-tag" onClick={() => handleDeleteUseTag(user_name, currentIndexSlider)}>
                    <CloseIcon size={16} color="black" />
                </button>
            )}
        </Container>
    );
}

const Container = styled.div`
    padding: 8px 16px;
    display: flex;
    align-items: center;
    .avatar {
        margin-right: 10px;
    }

    .btn-delete-tag {
        border: none;
        background: none;
        cursor: pointer;
    }

    .info-user {
        flex: 3;

        .tick {
            background-image: ${(props) => `url(${window.location.origin}/images/bgIcon.png)`};
            background-repeat: no-repeat;
            background-position: -552px -534px;
            height: 12px;
            width: 12px;
        }

        .user_name {
            display: flex;
            color: #262626;
            font-weight: 600;
            align-items: center;
        }

        .full_name {
            color: #8e8e8e;
        }

        .user_name,
        .full_name {
            /* display: inline-block; */
            width: 200px;
            white-space: nowrap;
            overflow: hidden !important;
            text-overflow: ellipsis;
        }
    }
`;
