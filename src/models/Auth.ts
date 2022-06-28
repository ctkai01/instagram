import { Gender } from "@constants/gender";

export interface Login {
    account: string;
    password: string;
}

export interface SignIn {
    account: string;
    full_name: string;
    user_name: string;
    password: string;
}

export interface UpdateProfile {
    website?: string | null;
    bio?: string | null;
    name: string;
    user_name: string;
    email?: string | null;
    phone?: string | null;
}

export interface ChangePassword {
   old_password: string;
   new_password: string;
   confirm_password: string;
}