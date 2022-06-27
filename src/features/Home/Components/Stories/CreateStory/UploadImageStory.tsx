import * as React from 'react';
import styled from 'styled-components';
import { ChooseImageStory } from './ChooseImageStory';
import { FileStory, PayloadCreateStory } from './ModalCreateStory';

export interface IUploadImageStoryProps {
    step: number;
    file: FileStory;
    loadingCreatedStory: boolean;
    handleBackStep: () => void;
    handleNextStep: () => void;
    handleSetFile: (file: FileStory) => void
    handleCreateStory: (payload: PayloadCreateStory) => void;
}



export default function UploadImageStory(props: IUploadImageStoryProps) {
    const { step, file, loadingCreatedStory, handleBackStep, handleNextStep, handleSetFile, handleCreateStory } = props;

    const [isBumpContent, setIsBumpContent] = React.useState<boolean>(false);
    const refInput = React.createRef();

    React.useEffect(() => {
        if (!isBumpContent) {
            setIsBumpContent(true);
        } else {
            const timer = setTimeout(() => {
                setIsBumpContent(false);
            }, 300);

            return () => {
                clearTimeout(timer);
            };
        }
    }, []);

    const handleClickSelectImage = () => {
        if (refInput && refInput.current) {
            // @ts-ignore: Object is possibly 'null'.
            refInput.current.click();
        }
    };

    const handleOnChangeFile = (e: React.FormEvent<HTMLInputElement>) => {
        // formData.append('files', refInput.current.files[0]);
        // @ts-ignore: Object is possibly 'null'.
        const filesUpload: File = refInput.current.files[0];
        const blobUrl = window.URL.createObjectURL(filesUpload);

        handleSetFile({
            file: filesUpload,
            url: blobUrl
        })
        // formData.append('files', filesUpload);
        // @ts-ignore: Object is possibly 'null'.
        // const countFile = refInput.current.files.length;
        // let filesUploadUrl: FileUrl[] = [];
        // for (let i = 0; i < countFile; i++) {
        //     const file = filesUpload[i];
        //     formData.append('files', file);
        //     const blobUrl = window.URL.createObjectURL(file);

        //     const dataPush: FileUrl = {
        //         file: file,
        //         url: blobUrl,
        //         type,
        //     }

        if (step !== 2) {
            handleNextStep();
        }
        // @ts-ignore: Object is possibly 'null'.
        e.target.value = null;
    };

    return (
        <Container className={isBumpContent ? 'bump' : ''}>
            <ChooseImageStory
                ref={refInput}
                loadingCreatedStory={loadingCreatedStory}
                handleCreateStory={handleCreateStory}
                handleOnChangeFile={handleOnChangeFile}
                step={step}
                file={file}
                handleBackStep={handleBackStep}
                handleNextStep={handleNextStep}
                handleClickSelectImage={handleClickSelectImage}
            />
        </Container>
    );
}

const Container = styled.div`
    position: relative;
    background-color: #fff;

    border-radius: 15px;
    overflow: hidden;

    &.bump {
        animation: bump 300ms ease-out;
    }
    @keyframes bump {
        0% {
            transform: scale(1);
        }
        10% {
            transform: scale(0.9);
        }
        30% {
            transform: scale(1.1);
        }
        50% {
            transform: scale(1.15);
        }
        100% {
            transform: scale(1);
        }
    }
`;
