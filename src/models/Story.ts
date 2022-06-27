import { ActiveStatus } from '@constants/active-status';
import { Conversation } from './Conversation';
import { User } from './User';

export interface Story {
    id: number;
    media: string;
    typeMedia: number;
    text_json?: TextJson;
    is_view: ActiveStatus
    updated_at?: string;
    created_at: string;
}

export interface TextJson {
    font: string,
    text?: string;
    color?: string;
    bg?: string;
}

export enum ViewStory {
    NONE,
    SEE,
    SAW
}