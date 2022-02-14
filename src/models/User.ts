import { FollowStatus } from './commom';
export interface User {
    id?: string;
    name: string;
    email?: string;
    user_name: string;
    phone?: string;
    avatar: string;
    website?: string;
    bio?: string;
    gender?: string;
    status_notification?: string;
    status?: number;
    status_activity?: number;
    is_private?: number;
    is_following?: FollowStatus;
    count_follower?: number;
    count_following?: number;
    status_story?: number;
    created_at?: string
    updated_at?: string
}