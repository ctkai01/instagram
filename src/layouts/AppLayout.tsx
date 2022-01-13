import { Header } from '@components/common';
import { IRoute } from '@models/index';
import { routeApp } from '@routes/index';
import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { LayoutScreen } from '.';

export function AppLayout() {
    const [showRecentSearch, setShowRecentSearch] = useState<boolean>(false);
    const [showSettingUser, setShowSettingUser] = useState<boolean>(false);
    const [valueSearch, setValueSearch] = useState<string>('');
    const [selectInput, setSelectInput] = useState<boolean>(false);

    function useHandleSearch(ref: React.RefObject<HTMLDivElement>, ref1: React.RefObject<HTMLDivElement>) {
        useEffect(() => {
            function handleClickOutside(event: any) {
                if (ref.current && !ref.current.contains(event.target)) {
                    if (showRecentSearch) {
                        setShowRecentSearch(false)
                        setSelectInput(false)
                    }
                } else if (ref.current && ref.current.contains(event.target)) {
                    if (!showRecentSearch) {
                        setShowRecentSearch(true)
                        if (valueSearch) {
                            setSelectInput(true)
                        } else {
                            setSelectInput(false)
                        }
                    } else {
                        if (ref1.current && ref1.current.contains(event.target)) {
                            setShowRecentSearch(false)
                            setValueSearch('')
                        } else {
                            setShowRecentSearch(false)
                        }
                    }
                }
            }
    
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref, ref1, showRecentSearch, selectInput]);
    }


    const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValueSearch(e.target.value)
        setSelectInput(false)
    }

    function useHandleSettingUser(ref: React.RefObject<HTMLDivElement>) {
        useEffect(() => {
            const handleSettingUser = (event: any) => {
                if (ref.current && !ref.current.contains(event.target)) {
                    if (showSettingUser) {
                        setShowSettingUser(false)
                    }
                } else {
                    if (showSettingUser) {
                        setShowSettingUser(false)
                    } else {
                        setShowSettingUser(true)
                    }

                }
            }
            document.addEventListener("mousedown", handleSettingUser);

            return () => {  
                document.removeEventListener("mousedown", handleSettingUser)
            }
        }, [ref, showSettingUser])
    
    }
    return (
        <>
            <LayoutScreen>
                <Header
                    showRecentSearch={showRecentSearch}
                    handleChangeSearch={handleChangeSearch}
                    useHandleSettingUser={useHandleSettingUser}
                    useOutsideSearch={useHandleSearch}
                    showSettingUser={showSettingUser}
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
