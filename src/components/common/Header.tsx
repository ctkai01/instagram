import { Search } from '@components/index';
import TaskBarHeader from '@components/TaskBarHeader';
import { LayoutScreen } from '@layouts/index';
import * as React from 'react';
import styled from 'styled-components';
import { LogoInstagram } from './LogoInstagram';

export interface IHeaderProps {
    showRecentSearch: boolean;
    selectInput: boolean;
    valueSearch: string;
    showSettingUser: boolean;
    handleChangeSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
    useHandleSettingUser: (ref: React.RefObject<HTMLDivElement>) => void;
    useOutsideSearch: (
        refSearch: React.RefObject<HTMLDivElement>,
        refClose: React.RefObject<HTMLDivElement>
    ) => void;
}

export function Header(props: IHeaderProps) {
    const {
        showRecentSearch,
        valueSearch,
        selectInput,
        showSettingUser,
        useHandleSettingUser,
        useOutsideSearch,
        handleChangeSearch,
    } = props;
    return (
        <Container>
            <LayoutScreen className="content-header">
                <LogoInstagram className="logo" />
                <Search
                    className="search-bar"
                    onChangeSearch={handleChangeSearch}
                    showRecentSearch={showRecentSearch}
                    valueSearch={valueSearch}
                    selectInput={selectInput}
                    useOutsideSearch={useOutsideSearch}
                />
                <TaskBarHeader
                    className="taskbar"
                    useHandleSettingUser={useHandleSettingUser}
                    showSettingUser={showSettingUser}
                />
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
        .logo,
        .taskbar {
            flex: 1;
        }

        .search-bar {
            width: 268px;
        }
    }
`;
