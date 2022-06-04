import { Api } from '@api/authApi';
import { MediaType } from '@constants/media-type';
import { StepCreatePost } from '@constants/step_create_post';
import * as React from 'react';
import styled from 'styled-components';
import { FileUrl } from '.';
import { ChoseImage } from './ChoseImage';
import { SettingPost, TagUserPost } from './EditPost';
import { StartEndTime } from './ModalPost';

export interface IUploadImagePostProps {
    step: number;
    files: FileUrl[];
    startEndTime: StartEndTime[];
    setStartEndTime: React.Dispatch<React.SetStateAction<StartEndTime[]>>;
    setStep: React.Dispatch<React.SetStateAction<number>>;
    setIsClickBackFirst: React.Dispatch<React.SetStateAction<boolean>>;
    setFiles: React.Dispatch<React.SetStateAction<FileUrl[]>>;
    handleShowModalDiscard: () => void;
}

export interface FilePost {
    file?: File;
    type: MediaType.image | MediaType.video;
    isMute?: boolean;
    coverUrl?: File | string;
    tags: TagUserPost[],
    startTime?: number;
    endTime?: number;
} 

export interface PayloadCreatePost extends SettingPost {
    files: FilePost[];
    location?: string;
    caption?: string;
}

interface OptionFileCreatePost {
    type: MediaType.image | MediaType.video;
    isMute?: boolean;
    tags: TagUserPost[],
    startTime?: number;
    endTime?: number;
}

export interface PayloadTransformCreatePost extends SettingPost  {
    files: File[];
    coverFiles: (File | string | undefined)[]
    location?: string;
    caption?: string;
    optionFiles: OptionFileCreatePost[];
}


export function UploadImagePost(props: IUploadImagePostProps) {
    const {
        step,
        files,
        startEndTime,
        setStartEndTime,
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
            const dataPush: FileUrl = {
                file: file,
                url: blobUrl,
                type,
            }

            if (type === MediaType.video) {
                dataPush['isMute'] = false
            }
            filesUploadUrl.push(dataPush);
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
        
        setStep((stepPrev: number) => {
            return stepPrev + 1
        });
    };
    const handleBackStep = () => {
        setStep((stepPrev: number) => stepPrev - 1);
    };

    const handleSharePost = async (payload: PayloadCreatePost) => {
        console.log('BEgin', payload.files)
        console.log('BEgin1', payload)
        let fileStartTime = await Promise.all(
        payload.files.map(async (file, index) => {
            if (file.type === MediaType.image) {
                return file
            }

            let trimVideo: StartEndTime = {
                startTime: 0,
                endTime: 0,
                indexSlider: 1
            }
            const checkStartTime = startEndTime.find(el => el.indexSlider === index)
            if (checkStartTime) {
                trimVideo = checkStartTime
            }

            // const coverFile=  new File([file.coverUrl], 'cover', { type: 'image/png' });
            
            
            console.log('FIle', file)
            //@ts-ignore: Object is possibly 'null'.
            const coverFile: File = await dataUrlToFile(file.coverUrl, 'cover.png')
            return {
                ...file,
                coverUrl: coverFile,
                startTime: trimVideo.startTime,
                endTime: trimVideo.endTime,
            }
           
        }))
        payload.files = fileStartTime

        const payloadTransform: PayloadTransformCreatePost = {
             //@ts-ignore: Object is possibly 'null'.
            files: payload.files.map(file => file.file),
            coverFiles: payload.files.filter(file => file.coverUrl).map(file => file.coverUrl),
            caption: payload.caption,
            location: payload.location,
            isOffComment: payload.isOffComment,
            isHideLikeAndView: payload.isHideLikeAndView,
            optionFiles: payload.files.map(file => {
                delete file['file']
                delete file['coverUrl']
                return file
            })
        }
        console.log('Payload', payloadTransform)
        const formData = new FormData();

        formData.set("caption", payloadTransform.caption ? payloadTransform.caption : '');
        formData.set("location", payloadTransform.location ? payloadTransform.location : '');
        formData.set("isOffComment", `${+payloadTransform.isOffComment}`);
        formData.set("isHideLikeAndView", `${+payloadTransform.isHideLikeAndView}`);
        formData.append('optionFiles', JSON.stringify(payloadTransform.optionFiles));

        payloadTransform.files.forEach(file => {
            formData.append('files', file);
        })

        payloadTransform.coverFiles.forEach(file => {
              //@ts-ignore: Object is possibly 'null'.
            formData.append('coverFiles', file);
        })

        fetchCreatePost(formData);
        // handleNextStep()
    }

    const fetchCreatePost = async (data: FormData) => {
        const response = await Api.createPost(data);
    }

    async function dataUrlToFile(dataUrl: string, fileName: string): Promise<File> {
        const res: Response = await fetch(dataUrl);
        const blob: Blob = await res.blob();
        console.log('URL', dataUrl)
        return new File([blob], fileName, { type: 'image/png' });
    }
    return (
        <Container className={isBumpContent ? 'bump' : ''}>
            {(step === StepCreatePost.CREATE_NEW_POST ||
                step === StepCreatePost.CROP_GALLERY ||
                step === StepCreatePost.EDIT_GALLERY ||
                step === StepCreatePost.EDIT_POST ||
                step === StepCreatePost.SHARED_POST
                ) && (
                <ChoseImage
                    handleSharePost={handleSharePost}
                    setStartEndTime={setStartEndTime}
                    handleClickSelectImage={handleClickSelectImage}
                    handleOnChangeFile={handleOnChangeFile}
                    handleShowModalDiscard={handleShowModalDiscard}
                    setIsClickBackFirst={setIsClickBackFirst}
                    handleChangeImageGallery={handleChangeImageGallery}
                    handleCloseItemGallery={handleCloseItemGallery}
                    handleNextStep={handleNextStep}
                    handleBackStep={handleBackStep}
                    startEndTime={startEndTime}
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
