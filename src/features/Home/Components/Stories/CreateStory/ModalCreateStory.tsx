import { Modal } from '@components/common';
import * as React from 'react';
import ChooseMethodStory from './ChooseMethodStory';
import { DiscardStory } from './DiscardStory';
import UploadImageStory from './UploadImageStory';

export interface IModalCreateStoryProps {
    showCreateStory: boolean;
    handleCloseCreateStory: () => void;
}

export interface PayloadCreateStory {
    file: File;
    text?: string;
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
    const [showModalDiscard, setShowModalDiscard] = React.useState<boolean>(false);
    const [file, setFile] = React.useState<FileStory>(defaultFileStory);

    const handleShowModalDiscard = () => {
        // if (true) {
        //     handleCloseCreateStory()
        //     setStep(1);
        //     setIsClickBackFirst(false);
        //     setFile(defaultFileStory);
        // } else {
            setShowModalDiscard(true);
        // }
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

    console.log('METHOD', methodStory)
    const handleCloseMethodStory = () => {
        setMethodStory(MethodStory.NONE)
        console.log('SETTTTT')
        handleCloseCreateStory()
    }
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
                            handleSetFile={handleSetFile}
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
