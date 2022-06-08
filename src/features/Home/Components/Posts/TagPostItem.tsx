import { TagUser } from '@models/Media';
import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface ITagPostItemProps {
    tagUser: TagUser;
}

export default function TagPostItem(props: ITagPostItemProps) {
    const { tagUser } = props;
    return (
        <Container to={`/${tagUser.user_name}`} style={{ top: `${tagUser.yPos}%`, left: `${tagUser.xPos}%`, transform: 'none' }}>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    userSelect: 'none',
                    zIndex: '1',
                    transform: 'none',
                    position: 'relative',
                    padding: '8px 12px',
                    background: '#000',
                    borderRadius: '8px',
                    color: '#fff',
                }}
            >
                <div style={{ fontWeight: '700', margin: '0 4px' }}>{tagUser.user_name}</div>
            </div>
            <div className="arrow-top"></div>
        </Container>
    );
}

const Container = styled(Link)`
    position: absolute;
    text-decoration: none;
    .arrow-top {
        z-index: 1;
        box-shadow: 0 0 5px 1px rgb(0 0 0 / 10%);
        height: 14px;
        position: absolute;
        -webkit-transform: rotate(45deg);
        transform: translateZ(-1px) rotate(45deg);
        width: 14px;
        background-color: #000;
        left: 18px;
        top: -6px;
    }
`;
