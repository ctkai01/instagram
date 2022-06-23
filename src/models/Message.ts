import { Status } from '@constants/status';
import { Post } from './Post';
import { User } from './User';

export interface Message {
    id: number;
    user: User;
    message: string
}

