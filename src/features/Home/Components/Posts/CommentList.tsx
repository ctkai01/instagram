import * as React from 'react';
import styled from 'styled-components';
import CommentItem from './CommentItem';
import CommentReply from './CommentReply';
export interface ICommentListProps {}

export interface Comment {
    user_name: string;
    comment: string;
    replies: CommentRep[];
}

export interface CommentRep {
    user_name: string;
    comment: string;
}

export default function CommentList(props: ICommentListProps) {
    const arr: Comment[] = [
        {
            user_name: 'a__dang_',
            comment: 'Phản biện gì nữa không',
            replies: [
                {
                    user_name: 'kinglnd',
                    comment: '@a__dang_ làm ziệc đi',
                },
            ],
        },
        {
            user_name: 'yau.yau.26',
            comment: 'cho xin miếng thuốc lun anh ơi',
            replies: [],
        },
        {
            user_name: 'a.nguyendinhduy',
            comment: 'Perfect',
            replies: [
                {
                    user_name: 'kinglnd',
                    comment: '@a.nguyendinhduy hahaha',
                },
                {
                    user_name: 'a.nguyendinhduy',
                    comment: '@kinglnd wow so beautiful!',
                },
            ],
        },
        {
            user_name: 'thanhtuyen9231',
            comment: 'Chúc chị Linhhh sinh nhật vuiiiii vẻeeeeee ạaaaaa🎊🥳🎉🎂😍😍',
            replies: [],
        },
        {
            user_name: 'bling_bling.girl',
            comment: 'Giày xinh, túi đẹp ghé shop ạ❣🍒🌷🍒🌷',
            replies: [],
        },
        {
            user_name: 'namlq',
            comment: 'wow so cute',
            replies: [
                {
                    user_name: 'kinglnd',
                    comment: '@namlq hi em',
                },
            ],
        },
        {
            user_name: 'dvh_a',
            comment: 'Hay qua chi oi',
            replies: [],
        },
        {
            user_name: 'dvh_a',
            comment: 'Hay qua chi oi',
            replies: [],
        },
        {
            user_name: 'dvh_a',
            comment: 'Hay qua chi oi',
            replies: [],
        },
        {
            user_name: 'dvh_a',
            comment: 'Hay qua chi oi',
            replies: [],
        },
    ];
    return (
        <Container>
            {arr.map((el, index) => (
                <>
                    <CommentItem key={index} comment={el} />
                    {el.replies.length > 0 && <CommentReply comments={el.replies} />}
                </>
            ))}
        </Container>
    );
}

const Container = styled.div``;
