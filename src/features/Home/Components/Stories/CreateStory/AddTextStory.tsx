import { Button } from '@components/common';
import { BackIcon } from '@components/Icons';
import { TextareaAutosize } from '@material-ui/core';
import * as React from 'react';
import { useSpring } from 'react-spring';
import styled from 'styled-components';
import { FileStory, PayloadCreateStory } from './ModalCreateStory';

export interface IAddTextStoryProps {
    file: FileStory;
    handleBackStep: () => void;
    handleCreateStory: (payload: PayloadCreateStory) => void;
}
interface ContainerStyledProps {
    baseUrl: string;
    font: string;
    activeColor: string;
}

const colorCustom = [
    '#000000',
    '#2986ae',
    '#702929',
    '#f7724a',
    '#5ed5ff',
    '#f1c43a',
    '#8e939c',
    '#88bf4b',
    '#caedf8',
    '#ced0d4',
    '#dcd3ef',
    '#fb3ea0',
    '#b9fccb',
    '#2B457C',
    '#f4923a',
    '#f9cbd1',
    '#941fb1',
    '#f83d3d',
    '#583b9a',
    '#ffffff',
    '#f8e24c',
];

const fontCustom = ['Headline', 'Casual', 'Fancy', 'Simple', 'Clean'];

export default function AddTextStory(props: IAddTextStoryProps) {
    const { file, handleBackStep, handleCreateStory } = props;
    const input = React.useRef<HTMLTextAreaElement>(null);
    const [addText, setAddText] = React.useState(false);
    const [activeColor, setActiveColor] = React.useState('#ffffff');
    const [activeFont, setActiveFont] = React.useState(fontCustom[0]);
    const [showFont, setShowFont] = React.useState(false);

    const handleClickText = () => {
        setAddText(true);
        if (input.current) {
            input.current.focus();
        }
        console.log('Fuck');
    };

    const handleSwitchFront = () => {
        setShowFont((active) => !active);
    };

    const handleSetFont = (font: string) => {
        setActiveFont(font);
        setShowFont(false);
    };

    const handleSetColor = (color: string) => {
        setActiveColor(color);
    };

    const handleRemove = () => {
        setAddText(false);
        if (input.current) {
            input.current.value = ''
        }
    }

    return (
        <Container activeColor={activeColor} font={activeFont} baseUrl={window.location.origin}>
            {/* <Container> */}
            <div className="header">
                {/* <div className="back-button" onClick={handleBackChoseImage}> */}
                <div className="back-button" onClick={handleBackStep}>
                    <BackIcon ariaLabel="Back" />
                </div>
                <div className="main-header">Edit</div>
                <div
                    className="next-button"
                    onClick={() => {
                        const textStory = input.current ? input.current.value : ''

                        const dataPayload:PayloadCreateStory = {
                            file: file.file,
                        }

                        if (textStory) {
                            dataPayload['textStory'] = {
                                color: activeColor,
                                font: activeFont,
                                text: textStory
                            }
                        }

                        handleCreateStory(dataPayload)
                    }}
                >
                    Share
                </div>
            </div>
            <div className="content-main" style={{ flexDirection: 'row', height: '80vh' }}>
                <div className="img-list">
                    <img src={file.url} />
                    <TextareaAutosize
                        maxRows={7}
                        placeholder="Write a caption..."
                        className="input-add-text"
                        ref={input}
                        style={{ opacity: `${addText ? '1' : '0'}`, color: activeColor }}
                    />
                    {/* <input
                       
                        ref={input}
                        className="input-add-text"
                    /> */}
                </div>
                <div className="add-text-container">
                    {!addText && (
                        <div className="add-text-wrapper" onClick={handleClickText}>
                            <div className="icon-wrapper">
                                <div className="icon"></div>
                            </div>

                            <div className="text">Add text</div>
                        </div>
                    )}

                    {addText && (
                        <div className="custom-text-wrapper">
                            <div onClick={handleSwitchFront} className="font-family-wrapper">
                                <div className="icon-font"></div>
                                <div className="name-font">{activeFont}</div>
                                <div className="select-icon"></div>
                            </div>

                            {showFont ? (
                                <div className="active-font-wrapper">
                                    {fontCustom.map((front) => (
                                        <div
                                            onClick={() => handleSetFont(front)}
                                            className="font-item"
                                        >
                                            {front}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="color-wrapper">
                                    {colorCustom.map((color) => (
                                        <div
                                            onClick={() => handleSetColor(color)}
                                            style={{
                                                background: color,
                                                border: `${
                                                    activeColor === color
                                                        ? '2px solid rgb(46, 137, 255)'
                                                        : ''
                                                }`,
                                            }}
                                            className="color-item"
                                        ></div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {addText && (
                        <>
                            <Button className="btn-set-text" handleOnClick={handleClickText}>
                                Set text
                            </Button>
                            <Button className="btn-remove-text" style='border' handleOnClick={handleRemove}>
                                Remove text
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </Container>
    );
}
const Container = styled.div<ContainerStyledProps>`
    width: 1101px;
    max-width: 1195px;
    min-width: 688px;
    min-height: 391px;
    max-height: 898px;

    .header {
        display: flex;
        border-bottom: 1px solid rgb(219, 219, 219);
        border-top-left-radius: 10px;
        justify-content: center;
        align-items: center;
        height: 42px;

        .main-header {
            flex: 8;
            font-size: 16px;
            color: #262626;
            font-weight: 600;
            text-align: center;
        }

        .back-button {
            cursor: pointer;
            flex: 1;
            display: flex;
            justify-content: center;
        }

        .next-button {
            cursor: pointer;
            flex: 1;
            text-align: center;
            padding: 5px;
            color: #0095f6;
            font-weight: 600;
            font-size: 16px;
        }
    }

    .btn-set-text {
        margin-top: 10px;
        margin-bottom: 10px;
    }

    .content-main {
        display: flex;

        .custom-text-wrapper {
            padding: 16px;
            border-radius: 10px;
            background-color: rgba(36, 37, 38, 0.9);
            /* position: relative; */
            .color-wrapper {
                width: 236px;
                padding: 0 8px;
                display: flex;
                flex-wrap: wrap;
                .color-item {
                    width: 20px;
                    height: 20px;
                    margin: 12px 5px;
                    border-radius: 50%;
                    cursor: pointer;
                }
            }

            .active-font-wrapper {
                padding: 8px;
                margin-top: -8px;
                width: 236px;
                border-radius: 6px;
                background-color: rgba(36, 37, 38, 0.9);
                border: 1px solid #ccc;

                .font-item {
                    padding: 8px;
                    border-radius: 6px;
                    cursor: pointer;
                    color: #e4e6eb;
                    font-size: 16px;
                    &:hover {
                        background-color: #3a3b3c;
                        /* opacity: 0.5; */
                    }
                }
            }

            .font-family-wrapper {
                display: flex;
                margin-bottom: 12px;
                height: 40px;
                display: flex;
                align-items: center;
                flex: 0;
                border-radius: 6px;
                border: 1px solid #ccc;
                padding: 0 5px;
                cursor: pointer;
                .icon-font {
                    background-image: ${(props) => `url(${props.baseUrl}/images/bgIcon5.png)`};
                    background-position: 0px -85px;
                    background-size: auto;
                    width: 16px;
                    height: 16px;
                    background-repeat: no-repeat;
                    filter: invert(89%) sepia(6%) hue-rotate(185deg);
                    margin-right: 10px;
                }

                .name-font {
                    color: #fff;
                    font-size: 16px;
                    flex: 1;
                }

                .select-icon {
                    background-image: ${(props) => `url(${props.baseUrl}/images/bgIcon4.png)`};

                    background-position: -170px -109px;
                    background-size: auto;
                    width: 16px;
                    height: 16px;
                    background-repeat: no-repeat;
                }
            }
        }

        .img-list {
            width: 68%;
            height: 100%;
            cursor: pointer;
            position: relative;

            .input-add-text {
                font-family: ${(props) =>
                    `${
                        (props.font === 'Clean' && `'MediaevalItalique', sans-serif;`) ||
                        (props.font === 'Simple' && `'Mendl Serif Trial', sans-serif;`) ||
                        (props.font === 'Fancy' && `'Orffela', sans-serif;`) ||
                        (props.font === 'Casual' && `'Curbstone', sans-serif;`) ||
                        (props.font === 'Headline' && `Arial, Helvetica, sans-serif;`)
                    }`};
                position: absolute;
                top: 30%;
                left: 50%;
                transform: translate(-50%, -30%);
                padding: 6px;
                font-size: 24px;
                outline: none;
                border: none;
                background: transparent;
                font-weight: 600;
                color: #fff;

                &::placeholder {
                    color: ${(props) => props.activeColor};
                }
            }

            img {
                object-fit: cover;
                width: 100%;
                height: 100%;
            }
        }

        .add-text-container {
            width: 32%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
        }

        .add-text-wrapper {
            /* flex-direction: column; */
            display: flex;
            align-items: center;
            cursor: pointer;

            .text {
                font-weight: 600;
                font-size: 16px;
                margin-left: 10px;
            }
        }
    }

    .icon-wrapper {
        box-shadow: 0 2px 4px #b0b3b8;
        border-radius: 50%;
        margin-bottom: 8px;
        height: 44px;
        width: 44px;
        background-color: #040506;
        display: flex;
        justify-content: center;
        align-items: center;
        .icon {
            background-image: ${(props) => `url(${props.baseUrl}/images/bgIcon3.png)`};
            width: 20px;
            height: 20px;
            background-size: auto;
            background-position: 0px -50px;

            background-repeat: no-repeat;
            filter: invert(89%) sepia(6%) hue-rotate(185deg);
        }
    }
`;
