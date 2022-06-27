import { Avatar } from '@components/common';
import { Story, ViewStory } from '@models/Story';
import { User } from '@models/User';
import styled from 'styled-components';
import { convertISOTime, convertTime } from '@utils/time';
import Moment from 'react-moment';

export interface IStoryViewItemProps {
    story: Story;
    index: number;
    currentSliderItem: number;
    showInfo: boolean;
    user: User;
}

export default function StoryViewItem(props: IStoryViewItemProps) {
    const { story, user, index, currentSliderItem, showInfo } = props;
    const timeCreated = convertISOTime(story.created_at);
    const { format, fromNow } = convertTime(story.created_at, 7);
    console.log('FUck', user)
    return (
        <Container>
            <div className="info" style={{ display: `${showInfo ? 'block' : 'none'}` }}>
            
                <div className="info-detail">
                    <Avatar border={`${user.view_all_story === ViewStory.SEE ? 'watch' : 'watched'}`} className="avatar" size="small" url={user.avatar} />
                    <div className="user-name">{user.user_name}</div>
                    <div className="time">
                        <Moment format={format} fromNow={fromNow}>
                            {timeCreated}
                        </Moment>
                    </div>
                </div>
            </div>
            {story.text_json?.text && (
                <div
                    style={{
                        color: `${story.text_json.color ? story.text_json.color : ''}`,
                        fontFamily: `${story.text_json.font ? story.text_json.font : ''}`,
                    }}
                    className="text"
                >
                    {story.text_json?.text}
                </div>
            )}
            <img src={story.media ? story.media : story.text_json?.bg} />
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .text {
        position: absolute;
        top: 30%;
        left: 50%;
        transform: translate(-50%, -30%);
        font-size: 24px;
        font-weight: 600;
    }

    .info {
        padding: 20px 16px 32px;
        position: absolute;
        width: 94%;
        background: linear-gradient(180deg, rgba(38, 38, 38, 0.8) 0%, rgba(38, 38, 38, 0) 100%);
    }

    .info-detail {
        display: flex;
        align-items: center;

        .avatar {
            margin-right: 8px;
        }

        .user-name {
            color: #fff;
            font-size: 14px;
            margin-right: 10px;
        }

        .time {
            color: #fff;
            opacity: 0.6;
            font-size: 14px;
        }
    }

    .list-time {
        margin-bottom: 8px;
        display: flex;
        justify-content: space-between;

        .time-item {
            flex-grow: 1;
            height: 2px;
            margin-right: 4px;
            position: relative;

            &:last-child {
                margin-right: 0;
            }
        }
    }
`;
