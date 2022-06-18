import { Api } from '@api/authApi';
import { Status } from '@constants/status';
import { TypeFollow } from '@constants/type-follow';
import { Post } from '@models/Post';
import { User } from '@models/User';
import { useState, useEffect } from 'react';

interface IuseReactPostProps {
    type: Status;
}
export const useReactPost = (
    props: IuseReactPostProps
): [Post | undefined, boolean, (idPost: number) => Promise<void>] => {
    const { type } = props;
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<Post>();

    const fetchReactPost = async (idPost: number) => {
        setLoading(true);
        const dataUser = await Api.reactPost(idPost, type);
        setData(dataUser.data);
        setLoading(false);
    };

    return [data, loading, fetchReactPost];
};

