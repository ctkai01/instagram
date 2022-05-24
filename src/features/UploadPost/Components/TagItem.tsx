import { CloseIcon } from '@components/Icons';
import { useGesture } from '@use-gesture/react';
import * as React from 'react';
import { animated, useSpring } from 'react-spring';
import styled from 'styled-components';
import { TagUserPost } from './EditPost';
import { Position } from './TagSearch';

export interface ITagItemProps {
    userTag: TagUserPost;
    indexTag: number;
    indexGallery: number;
    areaListImage: Position;
    handleDeleteUseTag: (userName: string, indexSlide: number) => void
    handleChangePostUser: (position: Position, indexTag: number, indexSlide: number) => void;
}

export default function TagItem(props: ITagItemProps) {
    const { userTag, indexTag, indexGallery, areaListImage, handleDeleteUseTag, handleChangePostUser } = props;
    const [logoPos, setLogoPos] = useSpring(() => ({ x: userTag.x, y: userTag.y }));
    const ref = React.useRef(null);

    setLogoPos.start({ x: userTag.x, y: userTag.y });
    useGesture(
        {
            onDrag: ({ down, movement: [mx, my], pinching, cancel, offset: [x, y], ...rest }) => {
                console.log(1)
                if (pinching) return cancel();
                const xApply = x >= areaListImage.x ? areaListImage.x : x;
                const yApply = y >= areaListImage.y ? areaListImage.y : y;
                setLogoPos.start({ x: xApply, y: yApply });
                handleChangePostUser({ x: xApply, y: yApply }, indexTag, indexGallery);
            },
        },
        {
            target: ref,
            //  @ts-ignore: Object is possibly 'null'.
            drag: { from: () => [logoPos.x.get(), logoPos.y.get()] },
            pinch: { scaleBounds: { min: 0.5, max: 2 }, rubberband: true },
        }
    );
    return (
        <Container style={{ ...logoPos, top: logoPos.y, left: logoPos.x, transform: 'none' }}>
            <animated.div
                ref={ref}
                style={{
                    ...logoPos,
                    display: 'flex',
                    alignItems: 'center',
                    userSelect: 'none',
                    zIndex: '1',
                    transform: 'none',
                    position: 'relative',
                    padding: '8px 12px',
                    background: '#000',
                    borderRadius: '8px',
                    color: '#fff',
                }}
            >
                <div style={{fontWeight: '700', margin: '0 4px'}}>{userTag.user_name}</div>
                <CloseIcon size={16} handleClickClose={() => handleDeleteUseTag(userTag.user_name, indexGallery)}/>
            </animated.div>
            <div className="arrow-top"></div>
        </Container>
    );
}

const Container = styled(animated.div)`
    position: absolute;

    .arrow-top {
        z-index: 1;
        box-shadow: 0 0 5px 1px rgb(0 0 0 / 10%);
        height: 14px;
        position: absolute;
        -webkit-transform: rotate(45deg);
        transform: translateZ(-1px) rotate(45deg);
        width: 14px;
        background-color: #000;
        left: 18px;
        top: -6px;
    }
`;
