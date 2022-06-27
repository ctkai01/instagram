import { StepCreateStoryText } from '@constants/step_create_story';
import * as React from 'react';
import { PayloadCreateStoryText } from './ModalCreateStory';
import SharedStory from './SharedStory';
import TextStoryMethod from './TextStoryMethod';

export interface IChooseTextStoryProps {
    step: number;
    loadingCreatedStory: boolean;
    handleBackStep: () => void;
    handleNextStep: () => void;
    handleCreateStoryText: (payload: PayloadCreateStoryText) => void;
}

export default function ChooseTextStory(props: IChooseTextStoryProps) {
    const { step, loadingCreatedStory, handleBackStep, handleNextStep, handleCreateStoryText } = props;

    return (
        <>
            {step === StepCreateStoryText.ADD_TEXT && (
                <TextStoryMethod
                    handleCreateStoryText={handleCreateStoryText}
                    handleBackStep={handleBackStep}
                    handleNextStep={handleNextStep}
                />
            )}

            {step === StepCreateStoryText.LOADING_CREATED && (
                <SharedStory loadingCreatedStory={loadingCreatedStory} />
            )}
        </>
    );
}
