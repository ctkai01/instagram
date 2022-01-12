import { Header } from '@components/common';
import { IRoute } from '@models/index';
import { routeApp } from '@routes/index';
import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { LayoutScreen } from '.';

export function AppLayout() {
    const [showRecentSearch, setShowRecentSearch] = useState<boolean>(false);
    const [valueSearch, setValueSearch] = useState<string>('');
    const [selectInput, setSelectInput] = useState<boolean>(false);
    const handleFocusSearch = (e: React.FocusEvent<HTMLInputElement>) => {
        setShowRecentSearch(true)
        if (valueSearch) {
            setSelectInput(true)
        } else {
            setSelectInput(false)
        }
    };
    const handleBlurSearch = (e: React.FocusEvent<HTMLInputElement>) => {
        setShowRecentSearch(false)
        setSelectInput(false)

    };

    const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValueSearch(e.target.value)
        setSelectInput(false)
    }

    return (
        <>
            <LayoutScreen>
                <Header
                    showRecentSearch={showRecentSearch}
                    handleBlurSearch={handleBlurSearch}
                    handleFocusSearch={handleFocusSearch}
                    handleChangeSearch={handleChangeSearch}
                    valueSearch={valueSearch}
                    selectInput={selectInput}
                />
                <Content>
                    <Switch>
                        {routeApp.map((e: IRoute, key) => (
                            <Route key={key} {...e} />
                        ))}
                    </Switch>
                </Content>
            </LayoutScreen>
        </>
    );
}

const Content = styled.main`
    margin-top: 60px;
`;
