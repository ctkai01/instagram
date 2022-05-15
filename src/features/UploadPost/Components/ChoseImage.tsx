import { MediaIcon } from '@components/Icons';
import * as React from 'react';
import styled from 'styled-components';
import { FileUrl } from '.';
import { CropImage } from './CropImage';
import EditImage from './EditImage';


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
        step,
        fileGallery,
        activeSliderSmall
    } = props;

    return (
        <Container>
            {step === 1 && (
                <div className='input-choose'>
                    <div className="header">
                        <div className="main-header">Create new post</div>
                    </div>
                    <div className="content-main">
                        <MediaIcon ariaLabel="Icon to represent media such as images or videos" />
                        <div className="text-upload">Drag photos and videos here</div>
                        <button onClick={handleClickSelectImage}>Select from computer</button>
                    </div>
                </div>
            )}
            {step === 2 && (
                <CropImage
                    handleCloseItemGallery={handleCloseItemGallery}
                    handleClickSelectImage={handleClickSelectImage}
                    handleChangeImageGallery={handleChangeImageGallery}
                    fileGallery={fileGallery}
                    activeSliderSmall={activeSliderSmall}
                    setStep={setStep}
                    setFiles={setFiles}
                    setIsClickBackFirst={setIsClickBackFirst}
                    handleShowModalDiscard={handleShowModalDiscard}
                    handleBackStep={handleBackStep}
                    handleNextStep={handleNextStep}
                />
            )}
            {step === 3 && (
                <EditImage
                    fileGallery={fileGallery}

                    // handleCloseItemGallery={handleCloseItemGallery}
                    // handleClickSelectImage={handleClickSelectImage}
                    // handleChangeImageGallery={handleChangeImageGallery}
                    // fileGallery={fileGallery}
                    // activeSliderSmall={activeSliderSmall}
                    // setStep={setStep}
                    // setFiles={setFiles}
                    // setIsClickBackFirst={setIsClickBackFirst}
                    // handleShowModalDiscard={handleShowModalDiscard}
                />
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

        button {
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
