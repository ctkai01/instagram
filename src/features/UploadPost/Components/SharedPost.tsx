import * as React from 'react';
import 'react-twemoji-picker/dist/EmojiPicker.css';
import styled from 'styled-components';
import 'swiper/css/pagination';

export interface ISharedPostProps {
    isLoadingCreatePost: boolean;
}

interface ContainerStyledProps {
    baseUrl: string;
}

export default function SharedPost(props: ISharedPostProps) {
    const { isLoadingCreatePost } = props;

    return (
        <>
            <Container baseUrl={window.location.origin}>
                <div className="header">
                    <div className="main-header">
                        {isLoadingCreatePost ? 'Sharing' : 'Post shared'}
                    </div>
                </div>

                <div className="content-main" style={{ height: '80vh' }}>
                    <div className="container-notify-shared">
                        {isLoadingCreatePost ? (
                            <img
                            src={`${window.location.origin}/images/loading_r.gif`}
                            height={96}
                            width={96}
                            alt=""
                            className=""
                        />
                        ) : (
                            <>
                                <img
                                    src={`${window.location.origin}/images/tick.gif`}
                                    height={96}
                                    width={96}
                                    alt=""
                                    className=""
                                />
                                <div className="text">Your post has been shared.</div>
                            </>
                        )}
                    </div>
                </div>
            </Container>
        </>
    );
}

const Container = styled.div<ContainerStyledProps>`
    width: 761px;
    max-width: 855px;
    min-width: 348px;
    min-height: 391px;
    max-height: 898px;

    .header {
        display: flex;
        border-bottom: 1px solid rgb(219, 219, 219);
        border-top-left-radius: 10px;
        justify-content: center;
        align-items: center;
        height: 42px;

        .main-header {
            flex: 8;
            font-size: 16px;
            color: #262626;
            font-weight: 600;
            text-align: center;
        }
    }

    .content-main {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .container-notify-shared {
        display: flex;
        flex-direction: column;
        align-items: center;
        .text {
            margin-top: 16px;
            font-size: 22px;
            color: #262626;
        }
    }
`;
