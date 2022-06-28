import { Avatar, Button, InputCommon } from '@components/common';
import LoadingWhite from '@components/common/LoadingWhite';
import { authActions, selectIsLoading, selectUserAuth } from '@features/Auth/authSlice';
import { yupResolver } from '@hookform/resolvers/yup';
import { ChangePassword } from '@models/Auth';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { schemaChangePassword } from '@validations/account';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Api } from '@api/authApi';
export interface IContentSettingPasswordProps {}

export default function ContentSettingPassword(props: IContentSettingPasswordProps) {
  const [loadingChangePassword, setLoadingChangePassword] = React.useState(false)
    const userAuth = useAppSelector(selectUserAuth);

    const form = useForm<ChangePassword>({
        defaultValues: {
            old_password: '',
            new_password: '',
            confirm_password: '',
        },
        resolver: yupResolver(schemaChangePassword),
        mode: 'all',
        reValidateMode: 'onChange',
    });

    const onChangePassword = async (values: ChangePassword) => {
      try {
        setLoadingChangePassword(true)
        await Api.changePassword(values)
        setLoadingChangePassword(false)
        toast('Change Password successfully');
        form.reset()

      } catch (e) {
        toast('Password incorrect');
        form.reset()
        setLoadingChangePassword(false)

      }
    };

    return (
      <>
        <Container>
            <div className="section-photo">
                <Avatar
                    className="avatar"
                    url={userAuth.avatar}
                    border="none"
                    size="medium_center"
                />
                <div className="info">
                    <div className="username">{userAuth.user_name}</div>
                </div>
            </div>
            <form onSubmit={form.handleSubmit(onChangePassword)} className="form-submit-profile">
                <div className="section-name">
                    <div className="label">Old Password</div>
                    <InputCommon
                        name="old_password"
                        form={form}
                        type="password"
                        labelInput="Old Password"
                    />
                </div>
                <div className="section-name">
                    <div className="label">New Password</div>
                    <InputCommon
                        name="new_password"
                        form={form}
                        type="password"
                        labelInput="New Password"
                    />
                </div>
                <div className="section-name">
                    <div className="label">Confirm New Password</div>
                    <InputCommon
                        name="confirm_password"
                        form={form}
                        type="password"
                        labelInput="Confirm New Password"
                    />
                </div>

                <div className="section-name">
                    <div className="label"></div>

                    <Button>{loadingChangePassword ? <LoadingWhite /> : 'Change password'}</Button>
                </div>
            </form>
        </Container>
        <ToastContainer
        position="bottom-center"
        hideProgressBar
        theme="dark"
        closeButton={false}
        limit={1}
    />
        </>
    );
}

const Container = styled.div`
    .section-name {
        display: flex;
        margin-bottom: 25px;
        /* align-items: center; */
        .label {
            font-size: 16px;
            font-weight: 600;
            line-height: 18px;
            padding: 0 32px;
            color: #262626;
            flex: 0 0 194px;
            text-align: end;
        }
    }
    .section-photo {
        margin-top: 32px;
        display: flex;
        align-items: center;
        margin-bottom: 16px;
        .avatar {
            margin: 2px 32px 0 124px;
        }

        .username {
            margin: 0;
            margin-bottom: 2px;
            /* line-height: 22px; */
            font-size: 24px;
        }

        .btn-change-photo {
            color: #0095f6;
            cursor: pointer;
            font-size: 14px;
            font-weight: 600;
        }

        .info {
            position: relative;

            .form-photo {
                width: 0;
                height: 0;
                position: absolute;
                margin: 0;
                padding: 0;
                visibility: hidden;
            }
        }
    }
`;
