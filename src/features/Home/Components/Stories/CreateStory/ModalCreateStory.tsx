import { Api } from '@api/authApi';
import { Modal } from '@components/common';
import { StepCreateStory, StepCreateStoryText } from '@constants/step_create_story';
import * as React from 'react';
import { ChooseImageStory } from './ChooseImageStory';
import ChooseMethodStory from './ChooseMethodStory';
import ChooseTextStory from './ChooseTextStory';
import { DiscardStory } from './DiscardStory';
import TextStoryMethod from './TextStoryMethod';
import UploadImageStory from './UploadImageStory';

export interface IModalCreateStoryProps {
    showCreateStory: boolean;
    handleCloseCreateStory: () => void;
}

export interface TextStory {
    text?: string;
    color?: string;
    font: string;
    bg?: string;
}

export interface PayloadCreateStoryText {
    textStory: TextStory;
}

export interface PayloadCreateStory {
    file: File;
    textStory?: TextStory;
}

export interface FileStory {
    file: File;
    url: string;
}

export const defaultFileStory: FileStory = {
    url: '',
    file: new File([''], ''),
};

export enum MethodStory {
    NONE,
    PHOTO,
    TEXT,
}

export default function ModalCreateStory(props: IModalCreateStoryProps) {
    const { showCreateStory, handleCloseCreateStory } = props;

    const [methodStory, setMethodStory] = React.useState<MethodStory>(MethodStory.NONE);
    const [step, setStep] = React.useState<number>(1);
    const [isClickBackFirst, setIsClickBackFirst] = React.useState<boolean>(false);
    const [loadingCreatedStory, setLoadingCreatedStory] = React.useState<boolean>(false);
    const [showModalDiscard, setShowModalDiscard] = React.useState<boolean>(false);
    const [file, setFile] = React.useState<FileStory>(defaultFileStory);

    const handleShowModalDiscard = () => {
        if (step === StepCreateStory.LOADING_CREATED || step === StepCreateStoryText.LOADING_CREATED) {
            handleCloseModalDiscard();
            setStep(1);
            setIsClickBackFirst(false);
            setFile(defaultFileStory);
            setMethodStory(MethodStory.NONE);
            handleCloseCreateStory();
            // dispatch(postActions.fetchData());
        } else {
            setShowModalDiscard(true);
        }
    };

    const handleSetMethodStory = (method: MethodStory) => {
        setMethodStory(method);
    };

    const handleSetFile = (file: FileStory) => {
        setFile(file);
    };

    const handleBackStep = () => {
        setStep((stepPrev: number) => stepPrev - 1);
    };

    const handleNextStep = () => {
        setStep((stepPrev: number) => {
            return stepPrev + 1;
        });
    };

    const handleCloseModalDiscard = () => {
        setShowModalDiscard(false);
    };

    const handleCloseMethodStory = () => {
        setMethodStory(MethodStory.NONE);
        handleCloseCreateStory();
    };

    const handleCreateStory = async (payload: PayloadCreateStory) => {
        console.log(payload);
        const formData = new FormData();

        if (payload.textStory) {
            formData.append('textStory', JSON.stringify(payload.textStory));
        }
        formData.append('file', payload.file);
        setLoadingCreatedStory(true);
        await Api.createStory(formData);
        setLoadingCreatedStory(false);
    };

    const handleCreateStoryText = async (payload: PayloadCreateStoryText) => {
        console.log(payload);
        const formData = new FormData();

        formData.append('textStory', JSON.stringify(payload.textStory));
     
        setLoadingCreatedStory(true);
        await Api.createStory(formData);
        setLoadingCreatedStory(false);
    };

    return (
        <>
            {methodStory === MethodStory.NONE && (
                <Modal
                    closeButton
                    content={<ChooseMethodStory handleSetMethodStory={handleSetMethodStory} />}
                    color="#000000d9"
                    showModal={showCreateStory}
                    onCloseModal={step === 1 ? handleCloseMethodStory : handleShowModalDiscard}
                />
            )}
            {methodStory === MethodStory.PHOTO && (
                <Modal
                    closeButton
                    content={
                        <UploadImageStory
                            file={file}
                            handleCreateStory={handleCreateStory}
                            handleSetFile={handleSetFile}
                            handleBackStep={handleBackStep}
                            handleNextStep={handleNextStep}
                            step={step}
                            loadingCreatedStory={loadingCreatedStory}
                        />
                    }
                    color="#000000d9"
                    showModal={showCreateStory}
                    onCloseModal={step === 1 ? handleCloseMethodStory : handleShowModalDiscard}
                />
            )}
            {methodStory === MethodStory.TEXT && (
                <Modal
                    closeButton
                    content={
                        <ChooseTextStory
                            loadingCreatedStory={loadingCreatedStory}
                            handleCreateStoryText={handleCreateStoryText}
                            handleBackStep={handleBackStep}
                            handleNextStep={handleNextStep}
                            step={step}
                        />
                    }
                    color="#000000d9"
                    showModal={showCreateStory}
                    onCloseModal={step === 1 ? handleCloseMethodStory : handleShowModalDiscard}
                />
            )}

            <Modal
                content={
                    <DiscardStory
                        handleSetMethodStory={handleSetMethodStory}
                        handleCloseModalCreateStory={handleCloseCreateStory}
                        handleCloseModalDiscard={handleCloseModalDiscard}
                        setStep={setStep}
                        setIsClickBackFirst={setIsClickBackFirst}
                        isClickBackFirst={isClickBackFirst}
                        handleSetFile={handleSetFile}
                    />
                }
                color="rgba(0,0,0,.65)"
                showModal={showModalDiscard}
                onCloseModal={handleCloseModalDiscard}
            />
        </>
    );
}
