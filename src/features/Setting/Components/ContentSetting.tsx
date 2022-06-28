import * as React from 'react';
import { match } from 'react-router-dom';
import styled from 'styled-components';
import ContentSettingPassword from './ContentSettingPassword';
import ContentSettingProfile from './ContentSettingProfile';

export interface IContentSettingProps {
    matchSettingAccount: match<{}> | null;
}

export default function ContentSetting(props: IContentSettingProps) {
    const { matchSettingAccount } = props;
    return (
        <Container>
            {matchSettingAccount ? <ContentSettingProfile /> : <ContentSettingPassword />}
        </Container>
    );
}

const Container = styled.div``;
