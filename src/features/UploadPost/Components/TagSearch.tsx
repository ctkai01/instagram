import { Api } from '@api/authApi';
import Loading from '@components/common/Loading';
import LoadingSpecify from '@components/common/LoadingSpecify';
import SearchItem from '@components/common/SearchItem';
import { Status } from '@constants/status';
import { debounce, StringIterator } from 'lodash';
import * as React from 'react';
import styled from 'styled-components';
import { ActiveSearchUser, TagUserPost } from './EditPost';

export interface ITagSearchProps {
    activeSearchUser: ActiveSearchUser;
    currentIndexSlider: number;
    imageArea: Position;
    handleClickUserSearch: (tagUser: TagUserPost, indexSlider: number) => void;
}

export interface Position {
    x: number;
    y: number;
}
interface TagSearchContainer {
    url: string;
    activeSearchUser: ActiveSearchUser;
}

export interface SearchTag {
    id: number;
    avatar: string;
    user_name: string;
    is_tick: Status;
    name: string;
}

export default function TagSearch(props: ITagSearchProps) {
    const { activeSearchUser, imageArea, currentIndexSlider, handleClickUserSearch } = props;
    const [textSearchTag, setTextSearchTag] = React.useState('');
    const [listSearch, setListSearch] = React.useState<SearchTag[]>([]);
    const [isSearch, setIsSearch] = React.useState<boolean>(false);
    const handleCLoseTextSearch = () => {
        setTextSearchTag('');
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTextSearchTag(e.target.value);
    };

    const searchTag = async (value: string) => {
        setIsSearch(true);
        const response = await Api.searchUser(value);
        setIsSearch(false);
        setListSearch(response.data);
    };

    const debounceSearch = React.useCallback(debounce(searchTag, 1000), []);

    React.useEffect(() => {
        debounceSearch(textSearchTag);
    }, [textSearchTag]);

    return (
        <Container url={window.location.origin} activeSearchUser={activeSearchUser}>
            <div className="arrow-top"></div>
            <div className="header-tag">
                <div className="header-tag-text">Tag:</div>
                <input
                    onChange={handleSearchChange}
                    value={textSearchTag}
                    placeholder="Search"
                    className="input-search"
                />
                {(textSearchTag && !isSearch)&& (
                    <button onClick={handleCLoseTextSearch} className="button-close-search">
                        <span></span>
                    </button>
                )}
                {isSearch && <LoadingSpecify size='small'/>}
            </div>
            <div className="list_search">
                {isSearch && <LoadingSpecify/>}
                {!isSearch && listSearch.map((user) => (
                    <SearchItem
                        handleClickUserSearch={handleClickUserSearch}
                        full_name={user.name}
                        user_name={user.user_name}
                        currentIndexSlider={currentIndexSlider}
                        activeSearchUser={activeSearchUser}
                        imageArea={imageArea}
                        url={user.avatar}
                        is_tick={user.is_tick}
                    />
                ))}
                {/* <SearchItem
                    handleClickUserSearch={handleClickUserSearch}
                    full_name="Lai Quang Nam"
                    user_name="ctkaino1"
                    currentIndexSlider={currentIndexSlider}
                    activeSearchUser={activeSearchUser}
                    url="http://localhost:3000/images/bgIcon.png"
                />
                <SearchItem
                    handleClickUserSearch={handleClickUserSearch}
                    activeSearchUser={activeSearchUser}
                    currentIndexSlider={currentIndexSlider}
                    full_name="Lai Quang Nam"
                    user_name="ctkaino2"
                    url="http://localhost:3000/images/bgIcon.png"
                />
                <SearchItem
                    handleClickUserSearch={handleClickUserSearch}
                    activeSearchUser={activeSearchUser}
                    currentIndexSlider={currentIndexSlider}
                    full_name="Lai Quang Nam"
                    user_name="ctkaino3"
                    url="http://localhost:3000/images/bgIcon.png"
                />
                <SearchItem
                    handleClickUserSearch={handleClickUserSearch}
                    activeSearchUser={activeSearchUser}
                    currentIndexSlider={currentIndexSlider}
                    full_name="Lai Quang Nam"
                    user_name="ctkaino4"
                    url="http://localhost:3000/images/bgIcon.png"
                /> */}
            </div>
        </Container>
    );
}

const Container = styled.div<TagSearchContainer>`
    position: absolute;
    top: ${(props) => `${props.activeSearchUser.y + 8}px`};
    left: ${(props) => `${props.activeSearchUser.x - 28}px`};
    background-color: #fff;
    height: 226px;
    width: 338px;
    border-radius: 8px;
    z-index: 999999;
    box-shadow: 0 0 5px 1px rgb(0 0 0 / 10%);
    transform-style: preserve-3d;
    cursor: initial;
    .arrow-top {
        border: 1px solid #ccc;
        box-shadow: 0 0 5px 1px rgb(0 0 0 / 10%);
        height: 14px;
        position: absolute;
        -webkit-transform: rotate(45deg);
        transform: translateZ(-1px) rotate(45deg);
        width: 14px;
        background-color: #fff;
        left: 18px;
        top: -6px;
    }

    .list_search {
        height: 180px;
        overflow-x: hidden;
        overflow-y: scroll;
    }

    .header-tag {
        padding: 6px 8px;
        display: flex;
        border-bottom: solid 1px #dbdbdb;
        border-radius: 10px;

        .button-close-search {
            background: 0 0;
            border: 0;
            cursor: pointer;
            span {
                display: block;
                border: 0;
                background-position: -553px -77px;
                height: 20px;
                width: 20px;
                background-repeat: no-repeat;
                background-image: ${(props) => `url(${props.url}/images/bgIcon.png)`};
            }
        }

        .header-tag-text {
            padding: 4px 12px;
            /* flex: 1; */
            color: #262626;
            font-size: 16px;
            font-weight: 700;
            display: inline-block;
            line-height: 24px;
        }

        .input-search {
            padding: 4px 12px;
            padding-left: 0;
            border: none;
            outline: none;
            flex: 4;

            &::placeholder {
                font-size: 16px;
            }
        }
    }
`;
