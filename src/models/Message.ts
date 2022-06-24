import { Conversation } from './Conversation';
import { User } from './User';

export interface Message {
    id: number;
    user: User;
    message?: string;
    image?: string;
    conversation?: Conversation;

}

