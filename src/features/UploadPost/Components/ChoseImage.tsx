import { MediaIcon } from '@components/Icons';
import { MediaType } from '@constants/media-type';
import { StepCreatePost } from '@constants/step_create_post';
import * as React from 'react';
import styled from 'styled-components';
import { FileUrl } from '.';
import CropImage  from './CropImage';
import EditImage from './EditImage';
import EditPost from './EditPost';
import SharedPost from './SharedPost';
import { StartEndTime } from './ModalPost';
import { PayloadCreatePost } from './UploadImagePost';


export interface IChoseImagePostProps {
    handleClickSelectImage: (e: React.MouseEvent<HTMLElement>) => void;
    handleOnChangeFile: (e: React.FormEvent<HTMLInputElement>) => void;
    handleChangeImageGallery: (indexActive: number) => void;
    handleCloseItemGallery: (index: number) => void;
    handleShowModalDiscard: () => void;
    handleBackStep: () => void;
    handleNextStep: () => void;
    setStep: React.Dispatch<React.SetStateAction<number>>;
    setFiles: React.Dispatch<React.SetStateAction<FileUrl[]>>;
    setIsClickBackFirst: React.Dispatch<React.SetStateAction<boolean>>;
    setStartEndTime: React.Dispatch<React.SetStateAction<StartEndTime[]>>;
    handleSharePost: (payload: PayloadCreatePost) => void;
    isLoadingCreatePost: boolean;
    startEndTime: StartEndTime[];
    step: number;
    activeSliderSmall: number;
    fileGallery: FileUrl[];
}

export const ChoseImage = React.forwardRef((props: IChoseImagePostProps, ref: any) => {
    const {
        handleClickSelectImage,
        handleOnChangeFile,
        handleShowModalDiscard,
        handleChangeImageGallery,
        setIsClickBackFirst,
        handleCloseItemGallery,
        handleBackStep,
        handleNextStep,
        setStep,
        setFiles,
        setStartEndTime,
        handleSharePost,
        isLoadingCreatePost,
        startEndTime,
        step,
        fileGallery,
        activeSliderSmall
    } = props;
    const [indexSlideCurrentEditPost, setIndexSlideCurrentEditPost] = React.useState<number>(0);
    const refVideo = React.useRef<HTMLVideoElement[]>([]);
    const [currentIndexBigSlider, setCurrentIndexBigSlider] = React.useState<number>(0);

    const handleNextEditImage = (filesEdit: FileUrl[], indexSlideCurrent: number) => {
        console.log(filesEdit)
        setFiles((files) => files.map(file => {
            if (file.type === MediaType.image) {
                return filesEdit.find(fileEdit => fileEdit.file.name === file.file.name) || file
            } else {
                return file
            }
        }))
        console.log('CURRENT STE[', step)

        setIndexSlideCurrentEditPost(indexSlideCurrent)
        handleNextStep()
        
    }

    const handleChangeCurrentIndex = (index: number) => {
        setCurrentIndexBigSlider(index)
    }
    console.log(refVideo.current)
    
    return (
        <Container>
            {step === StepCreatePost.CREATE_NEW_POST && (
                <div className='input-choose'>
                    <div className="header">
                        <div className="main-header">Create new post</div>
                    </div>
                    <div className="content-main">
                        <MediaIcon ariaLabel="Icon to represent media such as images or videos" />
                        <div className="text-upload">Drag photos and videos here</div>
                        <button className='btn-select-file' onClick={handleClickSelectImage}>Select from computer</button>
                    </div>
                </div>
            )}
            {step === StepCreatePost.CROP_GALLERY && (
                <CropImage
                    refVideo={refVideo}
                    ref={refVideo}
                    currentIndexBigSlider={currentIndexBigSlider}
                    handleChangeCurrentIndex={handleChangeCurrentIndex}
                    handleCloseItemGallery={handleCloseItemGallery}
                    handleClickSelectImage={handleClickSelectImage}
                    handleChangeImageGallery={handleChangeImageGallery}
                    fileGallery={fileGallery}
                    activeSliderSmall={activeSliderSmall}
                    setStep={setStep}
                    setFiles={setFiles}
                    setIsClickBackFirst={setIsClickBackFirst}
                    handleShowModalDiscard={handleShowModalDiscard}
                    handleNextStep={handleNextStep}
                />
            )}
            {step === StepCreatePost.EDIT_GALLERY && (
                <EditImage
                    fileGallery={fileGallery}
                    currentIndexBigSlider={currentIndexBigSlider}
                    handleChangeCurrentIndex={handleChangeCurrentIndex}
                    setStartEndTime={setStartEndTime}
                    startEndTime={startEndTime}
                    handleNextEditImage={handleNextEditImage}
                    handleBackStep={handleBackStep}
                    // handleCloseItemGallery={handleCloseItemGallery}
                    // handleClickSelectImage={handleClickSelectImage}
                    // handleChangeImageGallery={handleChangeImageGallery}
                    // fileGallery={fileGallery}
                    // activeSliderSmall={activeSliderSmall}
                    // setStep={setStep}
                    setFiles={setFiles}
                    // setIsClickBackFirst={setIsClickBackFirst}
                    // handleShowModalDiscard={handleShowModalDiscard}
                />
            )}
            {step === StepCreatePost.EDIT_POST && (
                <EditPost fileGallery={fileGallery} handleSharePost={handleSharePost} handleBackStep={handleBackStep} indexSlideCurrentEditPost={indexSlideCurrentEditPost}/>
            )}
            {step === StepCreatePost.SHARED_POST && (
                <SharedPost isLoadingCreatePost={isLoadingCreatePost}/>
            )}
            <form>
                <input
                    className="input_upload"
                    onChange={handleOnChangeFile}
                    ref={ref}
                    multiple
                    type="file"
                />
            </form>
        </Container>
    );
});

const Container = styled.div`
    
    .input-choose {
        position: relative;
        max-width: 751px;
        min-width: 550px;
        min-height: 575px;
    }
    
    .header {
        display: flex;
        border-bottom: 1px solid rgb(219, 219, 219);
        border-top-left-radius: 10px;
        justify-content: center;
        align-items: center;
        height: 42px;

        .main-header {
            font-size: 16px;
            color: #262626;
            font-weight: 600;
        }
    }
    .input_upload {
        visibility: hidden;
    }

    form {
        position: absolute;
        top: 0;
        left: 0;
    }
    .content-main {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        height: 64vh;
        .text-upload {
            font-size: 22px;
            color: #262626;
            margin: 10px 0 15px 0;
        }

        button.btn-select-file {
            background-color: #0095f6;
            color: #fff;
            border: none;
            padding: 8px 9px;
            font-size: 15px;
            border-radius: 5px;
            font-weight: 600;
            cursor: pointer;
            outline: none;
        }
    }
`;
