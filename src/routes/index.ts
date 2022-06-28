import { IRoute } from '@models/index';
import { Login, Register } from '@features/Auth/Pages';
import { Home } from '@features/Home/Pages';
import { Wall } from '@features/User/Pages';
import MainMessage from '@features/Chat/Pages/MainMessage';
import Story from '@features/Home/Pages/Story';
import SettingAccount from '@features/Setting/Pages/SettingAccount';

export const PATH_BASE = '/';
export const PATH_REGISTER = '/accounts/emailsignup/';
export const PATH_PERSON_ACCOUNT = '/:user_name';
export const PATH_MESSAGE_LIST = '/message/me';
export const PATH_MESSAGE_DIRECT_LIST = '/message/:user_name';
export const PATH_STORY_LIST = '/stories/:user_name';
export const PATH_ACCOUNT_SETTING = '/accounts/edit/';
export const PATH_ACCOUNT_PASSWORD_SETTING = '/accounts/password/change/';


// export const PATH_TAGGED_PERSON_ACCOUNT = '/:user_name/tagged';
export const authPath = [PATH_BASE, PATH_REGISTER];

export const appPath = [PATH_BASE, PATH_PERSON_ACCOUNT, PATH_MESSAGE_LIST, PATH_STORY_LIST, PATH_ACCOUNT_SETTING];

export const routeAuth: IRoute[] = [
    { path: PATH_BASE, component: Login, exact: true },
    { path: PATH_REGISTER, component: Register, exact: true },
];

export const routeApp: IRoute[] = [
    { path: PATH_BASE, component: Home, exact: true },
    {
        path: PATH_MESSAGE_LIST,
        component: MainMessage,
        exact: true,
    },
    {
        path: PATH_ACCOUNT_SETTING,
        component: SettingAccount,
        exact: true,
    },
    {
        path: PATH_ACCOUNT_PASSWORD_SETTING,
        component: SettingAccount,
        exact: true,
    },

    {
        path: PATH_MESSAGE_DIRECT_LIST,
        component: MainMessage,
        exact: true,
    },
    {
        path: PATH_PERSON_ACCOUNT,
        component: Wall,
        exact: true,
    },
    {
        path: PATH_STORY_LIST,
        component: Story,
        exact: true,
    },


  
    // {
    //     path: PATH_TAGGED_PERSON_ACCOUNT,
    //     component: Wall,
    //     exact: true,
    // },
];
