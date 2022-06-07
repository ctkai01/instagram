import { ActiveStatus } from './commom';
import { Media } from './Media';
import { User } from './User';

export interface Post {
    id: number;
    caption?: string;
    location?: string;
    created_by: User;
    is_off_comment?: ActiveStatus;
    media: Media[];
    created_at: string;
    updated_at: string;
}