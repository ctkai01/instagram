
export interface PaginationParams {
    _limit: number;
    _page: number;
    _total: number;
}

export interface ListResponseNoPagination<T> {
    data: T[];
}

export interface ListResponsePagination<T> {
    data: T[];
    count: number;
    nextPage: number | null;
    currentPage: number;
    prevPage: number;
    lastPage: number;
}

export interface ResponseAuthPagination<T> {
    data: AuthResponse<T>;
    message: string;
    statusCode: number;
}

export interface ResponseNoPagination<T> {
    data: T[];
    message: string;
    statusCode: number;
}

export interface ResponsePagination<T> {
    data: ListResponsePagination<T>;
    message: string;
    statusCode: number;
}


export interface ListParams {
    _page: number;
    _limit: number;
    _sort: string;
    _order: 'asc' | 'desc';
    
    [key: string]: any
}

export interface AuthResponse<T> {
    user: T,
    tokens: Tokens
}

export interface Tokens {
    access_token: string;
    refresh_token: string;
}

export interface ErrorResponse {
    response: Error
}

export interface Error {
    data: DataError
}

export interface DataError {
    message: string;
    statusCode: number;
}

export enum FollowStatus {
    UN_FOLLOW,
    FOLLOW,
    PENDING_FOLLOW,
}

export enum MediaType {
    image = 1,
    video = 2,
}

export enum ActiveStatus {
    NO_ACTIVE,
    ACTIVE,
}

// export List
  