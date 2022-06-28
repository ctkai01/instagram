import { authActions, selectIsLoading, selectUserAuth } from '@features/Auth/authSlice';
import { yupResolver } from '@hookform/resolvers/yup';
import { UpdateProfile } from '@models/Auth';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { schemaUpdateProfile } from '@validations/account';
import { Avatar, Button, InputCommon } from '@components/common';
import { MenuItem, Select } from '@material-ui/core';
import ReactHookFormSelect from '@components/common/ReactHookFormSelect';
import LoadingWhite from '@components/common/LoadingWhite';

export interface IContentSettingProfileProps {}

export default function ContentSettingProfile(props: IContentSettingProfileProps) {
    const userAuth = useAppSelector(selectUserAuth);
    const refInput = React.useRef<HTMLInputElement>(null);
    const dispatch = useAppDispatch();
    const loadingUpdate = useAppSelector(selectIsLoading);

    const form = useForm<UpdateProfile>({
        defaultValues: {
            bio: userAuth.bio,
            name: userAuth.name,
            user_name: userAuth.user_name,
            website: userAuth.website,
            email: userAuth.email,
            phone: userAuth.phone,
        },
        resolver: yupResolver(schemaUpdateProfile),
        mode: 'all',
        reValidateMode: 'onChange',
    });

    const handleClickPhoto = () => {
        if (refInput.current) {
            console.log('11', refInput);
            refInput.current.click();
        }
        console.log('111');
    };

    const onUpdateProfile = (values: UpdateProfile) => {
        dispatch(authActions.updateProfile(values));
    };

    const handleUpdateAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            console.log(e.target.files[0]);
            const formdData = new FormData();
            formdData.append('file', e.target.files[0]);
            dispatch(authActions.updateAvatar(formdData));
        }
    };
    return (
        <Container>
            <div className="section-photo">
                {loadingUpdate ? (
                    <LoadingWhite className="avatar" />
                ) : (
                    <Avatar
                        className="avatar"
                        url={userAuth.avatar}
                        border="none"
                        size="medium_center"
                    />
                )}
                <div className="info">
                    <div className="username">{userAuth.user_name}</div>
                    <div onClick={handleClickPhoto} className="btn-change-photo">
                        Change Profile Photo
                    </div>
                    <form className="form-photo">
                        <input
                            onChange={handleUpdateAvatar}
                            type="file"
                            ref={refInput}
                            accept="image/jpeg,image/png"
                            className="input-photo"
                        />
                    </form>
                </div>
            </div>
            <form onSubmit={form.handleSubmit(onUpdateProfile)} className="form-submit-profile">
                <div className="section-name">
                    <div className="label">Name</div>
                    <InputCommon name="name" form={form} type="text" labelInput="Name" />
                </div>
                <div className="section-name">
                    <div className="label">Username</div>
                    <InputCommon
                        disabled={true}
                        name="user_name"
                        form={form}
                        type="text"
                        labelInput="Name"
                    />
                </div>
                <div className="section-name">
                    <div className="label">Website</div>
                    <InputCommon name="website" form={form} type="text" labelInput="Name" />
                </div>
                <div className="section-name">
                    <div className="label">Bio</div>
                    <InputCommon name="bio" form={form} type="text" labelInput="Name" />
                </div>
                <div className="section-name">
                    <div className="label">Email</div>
                    <InputCommon
                        name="email"
                        disabled={true}
                        form={form}
                        type="text"
                        labelInput="Name"
                    />
                </div>
                <div className="section-name">
                    <div className="label">Phone Number</div>
                    <InputCommon
                        disabled={true}
                        name="phone"
                        form={form}
                        type="text"
                        labelInput="Name"
                    />
                </div>
                <div className="section-name">
                    <div className="label"></div>

                    <Button>{loadingUpdate ? <LoadingWhite /> : 'Submit'}</Button>
                </div>
            </form>
        </Container>
    );
}

const Container = styled.div`
    .form-submit-profile {
        margin-bottom: 16px;
        margin-top: 16px;
    }

    .gender-input {
        width: 230px;
    }
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
        .avatar {
            margin: 2px 32px 0 124px;
        }

        .username {
            margin: 0;
            margin-bottom: 2px;
            line-height: 22px;
            font-size: 20px;
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
