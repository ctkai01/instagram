import { Api } from '@api/authApi';
import { TypeFollowUser } from '@constants/type-follow';
import { User } from '@models/User';
import { useState } from 'react';

interface IuseFollowUserProps {
    type: TypeFollowUser;
}

export interface FollowUser {
    currentPage: number;
    lastPage: number;
    data: User[];
}

export const useFollowUser = (props: IuseFollowUserProps): [FollowUser | undefined, boolean, (idUser: number, page?: number) => Promise<void>] => {
    const {type} = props;
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<FollowUser>();


    const fetchListFollowUser = async (idUser: number, page: number = 1) => {
        setLoading(true);
        let dataUser
        
        if (type === TypeFollowUser.FOLLOWER) {
            dataUser = await Api.userFollower(idUser, page);
        } else {
            dataUser = await Api.userFollowing(idUser, page);
        }

        setData({
            currentPage: dataUser.data.currentPage,
            data: dataUser.data.data,
            lastPage: dataUser.data.lastPage
        });
        setLoading(false);
    };

    return [data, loading, fetchListFollowUser];
};
