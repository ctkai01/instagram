import Loading from '@components/common/Loading';
import { yupResolver } from '@hookform/resolvers/yup';
import { SignIn } from '@models/Auth';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { PATH_BASE } from '@routes/index';
import { schemaRegister } from '@validations/account';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { FormContainer } from '.';
import { authActions, selectError, selectIsLoading } from '../authSlice';
import { AskAuth } from '../Components/AskAuth';
import { Footer } from '../Components/Footer';
import FormRegister from '../Components/FormRegister';
import GetAppDownload from '../Components/GetAppDownload';

export interface IRegisterProps {}

export function Register(props: IRegisterProps) {
    const dispatch = useAppDispatch();
    const form = useForm<SignIn>({
        defaultValues: {
            account: '',
            password: '',
            full_name: '',
            user_name: '',
        },
        resolver: yupResolver(schemaRegister),
        mode: 'all',
        reValidateMode: 'onChange',
    });
    const isLoading = useAppSelector(selectIsLoading)
    const error = useAppSelector(selectError)
    
    const handleRegister = (values: SignIn) => {
        dispatch(authActions.register(values));
    };
    return (
        <>
        {isLoading ? <Loading/> : null}
        <Container>
            <WrapperAuth>
                <FormContainer>
                    <FormRegister error={error} form={form} onRegister={handleRegister} />
                    <AskAuth text="Have an account?" path={PATH_BASE} textLink="Log in" />
                    <GetAppDownload />
                </FormContainer>
            </WrapperAuth>
            <Footer />
        </Container>
        </>
    );
}
const Container = styled.div``;

const WrapperAuth = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fafafa;
    margin: 0 auto;
    margin-top: 32px;
`;
