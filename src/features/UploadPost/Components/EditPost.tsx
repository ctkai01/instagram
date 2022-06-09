import { Avatar, Modal } from '@components/common';
import {
    ArrowTopIcon,
    BackIcon,
    CloseIcon,
    PlayIcon,
    SiteIcon,
    SmileFaceIcon,
    TagShowIcon,
} from '@components/Icons';
import { selectUserAuth } from '@features/Auth/authSlice';
import { InputAdornment, TextareaAutosize } from '@material-ui/core';
import { useAppSelector } from '@redux/hooks';
import * as React from 'react';
import { EmojiObject, EmojiPicker } from 'react-twemoji-picker';
import 'react-twemoji-picker/dist/EmojiPicker.css';
import styled, { createGlobalStyle } from 'styled-components';
import SwiperCore from 'swiper';
import { useDrag } from '@use-gesture/react';
import { animated, useSpring } from 'react-spring';

import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import EmojiData from 'react-twemoji-picker/data/twemoji.json';
import { FileUrl } from './ModalPost';
import SwitchButton from './SwitchButton';
import { TextField } from '@mui/material';
import address, { Address } from './address';
import SearchItemLocation from './SearchItemLocation';
import TagItem from './TagItem';
import TagSearch, { Position } from './TagSearch';
import { MediaType } from '@models/commom';
import ReactPlayer from 'react-player';
import TagSearchUserVideo from './TagSearchUserVideo';
import { FilePost, PayloadCreatePost } from './UploadImagePost';

export interface IEditPostProps {
    fileGallery: FileUrl[];
    indexSlideCurrentEditPost: number;
    handleBackStep: () => void;
    handleSharePost: (payload: PayloadCreatePost) => void;
    // handleNextEditImage: (files: FileUrl[]) => void;
    // setFiles: React.Dispatch<React.SetStateAction<FileUrl[]>>;
}

export interface ActiveSearchUser {
    x: number;
    y: number;
    active: boolean;
}

export interface TagUserPost {
    x?: number;
    xPos?: number;
    y?: number;
    yPos?: number;
    user_name: string;
    url: string;
    full_name: string
}

export interface TagUsersPost {
    tagsUser: TagUserPost[];
    show: boolean;
    indexSlide: number;
}

interface ContainerStyledProps {
    baseUrl: string;
}

export interface SettingPost {
    isHideLikeAndView: boolean,
    isOffComment: boolean,
}

const LIMIT_TEXT_CAPTION = 2200;

