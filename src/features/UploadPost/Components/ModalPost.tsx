import { Modal } from '@components/common';
import { MediaType } from '@constants/media-type';
import { StepCreatePost } from '@constants/step_create_post';
import { useAppDispatch } from '@redux/hooks';
import * as React from 'react';
import { postActions } from '../postSlice';
import { DiscardPost } from './DiscardPost';
import {UploadImagePost } from './UploadImagePost';

export interface IModalPostProps {
    showModalCreatePost: boolean;
    handleCloseModalCreatePost: () => void;
}

export interface FileUrl {
    file: File;
    url: string;
    type: MediaType.image | MediaType.video;
    isMute?: boolean;
    coverUrl?: string;
}

export interface StartEndTime {
    startTime: number;
    endTime: number;
    indexSlider: number;
}

export function ModalPost(props: IModalPostProps) {
    const [showModalDiscard, setShowModalDiscard] = React.useState<boolean>(false);
    const [step, setStep] = React.useState<number>(1);
    const [isClickBackFirst, setIsClickBackFirst] = React.useState<boolean>(false);
    const [files, setFiles] = React.useState<FileUrl[]>([]);
    const [startEndTime, setStartEndTime] = React.useState<StartEndTime[]>([]);
    const dispatch = useAppDispatch();

    const { handleCloseModalCreatePost, showModalCreatePost } = props;

    const handleShowModalDiscard = () => {
        if (step === StepCreatePost.SHARED_POST) {
            handleCloseModalCreatePost()
            setStep(1);
            setIsClickBackFirst(false);
            setFiles([]);
            dispatch(postActions.fetchData());
        } else {
            setShowModalDiscard(true);
        }
    };

    const handleCloseModalDiscard = () => {
        setShowModalDiscard(false);
    };
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
                        startEndTime={startEndTime}
                        setStartEndTime={setStartEndTime}
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
