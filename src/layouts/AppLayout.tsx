import { Header } from '@components/Header';
import { IRoute } from '@models/index';
import { routeApp } from '@routes/index';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { LayoutScreen } from '.';

export function AppLayout() {
    return (
        <>
            <LayoutScreen>
                <Header />
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
