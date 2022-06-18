import { InputCommon, LoginWithFB } from '@components/common';
import { makeStyles, Paper, Typography } from '@material-ui/core';
import { useCallback, useEffect, useState } from 'react';
import { UseFormMethods } from 'react-hook-form';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { InstagramTitle } from './InstagramTitle';

export interface IFormRegisterProps {
    form: UseFormMethods<any>;
    onRegister: any;
    error: string | string[];
}

const useStyles = makeStyles((theme) => {
    return {
        input: {
            marginBottom: '6px',

            '& input': {
                fontSize: '14px',
                minWidth: '250px',
            },
        },
    };
});

export default function FormRegister(props: IFormRegisterProps) {
    const [activeButtonRegister, setActiveButtonRegister] = useState<boolean>(false);
    const classes = useStyles();

    const { form, onRegister, error } = props;

    const { errors, dirtyFields } = form.formState
    useEffect(() => {
        // console.log(1)
        // if (
        //     !Object.keys(errors).length &&
        //     dirtyFields.password &&
        //     dirtyFields.account &&
        //     dirtyFields.full_name &&
        //     dirtyFields.user_name &&
        //     form.getValues('password').length >=8 &&
        //     form.getValues('account').length > 1 &&
        //     form.getValues('full_name').length >= 1 &&
        //     form.getValues('user_name').length > 1
        // ) {
        //     setActiveButtonRegister(true);
        // } else {
        //     setActiveButtonRegister(false);
        // }
    }, [form, dirtyFields, errors]); 
    console.log(errors)
    return (
        <Container elevation={0}>
            <InstagramTitle />
            <Typography component="h2" className="title-header">
                Sign up to see photos and videos from your friends.
            </Typography>
            <LoginWithFB text="Log in with Facebook" className="login-fb" colorIcon="#fff" />
            <div className="line-wrapper">
                <div className="line"></div>
                <div className="line_text">OR</div>
                <div className="line"></div>
            </div>
            <Form onSubmit={form.handleSubmit(onRegister)}>
                <InputCommon
                    className={classes.input}
                    name="account"
                    form={form}
                    type="text"
                    labelInput="Mobile Number or Email"
                />
                <InputCommon
                    className={classes.input}
                    name="full_name"
                    form={form}
                    type="text"
                    labelInput="Full Name"
                />
                <InputCommon
                    className={classes.input}
                    name="user_name"
                    form={form}
                    type="text"
                    labelInput="Username"
                />
                <InputCommon
                    className={classes.input}
                    name="password"
                    form={form}
                    type="password"
                    labelInput="Password"
                />
                <button
                    className={`buttonRegister active`}
                    // className={`buttonRegister ${activeButtonRegister ? 'active' : ''}`}
                    type="submit"
                    // disabled={!activeButtonRegister}
                >
                    Sign up
                </button>
            </Form>
            <div className="error-general">{!Array.isArray(error) && error ? error : ''}</div>
            <Typography component="h2" className="term-text">
                By signing up, you agree to our <Link to="terms">Terms</Link> ,{' '}
                <Link to="data-policy">Data Policy</Link> and{' '}
                <Link to="cookies-policy">Cookies Policy</Link> .
            </Typography>
        </Container>
    );
}

const Container = styled(Paper)`
    padding: 0 40px 25px 40px;
    border: 1px solid rgba(var(--b6a, 219, 219, 219), 1);
    border-radius: 1px;
    margin-bottom: 10px;

    .title-header {
        color: #8e8e8e;
        margin-bottom: 10;
        font-weight: 600;
        font-size: 17px;
        text-align: center;
        max-width: 326px;
        margin-bottom: 15px;
    }

    .error-general {
        color: red;
        text-align: center;
        margin-top: 15px;
    }

    .term-text {
        margin-top: 20px;
        color: #8e8e8e;
        max-width: 326px;
        text-align: center;
        font-size: 14px;

        a {
            color: inherit;
            font-weight: 600;
            text-decoration: none;
        }
    }

    .buttonRegister {
        margin-top: 10px;
        background-color: #b2dffc;
        color: #fff;
        padding: 8px;
        border: none;
        border-radius: 6px;
        font-weight: 600;
        font-size: 14px;

        &.active {
            background-color: #0095f6;
            cursor: pointer;
        }
    }

    .login-fb {
        background-color: #0095f6;
        padding: 5px 0;
        border-radius: 5px;
        color: #fff;
    }

    .line-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 15px;
        margin-bottom: 18px;

        & .line {
            background-color: rgba(var(--b6a, 219, 219, 219), 1);
            height: 1px;
            flex: 1;
        }

        & .line_text {
            flex-shrink: 0;
            font-size: 13px;
            font-weight: 600;
            line-height: 15px;
            margin: 0 18px;
            text-transform: uppercase;
        }
    }
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;
