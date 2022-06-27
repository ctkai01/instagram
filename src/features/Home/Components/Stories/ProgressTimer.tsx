import * as React from 'react';
import styled from 'styled-components';

export interface IProgressTimerProps {
    className?: string;
    currentSliderItem: number;
    index: number;
}

export default function ProgressTimer(props: IProgressTimerProps) {
    const { className, currentSliderItem, index } = props;
    const [test, setTest] = React.useState(0);

    // React.useEffect(
    //     () => {
    //         if (currentSliderItem === index) {
    //             let timer1 = setInterval(() => {
    //                 setTest((e) => e + 1);

    //                 if (test === 5) {
    //                     clearInterval(timer1);
    //                 }
    //             }, 1000);

    //             return () => {
    //                 clearInterval(timer1);
    //             };
    //         }

    //         // this will clear Timeout
    //         // when component unmount like in willComponentUnmount
    //         // and show will not change to true
    //     },
    //     // useEffect will run only one time with empty []
    //     // if you pass a value to array,
    //     // like this - [data]
    //     // than clearTimeout will run every time
    //     // this value changes (useEffect re-run)
    //     []
    // );

    console.log('TIme: ', test);
    return (
        <Container className={className}>
            <div className="time-remain"></div>
            <div className="time-run"></div>
        </Container>
    );
}

const Container = styled.div`
    .time-remain {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;

        background-color: rgba(255, 255, 255, 0.35);
    }

    .time-run {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: #fff;
    }
`;
