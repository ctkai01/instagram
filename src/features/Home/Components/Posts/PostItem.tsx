import * as React from 'react';
import styled from 'styled-components';
import { ActionReactPost } from './ActionReactPost';
import { ContentPost } from './ContentPost';
import { Header } from './Header';
import PhotoList from './PhotoList';

export interface IPostItemProps {
  urlImage: string;
  userName: string;
}

export default function PostItem (props: IPostItemProps) {
  const {urlImage, userName} = props;
  return (
    <Container>
        <Header urlImage={urlImage} userName={userName}/>
        <PhotoList />
        <ActionReactPost/>
        <ContentPost/>
    </Container>
  );
}

const Container = styled.div`
    background-color: #fff;
    margin-bottom: 24px;
`
