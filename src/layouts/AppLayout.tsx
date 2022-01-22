import { Header } from '@components/Header';
import { IRoute } from '@models/index';
import { routeApp } from '@routes/index';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { LayoutScreen } from '.';

export function AppLayout() {
    return (
        <Wrapper>  
            <LayoutScreen>
                <Header />
                <Content>
                    <Switch>
                        {routeApp.map((e: IRoute, key) => (
                            <Route key={key} {...e} />
                        ))}
                        <Route>
                        Sorry, this page isn't available
                        </Route>
                    </Switch>
                </Content>
            </LayoutScreen>
        </Wrapper>
    );
}

const Wrapper = styled.main`
    background-color: #fafafa;
`

const Content = styled.section`
    margin-top: 60px;
`;
