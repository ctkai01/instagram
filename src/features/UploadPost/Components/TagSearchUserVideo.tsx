import SearchItem from '@components/common/SearchItem';
import * as React from 'react';
import styled from 'styled-components';
import { TagUserPost, TagUsersPost } from './EditPost';

export interface ITagSearchUserVideoProps {
    usersTagPost: TagUsersPost[];
    currentIndexSlider: number;
    modeShowTag: boolean;
    handleDeleteUseTag: (userName: string, indexSlide: number) => void;
    handleAddTagVideo: () => void;
    handleClickUserSearch: (tagUser: TagUserPost, indexSlider: number) => void;
}

export interface Position {
    x: number;
    y: number;
}
interface TagSearchUserVideoContainer {
    url: string;
}
export default function TagSearchUserVideo(props: ITagSearchUserVideoProps) {
    const {
        currentIndexSlider,
        usersTagPost,
        modeShowTag,
        handleDeleteUseTag,
        handleAddTagVideo,
        handleClickUserSearch,
    } = props;
    const [textSearchTag, setTextSearchTag] = React.useState('');
    const usersTagPostCurrent = usersTagPost.find((el) => el.indexSlide === currentIndexSlider);

    const handleCLoseTextSearch = () => {
        setTextSearchTag('');
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTextSearchTag(e.target.value);
    };
    console.log('Check', usersTagPostCurrent?.tagsUser.length && modeShowTag);
    console.log('Check1', usersTagPostCurrent);
    console.log('Check2', usersTagPost);

    return (
        <Container url={window.location.origin}>
            <div className="arrow-bottom"></div>
            {usersTagPostCurrent?.tagsUser.length && modeShowTag ? (
                <>
                    <div className="header-tagged">
                        <div className="header-tag-text">Tagged people</div>
                        <button onClick={handleAddTagVideo} className="btn-add-tag">
                            Add tag
                        </button>
                    </div>
                    <div className="list_search">
                        {usersTagPostCurrent?.tagsUser.map((userTag) => (
                            <SearchItem
                                is_video={true}
                                handleDeleteUseTag={handleDeleteUseTag}
                                modeShowTag={modeShowTag}
                                handleClickUserSearch={handleClickUserSearch}
                                full_name={userTag.full_name}
                                user_name={userTag.user_name}
                                currentIndexSlider={currentIndexSlider}
                                url={userTag.url}
                            />
                        ))}
                    </div>
                </>
            ) : (
                <>
                    <div className="header-tag">
                        <div className="header-tag-text">Tag:</div>
                        <input
                            onChange={handleSearchChange}
                            value={textSearchTag}
                            placeholder="Search"
                            className="input-search"
                        />
                        {textSearchTag && (
                            <button onClick={handleCLoseTextSearch} className="button-close-search">
                                <span></span>
                            </button>
                        )}
                    </div>
                    <div className="list_search">
                        <SearchItem
                            handleClickUserSearch={handleClickUserSearch}
                            full_name="Lai Quang Long"
                            user_name="ctkaino1"
                            currentIndexSlider={currentIndexSlider}
                            url="http://localhost:3000/images/bgIcon.png"
                        />
                        <SearchItem
                            handleClickUserSearch={handleClickUserSearch}
                            currentIndexSlider={currentIndexSlider}
                            full_name="Lai Quang Hai"
                            user_name="ctkaino2"
                            url="http://localhost:3000/images/bgIcon.png"
                        />
                        <SearchItem
                            handleClickUserSearch={handleClickUserSearch}
                            currentIndexSlider={currentIndexSlider}
                            full_name="Lai Quang Nam"
                            user_name="ctkaino3"
                            url="http://localhost:3000/images/bgIcon.png"
                        />
                        <SearchItem
                            handleClickUserSearch={handleClickUserSearch}
                            currentIndexSlider={currentIndexSlider}
                            full_name="Lai Quang Ki"
                            user_name="ctkaino4"
                            url="http://localhost:3000/images/bgIcon.png"
                        />
                    </div>
                </>
            )}
        </Container>
    );
}

const Container = styled.div<TagSearchUserVideoContainer>`
    position: absolute;
    bottom: 79px;
    left: 0;
    background-color: #fff;
    width: 338px;
    border-radius: 8px;
    z-index: 999999;
    box-shadow: 0 0 5px 1px rgb(0 0 0 / 10%);
    transform-style: preserve-3d;
    cursor: initial;
    .arrow-bottom {
        border: 1px solid #ccc;
        box-shadow: 0 0 5px 1px rgb(0 0 0 / 10%);
        height: 35px;
        position: absolute;
        -webkit-transform: rotate(45deg);
        transform: translateZ(-1px) rotate(45deg);
        width: 35px;
        background-color: #fff;
        left: 65px;
        bottom: -6px;
    }

    .list_search {
        height: 180px;
        overflow-x: hidden;
        overflow-y: scroll;
    }

    .header-tagged {
        padding: 16px;
        display: flex;
        justify-content: space-between;
        border-radius: 10px;

        .header-tag-text {
            padding: 4px 12px;
            /* flex: 1; */
            color: #8e8e8e;
            font-size: 16px;
            font-weight: 700;
            display: inline-block;
            line-height: 24px;
        }

        .btn-add-tag {
            color: #0095f6;
            background: none;
            outline: none;
            border: none;
            font-weight: 600;
            font-size: 14px;
            cursor: pointer;
        }
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
