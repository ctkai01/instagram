import { TypeFollow } from '@constants/type-follow';
import { FollowStatus } from './commom';
import { Post } from './Post';
export interface User {
    id: number;
    name: string;
    email?: string;
    user_name: string;
    phone?: string;
    avatar: string;
    website?: string;
    bio?: string;
    gender?: string;
    posts?: Post[];
    is_tick?: boolean;
    status_notification?: string;
    status?: number;
    status_activity?: number;
    is_private?: number;
    is_following?: FollowStatus;
    count_follower?: number;
    count_following?: number;
    status_story?: number;
    followed_by?: string[];
    created_at?: string
    updated_at?: string
}

export interface FollowUser {
    type: TypeFollow
}