import { convertISOTime, convertTime } from '@utils/index';
import * as React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import InputPost from './InputPost';

export interface IContentPostProps {
    content?: string;
    author: string;
    time: string;
}

export function ContentPost(props: IContentPostProps) {
    const [showMoreButton, setShowMoreButton] = React.useState<boolean>(true);
    const { content, time, author } = props;
    // const content = 'Nguyễn Thúc Thuỳ Tiên em nghe nỗi lòng chị không<br>CỐ LÊN 🇻🇳🇻🇳🇻🇳💪🏽💪🏽💪🏽💪🏽';
    // const content = '';
    // const time = '2022-01-18 09:37:19';
    const timeCreated = convertISOTime(time);
    console.log(timeCreated, time);
    let contentArr;
    let contentAuthor;
    let allContent;
    if (content) {
        contentArr = content.split('<br>');

        contentAuthor = contentArr[0];
        allContent = contentArr.map((lineContent, index) => {
            if (index === contentArr.length - 1) {
                return lineContent;
            } else {
                return (
                    <>
                        {lineContent}
                        <br></br>
                    </>
                );
            }
        });
    }

    React.useEffect(() => {
        if (content) {
            if (contentArr.length < 2) {
                setShowMoreButton(false);
            }
        }
    }, []);

    if (!showMoreButton) {
        contentAuthor = allContent;
    }

    const handleMoreContent = () => {
        setShowMoreButton(false);
    };

    const { format, fromNow } = convertTime(time, 7);

    return (
        <Container>
            <div className="content-wrapper">
                <div className="count-like">38, 467 likes</div>
                <div className="title-wrapper">
                    <span className="author-username">
                        <Link to="username">{content && author}</Link>
                    </span>
                    &nbsp;
                    {content && (
                        <span className="title-author-wrapper">
                            <span className="title-author">{contentAuthor}</span>
                            {showMoreButton && (
                                <span>
                                    ...&nbsp;
                                    <button className="more-title" onClick={handleMoreContent}>
                                        more
                                    </button>
                                </span>
                            )}
                        </span>
                    )}
                </div>
                <div className="comment-wrapper">
                    <span>View all 216 comments</span>
                </div>
                <div className="time-publish-wrapper">
                    <Link to="time" className="time-text">
                        <Moment format={format} fromNow={fromNow}>
                            {timeCreated}
                        </Moment>
                    </Link>
                </div>
            </div>
            <InputPost />
        </Container>
    );
}

const Container = styled.div`
    border: 1px solid rgba(219, 219, 219, 1);
    border-top: none;
    .content-wrapper {
        padding: 0 16px 16px;
    }

    .count-like {
        color: rgba(38, 38, 38, 1);
        font-weight: 600;
        margin-bottom: 8px;
    }

    .title-wrapper {
        margin-bottom: 4px;
    }

    .author-username {
        a {
            color: rgba(38, 38, 38, 1);
            text-decoration: none;
            font-weight: 600;

            &:hover {
                text-decoration: underline;
            }
        }
    }

    .title-author-wrapper {
        margin-bottom: 4px;
        .more-title {
            background: 0 0;
            border: 0;
            color: #8e8e8e;
            color: rgba(142, 142, 142, 1);
            cursor: pointer;
            line-height: inherit;
            margin: 0;
            padding: 0;
        }
    }

    .comment-wrapper {
        margin-bottom: 4px;
        color: rgba(142, 142, 142, 1);
    }

    .time-text {
        font-size: 12px;
        letter-spacing: 0.2px;
        color: #8e8e8e;
        text-decoration: none;
    }
`;
