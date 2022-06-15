import { makeStyles } from '@material-ui/core/styles';
import Tooltip, { tooltipClasses, TooltipProps } from '@mui/material/Tooltip';
import * as React from 'react';
import { styled } from '@mui/material';
import { Fade } from '@material-ui/core';

export interface ITooltipHTMLProps {
    content: React.ReactChild | React.ReactChild[] | React.ReactChildren | React.ReactChildren[];
    children: React.ReactElement;
    placement: "bottom" | "left" | "right" | "top" | "bottom-end" | "bottom-start" | "left-end" | "left-start" | "right-end" | "right-start" | "top-end" | "top-start";
    className?: string
}
const useStyles = makeStyles({
    popper: {
        marginTop: '-2px !important',
    },

});

export function TooltipHTML(props: ITooltipHTMLProps) {
    const styles = useStyles();
    const { children, content, placement, className } = props;
    return (
        <HtmlTooltip
            placement={placement}
            PopperProps={{ className: `${styles.popper} ${className}` }}
            title={content}
            enterDelay={500}
            leaveDelay={200} 
            TransitionComponent={Fade}
        >
            {children}
        </HtmlTooltip>
    );
}

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }}/>
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#fff',
        maxWidth: 390,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
        marginTop: '0 !important',
        borderRadius: 10,
    },
    [`&`]: {
        zIndex: 999999
    }
}));
