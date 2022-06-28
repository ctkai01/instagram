import { Grid } from '@mui/material';
import { PATH_ACCOUNT_SETTING } from '@routes/index';
import * as React from 'react';
import { useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import ContentSetting from '../Components/ContentSetting';
import SidebarSetting from '../Components/SideBarSetting';

export interface ISettingAccountProps {
}

export default function SettingAccount (props: ISettingAccountProps) {
    let matchSettingAccount = useRouteMatch(PATH_ACCOUNT_SETTING);

  return (
    <Container
            container
            // justifyContent={!checkShowSuggestion ? 'space-between' : 'center'}
            style={{ paddingTop: '30px', borderRadius: '6px' }}
        >
            <Grid item lg={3}>
                <SidebarSetting matchSettingAccount={matchSettingAccount}/>
            </Grid>
            <Grid item lg={9}>
                <ContentSetting matchSettingAccount={matchSettingAccount}/>
            </Grid>
        </Container>
  );
}

const Container = styled(Grid)`
    /* border-radius: 6px; */
    /* background-color: #fff; */
`;
