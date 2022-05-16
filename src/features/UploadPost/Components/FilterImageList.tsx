import { FilterImage } from '@constants/filter-image';
import * as React from 'react';
import styled from 'styled-components';
import { FiltersImage } from './EditImage';

export interface IFillerImageListProps {
    activeFilter: number;
    filters: FiltersImage;
    handleChangeRangeValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleClickFilter: (index: number) => void;
}

export default function FilterImageList(props: IFillerImageListProps) {
    const [active, setActive] = React.useState(1);

    const { activeFilter, filters, handleChangeRangeValue, handleClickFilter } = props;

    let min = 0;
    let max = 1;
    let step = 0.01;

    if (activeFilter === FilterImage.SATURATION_HSV) {
        min = -1;
        max = 1;
    } else if (activeFilter === FilterImage.LEVELS_POSTERIZE)  {
        min = 0;
        max = 1;
    } else if (activeFilter === FilterImage.ALPHA_RGBA)  {
        min = 0;
        max = 1;
    } else if (activeFilter === FilterImage.BLUR_RADIUS)  {
        min = 0;
        max = 40;
        step = 1;
    } else if (activeFilter === FilterImage.GREEN_RGB || activeFilter === FilterImage.BLUE_RGB || activeFilter === FilterImage.RED_RGB)  {
        min = 0;
        max = 255;
        step = 1;
    }
    console.log(`value: ${filters.value}, min: ${min} , max: ${max}`)
    const filterList = [
        {
            name: 'Original',
            image: '/images/original.jpg',
        },
        {
            name: 'Clarendon',
            image: '/images/Clarendon.jpg',
        },
        {
            name: 'Gingham',
            image: '/images/Gingham.jpg',
        },
        {
            name: 'Moon',
            image: '/images/Moon.jpg',
        },
        {
            name: 'Lark',
            image: '/images/Lark.jpg',
        },
        {
            name: 'Reyes',
            image: '/images/Reyes.jpg',
        },
        {
            name: 'Juno',
            image: '/images/Juno.jpg',
        },
        {
            name: 'Slumber',
            image: '/images/Slumber.jpg',
        },
        {
            name: 'Crema',
            image: '/images/Crema.jpg',
        },
        {
            name: 'Ludwig',
            image: '/images/Ludwig.jpg',
        },
        {
            name: 'Aden',
            image: '/images/Aden.jpg',
        },
        {
            name: 'Perpetua',
            image: '/images/Perpetua.jpg',
        },
    ];

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
                    {filters.indexActive === FilterImage.ORIGINAL || filters.indexActive === FilterImage.SOLARIZE || filters.indexActive === FilterImage.SEPIA || filters.indexActive === FilterImage.INVERT || filters.indexActive === FilterImage.GRAY_SCALE ? '' : (
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

            {active === 2 && <div>2121</div>}
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    height: calc(100% - 53px);

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
