import { MediaIcon } from '@components/Icons';
import * as React from 'react';
import styled from 'styled-components';
import { FileUrl } from '.';
import { CropImage } from './CropImage';

export interface IChoseImagePostProps {
    handleClickSelectImage: (e: React.MouseEvent<HTMLElement>) => void;
    handleOnChangeFile: (e: React.FormEvent<HTMLInputElement>) => void;
    handleShowModalDiscard: () => void;
    setStep: React.Dispatch<React.SetStateAction<number>>;
    setFiles: React.Dispatch<React.SetStateAction<FileUrl[]>>;
    setIsClickBackFirst: React.Dispatch<React.SetStateAction<boolean>>;
    step: number;
    imageGallery: string[];
}

export const ChoseImage = React.forwardRef((props: IChoseImagePostProps, ref: any) => {
    const {
        handleClickSelectImage,
        handleOnChangeFile,
        handleShowModalDiscard,
        setIsClickBackFirst,
        setStep,
        setFiles,
        step,
        imageGallery,
    } = props;

    return (
        <Container>
            {step === 1 && (
                <>
                    <div className="header">
                        <div className="main-header">Create new post</div>
                    </div>
                    <div className="content-main">
                        <MediaIcon ariaLabel="Icon to represent media such as images or videos" />
                        <div className="text-upload">Drag photos and videos here</div>
                        <button onClick={handleClickSelectImage}>Select from computer</button>
                    </div>
                </>
            )}
            {step === 2 && (
                <CropImage
                    imageGallery={imageGallery}
                    setStep={setStep}
                    setFiles={setFiles}
                    setIsClickBackFirst={setIsClickBackFirst}
                    handleShowModalDiscard={handleShowModalDiscard}
                />
            )}
            <form>
                <input onChange={handleOnChangeFile} ref={ref} multiple type="file" />
            </form>
        </Container>
    );
});

const Container = styled.div`
    position: relative;
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
    input {
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
