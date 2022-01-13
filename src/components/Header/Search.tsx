import { Paper } from '@material-ui/core';
import * as React from 'react';
import styled from 'styled-components';
import { Arrow } from '../common/Arrow';
import { CloseCircleIcon, SearchIcon } from '../Icons';

export interface ISearchProps {
    className: string;
    showRecentSearch: boolean;
    valueSearch: string;
    selectInput: boolean;
    onChangeSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
    useOutsideSearch: (
        refSearch: React.RefObject<HTMLDivElement>,
        refClose: React.RefObject<HTMLDivElement>
    ) => void;
}

export function Search(props: ISearchProps) {
    const {
        className,
        showRecentSearch,
        valueSearch,
        selectInput,
        onChangeSearch,
        useOutsideSearch,
    } = props;

    const inputRef = React.useRef(null);
    const searchRef = React.useRef(null);
    const closeRef = React.useRef(null);

    React.useEffect(() => {
        if (selectInput) {
            if (inputRef && inputRef.current) {
                // @ts-ignore: Object is possibly 'null'.
                inputRef.current.select();
            }
        }
    }, [selectInput]);

    useOutsideSearch(searchRef, closeRef);
    return (
        <Container className={className} ref={searchRef}>
            <input
                onChange={onChangeSearch}
                type="text"
                ref={inputRef}
                value={valueSearch}
                style={{ color: `${showRecentSearch ? '#8e8e8e' : '#efefef'}` }}
            />
            {showRecentSearch ? (
                <div className="box-close" ref={closeRef}>
                    <CloseCircleIcon className="icon-close" />
                </div>
            ) : (
                ''
            )}
            <div className="input-text">
                {!showRecentSearch ? <SearchIcon className="iconSearch" /> : ''}
                {!showRecentSearch ? <span>{valueSearch ? valueSearch : 'Search'}</span> : ''}
            </div>
            {showRecentSearch ? (
                <Paper className="recent-search" elevation={4}>
                    <div className="content">
                        {/* <a href='/jj'>lorem44</a> */}
                        <div>Recent2</div>
                        <div>Recent3</div>
                    </div>
                    <Arrow position="center-top" />
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

    .icon-close {
        width: 15px;
        height: 15px;
    }

    .box-close {
        display: flex;
        align-items: center;
        position: absolute;
        cursor: pointer;
        right: 2px;
    }

    .input-text {
        position: absolute;
        display: flex;
        align-items: center;

        span {
            font-size: 16px;
            color: #8e8e8e;
            margin-left: 2px;
            max-width: 140px;
            overflow: hidden;
            text-overflow: ellipsis;
            vertical-align: bottom;
            white-space: nowrap;
            pointer-events: none;
            user-select: none;
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
