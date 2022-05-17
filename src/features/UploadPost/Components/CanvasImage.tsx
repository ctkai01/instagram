import * as React from 'react';
import { Stage, Layer, Image } from 'react-konva';
import useImage from 'use-image';
import Konva from 'konva';
import { AdjustmentValueImage, FiltersImage } from './EditImage';
import { FilterImage } from '@constants/filter-image';
export interface ICanvasImageProps {
    imgUrl: string;
    filters: FiltersImage;
    adjustments: AdjustmentValueImage;
}

export default function CanvasImage(props: ICanvasImageProps) {
    const { imgUrl, filters, adjustments } = props;
    // @ts-ignore: Object is possibly 'null'.

    const imageRef: React.RefObject<Konva.Image> = React.useRef();
    // const [image] = useImage(imgUrl);
    // image?.height =
    const image = new window.Image();
    // const [image] = useImage(imgUrl);
    // @ts-ignore: Object is possibly 'null'.
    image.src = imgUrl;
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

    // const canvas = React.useMemo(() => {
    //     if (!image) {
    //       return undefined;
    //     }
    //     const el = document.createElement("canvas");
    let modeFilter = []
    let option = {}
    if (filters.indexActive === FilterImage.SATURATION_HSV) {
        modeFilter.push( Konva.Filters.HSV )
        option = {...option, saturation: filters.value}
    } else if (filters.indexActive === FilterImage.LEVELS_POSTERIZE) {
        modeFilter.push(Konva.Filters.Posterize)
        option = {...option, levels: filters.value}
    } else if (filters.indexActive === FilterImage.GRAY_SCALE) {
        modeFilter.push(Konva.Filters.Grayscale)
    } else if (filters.indexActive === FilterImage.INVERT) {
        modeFilter.push(Konva.Filters.Invert)
    } else if (filters.indexActive === FilterImage.ALPHA_RGBA) {
        modeFilter.push(Konva.Filters.RGBA)
        option = {...option, alpha: filters.value}
    } else if (filters.indexActive === FilterImage.SEPIA) {
        modeFilter.push(Konva.Filters.Sepia)
    } else if (filters.indexActive === FilterImage.SOLARIZE) {
        modeFilter.push(Konva.Filters.Solarize)
    } else if (filters.indexActive === FilterImage.BLUR_RADIUS) {
        modeFilter.push(Konva.Filters.Blur)
        option = {...option, blurRadius: filters.value}
    } else if (filters.indexActive === FilterImage.GREEN_RGB) {
        modeFilter.push(Konva.Filters.RGB)
        option = {...option, green: filters.value}
    } else if (filters.indexActive === FilterImage.RED_RGB) {
        modeFilter.push(Konva.Filters.RGB)
        option = {...option, red: filters.value}
    } else if (filters.indexActive === FilterImage.BLUE_RGB) {
        modeFilter.push(Konva.Filters.RGB)
        option = {...option, blue: filters.value}
    }

    if (adjustments.saturation) {
        modeFilter.push(Konva.Filters.HSL)
        option = {...option, saturation: adjustments.saturation}
    }

    if (adjustments.brightness) {
        modeFilter.push(Konva.Filters.Brighten)
        option = {...option, brightness: adjustments.brightness}
    }

    if (adjustments.contrast) {
        modeFilter.push(Konva.Filters.Contrast)
        option = {...option, contrast: adjustments.contrast}
    }

    if (adjustments.threshold) {
        modeFilter.push(Konva.Filters.Threshold)
        option = {...option, threshold: adjustments.threshold}
    }

    if (adjustments.hue) {
        modeFilter.push(Konva.Filters.HSL)
        option = {...option, hue: adjustments.hue}
    }

    if (adjustments.noise) {
        modeFilter.push(Konva.Filters.Noise)
        option = {...option, noise: adjustments.noise}
    }

    modeFilter = modeFilter.filter(function (value, index, array) { 
        return array.indexOf(value) === index;
    });
    //     el.width = image.width;
    //     el.height = image.height;
    //     const ctx = el.getContext("2d");
    // // @ts-ignore: Object is possibly 'null'.

    //     ctx.filter =
    //       "invert(51%) sepia(81%) saturate(1433%) hue-rotate(195deg) brightness(100%) contrast(93%)";
    // // @ts-ignore: Object is possibly 'null'.
    //       ctx.drawImage(image, 0, 0);
    //     return el;

    //   }, [image]);
    return (
        // <Stage width={window.innerWidth} height={window.innerHeight}>
        <Stage width={width} height={height}>
            <Layer>
                {/* <Image image={image}/> */}
                <Image
                    ref={imageRef}
                    // filters={[Konva.Filters.Contrast, Konva.Filters.Blur, Konva.Filters.Brighten, Konva.Filters.RGB ]}
                    // filters={[Konva.Filters.Contrast, Konva.Filters.Blur, Konva.Filters.Brighten ]}
                    // filters={[Konva.Filters.Contrast, Konva.Filters.Blur, Konva.Filters.Brighten, Konva.Filters.Emboss  ]}
                    // filters={[Konva.Filters.Contrast, Konva.Filters.Blur, Konva.Filters.Brighten, Konva.Filters.Enhance  ]}
                    // filters={[Konva.Filters.Contrast, Konva.Filters.Blur, Konva.Filters.Brighten, Konva.Filters.RGB  ]}
                    filters={modeFilter}
                    // filters={[ Konva.Filters.Invert   ]}
                    // filters={[ Konva.Filters.Solarize   ]}
                    // filters={[ Konva.Filters.Sepia   ]}
                    // filters={[Konva.Filters.Contrast, Konva.Filters.Blur, Konva.Filters.Brighten, Konva.Filters.HSV  ]}
                    // ** filters={[Konva.Filters.Contrast, Konva.Filters.Blur, Konva.Filters.Brighten, Konva.Filters.Kaleidoscope  ]}
                    // filters={[Konva.Filters.Contrast, Konva.Filters.Blur, Konva.Filters.Brighten,  Konva.Filters.Posterize  ]}
                    // filters={[Konva.Filters.Contrast, Konva.Filters.Blur, Konva.Filters.Brighten,  Konva.Filters.Posterize  ]}
                    // filters={[Konva.Filters.Contrast, Konva.Filters.Blur, Konva.Filters.Brighten,  Konva.Filters.Noise  ]}
                    // ** filters={[Konva.Filters.Contrast, Konva.Filters.Blur, Konva.Filters.Brighten,  Konva.Filters.Pixelate  ]}
                    // filters={[Konva.Filters.Contrast, Konva.Filters.Blur, Konva.Filters.Brighten, Konva.Filters.RGB  ]}
                   
                    fillPatternScaleX={scale}
                    fillPatternScaleY={scale}
                    image={image}
                    // alpha={0.9}
                    {...option}
                    // fill={Konva.Util.getRandomColor()}
                    // brightness={0.5}
                    // contrast={-50}
                    // blue={255}
                    // embossDirection='top-right'
                    // embossDirection='bottom-right'
                    // embossStrength={1}
                    // embossWhiteLevel={0.1}
                    // amount={-1}
                    // green={255}
                    // hue={270}
                    // * power={10}
                    // **level={0.8}
                    // luminance={0.7}
                    // noise={0.8}
                    // pixelSiz={254}
                    // **red={14}
                    // saturation={-0.4}
                    // threshold={0.7}
                    // value={0.1}
                    // levels={0.1}
                />
                {/* <Image image={image} strokeEnabled={true} x={window.innerWidth} y={window.innerHeight}/> */}
            </Layer>
        </Stage>
    );
}
