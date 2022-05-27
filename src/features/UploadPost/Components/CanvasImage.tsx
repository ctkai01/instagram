import * as React from 'react';
import { Stage, Layer, Image } from 'react-konva';
import useImage from 'use-image';
import Konva from 'konva';
import { AdjustmentValueImage, FiltersImage } from './EditImage';
import { FilterImage } from '@constants/filter-image';
import { FileUrl } from './ModalPost';
import { MediaType } from '@constants/media-type';
export interface ICanvasImageProps {
    filters: FiltersImage[];
    fileUpload: FileUrl;
    indexCanvas: number;
    currentFilter: FiltersImage;
    showCanvas: boolean;
    currentAdjustment: AdjustmentValueImage;
}

const CanvasImage = React.forwardRef((props: ICanvasImageProps, ref: any) => {
    const {
        filters,
        fileUpload,
        showCanvas,
        indexCanvas,
        currentFilter,
        currentAdjustment,
    } = props;
    // @ts-ignore: Object is possibly 'null'.
    const imageRef: React.RefObject<Konva.Image> = React.useRef();
    const [image] = useImage(fileUpload.url, 'anonymous');

    const height = 1000;
    const width = 1000;

    let imageWidth;

    let imageHeight;
  
    let scale;

    React.useEffect(() => {
        if (image) {
            image.height = height;
            image.width = width;
            imageHeight = image.height || height;
            imageWidth = image.width || width;
            const scaleY = height / imageHeight;
            const scaleX = width / imageWidth;
            Math.max(scaleX, scaleY);
            // @ts-ignore: Object is possibly 'null'.
        }
        if (imageRef.current) {
            imageRef.current.cache();
        }
    }, [image, imageRef, currentFilter]);

    let modeFilter = [];
    let option = {};

    if (filters[indexCanvas].indexActive === FilterImage.SATURATION_HSV) {
        modeFilter.push(Konva.Filters.HSV);
        option = { ...option, saturation: filters[indexCanvas].value };
    } else if (filters[indexCanvas].indexActive === FilterImage.LEVELS_POSTERIZE) {
        modeFilter.push(Konva.Filters.Posterize);
        option = { ...option, levels: filters[indexCanvas].value };
    } else if (filters[indexCanvas].indexActive === FilterImage.GRAY_SCALE) {
        modeFilter.push(Konva.Filters.Grayscale);
    } else if (filters[indexCanvas].indexActive === FilterImage.INVERT) {
        modeFilter.push(Konva.Filters.Invert);
    } else if (filters[indexCanvas].indexActive === FilterImage.ALPHA_RGBA) {
        modeFilter.push(Konva.Filters.RGBA);
        option = { ...option, alpha: filters[indexCanvas].value };
    } else if (filters[indexCanvas].indexActive === FilterImage.SEPIA) {
        modeFilter.push(Konva.Filters.Sepia);
    } else if (filters[indexCanvas].indexActive === FilterImage.SOLARIZE) {
        modeFilter.push(Konva.Filters.Solarize);
    } else if (filters[indexCanvas].indexActive === FilterImage.BLUR_RADIUS) {
        option = { ...option, blurRadius: filters[indexCanvas].value };
    } else if (filters[indexCanvas].indexActive === FilterImage.GREEN_RGB) {
        modeFilter.push(Konva.Filters.RGB);
        option = { ...option, green: filters[indexCanvas].value };
    } else if (filters[indexCanvas].indexActive === FilterImage.RED_RGB) {
        modeFilter.push(Konva.Filters.RGB);
        option = { ...option, red: filters[indexCanvas].value };
    } else if (filters[indexCanvas].indexActive === FilterImage.BLUE_RGB) {
        modeFilter.push(Konva.Filters.RGB);
        option = { ...option, blue: filters[indexCanvas].value };
    }

    if (currentAdjustment.saturation) {
        modeFilter.push(Konva.Filters.HSL);
        option = { ...option, saturation: currentAdjustment.saturation };
    }

    if (currentAdjustment.brightness) {
        modeFilter.push(Konva.Filters.Brighten);
        option = { ...option, brightness: currentAdjustment.brightness };
    }

    if (currentAdjustment.contrast) {
        modeFilter.push(Konva.Filters.Contrast);
        option = { ...option, contrast: currentAdjustment.contrast };
    }

    if (currentAdjustment.threshold) {
        modeFilter.push(Konva.Filters.Threshold);
        option = { ...option, threshold: currentAdjustment.threshold };
    }

    if (currentAdjustment.hue) {
        modeFilter.push(Konva.Filters.HSL);
        option = { ...option, hue: currentAdjustment.hue };
    }

    if (currentAdjustment.noise) {
        modeFilter.push(Konva.Filters.Noise);
        option = { ...option, noise: currentAdjustment.noise };
    }
    modeFilter = modeFilter.filter(function (value, index, array) {
        return array.indexOf(value) === index;
    });

    async function dataUrlToFile(dataUrl: string, fileName: string): Promise<File> {
        const res: Response = await fetch(dataUrl);
        const blob: Blob = await res.blob();
        return new File([blob], fileName, { type: 'image/png' });
    }
    return (
        <Stage ref={ref} width={width} height={height} style={{display: `${showCanvas ? 'block' : 'none'}`}}>
            <Layer>
                <Image
                    ref={imageRef}
                    filters={modeFilter}
                    fillPatternScaleX={scale}
                    fillPatternScaleY={scale}
                    image={image}
                    {...option}
                />
            </Layer>
        </Stage>
    );
});

export default CanvasImage;
