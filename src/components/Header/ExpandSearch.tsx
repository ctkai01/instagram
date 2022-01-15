import { Arrow, Modal } from '@components/common';
import { Paper } from '@material-ui/core';
import * as React from 'react';
import styled from 'styled-components';

export interface IExpandSearchProps {
  showRecentSearch: boolean
  handleOutsideSearch: () => void
}

export function ExpandSearch(props: IExpandSearchProps) {
  const { showRecentSearch, handleOutsideSearch } = props  
  return (
        <Container>
            <Paper className="recent-search" elevation={4}>
                <div className="content">
                    <div>Recent2</div>
                    <div>Recent3</div>
                </div>
                <Arrow position="center-top" />
            </Paper>
            <Modal showModal={showRecentSearch} onCloseModal={handleOutsideSearch}/>
        </Container>
    );
}

const Container = styled.div`
  .recent-search {
        border-radius: 8px;
        position: absolute;
        width: 375px;
        top: 50px;
        transform: translateX(-50%);
        left: 50%;
        transform-style: preserve-3d;
        z-index: 99;
        .content {
            width: 100%;
            height: 100%;
            position: relative;
        }
    }
`;
