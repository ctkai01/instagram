import * as React from 'react';
import styled from 'styled-components';
import CardMethodStory from './CardMethodStory';
import { MethodStory } from './ModalCreateStory';

export interface IChooseMethodStoryProps {
    handleSetMethodStory: (method: MethodStory) => void
}

export default function ChooseMethodStory(props: IChooseMethodStoryProps) {
    const { handleSetMethodStory } = props
    return (
        <Container>
            <div className="header">
                <div className="main-header">Chose method create story</div>
            </div>
            <div className="content">
                <CardMethodStory type="photo" handleSetMethodStory={handleSetMethodStory}/>
                <CardMethodStory type="text" handleSetMethodStory={handleSetMethodStory}/>
            </div>
        </Container>
    );
}

const Container = styled.div`
    position: relative;
    max-width: 751px;
    min-width: 650px;
    min-height: 575px;
    background-color: #fff;
    border-radius: 10px;

    .header {
        display: flex;
        border-bottom: 1px solid rgb(219, 219, 219);
        border-top-left-radius: 10px;
        justify-content: center;
        align-items: center;
        height: 42px;

        .main-header {
            font-size: 16px;
            color: #262626;
            font-weight: 600;
        }
    }

    .content {
        display: flex;
        /* width:; */
        justify-content: space-around;
        align-items: center;

        height: calc(575px - 42px);
        width: 650px;
    }
`;
