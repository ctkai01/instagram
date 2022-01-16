import { css } from 'styled-components';

export const theme = {
    colors: {
        main_gradient: `45deg,
        #f09433 0%,
        #e6683c 25%,
        #dc2743 50%,
        #cc2366 75%,
        #bc1888 100%`,
        gray: '#DCDCDC',
        black: 'var(--i1d,38,38,38)'
    },
    sizeAvatar: {
        large: 150,
        large_medium: 77,
        medium: 56,
        small_medium: 32,
        small: 24,
    }
    ,
    breakPoints: {
        breakSmall: '320px',
        breakMobile: '375px',
        breakMobileMedium: '575px',
        breakTablet: '767px',
        breakOnlyMobile: '768px',
        breakMedium: '980px',
        breakIpadPro: '1024px',
        breakLarge: '1200px',
        breakBig: '1366px',
    },
    widths: {
        wide_650: '650px',
        wide_700: '700px',
        wide_900: '900px',
        wide_1110: '1110px',
    },
};

type cssParams = Parameters<typeof css>;

export const breakpoint = {
    breakSmall: (...args: cssParams) => css`
        @media (min-width: ${theme.breakPoints.breakSmall}) {
            ${css(...args)}
        }
    `,
    breakMobile: (...args: cssParams) => css`
        @media (min-width: ${theme.breakPoints.breakMobile}) {
            ${css(...args)}
        }
    `,
    breakMobileMedium: (...args: cssParams) => css`
        @media (min-width: ${theme.breakPoints.breakMobileMedium}) {
            ${css(...args)}
        }
    `,
    breakTablet: (...args: cssParams) => css`
        @media (min-width: ${theme.breakPoints.breakTablet}) {
            ${css(...args)}
        }
    `,
    breakMedium: (...args: cssParams) => css`
        @media (min-width: ${theme.breakPoints.breakMedium}) {
            ${css(...args)}
        }
    `,
    breakIpadPro: (...args: cssParams) => css`
        @media (min-width: ${theme.breakPoints.breakIpadPro}) {
            ${css(...args)}
        }
    `,
    breakIpad: (...args: cssParams) => css`
        @media (min-width: ${theme.breakPoints.breakTablet}) and (max-width: ${theme.breakPoints
                .breakIpadPro}) {
            ${css(...args)}
        }
    `,
    breakLarge: (...args: cssParams) => css`
        @media (min-width: ${theme.breakPoints.breakLarge}) {
            ${css(...args)}
        }
    `,
    breakBig: (...args: cssParams) => css`
        @media (min-width: ${theme.breakPoints.breakBig}) {
            ${css(...args)}
        }
    `,
    breakOnlyMobile: (...args: cssParams) => css`
        @media (max-width: ${theme.breakPoints.breakTablet}) {
            ${css(...args)}
        }
    `,
    breakOnlyMobile768: (...args: cssParams) => css`
        @media (max-width: ${theme.breakPoints.breakOnlyMobile}) {
            ${css(...args)}
        }
    `,
};
