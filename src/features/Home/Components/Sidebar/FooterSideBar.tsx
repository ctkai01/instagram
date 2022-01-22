import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export interface IFooterSideBarProps {}

export function FooterSideBar(props: IFooterSideBarProps) {
    const listService = [
        {
            name: 'About',
            url: '/t',
        },
        {
            name: 'Help',
            url: '/t',
        },
        {
            name: 'Press',
            url: '/t',
        },
        {
            name: 'API',
            url: '/t',
        },
        {
            name: 'Jobs',
            url: '/t',
        },
        {
            name: 'Privacy',
            url: '/t',
        },
        {
            name: 'Terms',
            url: '/t',
        },
        {
            name: 'Locations',
            url: '/t',
        },
        {
            name: 'Top Accounts',
            url: '/t',
        },
        {
            name: 'Hashtags',
            url: '/t',
        },
        {
            name: 'Language',
            url: '/t',
        },
    ];
    return (
        <Container>
            <div className="list-service">
                {listService.map((item, index) => {
                    if (index === listService.length - 1) {
                        return (
                            <div className="item-wrapper">
                                <Link className="item-service" to={item.url}>
                                    {item.name}
                                </Link>
                            </div>
                        );
                    } else {
                        return (
                            <div className="item-wrapper">
                                <Link className="item-service" to={item.url}>
                                    {item.name}
                                </Link>
                                <span className="space">&middot;</span>
                            </div>
                        );
                    }
                })}
            </div>
            <div className="copy-right">© 2022 INSTAGRAM FROM META</div>
        </Container>
    );
}

const Container = styled.div`
    max-width: 297px;
    margin-top: 25px;
    .list-service {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 18px;

        .item-wrapper {
            display: flex;
            align-items: center;
            margin-bottom: 8px;
        }

        .item-service {
            color: #c7c7c7;
            font-size: 12px;
            line-height: 12px;
            text-decoration: none;
            vertical-align: middle;
        }

        .space {
            display: flex;
            align-items: center;
            color: #c7c7c7;
            height: 12px;
            margin: 0 0.25em 0 0.25em;
        }
    }

    .copy-right {
        color: #c7c7c7;
        font-size: 12px;
    }
`;