export default function EditPost(props: IEditPostProps) {
    const { fileGallery, indexSlideCurrentEditPost, handleSharePost, handleBackStep } = props;
    const [swiper, setSwiper] = React.useState<SwiperCore>();
    const [currentIndexSlider, setCurrentIndexSlider] = React.useState(indexSlideCurrentEditPost);
    const [isPlayVideo, setIsPlayVideo] = React.useState<boolean>(false);

    const [imageArea, setImageArea] = React.useState<Position>({
        x: 0,
        y: 0,
    });
    const userAuth = useAppSelector(selectUserAuth);
    const refImage = React.useRef<HTMLDivElement>(null);
    const [inputCaption, setInputCaption] = React.useState('');
    const [inputLocation, setInputLocation] = React.useState('');
    const [activeOption, setActiveOption] = React.useState(false);
    const [settingPost, setSettingPost] = React.useState<SettingPost>({
        isHideLikeAndView: false,
        isOffComment: false
    });
    const [usersTagPost, setUsersTagPost] = React.useState<TagUsersPost[]>([]);
    const [activeSearchUser, setActiveSearchUser] = React.useState<ActiveSearchUser>({
        active: false,
        x: 0,
        y: 0,
    });

    const [activeSearchUserVideo, setActiveSearchUserVideo] = React.useState<boolean>(false);

    const [showEmoji, setShowEmoji] = React.useState(false);
    const [isFillLocation, setIsFillLocation] = React.useState(false);
    const [showSearchLocation, setShowSearchLocation] = React.useState(false);
    const [searchLocation, setSearchLocation] = React.useState<Address[]>([]);
    const usersTagPostCurrent = usersTagPost.find((el) => el.indexSlide === currentIndexSlider);
    const [modeShowTag, setModeShowTag] = React.useState<boolean>(
        !!usersTagPostCurrent?.tagsUser.length || false
    );

    React.useEffect(() => {
        if (refImage.current) {
            setImageArea({
                x: refImage.current.clientWidth,
                y: refImage.current.clientHeight,
            });
        }
    }, []);

    const handleChangeInputCaption = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (e.target.value.length <= LIMIT_TEXT_CAPTION) {
            setInputCaption(e.target.value);
        }
    };

    const handleChangeInputLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputLocation(e.target.value);
        const valueSearch = e.target.value;
        const searchAddress = address.filter((item) => {
            return (
                item.address.toUpperCase().startsWith(valueSearch.toUpperCase()) ||
                item.name.toUpperCase().startsWith(valueSearch.toUpperCase())
            );
        });
        if (!valueSearch) {
            setShowSearchLocation(false);
        } else {
            setShowSearchLocation(true);
        }
        setSearchLocation(searchAddress);
        if (isFillLocation) {
            setIsFillLocation(false);
        }
    };

    const emojiData = Object.freeze(EmojiData);
    const handleEmojiSelect = (emoji: EmojiObject) => {
        console.log('?????')
        setInputCaption((value: string) => {
            const characterEmoji = String.fromCodePoint(parseInt(emoji.unicode, 16));
            console.log('Fuke ', characterEmoji)
            return value + characterEmoji;
        });
    };

    const handleClickShowEmoji = () => {
        setShowEmoji(true);
    };

    const handleClickHideEmoji = () => {
        setShowEmoji(false);
    };

    const handleClickLocation = () => {
        if (!isFillLocation) {
            setInputLocation('');
        }
    };

    const handleClickLocationItem = (nameLocation: string) => {
        setInputLocation(nameLocation);
        setShowSearchLocation(false);
        setIsFillLocation(true);
    };

    const handleCloseLocation = () => {
        setShowSearchLocation(false);
        setInputLocation('');
        setIsFillLocation(false);
    };

    const handleClickImage = (e: React.MouseEvent<HTMLImageElement>) => {
        console.log('WHAT');
        if (fileGallery[currentIndexSlider].type === MediaType.video) {
            setIsPlayVideo((isPlay) => !isPlay);
        } else {
            if (!activeSearchUser.active) {
                setActiveSearchUser({
                    active: true,
                    x: e.nativeEvent.offsetX,
                    y: e.nativeEvent.offsetY,
                });
            } else {
                setActiveSearchUser({
                    active: false,
                    x: 0,
                    y: 0,
                });
            }
        }
    };

    const handleClickUserSearch = (tagUserPost: TagUserPost, indexSlide: number) => {
        console.log(tagUserPost);
        console.log(indexSlide);
        setUsersTagPost((usersTagPostSlide) => {
            const checkIndexSlide = usersTagPostSlide.find(
                (userTagPostSlide) => userTagPostSlide.indexSlide === indexSlide
            );

            if (checkIndexSlide) {
                const checkExistUSerTag = checkIndexSlide.tagsUser.find(
                    (userTag) => userTag.user_name === tagUserPost.user_name
                );
                console.log('Exist SLider');
                if (checkExistUSerTag) {
                    console.log('Exist user tag');

                    const index = checkIndexSlide.tagsUser.indexOf(checkExistUSerTag);
                    checkIndexSlide.tagsUser[index] = { ...checkExistUSerTag, ...tagUserPost };
                    checkIndexSlide.show = true;
                    console.log(checkIndexSlide);

                    usersTagPostSlide[usersTagPostSlide.indexOf(checkIndexSlide)] = checkIndexSlide;
                    return usersTagPostSlide;
                } else {
                    usersTagPostSlide[usersTagPostSlide.indexOf(checkIndexSlide)] = {
                        ...checkIndexSlide,
                        tagsUser: [...checkIndexSlide.tagsUser, tagUserPost],
                        show: true,
                    };
                    return usersTagPostSlide;
                }
            } else {
                return [...usersTagPostSlide, { tagsUser: [tagUserPost], show: true, indexSlide }];
            }
        });

        setActiveSearchUser({
            active: false,
            x: 0,
            y: 0,
        });

        if (activeSearchUserVideo) {
            setModeShowTag(true);
        }
    };

    const handleChangePostUser = (position: Position, positionPercent: Position, indexTag: number, indexSlide: number) => {
        setUsersTagPost((usersTagPostSlide) => {
            const userTagPostSlide = usersTagPostSlide.find(
                (userTagPostSlide) => userTagPostSlide.indexSlide === indexSlide
            );

            if (userTagPostSlide) {
                userTagPostSlide.tagsUser[indexTag] = {
                    ...userTagPostSlide.tagsUser[indexTag],
                    ...position,
                    xPos: positionPercent.x,
                    yPos: positionPercent.y,
                };
                usersTagPostSlide[
                    usersTagPostSlide.findIndex(
                        (userTagPostSlide) => userTagPostSlide.indexSlide === indexSlide
                    )
                ] = userTagPostSlide;
                return usersTagPostSlide;
            } else {
                return usersTagPostSlide;
            }
        });
    };

    const handleDeleteUseTag = (userName: string, indexSlide: number) => {
        console.log(usersTagPost);
        setUsersTagPost((usersTagPostSlide) => {
            const usersTagPostSlideClone = [...usersTagPostSlide];
            const userTagPostSlide = usersTagPostSlideClone.find(
                (userTagPostSlide) => userTagPostSlide.indexSlide === indexSlide
            );
            if (userTagPostSlide) {
                const tagsUserAfterDelete = userTagPostSlide.tagsUser.filter(
                    (userTagPost) => userTagPost.user_name !== userName
                );

                userTagPostSlide.tagsUser = tagsUserAfterDelete;
                userTagPostSlide.show = tagsUserAfterDelete.length ? true : false;
                usersTagPostSlideClone[
                    usersTagPostSlideClone.findIndex(
                        (userTagPostSlide) => userTagPostSlide.indexSlide === indexSlide
                    )
                ] = userTagPostSlide;
                return usersTagPostSlideClone;
            } else {
                return usersTagPostSlideClone;
            }
        });
    };

    React.useEffect(() => {
        if (!usersTagPostCurrent?.tagsUser.length && activeSearchUserVideo) {
            setActiveSearchUserVideo(false)
            console.log('Hay')
        }
    }, [usersTagPost])

    const handleHideTag = (indexSlide: number) => {
        setUsersTagPost((usersTagPostSlide) => {
            const usersTagPostSlideClone = [...usersTagPostSlide];
            const userTagPostSlide = usersTagPostSlideClone.find(
                (userTagPostSlide) => userTagPostSlide.indexSlide === indexSlide
            );
            if (userTagPostSlide) {
                const userTagPostSlideClone = { ...userTagPostSlide };
                userTagPostSlideClone.show = !userTagPostSlideClone.show;

                usersTagPostSlideClone[
                    usersTagPostSlideClone.findIndex(
                        (userTagPostSlide) => userTagPostSlide.indexSlide === indexSlide
                    )
                ] = userTagPostSlideClone;
                return usersTagPostSlideClone;
            } else {
                return usersTagPostSlideClone;
            }
        });
    };
    console.log(usersTagPost);

    const handleShowSearchUserVideo = () => {
        if (usersTagPostCurrent?.tagsUser.length && !activeSearchUserVideo) {
            setModeShowTag(true);
        }
        setActiveSearchUserVideo((active) => !active);

    };

    const handleAddTagVideo = () => {
        setModeShowTag(false);
    };

    const handleSwitchOffComment = () => {
        setSettingPost(settingPost => ({
            ...settingPost,
            isOffComment: !settingPost.isOffComment
        }))
    }

    const handleSwitchOffViewCount = () => {
        setSettingPost(settingPost => ({
            ...settingPost,
            isHideLikeAndView: !settingPost.isHideLikeAndView
        }))
    }

    const handleShare = () => {
        let filesPost: FilePost[]  = fileGallery.map((file, index) => {
            let dataTags: TagUserPost[] = []
            const checkTags = usersTagPost.find(el => el.indexSlide === index)
            if (checkTags) {
                dataTags = checkTags.tagsUser
            }
            return {
                ...file,
                tags: dataTags
            }
        })
        console.log(inputLocation)
        const data: PayloadCreatePost = {
            files: filesPost,
            caption: inputCaption,
            location: inputLocation,
            ...settingPost
        }

        handleSharePost(data)
    }
    return (
        <>
            <Container baseUrl={window.location.origin}>
                {/* <Container> */}
                <div className="header">
                    {/* <div className="back-button" onClick={handleBackChoseImage}> */}
                    <div className="back-button" onClick={handleBackStep}>
                        <BackIcon ariaLabel="Back" />
                    </div>
                    <div className="main-header">Create new post</div>
                    <div
                        className="next-button"
                        onClick={handleShare}
                    >
                        Share
                    </div>
                </div>

                <div className="content-main" style={{ flexDirection: 'row', height: '80vh' }}>
                    <div className="img-list" ref={refImage}>
                        <Swiper
                            initialSlide={indexSlideCurrentEditPost}
                            pagination={true}
                            slidesPerView={1}
                            navigation={true}
                            onSwiper={(swiper) => setSwiper(swiper)}
                            allowTouchMove={false}
                            effect={'fade'}
                            onSlideChange={(swiper) => {
                                setActiveSearchUser({
                                    active: false,
                                    x: 0,
                                    y: 0,
                                });
                                setCurrentIndexSlider(swiper.activeIndex);
                                setIsPlayVideo(false);
                                setActiveSearchUserVideo(false)
                            }}
                        >
                            {fileGallery.map((file, indexGallery) => (
                                <SwiperSlide
                                    key={indexGallery}
                                    className="slider-item"
                                    onClick={handleClickImage}
                                >
                                    {file.type === MediaType.image &&
                                        indexGallery === currentIndexSlider && (
                                            <div
                                                style={{
                                                    position: 'relative',
                                                    width: '100%',
                                                    height: '100%',
                                                }}
                                            >
                                                <img
                                                    // onClick={handleClickImage}
                                                    draggable={false}
                                                    src={file.url}
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        cursor: `${
                                                            activeSearchUser.active
                                                                ? 'initial'
                                                                : 'move'
                                                        }`,
                                                        userSelect: 'none',
                                                    }}
                                                />
                                            </div>
                                        )}

                                    {file.type === MediaType.video &&
                                        indexGallery === currentIndexSlider && (
                                            <div
                                                className="video-container"
                                                style={{ width: '100%', height: '100%' }}
                                            >
                                                <ReactPlayer
                                                    width="100%"
                                                    height="100%"
                                                    loop={true}
                                                    playing={isPlayVideo}
                                                    url={file.url}
                                                    muted={fileGallery[currentIndexSlider].isMute}
                                                    // ref={currentRefVideo}
                                                />
                                                {!isPlayVideo && (
                                                    <div className="cover-photo-container">
                                                        <div
                                                            className="img-cover"
                                                            style={{
                                                                backgroundImage: `url(${fileGallery[currentIndexSlider].coverUrl})`,
                                                            }}
                                                        ></div>
                                                        <div className="btn-play-video">
                                                            <PlayIcon size="big" />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                </SwiperSlide>
                            ))}
                            {usersTagPost.find((ele) => ele.indexSlide === currentIndexSlider)
                                ?.tagsUser.length &&
                                fileGallery[currentIndexSlider].type === MediaType.image && (
                                    <div
                                        className="btn-show-tag"
                                        onClick={() => handleHideTag(currentIndexSlider)}
                                    >
                                        <TagShowIcon />
                                    </div>
                                )}
                            {fileGallery[currentIndexSlider].type === MediaType.video && (
                                <div
                                    className="btn-show-tag-video"
                                    onClick={handleShowSearchUserVideo}
                                >
                                    <TagShowIcon />
                                    <div className="text">Tag people</div>
                                </div>
                            )}
                            {usersTagPost.find((ele) => ele.indexSlide === currentIndexSlider)
                                ?.show &&
                                fileGallery[currentIndexSlider].type === MediaType.image &&
                                usersTagPost
                                    .find((ele) => ele.indexSlide === currentIndexSlider)
                                    ?.tagsUser.map((userTag, index) => (
                                        <TagItem
                                            indexGallery={currentIndexSlider}
                                            handleDeleteUseTag={handleDeleteUseTag}
                                            areaListImage={imageArea}
                                            indexTag={index}
                                            handleChangePostUser={handleChangePostUser}
                                            key={index}
                                            userTag={userTag}
                                        />
                                    ))}
                        </Swiper>
                        {fileGallery[currentIndexSlider].type === MediaType.image &&
                            activeSearchUser.active && (
                                <TagSearch
                                    imageArea={imageArea}
                                    activeSearchUser={activeSearchUser}
                                    currentIndexSlider={currentIndexSlider}
                                    handleClickUserSearch={handleClickUserSearch}
                                />
                            )}

                        {fileGallery[currentIndexSlider].type === MediaType.video &&
                            activeSearchUserVideo && (
                                <TagSearchUserVideo
                                    usersTagPost={usersTagPost}
                                    currentIndexSlider={currentIndexSlider}
                                    modeShowTag={modeShowTag}
                                    handleAddTagVideo={handleAddTagVideo}
                                    handleDeleteUseTag={handleDeleteUseTag}
                                    handleClickUserSearch={handleClickUserSearch}
                                />
                            )}
                    </div>
                    <div className="option-create-post">
                        <div className="avatar-container">
                            <Avatar className="avatar-img" url={userAuth.avatar} size="small" />
                            <div className="user-name">{userAuth.user_name}</div>
                        </div>
                        <div className="caption-container">
                            <TextareaAutosize
                                maxRows={7}
                                placeholder="Write a caption..."
                                className="text-input"
                                value={inputCaption}
                                style={{
                                    lineHeight: '24px',
                                    fontSize: '16px',
                                    fontFamily: 'inherit',
                                }}
                                onChange={handleChangeInputCaption}
                            />
                        </div>
                        <div className="icon-container">
                            <button className="button-emoji" onClick={handleClickShowEmoji}>
                                <SmileFaceIcon color="gray" size="small" ariaLabel="Emoji" />
                            </button>
                            <div className="limit-text">
                                {inputCaption.length}/{LIMIT_TEXT_CAPTION}
                            </div>
                            {showEmoji && (
                                <>
                                    <div className="emoji-wrapper">
                                        <EmojiPicker
                                            theme="light"
                                            emojiData={emojiData}
                                            onEmojiSelect={handleEmojiSelect}
                                        />
                                    </div>
                                    <Modal
                                        showModal={showEmoji}
                                        onCloseModal={handleClickHideEmoji}
                                    />
                                </>
                            )}
                        </div>
                        <div className="option-tools">
                            <div className="tool-item location">
                                <TextField
                                    disabled={isFillLocation}
                                    onClick={handleClickLocation}
                                    fullWidth
                                    className="input-location"
                                    placeholder="Add location"
                                    value={inputLocation}
                                    onChange={handleChangeInputLocation}
                                    style={{ height: '100%', border: 'none' }}
                                    InputProps={{
                                        style: {
                                            height: '100%',
                                        },
                                        disableUnderline: true,
                                        endAdornment: (
                                            <InputAdornment
                                                position="end"
                                                style={{ cursor: 'pointer' }}
                                            >
                                                {inputLocation ? (
                                                    <CloseIcon
                                                        handleClickClose={handleCloseLocation}
                                                        color="black"
                                                    />
                                                ) : (
                                                    <SiteIcon />
                                                )}
                                            </InputAdornment>
                                        ),
                                    }}
                                    variant="standard"
                                />
                                {showSearchLocation && (
                                    <>
                                        <div className="search-location">
                                            {searchLocation.map((location, index) => (
                                                <SearchItemLocation
                                                    key={index}
                                                    address={location.address}
                                                    name={location.name}
                                                    handleClickLocationItem={
                                                        handleClickLocationItem
                                                    }
                                                />
                                            ))}
                                        </div>
                                        <Modal
                                            showModal={showSearchLocation}
                                            onCloseModal={handleCloseLocation}
                                        />
                                    </>
                                )}
                            </div>
                            <div
                                className="tool-item"
                                style={{
                                    borderBottom: `${activeOption ? 'none' : '1px solid #dbdbdb'}`,
                                }}
                            >
                                <div
                                    className="tool-item-header"
                                    onClick={() => setActiveOption((actionOption) => !actionOption)}
                                >
                                    <div
                                        style={{
                                            fontWeight: `${activeOption ? '600' : '400'}`,
                                        }}
                                        className="text"
                                    >
                                        Advanced settings
                                    </div>
                                    <div
                                        className="icon"
                                        style={{
                                            transform: `${
                                                activeOption ? 'none' : 'rotate(180deg)'
                                            }`,
                                        }}
                                    >
                                        <ArrowTopIcon />
                                    </div>
                                </div>
                                {activeOption && (
                                    <div className="tool-item-content-adv-settings">
                                        <div className="option-item">
                                            <div className="option-item-header">
                                                <div className="option-item-text">
                                                    Hide like and view counts on this post
                                                </div>
                                                <div className="option-item-status" onClick={handleSwitchOffViewCount}>
                                                    <SwitchButton isChecked={settingPost.isHideLikeAndView}/>
                                                </div>
                                            </div>
                                            <div className="option-item-content">
                                                Only you will see the total number of likes and
                                                views on this post. You can change this later by
                                                going to the ··· menu at the top of the post. To
                                                hide like counts on other people's posts, go to your
                                                account settings.{' '}
                                                <a
                                                    href="#"
                                                    style={{
                                                        color: '#00376b',
                                                        textDecoration: 'none',
                                                    }}
                                                >
                                                    Learn more
                                                </a>
                                            </div>
                                        </div>
                                        <div className="option-item">
                                            <div className="option-item-header">
                                                <div className="option-item-text">
                                                    Turn off commenting
                                                </div>
                                                <div className="option-item-status" onClick={handleSwitchOffComment}>
                                                    <SwitchButton isChecked={settingPost.isOffComment}/>
                                                </div>
                                            </div>
                                            <div className="option-item-content">
                                                You can change this later by going to the ··· menu
                                                at the top of your post.
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
            <GlobalStyle />
        </>
    );
}
// transform: rotate(180deg)
const GlobalStyle = createGlobalStyle`
  body {
      overflow: hidden !important;
  }
`;

const Container = styled.div<ContainerStyledProps>`
    width: 1101px;
    max-width: 1195px;
    min-width: 688px;
    min-height: 391px;
    max-height: 898px;

    video {
        object-fit: cover;
    }

    body::-webkit-scrollbar {
        display: none; /* for Chrome, Safari, and Opera */
    }
    .header {
        display: flex;
        border-bottom: 1px solid rgb(219, 219, 219);
        border-top-left-radius: 10px;
        justify-content: center;
        align-items: center;
        height: 42px;

        .main-header {
            flex: 8;
            font-size: 16px;
            color: #262626;
            font-weight: 600;
            text-align: center;
        }

        .back-button {
            cursor: pointer;
            flex: 1;
            display: flex;
            justify-content: center;
        }

        .next-button {
            cursor: pointer;
            flex: 1;
            text-align: center;
            padding: 5px;
            color: #0095f6;
            font-weight: 600;
            font-size: 16px;
        }
    }

    .content-main {
        display: flex;

        .img-list {
            width: 68%;
            height: 100%;
            cursor: pointer;

            .btn-show-tag {
                position: absolute;
                display: flex;
                z-index: 9999;
                justify-content: center;
                align-items: center;
                bottom: 25px;
                left: 25px;
                padding: 8px;
                background-color: rgba(26, 26, 26, 0.8);
                border-radius: 50%;
                box-shadow: 0 4px 12px rgb(0 0 0 / 15%);
                cursor: pointer;

                &:hover {
                    opacity: 0.7;
                }
            }

            .btn-show-tag-video {
                position: absolute;
                display: flex;
                z-index: 9999;
                justify-content: center;
                align-items: center;
                bottom: 25px;
                left: 25px;
                padding: 8px;
                background-color: rgba(26, 26, 26, 0.8);
                border-radius: 16px;
                box-shadow: 0 4px 12px rgb(0 0 0 / 15%);
                cursor: pointer;

                &:hover {
                    opacity: 0.7;
                }

                .text {
                    margin-left: 8px;
                    color: #fff;
                    font-weight: 700;
                }
            }
        }

        .option-create-post {
            width: 32%;
            height: 100%;
        }

        .avatar-container {
            display: flex;
            padding: 18px 16px 14px;

            .user-name {
                color: #262626;
                display: flex;
                align-items: center;
                font-weight: 600;
                font-size: 16px;
            }
        }

        .icon-container {
            position: relative;
            padding: 0 16px;
            display: flex;
            justify-content: space-between;

            .button-emoji {
                padding: 8px;
                border: none;
                background: none;
                cursor: pointer;
            }

            .limit-text {
                color: #c7c7c7;
                font-size: 12px;
            }

            .limit-text:hover {
                cursor: pointer;
                color: #000;
            }
        }

        .caption-container {
            min-height: 172px;
            max-height: 172px;
            padding: 0 16px;
            .text-input {
                border: none;
                outline: none;
                resize: none;
                overflow-y: scroll;
                background: 0 0;
                font-size: 14px;
                width: 100%;
            }

            .text-input::placeholder {
                font-size: 15px;
                font-family: Arial, Helvetica, sans-serif;
            }
        }

        .avatar-img {
            margin-right: 12px;
        }

        .emoji-wrapper {
            position: absolute;
            top: 100%;
            left: 2px;
            z-index: 10001;

            & .emoji-picker-scroll > div {
                height: 255px !important;
            }
        }

        .option-tools .tool-item.location {
            height: 45px;
            position: relative;

            .input-location {
                padding: 0 16px;
            }

            .search-location {
                height: 180px;
                overflow-y: scroll;
                border-radius: 8px;
                z-index: 10001;
                position: absolute;
                width: 100%;
                top: 100%;
                left: 0;
                background-color: #fff;
            }
        }

        .option-tools .tool-item {
            border-top: 1px solid #dbdbdb;
            .tool-item-header {
                display: flex;
                justify-content: space-between;
                padding: 14px 16px;
                cursor: pointer;

                .text {
                    color: #262626;
                    font-size: 16px;
                }
            }

            .tool-item-content-adv-settings {
                padding: 4px 16px;

                .option-item {
                    margin-bottom: 8px;
                }

                .option-item-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .option-item-content {
                    font-size: 12px;
                    color: #8e8e8e;
                }

                .option-item-header .option-item-text {
                    font-size: 16px;
                }
                .option-item-content {
                    padding: 12px 0;
                }
            }
        }
    }

    .slider-item {
        display: flex;
        justify-content: center;
        align-items: center;

        /* .img {
                height: 100%;
                width: 100%;
                background-repeat: no-repeat;
                background-size: cover;
                background-position: center center;
            
            } */
        .video-container {
            position: relative;

            z-index: 9999;
            .cover-photo-container {
                height: 100%;
                width: 100%;
                position: absolute;
                top: 0;
                left: 0;
            }

            .img-cover {
                height: 100%;
                background-repeat: no-repeat;
                background-size: cover;
                background-position: center center;
                /* background-image: url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfgep9UrtTmyClOM4e45sGoOMSTCHDEp_mfQ&usqp=CAU'); */
            }

            .btn-play-video {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
        }
    }

    .swiper {
        height: 100%;
    }

    .swiper-wrapper {
        display: flex;
        align-items: center;
    }

    .swiper-button-next {
        background-image: ${(props) => `url(${props.baseUrl}/images/bgIcon.png)`};
        height: 45px;
        width: 45px;
        background-position: -244px -107px;
        background-repeat: no-repeat;
    }

    .swiper-button-next::after {
        display: none;
    }

    .swiper-button-prev {
        background-image: ${(props) => `url(${props.baseUrl}/images/bgIcon.png)`};
        height: 45px;
        width: 45px;
        background-position: -379px -128px;
        background-repeat: no-repeat;
    }

    .swiper-button-prev::after {
        display: none;
    }

    .swiper-button-next,
    .swiper-button-prev {
        transition: opacity 0.5s;
    }

    .swiper-button-disabled {
        opacity: 0 !important;
    }

    .swiper {
        /* padding-bottom: 20px; */
    }
    .swiper-pagination {
        bottom: 30px;
        left: 50%;
        padding-top: 10px;
        width: 20%;
        text-align: start;
    }
`;
