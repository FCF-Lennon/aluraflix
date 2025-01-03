// components/Layout.js
import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';
import GlobalStyles from './GlobalStyles';

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Content = styled.main`
  flex: 1;
  padding: 20px;
`;

const Layaut = ({ children }) => {
  return (
    <LayoutContainer>
      <GlobalStyles />
      <Header />
      <Content>{children}</Content>
      <Footer />
    </LayoutContainer>
  );
};

export default Layaut;
