import * as Yup from 'yup';
import { Login, SignIn } from '@models/index';

export const schemaLogin: Yup.SchemaOf<Login> = Yup.object().shape({
    account: Yup.string()
        .required('Account is required!')
        .max(50, 'Account is greater than 50 characters')
        .min(5, 'Account is less than 5 characters'),
    password: Yup.string()
        .required('Password is required!')
        .max(32, 'Password is greater than 32 characters')
        .min(8, 'Password is lowest than 8 characters'),
});

export const schemaRegister: Yup.SchemaOf<SignIn> = Yup.object().shape({
    account: Yup.string()
        .required('Account is required!')
        .max(50, 'Account is greater than 50 characters')
        .min(5, 'Account is less than 5 characters'),
    full_name: Yup.string()
        .required('Full name is required!')
        .max(20, 'Full name is greater than 20 characters')
        .min(8, 'Full name is less than 8 characters'),
    user_name: Yup.string()
        .required('User name is required!')
        .max(32, 'User name is greater than 32 characters')
        .min(8, 'User name is less than 8 characters'),
    password: Yup.string()
        .required('Password is required!')
        .max(32, 'Password is greater than 32 characters')
        .min(8, 'Password is lowest than 8 characters'),
});
