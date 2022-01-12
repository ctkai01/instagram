import Loading from '@components/common/Loading';
import { yupResolver } from '@hookform/resolvers/yup';
import { Login as ILogin } from '@models/index';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { PATH_REGISTER } from '@routes/index';
import { schemaLogin } from '@validations/index';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { authActions, selectError, selectIsLoading } from '../authSlice';
import { AskAuth } from '../Components/AskAuth';
import { Footer } from '../Components/Footer';
import { FormAuth } from '../Components/FormAuth';
import GetAppDownload from '../Components/GetAppDownload';
import { SlideShow } from '../Components/SlideShow';

export interface IAppProps {}

export function Login(props: IAppProps) {
    const form = useForm<ILogin>({
        defaultValues: {
            account: '',
            password: '',
        },
        resolver: yupResolver(schemaLogin),
        mode: 'all',
        reValidateMode: 'onChange',
    });
    const dispatch = useAppDispatch();

    const handleLogin = (values: ILogin): void => {
        console.log(values);
        dispatch(authActions.login(values));
    };

    const isLoading = useAppSelector(selectIsLoading);
    const error = useAppSelector(selectError);
    // const isLoading =true;

    return (
        <>
            {isLoading ? <Loading/> : null}
            <Container>
                <WrapperAuth>
                    <SlideShow />
                    <FormContainer>
                        <FormAuth form={form} onLogin={handleLogin} error={error}/>
                        <AskAuth
                            text="Don\n't have an account?"
                            path={PATH_REGISTER}
                            textLink="Sign up"
                        />
                        <GetAppDownload />
                    </FormContainer>
                </WrapperAuth>
                <Footer />
            </Container>
        </>
    );
}

const Container = styled.div``;

const WrapperAuth = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fafafa;
    margin: 0 auto;
    margin-top: 32px;
`;

export const FormContainer = styled.div``;
