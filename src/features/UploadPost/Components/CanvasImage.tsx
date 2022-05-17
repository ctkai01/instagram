import * as React from 'react';
import { Stage, Layer, Image } from 'react-konva';
import useImage from 'use-image';
import Konva from 'konva';
import { AdjustmentValueImage, FiltersImage } from './EditImage';
import { FilterImage } from '@constants/filter-image';
import { FileUrl } from './ModalPost';
import { MediaType } from '@constants/media-type';
export interface ICanvasImageProps {
    fileUpload: FileUrl;
    indexCanvas: number
    currentFilter: FiltersImage;
    currentAdjustment: AdjustmentValueImage;
    handleAddFileCanvas: (file: FileUrl) => void;
}

export default function CanvasImage(props: ICanvasImageProps) {
    const { fileUpload,indexCanvas, currentFilter, currentAdjustment, handleAddFileCanvas } = props;
    // @ts-ignore: Object is possibly 'null'.
    
    const imageRef: React.RefObject<Konva.Image> = React.useRef();
    // const [image] = useImage(imgUrl);
    // image?.height =
    const image = new window.Image();
    // const [image] = useImage(imgUrl);
    // @ts-ignore: Object is possibly 'null'.
    image.src = fileUpload.url;
    // const height = 784;
    // const width = 715;
    const height = 1000;
    const width = 1000;

    // @ts-ignore: Object is possibly 'null'.
    image.height = height;

    // @ts-ignore: Object is possibly 'null'.
    image.width = width;
    // @ts-ignore: Object is possibly 'null'.

    const imageWidth = image.width || width;
    // @ts-ignore: Object is possibly 'null'.

    const imageHeight = image.height || height;

    const scaleX = width / imageWidth;
    const scaleY = height / imageHeight;
    const scale = Math.max(scaleX, scaleY);

    React.useEffect(() => {
        if (image) {
            // @ts-ignore: Object is possibly 'null'.
            imageRef.current.cache();
        }
    }, [image]);

    const ref = React.useRef(null);
    React.useEffect(() => {
        const getFile = async () => {
            if (ref) {
                //@ts-ignore: Object is possibly 'null'.
                const base64 = ref.current.toDataURL();
                //@ts-ignore: Object is possibly 'null'.
                // console.log(base64);
                console.log(fileUpload.file.name)
                const file = await dataUrlToFile(base64, fileUpload.file.name);
                console.log(URL.createObjectURL(file))
                handleAddFileCanvas({
                    file,
                    url: URL.createObjectURL(file),
                    type: MediaType.image
                })
            }
        }
        getFile()
    }, [currentFilter, currentAdjustment]);

    let modeFilter = [];
    let option = {};

    if (indexCanvas === currentFilter.indexImage) {
        if (currentFilter.indexActive === FilterImage.SATURATION_HSV) {
            modeFilter.push(Konva.Filters.HSV);
            option = { ...option, saturation: currentFilter.value };
        } else if (currentFilter.indexActive === FilterImage.LEVELS_POSTERIZE) {
            modeFilter.push(Konva.Filters.Posterize);
            option = { ...option, levels: currentFilter.value };
        } else if (currentFilter.indexActive === FilterImage.GRAY_SCALE) {
            modeFilter.push(Konva.Filters.Grayscale);
        } else if (currentFilter.indexActive === FilterImage.INVERT) {
            modeFilter.push(Konva.Filters.Invert);
        } else if (currentFilter.indexActive === FilterImage.ALPHA_RGBA) {
            modeFilter.push(Konva.Filters.RGBA);
            option = { ...option, alpha: currentFilter.value };
        } else if (currentFilter.indexActive === FilterImage.SEPIA) {
            modeFilter.push(Konva.Filters.Sepia);
        } else if (currentFilter.indexActive === FilterImage.SOLARIZE) {
            modeFilter.push(Konva.Filters.Solarize);
        } else if (currentFilter.indexActive === FilterImage.BLUR_RADIUS) {
            modeFilter.push(Konva.Filters.Blur);
            option = { ...option, blurRadius: currentFilter.value };
        } else if (currentFilter.indexActive === FilterImage.GREEN_RGB) {
            modeFilter.push(Konva.Filters.RGB);
            option = { ...option, green: currentFilter.value };
        } else if (currentFilter.indexActive === FilterImage.RED_RGB) {
            modeFilter.push(Konva.Filters.RGB);
            option = { ...option, red: currentFilter.value };
        } else if (currentFilter.indexActive === FilterImage.BLUE_RGB) {
            modeFilter.push(Konva.Filters.RGB);
            option = { ...option, blue: currentFilter.value };
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
    
       
    }
    modeFilter = modeFilter.filter(function (value, index, array) {
        return array.indexOf(value) === index;
    });
    
    async function dataUrlToFile(dataUrl: string, fileName: string): Promise<File> {

        const res: Response = await fetch(dataUrl);
        const blob: Blob = await res.blob();
        return new File([blob], fileName, { type: 'image/png' });
    }
    //   }, [image]);
    return (
        <Stage ref={ref} width={width} height={height}>
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
}
