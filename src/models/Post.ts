import { Status } from '@constants/status';
import { ActiveStatus } from './commom';
import { Media } from './Media';
import { User } from './User';

export interface Post {
    id: number;
    caption?: string;
    location?: string;
    created_by: User;
    is_off_comment?: ActiveStatus;
    is_hide_like_view?: ActiveStatus;
    media: Media[];
    like_count: number;
    is_like: Status;
    comment_count: number;
    created_at: string;
    updated_at: string;
}
