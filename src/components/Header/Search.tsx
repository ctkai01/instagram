import * as React from 'react';
import styled from 'styled-components';
import { CloseCircleIcon, SearchIcon } from '../Icons';
import { ExpandSearch } from './ExpandSearch';

export interface ISearchProps {
    className: string;
    showRecentSearch: boolean;
    valueSearch: string;
    selectInput: boolean;
    onChangeSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleCloseSearch: () => void;
    handleShowSearchRecent: () => void;
    handleOutsideSearch: () => void;
}

export function Search(props: ISearchProps) {
    const {
        className,
        showRecentSearch,
        valueSearch,
        selectInput,
        onChangeSearch,
        handleShowSearchRecent,
        handleCloseSearch,
        handleOutsideSearch,
    } = props;

    const inputRef = React.useRef(null);

    React.useEffect(() => {
        if (selectInput) {
            if (inputRef && inputRef.current) {
                // @ts-ignore: Object is possibly 'null'.
                inputRef.current.select();
            }
        }
    }, [selectInput]);

    return (
        <Wrapper>
            <Container className={className} onClick={handleShowSearchRecent}>
                <input
                    onChange={onChangeSearch}
                    type="text"
                    ref={inputRef}
                    value={valueSearch}
                    style={{ color: `${showRecentSearch ? '#8e8e8e' : '#efefef'}` }}
                />
                <div className="input-text">
                    {!showRecentSearch ? <SearchIcon className="iconSearch" /> : ''}
                    {!showRecentSearch ? <span>{valueSearch ? valueSearch : 'Search'}</span> : ''}
                </div>
            </Container>
            {showRecentSearch ? (
                <>
                    <div className="box-close" onClick={handleCloseSearch}>
                        <CloseCircleIcon className="icon-close" />
                    </div>
                    <ExpandSearch
                        showRecentSearch={showRecentSearch}
                        handleOutsideSearch={handleOutsideSearch}
                    />
                </>
            ) : (
                ''
            )}
        </Wrapper>
    );
}

const Wrapper = styled.div`
    position: relative;

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
        z-index: 999;

        top: 50%;
        transform: translateY(-50%);
    }
`;

const Container = styled.div`
    padding: 6px 16px;
    display: flex;
    align-items: center;
    background-color: #efefef;
    border-radius: 8px;
    position: relative;
    z-index: 99;

    .iconSearch {
        margin-right: 10px;
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
`;
