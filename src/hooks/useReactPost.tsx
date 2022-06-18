import { Api } from '@api/authApi';
import { Status } from '@constants/status';
import { TypeFollow } from '@constants/type-follow';
import { User } from '@models/User';
import { useState, useEffect } from 'react';

interface IuseReactPostProps {
    type: Status;
}
export const useReactPost = (
    props: IuseReactPostProps
): [User | undefined, boolean, (idUser: number) => Promise<void>] => {
    const { type } = props;
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<User>();

    const fetchFollowUser = async (idUser: number) => {
        setLoading(true);
        // const dataUser = await Api.followUser(idUser, {
        //     type,
        // });
        // console.log('Data', dataUser.data)
        // setData(dataUser.data);
        setLoading(false);
    };
    // useEffect(() => {
    //     fetchFollowUser();
    // }, []);
    return [data, loading, fetchFollowUser];
};

//  useFollow
