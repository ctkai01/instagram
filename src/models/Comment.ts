import { Status } from '@constants/status';
import { ActiveStatus } from './commom';
import { Media } from './Media';
import { Post } from './Post';
import { User } from './User';

export interface Comment {
    id: number;
    content: string;
    created_by: User;
    parent_id: number | null;
    post: Post;
    childComments: Comment[];
    like_count: number;
    is_like: Status;
    created_at: string;
    updated_at: string;
}

export interface CreateComment {
    content: string,
    parent_id?: number 
}