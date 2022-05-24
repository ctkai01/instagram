import { MediaType } from '@constants/media-type';
import { StepCreatePost } from '@constants/step_create_post';
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
    const {
        step,
        files,
        setStep,
        handleShowModalDiscard,
        setIsClickBackFirst,
        setFiles,
    } = props;
    const [isBumpContent, setIsBumpContent] = React.useState<boolean>(false);
    const [activeSliderSmall, setActiveSliderSmall] = React.useState<number>(0);

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

    let formData = new FormData();
    const handleOnChangeFile = (e: React.FormEvent<HTMLInputElement>) => {
        // formData.append('files', refInput.current.files[0]);
        // @ts-ignore: Object is possibly 'null'.
        const filesUpload: File[] = refInput.current.files;

        // formData.append('files', filesUpload);
        // @ts-ignore: Object is possibly 'null'.
        const countFile = refInput.current.files.length;
        let filesUploadUrl: FileUrl[] = [];
        for (let i = 0; i < countFile; i++) {
            const file = filesUpload[i];
            formData.append('files', file);
            const blobUrl = window.URL.createObjectURL(file);

            const type = file?.type === 'video/mp4' ? MediaType.video : MediaType.image;
            filesUploadUrl.push({
                file: file,
                url: blobUrl,
                type,
            });
        }
        // filesUpload.forEach((file) => {
        //     console.log(file)
        //     formData.append('files', file);
        //     const blobUrl = window.URL.createObjectURL(file);
        //     //@ts-ignore: Object is possibly 'null'.
        //     const type = file?.type === 'video/mp4'
        //                     ? MediaType.video
        //                     : MediaType.image
        //     filesUploadUrl.push({
        //         file: file,
        //         url: blobUrl,
        //         type
        //     })
        // })
        setFiles((files: FileUrl[]) => [...files, ...filesUploadUrl]);

        // @ts-ignore: Object is possibly 'null'.
        // const blogUrl = window.URL.createObjectURL(refInput.current.files[0]);
        // // @ts-ignore: Object is possibly 'null'.
        // setFiles((files: FileUrl[]) => [
        //     ...files,
        //     {
        //         // @ts-ignore: Object is possibly 'null'.
        //         file: refInput.current.files[0],
        //         url: blogUrl,
        //         // @ts-ignore: Object is possibly 'null'.
        //         type: refInput.current.files[0]?.type === 'video/mp4'
        //                 ? MediaType.video
        //                 : MediaType.image,
        //     },
        // ]);
        if (step !== 2) {
            setStep((stepPrev: number) => stepPrev + 1);
            setActiveSliderSmall(activeSliderSmall);
        } else {
            console.log('Active', activeSliderSmall);
            setActiveSliderSmall(activeSliderSmall);
        }
        // @ts-ignore: Object is possibly 'null'.
        e.target.value = null;
    };

    const handleChangeImageGallery = (indexActive: number) => {
        setActiveSliderSmall(indexActive);
    };
    // let imageGallery = files.map((file) => file.url);

    const handleCloseItemGallery = (indexClose: number) => {
        // const indexCloseFile = files.length - 1 - indexClose;
        const indexCloseFile = indexClose;

        if (files.length === 1) {
            handleBackStep();
        }
        // imageGallery = imageGallery.filter((img, index) => index !== indexClose)
        setFiles((filesPrev) => filesPrev.filter((img, index) => index !== indexCloseFile));
    };

    // console.log(files);
    const handleNextStep = () => {
        setStep((stepPrev: number) => stepPrev + 1);
    };

    const handleBackStep = () => {
        setStep((stepPrev: number) => stepPrev - 1);
    };

    return (
        <Container className={isBumpContent ? 'bump' : ''}>
            {(step === StepCreatePost.CREATE_NEW_POST ||
                step === StepCreatePost.CROP_GALLERY ||
                step === StepCreatePost.EDIT_GALLERY ||
                step === StepCreatePost.EDIT_POST) && (
                <ChoseImage
                    handleClickSelectImage={handleClickSelectImage}
                    handleOnChangeFile={handleOnChangeFile}
                    handleShowModalDiscard={handleShowModalDiscard}
                    setIsClickBackFirst={setIsClickBackFirst}
                    handleChangeImageGallery={handleChangeImageGallery}
                    handleCloseItemGallery={handleCloseItemGallery}
                    handleNextStep={handleNextStep}
                    handleBackStep={handleBackStep}
                    activeSliderSmall={activeSliderSmall}
                    step={step}
                    ref={refInput}
                    fileGallery={files}
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
