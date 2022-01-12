import { InputCommon, LoginWithFB } from '@components/common';
import { makeStyles, Paper } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { UseFormMethods } from 'react-hook-form';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { InstagramTitle } from './InstagramTitle';

export interface IFormAuthProps {
    form: UseFormMethods<any>;
    onLogin: any;
    error: string;
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

export function FormAuth(props: IFormAuthProps) {
    const { form, onLogin, error } = props;
    const [activeButtonLogin, setActiveButtonLogin] = useState<boolean>(false);
    const classes = useStyles();
    const { errors, dirtyFields } = form.formState

    useEffect(() => {
        if (
            !Object.keys(errors).length &&
            dirtyFields.password &&
            dirtyFields.account &&
            form.getValues('password').length > 1 && 
            form.getValues('account').length > 1
        ) {
            setActiveButtonLogin(true);
        } else {
            setActiveButtonLogin(false);
        }
    }, [form, errors, dirtyFields])

    return (
        <Container elevation={0}>
            <InstagramTitle/>
            <Form onSubmit={form.handleSubmit(onLogin)}>
                <InputCommon
                    className={classes.input}
                    name="account"
                    form={form}
                    type="text"
                    labelInput="Phone number, username, or email"
                />
                <InputCommon
                    className={classes.input}
                    name="password"
                    form={form}
                    type="password"
                    labelInput="Password"
                />
                <button
                    className={`buttonLogin ${activeButtonLogin ? 'active' : ''}`}
                    type="submit"
                    disabled={!activeButtonLogin}
                >
                    Log In
                </button>
                <div className="line-wrapper">
                    <div className="line"></div>
                    <div className="line_text">OR</div>
                    <div className="line"></div>
                </div>
            </Form>
            <LoginWithFB text="Log in with Facebook" className="login-fb" />
            <div className='error-auth'>{error}</div>
            <Link to="s" className="forgot-password">
                Forgot password ?
            </Link>
        </Container>
    );
}

const Container = styled(Paper)`
    padding: 0 40px 25px 40px;
    border: 1px solid rgba(var(--b6a, 219, 219, 219), 1);
    border-radius: 1px;
    margin-bottom: 10px;

    .error-auth {
        color: red;
        margin-top: 10px;
        text-align: center;
    }
    .buttonLogin {
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

    .line-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 15px;

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

    .login-fb {
        margin-top: 30px;
    }

    .forgot-password {
        display: block;
        text-decoration: none;
        font-size: 14px;
        text-align: center;
        margin-top: 20px;
        color: #00376b;
    }
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;
