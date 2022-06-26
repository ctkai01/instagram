import * as React from 'react';
import styled from 'styled-components';
import { defaultFileStory, FileStory, MethodStory } from './ModalCreateStory';

export interface IDiscardStoryProps {
    isClickBackFirst: boolean;
    handleCloseModalDiscard: () => void;
    handleCloseModalCreateStory: () => void;
    setStep: React.Dispatch<React.SetStateAction<number>>;
    setIsClickBackFirst: React.Dispatch<React.SetStateAction<boolean>>;
    handleSetFile: (file: FileStory) => void;
    handleSetMethodStory: (method: MethodStory) => void
}


export function DiscardStory(props: IDiscardStoryProps) {
    const { isClickBackFirst, handleSetMethodStory, handleSetFile, setIsClickBackFirst, handleCloseModalDiscard, handleCloseModalCreateStory, setStep } = props;
    const handleMouseUpButton = (e: React.MouseEvent<HTMLDivElement>) => {
        e.currentTarget.style.background = '#fff';
    };

    const handleMouseDownButton = (e: React.MouseEvent<HTMLDivElement>) => {
        e.currentTarget.style.background = 'rgba(204, 204, 204, .5)';
    };

    const handleDiscardPost = () => {
        if (!isClickBackFirst) {
            handleCloseModalCreateStory();
        } 
        handleCloseModalDiscard();
        setStep(1);
        handleSetMethodStory(MethodStory.NONE)
        setIsClickBackFirst(false);
        handleSetFile(defaultFileStory);
    }


    return (
        <Container>
            <div className="title-container">
                <div className="title">Discard Post?</div>
                <div className="remind">If you leave, your edits won't be saved.</div>
            </div>
            <div className="button-container">
                <div
                    onClick={handleDiscardPost}
                    onMouseUp={handleMouseUpButton}
                    onMouseDown={handleMouseDownButton}
                    className="button discard"
                >
                    Discard
                </div>
                <div
                    onClick={handleCloseModalDiscard}
                    onMouseUp={handleMouseUpButton}
                    onMouseDown={handleMouseDownButton}
                    className="button cancel"
                >
                    Cancel
                </div>
            </div>
        </Container>
    );
}

const Container = styled.div`
    width: 400px;
    max-height: calc(100% - 40px);
    border: 0 solid #000;
    background-color: #fff;
    border-radius: 12px;
    overflow: hidden;

    .title-container {
        padding: 16px 32px;
        padding-top: 32px;
        text-align: center;

        .title {
            font-size: 18px;
            line-height: 24px;
            font-weight: 600;
            margin-bottom: 10px;
        }

        .remind {
            color: rgba(142, 142, 142, 1);
        }
    }

    .button-container {
        margin-top: 16px;
        box-sizing: border-box;

        .button {
            padding: 4px 8px;
            min-height: 48px;
            cursor: pointer;
            border-top: 1px solid rgba(219, 219, 219, 1);
            display: flex;
            justify-content: center;
            align-items: center;
            user-select: none;

            &.discard {
                font-weight: 700;
                color: #ed4956;
            }
        }
    }
`;
