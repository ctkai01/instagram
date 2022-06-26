import { MediaIcon } from '@components/Icons';
import { StepCreateStory } from '@constants/step_create_story';
import * as React from 'react';
import styled from 'styled-components';
import AddTextStory from './AddTextStory';
import { FileStory, PayloadCreateStory } from './ModalCreateStory';

export interface IChooseImageStoryProps {
  step: number;
  file: FileStory;
  handleClickSelectImage: (e: React.MouseEvent<HTMLElement>) => void;
  handleOnChangeFile: (e: React.FormEvent<HTMLInputElement>) => void;
  handleBackStep: () => void
  handleNextStep: () => void
  handleCreateStory: (payload: PayloadCreateStory) => void;

}

export const ChooseImageStory =  React.forwardRef((props: IChooseImageStoryProps, ref: any) => {
  const { step, file, handleClickSelectImage, handleOnChangeFile, handleBackStep, handleNextStep, handleCreateStory } = props
  return (
    <Container>
            {step === StepCreateStory.CREATE_NEW_STORY && (
                <div className='input-choose'>
                    <div className="header">
                        <div className="main-header">Create new story</div>
                    </div>
                    <div className="content-main">
                        <MediaIcon ariaLabel="Icon to represent media such as images or videos" />
                        <div className="text-upload">Drag photos</div>
                        <button className='btn-select-file' onClick={handleClickSelectImage}>Select from computer</button>
                    </div>
                </div>
            )}
            {step === StepCreateStory.ADD_TEXT && (
                <AddTextStory
                handleCreateStory={handleCreateStory}               
                file={file}
                handleBackStep={handleBackStep}
                // handleNextStep={handleNextStep}
                />
            )}
            <form>
                <input
                    className="input_upload"
                    onChange={handleOnChangeFile}
                    ref={ref}
                    accept="image/jpeg,image/png,image/heic,image/heif"
                    type="file"
                />
            </form>
    </Container>
  );
})

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

`