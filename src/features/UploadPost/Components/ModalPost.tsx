import { Modal } from '@components/common';
import * as React from 'react';
import { DiscardPost } from './DiscardPost';
import {UploadImagePost } from './UploadImagePost';

export interface IModalPostProps {
    showModalCreatePost: boolean;
    handleCloseModalCreatePost: () => void;
}

export interface FileUrl {
    file: File;
    url: string;
    type: 1 | 2;
}

export function ModalPost(props: IModalPostProps) {
    const [showModalDiscard, setShowModalDiscard] = React.useState<boolean>(false);
    const [step, setStep] = React.useState<number>(1);
    const [isClickBackFirst, setIsClickBackFirst] = React.useState<boolean>(false);
    const [files, setFiles] = React.useState<FileUrl[]>([]);

    const { handleCloseModalCreatePost, showModalCreatePost } = props;

    const handleShowModalDiscard = () => {
        setShowModalDiscard(true);
    };

    const handleCloseModalDiscard = () => {
        setShowModalDiscard(false);
    };
    console.log(step, 'step');
    return (
        <>
            <Modal
                closeButton
                content={
                    <UploadImagePost
                        step={step}
                        setStep={setStep}
                        handleShowModalDiscard={handleShowModalDiscard}
                        setIsClickBackFirst={setIsClickBackFirst}
                        setFiles={setFiles}
                        files={files}
                    />
                }
                color="#000000d9"
                showModal={showModalCreatePost}
                onCloseModal={step === 1 ? handleCloseModalCreatePost : handleShowModalDiscard}
            />
            <Modal
                content={
                    <DiscardPost
                        handleCloseModalCreatePost={handleCloseModalCreatePost}
                        handleCloseModalDiscard={handleCloseModalDiscard}
                        setStep={setStep}
                        setIsClickBackFirst={setIsClickBackFirst}
                        isClickBackFirst={isClickBackFirst}
                        setFiles={setFiles}
                    />
                }
                color="rgba(0,0,0,.65)"
                showModal={showModalDiscard}
                onCloseModal={handleCloseModalDiscard}
            />
        </>
    );
}
