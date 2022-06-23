import { Avatar } from '@components/common';
import { InforIcon } from '@components/Icons';
import { User } from '@models/User';
import * as React from 'react';
import styled from 'styled-components';

export interface IHeaderContentProps {
    user?: User;
    isDetail: boolean;
    handleShowDetail: () => void;
    handleCloseDetail: () => void;
}

export default function HeaderContent(props: IHeaderContentProps) {
    const { user, isDetail, handleShowDetail, handleCloseDetail } = props;
    return (
        <Container>
            {isDetail ? (
                <div className="header-detail">
                    Details
                    <button onClick={handleCloseDetail} className="button-info-detail">
                        <InforIcon type='black' className="icon-info" />
                    </button>
                </div>
            ) : (
                <div className="wrapper-header">
                    <Avatar
                        border="none"
                        className="avatar"
                        size="small"
                        url={user ? user.avatar : ''}
                    />
                    <div className="info">
                        <div className="name">{user?.name}</div>
                    </div>
                    <button onClick={handleShowDetail} className="button-info">
                        <InforIcon className="icon-info" />
                    </button>
                </div>
            )}
        </Container>
    );
}

const Container = styled.div`
    padding: 8px 20px;

    .header-detail {
        text-align: center;
        position: relative;
        padding: 8px 20px;

        .button-info-detail {
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            cursor: pointer;
            padding: 8px;
            background: none;
            outline: none;
            border: none;
        }
    }

    border-bottom: 1px solid rgb(219, 219, 219);
    .avatar {
        margin-left: 8px;
    }

    .wrapper-header {
        display: flex;
        align-items: center;
        flex: 0;
    }

    .button-info {
        cursor: pointer;
        padding: 8px;
        background: none;
        outline: none;
        border: none;
    }

    .info {
        margin-left: 12px;
        display: flex;
        align-items: center;
        flex: 1;
        .name {
            display: block;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-weight: 600;
            font-size: 16px;
            line-height: 24px;
            color: rgb(38, 38, 38);
        }
    }
`;
