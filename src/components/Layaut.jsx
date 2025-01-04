// components/Layout.js
import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';
import GlobalStyles from './GlobalStyles';

const LayoutContainer = styled.div`
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9));
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Content = styled.main`
  flex: 1;
  align-self: center;
  width: 100%;
`;

const Layaut = ({ children }) => {
  return (
    <LayoutContainer>
      <GlobalStyles/>
      <Header/>
      <Content>{children}</Content>
      <Footer/>
    </LayoutContainer>
  );
};

export default Layaut;
