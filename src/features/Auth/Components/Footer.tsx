import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
export interface IFooterProps {}

export function Footer(props: IFooterProps) {
    return (
        <Wrapper>
            <div className="footer-list">
                <Link className="footer-item" to="/meta">
                    Meta
                </Link>
                <Link className="footer-item" to="/about">
                    About
                </Link>
                <Link className="footer-item" to="/blog">
                    Blog
                </Link>
                <Link className="footer-item" to="/jobs">
                    Jobs
                </Link>
                <Link className="footer-item" to="/help">
                    Help
                </Link>
                <Link className="footer-item" to="/api">
                    API
                </Link>
                <Link className="footer-item" to="/privacy">
                    Privacy
                </Link>
                <Link className="footer-item" to="/terms">
                    Terms
                </Link>
                <Link className="footer-item" to="/top-accounts">
                    Top Accounts
                </Link>
                <Link className="footer-item" to="/hashtags">
                    Hashtags
                </Link>
                <Link className="footer-item" to="/Locations">
                    Locations
                </Link>
                <Link className="footer-item" to="/instagram-lite">
                    Instagram Lite
                </Link>
            </div>
            <div className="footer-list">
                <Link className="footer-item" to="/beauty">
                    Beauty
                </Link>
                <Link className="footer-item" to="/dance">
                    Dance
                </Link>
                <Link className="footer-item" to="/fitness">
                    Fitness
                </Link>
                <Link className="footer-item" to="/food-drink">
                    Food & Drink
                </Link>
                <Link className="footer-item" to="/home-garden">
                    Home & Garden
                </Link>
                <Link className="footer-item" to="/Music">
                    Music
                </Link>
                <Link className="footer-item" to="/visual-arts">
                    Visual Arts
                </Link>
            </div>
            <div className="author-title">© 2022 Instagram from Meta</div>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    margin-top: 30px;
    margin-bottom: 50px;
    .footer-list {
        display: flex;
        justify-content: center;

        .footer-item {
            margin: 0px 8px 12px 8px;
            font-size: 13px;
            color: rgba(var(--f52, 142, 142, 142), 1);
            text-decoration: none;
        }
    }

    .author-title {
        font-size: 13px;
        color: rgba(var(--f52, 142, 142, 142), 1);
        text-align: center;
        margin-top: 15px;
    }
`;
