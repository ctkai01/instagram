import * as Yup from 'yup';
import { ChangePassword, Login, SignIn, UpdateProfile } from '@models/index';

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

export const schemaUpdateProfile: Yup.SchemaOf<UpdateProfile> = Yup.object().shape({
    name: Yup.string()
        .required('Full name is required!')
        .max(20, 'Full name is greater than 20 characters')
        .min(8, 'Full name is less than 8 characters'),
    user_name: Yup.string()
        .required('User name is required!')
        .max(32, 'User name is greater than 32 characters')
        .min(8, 'User name is less than 8 characters'),
    bio: Yup.string()
    
        .max(255, 'Bio is greater than 255 characters')
        .nullable()
        ,

    website: Yup.string()
        .max(255, 'Website is greater than 255 characters')
        .nullable()
        ,
    
    email: Yup.string().nullable(),
    phone: Yup.string().nullable()
});


export const schemaChangePassword: Yup.SchemaOf<ChangePassword> = Yup.object().shape({
    old_password: Yup.string()
    .required('Old password is required!')
    .max(32, 'Old password is greater than 32 characters')
    .min(8, 'Old password is lowest than 8 characters'),
    new_password: Yup.string()
    .required('New password is required!')
    .max(32, 'New password is greater than 32 characters')
    .min(8, 'New password is lowest than 8 characters'),
    confirm_password: Yup.string()
    .required('Confirm password is required!')
    .oneOf([Yup.ref('new_password'), null], 'Passwords must match')
});