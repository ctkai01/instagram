import { ActiveSearchUser, TagUserPost } from '@features/UploadPost/Components/EditPost';
import * as React from 'react';
import styled from 'styled-components';
import { Avatar } from '.';

export interface ISearchItemProps {
    url: string;
    user_name: string;
    full_name: string;
    is_tick?: boolean;
    activeSearchUser: ActiveSearchUser;
    handleClickUserSearch: (tagUserPost: TagUserPost) => void;
}

const defaultProps: Partial<ISearchItemProps> = {
    is_tick: false,
};

export default function SearchItem(props: ISearchItemProps) {
    props = { ...defaultProps, ...props };
    const { full_name, url, user_name, is_tick, activeSearchUser, handleClickUserSearch } = props;
    return (
        <Container
            onClick={() =>
                handleClickUserSearch({
                    user_name,
                    x: activeSearchUser.x,
                    y: activeSearchUser.y,
                })
            }
        >
            <Avatar
                border="none"
                className="avatar"
                size="medium_center"
                url={url}
            />
            <div className="info-user">
                <div className="user_name">
                   {user_name}
                    {is_tick && <div className="tick"></div>}
                </div>
                <div className="full_name">{full_name}</div>
            </div>
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
