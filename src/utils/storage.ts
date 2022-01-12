export const lsStorage = (key: string) => {
    return {
        getItem() {
            //@ts-ignore
            return JSON.parse(window.localStorage.getItem(key)) || null;
        },
        removeItem() {
            window.localStorage.removeItem(key);
        },
        setItem(payload: any) {
            window.localStorage.setItem(key, JSON.stringify(payload));
        }
    };
};

export const ssStorage = (key: string) => {
    return {
        getItem() {
            //@ts-ignore
            return JSON.parse(window.sessionStorage.getItem(key)) || null;
        },
        removeItem() {
            window.sessionStorage.removeItem(key);
        },
        setItem(payload: any) {
            window.sessionStorage.setItem(key, JSON.stringify(payload));
        }
    };
};

export const lsTokenAuth = lsStorage("tokenAuth");
export const lsRefreshTokenAuth = lsStorage("tokenRefreshAuth");

// export const lsBookingReference = lsStorage("bookingReference");
export const ssPathname = ssStorage("pathname");
export const ssTokenAuth = ssStorage("tokenAuth");
// export const ssTokenAuth = ssStorage("tokenAuth");
export const ssTokenAuthShare = ssStorage("tokenAuthShare");
export const lsEmail = lsStorage("lsEmail");
// export const storageVersion = lsStorage("storageVersion");
