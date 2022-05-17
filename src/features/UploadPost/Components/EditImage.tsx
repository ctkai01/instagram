import { BackIcon } from '@components/Icons';
import { FilterImage } from '@constants/filter-image';
import * as React from 'react';
import styled from 'styled-components';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import CanvasImage from './CanvasImage';
import FilterImageList from './FilterImageList';
import { FileUrl } from './ModalPost';

export interface IEditImageProps {
    fileGallery: FileUrl[];
    handleNextEditImage: (files: FileUrl[]) => void;
    // setFiles: React.Dispatch<React.SetStateAction<FileUrl[]>>;
}
interface ContainerStyledProps {
    baseUrl: string;
}

interface statusFilter {
    value?: number;
    active: boolean;
    notValue: boolean;
}

// interface statusFilter {
//     value?: number,
//     active: boolean,
//     notValue: boolean
// }

export interface AdjustmentValueImage {
    saturation: number;
    brightness: number;
    contrast: number;
    threshold: number;
    hue: number;
    noise: number;
    indexImage?: number;
}

export interface FiltersImage {
    indexActive: number;
    value?: number;
    indexImage?: number;
}

export default function EditImage(props: IEditImageProps) {
    const { fileGallery, handleNextEditImage } = props;

    const initialFilters: FiltersImage[] = fileGallery.map((file, index) => ({
        indexActive: FilterImage.ORIGINAL,
        indexImage: index,
    }));

    const initialAdjustments: AdjustmentValueImage[] = fileGallery.map((file, index) => ({
        saturation: 0,
        brightness: 0,
        contrast: 0,
        threshold: 0,
        hue: 0,
        noise: 0,
        indexImage: index,
    }));

    const [filters, setFilters] = React.useState<FiltersImage[]>(initialFilters);
    const [currentIndexSlider, setCurrentIndexSlider] = React.useState<number>(0);

    const [filesCanvas, setFilesCanvas] = React.useState<FileUrl[]>([]);
    const [swiper, setSwiper] = React.useState<SwiperCore>();

    const handleAddFileCanvas = (file: FileUrl) => {
        // if (filesCanvas.length >= 2) {
        //     setFilesCanvas((filesCanvasPre) => [...filesCanvasPre, file].slice(-2));
        // } else {
        //     setFilesCanvas((filesCanvasPre) => [...filesCanvasPre, file]);
        // }
        setFilesCanvas((filesCanvasPre) => [...filesCanvasPre, file]);
    };
    console.log(filesCanvas);
  
    const [adjustments, setAdjustments] = React.useState<AdjustmentValueImage[]>(initialAdjustments);

    const [activeFilter, setActiveFilter] = React.useState(0);
    console.log(adjustments);
    // @ts-ignore: Object is possibly 'null'.
    const swiperIndex = swiper?.activeIndex | 0;
    const currentFilter = filters.find((filter) => filter.indexImage === swiperIndex) || filters[0];

    const handleClickFilter = (index: number) => {
        // @ts-ignore: Object is possibly 'null'.
        const swiperIndex = swiper?.activeIndex | 0;

        if (
            index === FilterImage.ORIGINAL ||
            index === FilterImage.SOLARIZE ||
            index === FilterImage.SEPIA ||
            index === FilterImage.INVERT ||
            index === FilterImage.GRAY_SCALE
        ) {

            setFilters((filterPre) => {
                const newFilter = filterPre.map((filter) => {
                    if (filter.indexImage === swiperIndex) {
                        return {
                            ...filter,
                            indexActive: index,
                        };
                    } else {
                        return filter;
                    }
                });
                return newFilter;
            });
        } else if (
            index === FilterImage.GREEN_RGB ||
            index === FilterImage.BLUE_RGB ||
            index === FilterImage.RED_RGB
        ) {

            setFilters((filterPre) => {
                const newFilter = filterPre.map((filter) => {
                    if (filter.indexImage === swiperIndex) {
                        return {
                            ...filter,
                            indexActive: index,
                            value: 140,
                        };
                    } else {
                        return filter;
                    }
                });
                return newFilter;
            });
        } else {
            setFilters((filterPre) => {
                const newFilter = filterPre.map((filter) => {
                    if (filter.indexImage === swiperIndex) {
                        return {
                            ...filter,
                            indexActive: index,
                            value: 0,
                        };
                    } else {
                        return filter;
                    }
                });
                return newFilter;
            });
        }

        setActiveFilter(index);
    };

    const handleChangeAdjustmentSaturation = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = +e.target.value;

        setAdjustments((adjustmentsPre) => {
            const newFilter = adjustmentsPre.map((adjustment) => {
                if (adjustment.indexImage === swiperIndex) {
                    return {
                        ...adjustment,
                        saturation: value,
                    };
                } else {
                    return adjustment;
                }
            });
            return newFilter;
        });
    };

    const handleResetAdjustmentSaturation = () => {
        setAdjustments((adjustmentsPre) => {
            const newFilter = adjustmentsPre.map((adjustment) => {
                if (adjustment.indexImage === swiperIndex) {
                    return {
                        ...adjustment,
                        saturation: 0,
                    };
                } else {
                    return adjustment;
                }
            });
            return newFilter;
        });
    };

    const handleChangeAdjustmentBrightness = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = +e.target.value;

        setAdjustments((adjustmentsPre) => {
            const newFilter = adjustmentsPre.map((adjustment) => {
                if (adjustment.indexImage === swiperIndex) {
                    return {
                        ...adjustment,
                        brightness: value,
                    };
                } else {
                    return adjustment;
                }
            });
            return newFilter;
        });
    };

    const handleResetAdjustmentBrightness = () => {
      
        setAdjustments((adjustmentsPre) => {
            const newFilter = adjustmentsPre.map((adjustment) => {
                if (adjustment.indexImage === swiperIndex) {
                    return {
                        ...adjustment,
                        brightness: 0,
                    };
                } else {
                    return adjustment;
                }
            });
            return newFilter;
        });
    };

    const handleChangeAdjustmentContrast = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = +e.target.value;
        setAdjustments((adjustmentsPre) => {
            const newFilter = adjustmentsPre.map((adjustment) => {
                if (adjustment.indexImage === swiperIndex) {
                    return {
                        ...adjustment,
                        contrast: value,
                    };
                } else {
                    return adjustment;
                }
            });
            return newFilter;
        });

    };

    const handleResetAdjustmentContrast = () => {
   
        setAdjustments((adjustmentsPre) => {
            const newFilter = adjustmentsPre.map((adjustment) => {
                if (adjustment.indexImage === swiperIndex) {
                    return {
                        ...adjustment,
                        contrast: 0,
                    };
                } else {
                    return adjustment;
                }
            });
            return newFilter;
        });
    };

    const handleChangeAdjustmentThreshold = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = +e.target.value;
        setAdjustments((adjustmentsPre) => {
            const newFilter = adjustmentsPre.map((adjustment) => {
                if (adjustment.indexImage === swiperIndex) {
                    return {
                        ...adjustment,
                        threshold: value,
                    };
                } else {
                    return adjustment;
                }
            });
            return newFilter;
        });
     
    };

    const handleResetAdjustmentThreshold = () => {
       
        setAdjustments((adjustmentsPre) => {
            const newFilter = adjustmentsPre.map((adjustment) => {
                if (adjustment.indexImage === swiperIndex) {
                    return {
                        ...adjustment,
                        threshold: 0,
                    };
                } else {
                    return adjustment;
                }
            });
            return newFilter;
        });
    };

    const handleChangeAdjustmentHue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = +e.target.value;
   
        setAdjustments((adjustmentsPre) => {
            const newFilter = adjustmentsPre.map((adjustment) => {
                if (adjustment.indexImage === swiperIndex) {
                    return {
                        ...adjustment,
                        hue: value,
                    };
                } else {
                    return adjustment;
                }
            });
            return newFilter;
        });
    };

    const handleResetAdjustmentHue = () => {
     
        setAdjustments((adjustmentsPre) => {
            const newFilter = adjustmentsPre.map((adjustment) => {
                if (adjustment.indexImage === swiperIndex) {
                    return {
                        ...adjustment,
                        hue: 0,
                    };
                } else {
                    return adjustment;
                }
            });
            return newFilter;
        });
    };

    const handleChangeAdjustmentNoise = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = +e.target.value;
        setAdjustments((adjustmentsPre) => {
            const newFilter = adjustmentsPre.map((adjustment) => {
                if (adjustment.indexImage === swiperIndex) {
                    return {
                        ...adjustment,
                        noise: value,
                    };
                } else {
                    return adjustment;
                }
            });
            return newFilter;
        });
    
    };

    const handleResetAdjustmentNoise = () => {
       
        setAdjustments((adjustmentsPre) => {
            const newFilter = adjustmentsPre.map((adjustment) => {
                if (adjustment.indexImage === swiperIndex) {
                    return {
                        ...adjustment,
                        noise: 0,
                    };
                } else {
                    return adjustment;
                }
            });
            return newFilter;
        });
    };

    const handleChangeRangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        // @ts-ignore: Object is possibly 'null'.
        const swiperIndex = swiper?.activeIndex | 0;
        const value = +e.target.value;
        setFilters((filterPre) => {
            const newFilter = filterPre.map((filter) => {
                if (filter.indexImage === swiperIndex) {
                    return {
                        ...filter,
                        value: value,
                    };
                } else {
                    return filter;
                }
            });
            return newFilter;
        });
   
    };

    const currentAdjustment = adjustments.find((adjustment) => adjustment.indexImage === swiperIndex) || adjustments[0];

    console.log(filters);
    console.log(currentAdjustment);
    return (
        <Container baseUrl={window.location.origin}>
            {/* <Container> */}
            <div className="header">
                {/* <div className="back-button" onClick={handleBackChoseImage}> */}
                <div className="back-button">
                    <BackIcon ariaLabel="Back" />
                </div>
                <div className="main-header">Edit</div>
                <div
                    className="next-button"
                    onClick={() => handleNextEditImage(filesCanvas.slice(-2))}
                >
                    Next
                </div>
            </div>
            <div className="content-main" style={{ flexDirection: 'row', height: '80vh' }}>
                <div className="img-list">
                    <Swiper
                        pagination={true}
                        slidesPerView={1}
                        navigation={true}
                        onSwiper={(swiper) => setSwiper(swiper)}
                        allowTouchMove={false}
                        effect={'fade'}
                        onSlideChange={(swiper) => {
                            setCurrentIndexSlider(swiper.activeIndex);
                        }}
                    >
                        {fileGallery.map((file, index) => (
                            <SwiperSlide key={index} className="slider-item">
                                <CanvasImage
                                    indexCanvas={index}
                                    handleAddFileCanvas={handleAddFileCanvas}
                                    currentAdjustment={currentAdjustment}
                                    fileUpload={file}
                                    currentFilter={currentFilter}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                <div className="filter-list">
                    <FilterImageList
                        handleChangeAdjustmentSaturation={handleChangeAdjustmentSaturation}
                        handleChangeAdjustmentBrightness={handleChangeAdjustmentBrightness}
                        handleChangeAdjustmentContrast={handleChangeAdjustmentContrast}
                        handleChangeAdjustmentThreshold={handleChangeAdjustmentThreshold}
                        handleChangeAdjustmentHue={handleChangeAdjustmentHue}
                        handleChangeAdjustmentNoise={handleChangeAdjustmentNoise}
                        handleResetAdjustmentSaturation={handleResetAdjustmentSaturation}
                        handleResetAdjustmentBrightness={handleResetAdjustmentBrightness}
                        handleResetAdjustmentContrast={handleResetAdjustmentContrast}
                        handleResetAdjustmentThreshold={handleResetAdjustmentThreshold}
                        handleResetAdjustmentHue={handleResetAdjustmentHue}
                        handleResetAdjustmentNoise={handleResetAdjustmentNoise}
                        currentAdjustment={currentAdjustment}
                        handleChangeRangeValue={handleChangeRangeValue}
                        activeFilter={activeFilter}
                        currentFilter={currentFilter}
                        handleClickFilter={handleClickFilter}
                    />
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

    .content-main {
        display: flex;

        .img-list {
            width: 68%;
            height: 100%;
            cursor: pointer;
        }

        .filter-list {
            width: 32%;
            height: 100%;
        }
    }

    .slider-item {
        display: flex;
        justify-content: center;
        align-items: center;

        /* .img {
                height: 100%;
                width: 100%;
                background-repeat: no-repeat;
                background-size: cover;
                background-position: center center;
            
            } */
    }

    .swiper {
        height: 100%;
    }

    .swiper-wrapper {
        display: flex;
        align-items: center;
    }

    .swiper-button-next {
        background-image: ${(props) => `url(${props.baseUrl}/images/bgIcon.png)`};
        height: 45px;
        width: 45px;
        background-position: -244px -107px;
        background-repeat: no-repeat;
    }

    .swiper-button-next::after {
        display: none;
    }

    .swiper-button-prev {
        background-image: ${(props) => `url(${props.baseUrl}/images/bgIcon.png)`};
        height: 45px;
        width: 45px;
        background-position: -379px -128px;
        background-repeat: no-repeat;
    }

    .swiper-button-prev::after {
        display: none;
    }

    .swiper-button-next,
    .swiper-button-prev {
        transition: opacity 0.5s;
    }

    .swiper-button-disabled {
        opacity: 0 !important;
    }

    .swiper {
        /* padding-bottom: 20px; */
    }
    .swiper-pagination {
        bottom: 30px;
        left: 50%;
        padding-top: 10px;
        width: 20%;
        text-align: start;
    }
`;
