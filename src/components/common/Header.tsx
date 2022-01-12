import { Search } from '@components/index';
import { LayoutScreen } from '@layouts/index';
import * as React from 'react';
import styled from 'styled-components';
import { LogoInstagram } from './LogoInstagram';

export interface IHeaderProps {
    showRecentSearch: boolean;
    selectInput: boolean;
    valueSearch: string;
    handleBlurSearch: (e: React.FocusEvent<HTMLInputElement>) => void;
    handleFocusSearch: (e: React.FocusEvent<HTMLInputElement>) => void;
    handleChangeSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Header(props: IHeaderProps) {
    const { showRecentSearch, valueSearch, selectInput, handleBlurSearch, handleFocusSearch, handleChangeSearch } = props;
    return (
        <Container>
            <LayoutScreen className="content-header">
                <LogoInstagram className="logo" />
                <Search
                    className="search-bar"
                    onBlurSearch={handleBlurSearch}
                    onFocusSearch={handleFocusSearch}
                    onChangeSearch={handleChangeSearch}
                    showRecentSearch={showRecentSearch}
                    valueSearch={valueSearch}
                    selectInput={selectInput}
                />
                <LogoInstagram className="logo" />
            </LayoutScreen>
        </Container>
    );
}

const Container = styled.header`
    position: fixed;
    top: 0;
    width: 100vw;
    left: 0;
    height: 60px;
    border-bottom: 1px solid rgba(219, 219, 219);

    .content-header {
        display: flex;
        justify-content: center;
        align-items: center;
        height: inherit;
        .logo {
            flex: 1;
        }

        .search-bar {
            width: 268px;
        }
    }
`;
