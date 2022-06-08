import { MediaType } from "./commom";

export interface Media {
    name: string;
    cover_name?: string;
    is_mute: string;
    tags_user: TagUser[];
    type: MediaType;
}

export interface TagUser {
    x: number;
    y: number;
    yPos: number;
    xPos: number;
    full_name: string;
    user_name: string;
}