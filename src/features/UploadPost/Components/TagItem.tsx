import * as React from 'react';
import { useDrag } from '@use-gesture/react';
import { animated, useSpring } from 'react-spring';
import { TagUserPost } from './EditPost';

export interface ITagItemProps {
    userTag: TagUserPost;
}

export default function TagItem(props: ITagItemProps) {
    const { userTag } = props;
    const logoPos = useSpring({ x: userTag.x, y: userTag.y });
    const bindLogoPos = useDrag((params) => {
        // console.log(params.offset[])
        if (params.offset[0] <= 0) {
            logoPos.x.set(0);
        } else {
            logoPos.x.set(params.offset[0] >= 719 ? 719 : params.offset[0]);
        }

        if (params.offset[1] <= 0) {
            logoPos.y.set(0);
        } else {
            // logoPos.x.set(params.offset[0] >= 719 ? 719 : params.offset[0]);
            logoPos.y.set(params.offset[1] >= 754 ? 754 : params.offset[1]);
        }

        // logoPos.x.set(params.offset[0]);

        // logoPos.y.set(params.offset[1]);
    });

    return (
        <animated.div
            {...bindLogoPos()}
            style={{
                background: '#000',
                height: '30px',
                width: '30px',
                position: 'absolute',
                top: logoPos.y,
                left: logoPos.x,
                color: '#fff',
            }}
        >
            {userTag.user_name}
        </animated.div>
    );
}
