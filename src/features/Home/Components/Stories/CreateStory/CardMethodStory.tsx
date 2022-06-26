import * as React from 'react';
import styled from 'styled-components';
import { MethodStory } from './ModalCreateStory';

export interface ICardMethodStoryProps {
    type: 'photo' | 'text';
    handleSetMethodStory: (method: MethodStory) => void
}
interface ContainerStyledProps {
    baseUrl: string;
    type: 'photo' | 'text';
}

export default function CardMethodStory(props: ICardMethodStoryProps) {
    const { type, handleSetMethodStory } = props;
    return (
        <Container onClick={() => {
           type === 'photo' ? handleSetMethodStory(MethodStory.PHOTO) : handleSetMethodStory(MethodStory.TEXT)
        }} type={type} baseUrl={window.location.origin}>
            <div className="icon-wrapper">
                <div className="icon"></div>
            </div>
            <div className="text">{type === 'photo' ? 'Create a Photo Story' : 'Create a Text Story'}</div>

        </Container>
    );
}

const Container = styled.div<ContainerStyledProps>`
    background-image: ${(props) => `url(${props.baseUrl}/images/bg.png)`};
    background-size: auto;
    background-position: ${(props) => `${props.type === 'photo' ? '0px 0px' : '0px -331px'}`};
    width: 220px;
    height: 330px;
    background-repeat: no-repeat;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    &:hover {
        opacity: 0.8;
        cursor: pointer;
    }

    .text {
        font-weight: bold;
        text-align: center;
        color: #fff;
    }


    .icon-wrapper {
        box-shadow: 0 2px 4px #b0b3b8;
        border-radius: 50%;
        margin-bottom: 8px;
        height: 44px;
        width: 44px;
        background-color: #040506;
        display: flex;
        justify-content: center;
        align-items: center;
        .icon {
            background-image: ${(props) => `url(${props.baseUrl}/images/bgIcon3.png)`};
            width: 20px;
            height: 20px;
            background-size: auto;
            background-position: ${(props) => `${props.type === 'photo' ? '-2px -2px' : '0px -50px'}`};

            background-repeat: no-repeat;
            filter: invert(89%) sepia(6%) hue-rotate(185deg);
            
        }
    }
`;
