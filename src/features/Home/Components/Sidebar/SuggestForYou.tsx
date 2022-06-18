import { User } from '@models/User';
import * as React from 'react';
import styled from 'styled-components';
import { SuggestItem } from './SuggestItem';

export interface ISuggestForYouProps {
    usersSuggest: User[];
}

export function SuggestForYou(props: ISuggestForYouProps) {
    const { usersSuggest } = props;
    const suggestList = [
        {
            account: {
                url: 'https://picsum.photos/32/32?random=1',
                username: 'lalalalisa_m',
            },
            relateUserName: ['thieubaotram', 'hoang.yennn_', 'namcoi_k'],
        },
        {
            account: {
                url: 'https://picsum.photos/32/32?random=2',
                username: 'baoang1411',
            },
            relateUserName: ['thieubaotram'],
        },
        {
            account: {
                url: 'https://picsum.photos/32/32?random=3',
                username: 'nike',
            },
            relateUserName: ['thieubaotram', 'hoang.yennn_', 'namcoi_k'],
        },
        {
            account: {
                url: 'https://picsum.photos/32/32?random=4',
                username: 'jennierubyjane',
            },
            relateUserName: ['thieubaotram', 'hoang.yennn_', 'namcoi_k'],
        },
        {
            account: {
                url: 'https://picsum.photos/32/32?random=5',
                username: 'roses_are_rosie',
            },
            relateUserName: ['thieu', 'hoang', 'namcoi_k'],
        },
    ];

    return (
        <Container>
            <div className="title-wrapper">
                <div className="suggest-title">Suggestions For You</div>
                <div className="see-all-text">See All</div>
            </div>
            {usersSuggest.map((user, index) => (
                <SuggestItem
                    key={index}
                    index={index}
                    user={user}
                />
            ))}
        </Container>
    );
}

const Container = styled.div`
    margin-top: 18px;
    .title-wrapper {
        display: flex;
        justify-content: space-between;
        margin-bottom: 8px;
        .suggest-title {
            color: #8e8e8e;
            font-weight: 600;
        }

        .see-all-text {
            color: #262626;
            font-weight: 600;
            font-size: 12px;
        }
    }
`;
