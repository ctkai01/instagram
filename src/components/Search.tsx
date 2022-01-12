import { Paper } from '@material-ui/core';
import * as React from 'react';
import styled from 'styled-components';
import { InputCommon } from './common';
import { Arrow } from './common/Arrow';
import CloseCircleIcon from './Icons/CloseCircleIcon';
import SearchIcon from './Icons/SearchIcon';

export interface ISearchProps {
    className: string;
    showRecentSearch: boolean;
    valueSearch: string;
    selectInput: boolean;
    onBlurSearch: (e: React.FocusEvent<HTMLInputElement>) => void;
    onFocusSearch: (e: React.FocusEvent<HTMLInputElement>) => void;
    onChangeSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Search(props: ISearchProps) {
    const {
        className,
        showRecentSearch,
        valueSearch,
        selectInput,
        onChangeSearch,
        onBlurSearch,
        onFocusSearch,
    } = props;

    const inputRef = React.useRef(null);

    if (selectInput) {

        if (inputRef && inputRef.current) {
            // @ts-ignore: Object is possibly 'null'.
            inputRef.current.select();
        }
    }
    console.log(inputRef);
    return (
        <Container className={className}>
            <input
                onBlur={onBlurSearch}
                onChange={onChangeSearch}
                onFocus={onFocusSearch}
                type="text"
                ref={inputRef}
                placeholder="Search"
                value={valueSearch}
                style={{ color: `${showRecentSearch ? '#8e8e8e' : '#efefef'}` }}
            />
            <div className="input-text">
                {!showRecentSearch ? <SearchIcon className="iconSearch" /> : ''}
                {!showRecentSearch ? <span>{valueSearch ? valueSearch : 'Search'}</span> : ''}
                <CloseCircleIcon />
            </div>
            {showRecentSearch ? (
                <Paper className="recent-search" elevation={4}>
                    <div className="content">
                        <div>lorem44</div>
                        <div>Recent2</div>
                        <div>Recent3</div>
                    </div>
                    <Arrow />
                </Paper>
            ) : (
                ''
            )}
        </Container>
    );
}

const Container = styled.div`
    padding: 6px 16px;
    display: flex;
    align-items: center;
    background-color: #efefef;
    border-radius: 8px;
    position: relative;

    .iconSearch {
        margin-right: 10px;
    }

    .input-text {
        position: absolute;
        display: flex;
        align-items: center;

        /* width: 100%; */
        span {
            font-size: 16px;
            color: #8e8e8e;
            margin-left: 2px;
            max-width: 140px;
            /* max-width: 100%; */
            overflow: hidden;
            text-overflow: ellipsis;
            vertical-align: bottom;
            white-space: nowrap;
            pointer-events: none;
        }
    }

    input {
        outline: none;
        background-color: #efefef;
        border: 0;
        height: 25px;
        width: 100%;
        font-size: 16px;
    }

    input::placeholder {
        color: transparent;
    }

    .recent-search {
        border-radius: 8px;
        position: absolute;
        width: 375px;
        top: 50px;
        transform: translateX(-50%);
        left: 50%;
        transform-style: preserve-3d;
        z-index: 99;
        .content {
            width: 100%;
            height: 100%;
            position: relative;
        }
    }
`;
