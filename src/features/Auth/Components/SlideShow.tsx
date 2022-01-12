import { useEffect, useState } from 'react';
import styled from 'styled-components';
// import { setInterval } from 'timers';

export interface ISlideShowProps {}

const listUrlSlide = [
    `${process.env.REACT_APP_URL}/images/Slide1.jpg`,
    `${process.env.REACT_APP_URL}/images/Slide2.jpg`,
    `${process.env.REACT_APP_URL}/images/Slide3.jpg`,
    `${process.env.REACT_APP_URL}/images/Slide4.jpg`,
    `${process.env.REACT_APP_URL}/images/Slide5.jpg`,
];
export function SlideShow(props: ISlideShowProps) {
    const [indexListUrl, setIndexListUrl] = useState<number>(0);

    useEffect(() => {
        const numLoop = setInterval(() => {
            if (indexListUrl === listUrlSlide.length - 1) {
                setIndexListUrl(0);
            } else {
                setIndexListUrl((indexPrev) => indexPrev + 1);
            }
        }, 5000);

        return () => clearInterval(numLoop);
    }, [indexListUrl]);

    const urlImage = listUrlSlide[indexListUrl];
    return (
        <>
            <div>
                <Wrapper>
                    <div className="sliders">
                        <img className="slider" src={urlImage} alt="Slider" />
                    </div>
                </Wrapper>
            </div>
        </>
    );
}

const Wrapper = styled.div`
    position: relative;
    align-self: center;
    background-image: url('http://localhost:3000/images/slide_show.png');
    background-repeat: no-repeat;
    height: 618px;
    width: 454px;
    margin-left: -35px;
    margin-right: -15px;

    .sliders {
        position: absolute;
        top: 100px;
        right: 64px;
    }
`;
