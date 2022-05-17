import { FilterImage, AdjustmentImage } from '@constants/filter-image';
import * as React from 'react';
import styled from 'styled-components';
import { FiltersImage, AdjustmentValueImage } from './EditImage';

export interface IFillerImageListProps {
    activeFilter: number;
    filters: FiltersImage;
    adjustments: AdjustmentValueImage;
    handleChangeAdjustmentBrightness: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleChangeAdjustmentSaturation: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleChangeAdjustmentContrast: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleChangeAdjustmentThreshold: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleChangeAdjustmentHue: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleChangeAdjustmentNoise: (e: React.ChangeEvent<HTMLInputElement>) => void;

    handleResetAdjustmentSaturation: () => void;
    handleResetAdjustmentBrightness: () => void;
    handleResetAdjustmentContrast: () => void;
    handleResetAdjustmentThreshold: () => void;
    handleResetAdjustmentHue: () => void;
    handleResetAdjustmentNoise: () => void;

    handleChangeRangeValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleClickFilter: (index: number) => void;
}

interface ConfigInputRange {
    min: number;
    max: number;
    step: number;
    value: number;
}

export default function FilterImageList(props: IFillerImageListProps) {
    const [active, setActive] = React.useState(1);

    const {
        activeFilter,
        filters,
        adjustments,
        handleChangeAdjustmentBrightness,
        handleChangeAdjustmentSaturation,
        handleChangeAdjustmentContrast,
        handleChangeAdjustmentThreshold,
        handleChangeAdjustmentHue,
        handleChangeAdjustmentNoise,
        handleChangeRangeValue,
        handleClickFilter,
        handleResetAdjustmentSaturation,
        handleResetAdjustmentBrightness,
        handleResetAdjustmentContrast,
        handleResetAdjustmentThreshold,
        handleResetAdjustmentHue,
        handleResetAdjustmentNoise,
    } = props;

    let min = 0;
    let max = 1;
    let step = 0.01;

    if (activeFilter === FilterImage.SATURATION_HSV) {
        min = -1;
        max = 1;
    } else if (activeFilter === FilterImage.LEVELS_POSTERIZE) {
        min = 0;
        max = 1;
    } else if (activeFilter === FilterImage.ALPHA_RGBA) {
        min = 0;
        max = 1;
    } else if (activeFilter === FilterImage.BLUR_RADIUS) {
        min = 0;
        max = 40;
        step = 1;
    } else if (
        activeFilter === FilterImage.GREEN_RGB ||
        activeFilter === FilterImage.BLUE_RGB ||
        activeFilter === FilterImage.RED_RGB
    ) {
        min = 0;
        max = 255;
        step = 1;
    }

    const optionInputAdjustment = (index: number): ConfigInputRange => {
        if (index === AdjustmentImage.SATURATION) {
            return {
                min: -1,
                max: 1,
                step: 0.1,
                value: adjustments.saturation,
            };
        } else if (index === AdjustmentImage.BRIGHTNESS) {
            return {
                min: -1,
                max: 1,
                step: 0.1,
                value: adjustments.brightness,
            };
        } else if (index === AdjustmentImage.CONTRAST) {
            return {
                min: -100,
                max: 100,
                step: 1,
                value: adjustments.contrast,
            };
        } else if (index === AdjustmentImage.THRESHOLD) {
            return {
                min: 0,
                max: 1,
                step: 0.01,
                value: adjustments.threshold,
            };
        } else if (index === AdjustmentImage.HUE) {
            return {
                min: 0,
                max: 359,
                step: 1,
                value: adjustments.hue,
            };
        } else if (index === AdjustmentImage.NOISE) {
            return {
                min: 0,
                max: 1,
                step: 0.01,
                value: adjustments.noise,
            };
        } else {
            return {
                min: 1,
                max: 2,
                step: 1,
                value: adjustments.saturation,
            };
        }
    };

    const adjustmentsList = ['Saturation', 'Brightness', 'Contrast', 'Threshold', 'Hue', 'Noise'];

    const filterList = [
        {
            name: 'Original',
            image: '/images/original.jpg',
        },
        {
            name: 'Saturation HSV',
            image: '/images/Clarendon.jpg',
        },
        {
            name: 'Posterize',
            image: '/images/Gingham.jpg',
        },
        {
            name: 'Gray scale',
            image: '/images/Moon.jpg',
        },
        {
            name: 'Invert',
            image: '/images/Lark.jpg',
        },
        {
            name: 'Alpha RGBA',
            image: '/images/Reyes.jpg',
        },
        {
            name: 'Sepia',
            image: '/images/Juno.jpg',
        },
        {
            name: 'Salarize',
            image: '/images/Slumber.jpg',
        },
        {
            name: 'Blur',
            image: '/images/Crema.jpg',
        },
        {
            name: 'Red RGB',
            image: '/images/Ludwig.jpg',
        },
        {
            name: 'Green RGB',
            image: '/images/Aden.jpg',
        },
        {
            name: 'Blue RGB ',
            image: '/images/Perpetua.jpg',
        },
    ];

    const onChangeAdjustFunc = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        if (index === AdjustmentImage.SATURATION) {
            return handleChangeAdjustmentSaturation(e);
        } else if (index === AdjustmentImage.BRIGHTNESS) {
            return handleChangeAdjustmentBrightness(e);
        } else if (index === AdjustmentImage.CONTRAST) {
            return handleChangeAdjustmentContrast(e);
        } else if (index === AdjustmentImage.THRESHOLD) {
            return handleChangeAdjustmentThreshold(e);
        } else if (index === AdjustmentImage.HUE) {
            return handleChangeAdjustmentHue(e);
        } else if (index === AdjustmentImage.NOISE) {
            return handleChangeAdjustmentNoise(e);
        }
    };

    const onResetAdjustFunc = (index: number) => {
        if (index === AdjustmentImage.SATURATION) {
            return handleResetAdjustmentSaturation();
        } else if (index === AdjustmentImage.BRIGHTNESS) {
            return handleResetAdjustmentBrightness();
        } else if (index === AdjustmentImage.CONTRAST) {
            return handleResetAdjustmentContrast();
        } else if (index === AdjustmentImage.THRESHOLD) {
            return handleResetAdjustmentThreshold();
        } else if (index === AdjustmentImage.HUE) {
            return handleResetAdjustmentHue();
        } else if (index === AdjustmentImage.NOISE) {
            return handleResetAdjustmentNoise();
        }
    };

    return (
        <Container>
            <div className="tabs">
                <div
                    onClick={() => setActive(1)}
                    className={`${active === 1 ? 'tab-item active' : 'tab-item'}`}
                >
                    Filters
                </div>
                <div
                    onClick={() => setActive(2)}
                    className={`${active === 2 ? 'tab-item active' : 'tab-item'}`}
                >
                    Adjustments
                </div>
            </div>
            {active === 1 && (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        height: '100%',
                    }}
                >
                    <div className="filters-list">
                        {filterList.map((filterItem, index) => (
                            <div
                                key={index}
                                className="filter-item"
                                onClick={() => {
                                    handleClickFilter(index);
                                }}
                            >
                                <div className="filter-item-wrapper">
                                    <div className="img-wrapper">
                                        <img
                                            style={{
                                                border: `${
                                                    activeFilter === index
                                                        ? '2px solid #0095f6'
                                                        : 'none'
                                                }`,
                                            }}
                                            src={filterItem.image}
                                        />
                                    </div>
                                    <div
                                        className="name-filter"
                                        style={{
                                            color: `${
                                                activeFilter === index ? '#0095f6' : '#8e8e8e'
                                            }`,
                                        }}
                                    >
                                        {filterItem.name}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {filters.indexActive === FilterImage.ORIGINAL ||
                    filters.indexActive === FilterImage.SOLARIZE ||
                    filters.indexActive === FilterImage.SEPIA ||
                    filters.indexActive === FilterImage.INVERT ||
                    filters.indexActive === FilterImage.GRAY_SCALE ? (
                        ''
                    ) : (
                        <div className="filter-tool">
                            <input
                                className="input-range"
                                onChange={handleChangeRangeValue}
                                type="range"
                                value={filters.value}
                                min={min}
                                max={max}
                                step={step}
                            />
                            100
                        </div>
                    )}
                </div>
            )}

            {active === 2 && (
                <div className="adjustment-container">
                    {adjustmentsList.map((adjustment, index) => (
                        <div className="adjustment-item">
                            <div className="adjustment-title">
                                <div className="adjustment-text">{adjustment}</div>
                                {
                                    optionInputAdjustment(index).value !== 0 && <div className="adjustment-reset" onClick={() => onResetAdjustFunc(index)}>Reset</div>
                                }
                            </div>
                            <div className="adjustment-input-range">
                                <input
                                    className="input-range"
                                    onChange={(e) => onChangeAdjustFunc(index, e)}
                                    type="range"
                                    {...optionInputAdjustment(index)}
                                />
                                <div className="adjustment-input-range-value">
                                    {optionInputAdjustment(index).value}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    height: calc(100% - 53px);

    .adjustment-container {
        padding: 0 16px;

        .adjustment-item {
            &:hover .adjustment-reset {
                display: block;
            }
        }

        .adjustment-title {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .adjustment-text {
            padding: 18px 0;
            font-size: 16px;
        }

        .adjustment-reset {
            color: #0095f6;
            font-weight: 600;
            display: none;
            cursor: pointer;
        }

        .adjustment-input-range {
            display: flex;
            justify-content: space-between;
            .input-range {
                width: 93%;
            }

            .adjustment-input-range-value {
                width: 3%;
            }
        }
    }

    .filter-tool {
        padding: 16px 16px;
        display: flex;
        align-items: center;
        .input-range {
            width: calc(100% - 40px);
        }
    }
    .filters-list {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        width: 100%;
        .name-filter {
            font-size: 12px;
            line-height: 16px;
            margin: -2px 0 -3px;
            font-weight: 600;
            text-align: center;
        }
        .filter-item {
            /* width: 33.3333%; */
            margin-top: 16px;
        }

        .img-wrapper {
            margin: 0 8px;
        }

        img {
            height: 100%;
            width: 100%;
        }

        .filter-item-wrapper {
            cursor: pointer;
        }
    }

    .tabs {
        display: flex;

        .tab-item {
            width: 50%;
            font-size: 16px;
            line-height: 24px;
            padding: 14px 0;
            text-transform: capitalize;
            text-align: center;
            font-weight: 700;
            color: #cccccc;
            border-bottom: 1px solid #cccccc;
            cursor: pointer;
        }

        .tab-item.active {
            color: #000;
            border-bottom: 1px solid #000;
        }
    }
`;
