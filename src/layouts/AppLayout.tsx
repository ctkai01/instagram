import { Header } from '@components/Header';
import { selectUserAuth } from '@features/Auth/authSlice';
import { Footer } from '@features/Auth/Components/Footer';
import { IRoute } from '@models/index';
import { useAppSelector } from '@redux/hooks';
import { PATH_MESSAGE_LIST, routeApp } from '@routes/index';
import { isNull } from 'lodash';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import { LayoutScreen } from '.';

export function AppLayout() {
    let matchRouterNotFooter = useRouteMatch(PATH_MESSAGE_LIST);
    return (
        <Wrapper>  
            <LayoutScreen>
                <Header/>
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
                {isNull(matchRouterNotFooter) ? <Footer/> : ''}
                
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
