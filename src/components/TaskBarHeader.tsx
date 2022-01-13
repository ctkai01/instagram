import { Paper } from '@material-ui/core';
import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Arrow } from './common/Arrow';
import { CompassIcon, HeartIcon, HomeIcon, PlaneIcon, PlusSquareIcon }  from './Icons'

export interface ITaskBarHeaderProps {
    className: string;
    showSettingUser: boolean;
    useHandleSettingUser: (ref: React.RefObject<HTMLDivElement>) => void;
}

export default function TaskBarHeader(props: ITaskBarHeaderProps) {
    const { className, showSettingUser, useHandleSettingUser } = props;
    const settingUserRef =React.useRef(null)
    useHandleSettingUser(settingUserRef);

    return <Container className={className}>
        <Link to='/home'>
            {showSettingUser ? <HomeIcon color='white'/> : <HomeIcon color='black'/>}
        </Link>
        <Link to='/box'>
            <PlaneIcon/>
        </Link>
        <Link to='/new-post'>
            <PlusSquareIcon/>
        </Link>
        <Link to='/find-people'>
            <CompassIcon/>
        </Link>
        <Link to='/activity-feed'>
            <HeartIcon/>
        </Link>
        <div className='user-current-box' ref={settingUserRef}>
            <div className='image-user' style={{ border: `${showSettingUser ? '1px solid rgba(var(--i1d,38,38,38),1)' : ''}` }}>
                <img alt='user' src='https://ecdn.game4v.com/g4v-content/uploads/2021/03/Luffy.jpg'/>
            </div>
            {showSettingUser ? <Paper className='setting-user'>
               <p>1</p>
               <p>1</p>
               <p>1</p>
               <p>1</p> 
               <Arrow position='right-top'/>
            </Paper> : ''
            }
            
        </div>
    </Container>;
}

const Container = styled.div`
    display: flex;
    justify-content: space-evenly;
    padding-left: 20px;


    .setting-user {
        position: absolute;
        top: 42px;
        min-width: 230px;
        transform-style: preserve-3d;
        transform: translateX(-100%) translateX(54px);
    }
    .user-current-box {
        width: 24px;
        height: 24px;
        cursor: pointer;
        position: relative;

        .image-user {
            width: 100%;
            height: 100%;
            border-radius: 50%;
        }

        .image-user img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
        }
    }
`;
