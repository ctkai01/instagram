import * as React from 'react';
import styled from 'styled-components';
import { FileUrl } from '.';
import { ChoseImage } from './ChoseImage';

export interface IUploadImagePostProps {
    step: number;
    files: FileUrl[];
    setStep: React.Dispatch<React.SetStateAction<number>>;
    setIsClickBackFirst: React.Dispatch<React.SetStateAction<boolean>>;
    setFiles: React.Dispatch<React.SetStateAction<FileUrl[]>>;
    handleShowModalDiscard: () => void;
}

export function UploadImagePost(props: IUploadImagePostProps) {
    const { step, files, setStep, handleShowModalDiscard, setIsClickBackFirst, setFiles } = props;
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
    console.log('IS', isBumpContent)
    const handleClickSelectImage = () => {
        if (refInput && refInput.current) {
            // @ts-ignore: Object is possibly 'null'.
            refInput.current.click();
        }
    };

    let formData = new FormData();
    const handleOnChangeFile = (e: React.FormEvent<HTMLInputElement>) => {
        // @ts-ignore: Object is possibly 'null'.
        formData.append('files', refInput.current.files[0]);
        // @ts-ignore: Object is possibly 'null'.

        // @ts-ignore: Object is possibly 'null'.
        const blogUrl = window.URL.createObjectURL(refInput.current.files[0]);

        // @ts-ignore: Object is possibly 'null'.
        setFiles((files: File[]) => [
            ...files,
            {
                // @ts-ignore: Object is possibly 'null'.
                file: refInput.current.files[0],
                url: blogUrl,
            },
        ]);

        setStep((stepPrev: number) => stepPrev + 1);
        // @ts-ignore: Object is possibly 'null'.
        e.target.value = null;
    };

    console.log(files);
    const imageGallery = files.map((file) => file.url);
    return (
        <Container className={isBumpContent ? "bump" : ''}>
            {(step === 1 || step === 2) && (
                <ChoseImage
                    handleClickSelectImage={handleClickSelectImage}
                    handleOnChangeFile={handleOnChangeFile}
                    handleShowModalDiscard={handleShowModalDiscard}
                    setIsClickBackFirst={setIsClickBackFirst}
                    step={step}
                    ref={refInput}
                    imageGallery={imageGallery}
                    setStep={setStep}
                    setFiles={setFiles}
                />
            )}
        </Container>
    );
}

const Container = styled.div`
    position: relative;
    background-color: #fff;
    max-width: 751px;
    min-width: 550px;
    min-height: 575px;
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
