import { Api } from '@api/authApi';
import { Status } from '@constants/status';
import { TypeFollow } from '@constants/type-follow';
import { Comment } from '@models/Comment';
import { Post } from '@models/Post';
import { User } from '@models/User';
import { useState, useEffect } from 'react';

interface IuseReactCommentProps {
    type: Status;
}
export const useReactComment = (
    props: IuseReactCommentProps
): [Comment | undefined, boolean, (idComment: number) => Promise<void>] => {
    const { type } = props;
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<Comment>();

    const fetchReactComment = async (idComment: number) => {
        setLoading(true);
        const dataUser = await Api.reactComment(idComment, type);
        setData(dataUser.data);
        setLoading(false);
    };

    return [data, loading, fetchReactComment];
};

