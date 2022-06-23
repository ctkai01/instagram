import { Status } from '@constants/status';
import { Post } from './Post';
import { User } from './User';

export interface Conversation {
    id: number;
    users: User[];
}

