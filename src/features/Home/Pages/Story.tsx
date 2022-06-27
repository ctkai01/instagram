import { CancelIcon } from '@components/Icons';
import * as React from 'react';
import styled from 'styled-components';
import 'swiper/css/effect-coverflow';
import SwiperCore, { EffectCoverflow, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import StoryViewUser from '../Components/Stories/StoryViewUser';
import { useAppSelector } from '@redux/hooks';
import { selectStories } from '../storySlice';
import { Link, useParams } from 'react-router-dom';
export interface IStoryProps {}
SwiperCore.use([Navigation]);
interface Params {
    user_name: string;
}
export default function Story(props: IStoryProps) {
    const [swiper, setSwiper] = React.useState<SwiperCore>();
    const usersStory = useAppSelector(selectStories)
    let { user_name } = useParams<Params>();

    const currentSLiderUserInit = usersStory.findIndex(user => user.user_name === user_name)
 
    const [swiperChild, setSwiperChild] = React.useState<SwiperCore[]>([]);
    const [currentSlider, setCurrentSlide] = React.useState(currentSLiderUserInit);
    
    console.log(usersStory)
    const handleSetChild = (swiper: SwiperCore) => {
        setSwiperChild(parents => [...parents, swiper])
    }

    if (currentSLiderUserInit === -1) {
        return <div>Not found</div>
    }
 

    console.log(currentSLiderUserInit)
    return (
        <Container>
            <div className="modal-wrapper">
                <Link to="/"
                    style={{
                        cursor: 'pointer',
                        backgroundImage: `url('${process.env.REACT_APP_URL}/images/bgIcon6.png')`,
                    }}
                    className="instagram-icon"
                ></Link>
                <Link to="/" className="button-close">
                    <CancelIcon ariaLabel="Close" />
                </Link>

                <div className="list-story">
                    <Swiper
                        onSwiper={(swiper) => setSwiper(swiper)}
                        initialSlide={currentSLiderUserInit}
                        // initialSlide={currentSLiderUserInit !== 0 || currentSLiderUserInit ? currentSLiderUserInit : 0}
                        onSlideChange={(swiper) => {
                            setCurrentSlide(swiper.activeIndex);
                            if (swiper.activeIndex < currentSlider) {
                                swiperChild[swiper.activeIndex + 1].autoplay.stop()

                            } else {
                                if (swiperChild.length) {
                                    swiperChild[swiper.activeIndex - 1].autoplay.stop()
                                } 
                            }
                            // if (swiper.activeIndex)
                        }}
                        className="swiper-list"
                        // effect={''}
                        // grabCursor={true}
                        // centeredSlidesBounds={true}
                        centeredSlides={true}
                        slidesPerView={4}
                        // centeredSlidesBounds={false}
                        // spaceBetween={30}
                        // coverflowEffect={{
                        //     rotate: 0,
                        //     stretch: 0,
                        //     depth: 100,
                        //     modifier: 2,
                        //     slideShadows: true,
                        // }}
                        // modules={[EffectCoverflow]}
                        navigation={true}
                        allowTouchMove={false}
                    >
                        {usersStory.map((user, index) => (
                            <SwiperSlide key={index} className={index === currentSlider ? 'active' : ''}>
                                {/* <img
                                    src={`https://swiperjs.com/demos/images/nature-${
                                        index + 1
                                    }.jpg`}
                                /> */}
                                <StoryViewUser user={user} handleSetChild={handleSetChild} key={index} index={index} currentSlider={currentSlider} showInfo={currentSlider === index}/>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </Container>
    );
}

const Container = styled.div`
    bottom: 0;
    left: 0;
    position: fixed;
    right: 0;
    top: 0;
    background-color: #1a1a1a;
    z-index: 99999999999999999;
    padding: 16px 0;
    .list-story {
        height: 100%;
    }

    .swiper-list {
        height: 100%;
    }

    .swiper-slide {
        background-position: center;
        background-size: cover;
        /* height: 400px; */
        /* width: 500px !important; */

        /* transform: translateX(-25%); */
        height: 100%;
        /* width: 500px !; */
        display: flex;
        justify-content: center;
        transform: scale(0.5);
        transition: transform 0.3s ease;
        &.active {
            /* width: 300px !important; */
            /* transform: scale(1) translateX(4%); */
            transform: scale(1);
        }

        img {
            width: 100%;
            /* width: 75% !important; */
            object-fit: cover;
        }
    }

    .modal-wrapper {
        position: relative;
        width: 100%;
        height: 100%;

        .instagram-icon {
            width: 103px;
            height: 29px;
            background-position: 0 -268px;
            /* margin: 16px; */
            top: 0;
            left: 16px;
            position: absolute;
            z-index: 999;

        }

        .button-close {
            padding: 8px;
            position: absolute;
            top: 0;
            right: 16px;
            /* margin: 16px; */
            cursor: pointer;
            z-index: 999;
        }
    }

    /* .swiper-container {
        width: 100%;
    }
    .swiper-wrapper {
        width: 50%;
    }
    .swiper-slide {
        text-align: center;
        width: auto;
    }
    .slide-image {
        height: 400px;
        width: auto;
    }
    .my-gallery figure {
        margin: 0px;
    } */
`;
