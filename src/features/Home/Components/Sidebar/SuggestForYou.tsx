import { User } from '@models/User';
import * as React from 'react';
import styled from 'styled-components';
import { boolean } from 'yup/lib/locale';
import LoadingSuggestForYou from './LoadingSuggestForYou';
import { SuggestItem } from './SuggestItem';

export interface ISuggestForYouProps {
    usersSuggest: User[];
    loadingSuggestForYou: boolean;
}

export function SuggestForYou(props: ISuggestForYouProps) {
    const { usersSuggest, loadingSuggestForYou } = props;
    console.log('Loading', loadingSuggestForYou)
    return (
        <Container>
            <div className="title-wrapper">
                <div className="suggest-title">Suggestions For You</div>
                <div className="see-all-text">See All</div>
            </div>
            {loadingSuggestForYou ? (
              <LoadingSuggestForYou/>
            ) : (
                usersSuggest.map((user, index) => (
                    <SuggestItem key={index} index={index} user={user} />
                ))
            )}
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
