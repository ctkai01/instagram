export const convertStringUsernameRelate = (relateUserName: string[]): string => {
    let nameUserRelate = '';

    if (relateUserName.length === 1 || relateUserName.length === 2) {
        relateUserName.forEach((username, index) => {
            if (index === relateUserName.length - 1) {
                nameUserRelate += `${username}`;
            } else {
                nameUserRelate += `${username}, `;
            }
        });
    } else if (relateUserName.length >= 3) {
        const countMore = relateUserName.length - 2;
        nameUserRelate = `${relateUserName[0]}, ${relateUserName[1]} + ${countMore} more`;
    }

    return nameUserRelate;
};

export const getUsernameFromString = (text: string): string[] => {
    // @ts-ignore: Object is possibly 'null'
    const usernames = text
        .match(/@[a-z0-9_]*/g)
        .map(function (x) {
            return x.replace('@', '');
        })
        .filter(function (x) {
            return !!x;
        });
    return usernames;
};
