import { LogoInstagram } from '@components/common';
import TaskBarHeader from '@components/Header/TaskBarHeader';
import { authActions, selectUserAuth } from '@features/Auth/authSlice';
import { LayoutScreen } from '@layouts/index';
import { User } from '@models/User';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import * as React from 'react';
import styled from 'styled-components';
import { Search } from './Search';
import { debounce } from 'lodash';
import { Api } from '@api/authApi';

export interface IHeaderProps {
}

export function Header(props: IHeaderProps) {
    const [showRecentSearch, setShowRecentSearch] = React.useState<boolean>(false);
    const [valueSearch, setValueSearch] = React.useState<string>('');
    const [selectInput, setSelectInput] = React.useState<boolean>(false);
    const userAuth = useAppSelector(selectUserAuth);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [usersSearch, setUsersSearch] = React.useState<User[]>([]);
    
    const dispatch = useAppDispatch();

    const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValueSearch(e.target.value);
        setSelectInput(false);
    };

    const searchUserHome = async (value: string) => {
        setIsLoading(true);
        const response = await Api.searchUserHome(value);
        setIsLoading(false);
        console.log(response)
        setUsersSearch(response.data);
    };

    const debounceSearch = React.useCallback(debounce(searchUserHome, 1000), []);

    React.useEffect(() => {
        debounceSearch(valueSearch);
    }, [valueSearch]);


    const handleLogout = () => {
        dispatch(authActions.logout());
    };

    const handleCloseSearch = () => {
        setUsersSearch([])
        setShowRecentSearch(false);
        setSelectInput(false);
        setValueSearch('');
    };

    const handleOutsideSearch = () => {
        setShowRecentSearch(false);
        setSelectInput(false);
    };

    const handleShowSearchRecent = () => {
        if (!showRecentSearch) {
            if (valueSearch) {
                setSelectInput(true);
            } else {
                setSelectInput(false);
            }
            setShowRecentSearch(true);
        }
    };

    

    return (
        <Container>
            <LayoutScreen className="content-header">
                <LogoInstagram className="logo" />
                <Search
                    className="search-bar"
                    onChangeSearch={handleChangeSearch}
                    showRecentSearch={showRecentSearch}
                    usersSearch={usersSearch}
                    valueSearch={valueSearch}
                    selectInput={selectInput}
                    isLoading={isLoading}
                    handleCloseSearch={handleCloseSearch}
                    handleOutsideSearch={handleOutsideSearch}
                    handleShowSearchRecent={handleShowSearchRecent}
                />
                <TaskBarHeader className="taskbar" handleLogout={handleLogout} userAuth={userAuth}/>
            </LayoutScreen>
        </Container>
    );
}

const Container = styled.header`
    position: fixed;
    top: 0;
    width: calc(100vw - 19px);
    left: 0;
    height: 60px;
    border-bottom: 1px solid rgba(219, 219, 219);
    background-color: #fff;
    z-index: 9999;

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
            width: 300px;
        }
    }
`;
