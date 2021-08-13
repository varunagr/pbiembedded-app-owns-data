import React from 'react';
import logo from './logo.svg';
import { Header } from './Header';
import { HomePage } from './HomePage';
import { fontFamily, fontSize, gray2 } from './Styles';
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
const App: React.FC = () => {
  return (
    <div 
      css={css`
      font-family: ${fontFamily};
      font-size: ${fontSize};
      color: ${gray2};
    `}
    >
      <Header />
      <HomePage />
    </div>
  );
};

export default App;
