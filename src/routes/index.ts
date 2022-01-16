import { IRoute } from '@models/index';
import { Login, Register } from '@features/Auth/Pages';
import { Home } from '@features/Home/Pages';

export const PATH_BASE = '/';
export const PATH_REGISTER = '/accounts/emailsignup/';

export const authPath = [PATH_BASE, PATH_REGISTER];

export const appPath = [PATH_BASE];

export const routeAuth: IRoute[] = [
    { path: PATH_BASE, component: Login, exact: true },
    { path: PATH_REGISTER, component: Register, exact: true },
];

export const routeApp: IRoute[] = [{ path: PATH_BASE, component: Home, exact: true }];
