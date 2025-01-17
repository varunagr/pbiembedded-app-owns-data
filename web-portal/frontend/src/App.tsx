import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import logo from './logo.svg';
import { Header } from './Header';
import { HomePage } from './HomePage';
import { SignInPage } from "./SignInPage";
import { SignOutPage } from "./SignOutPage";
import { NotFoundPage } from "./NotFoundPage";
import { Dataset } from './Dataset';
import { fontFamily, fontSize, gray2 } from './Styles';
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { AuthProvider } from './Auth';

const App: React.FC = () => {
  return (
    <AuthProvider>
    <BrowserRouter>
      <div 
        css={css`
        font-family: ${fontFamily};
        font-size: ${fontSize};
        color: ${gray2};
      `}
      >
        <Header />
        <Switch>
          <Redirect from="/home" to="/" />
          <Route exact path="/" component={HomePage} />
          <Route path="/signin" render={() => <SignInPage action="signin" />} />
          <Route path="/signin-callback" render={() => <SignInPage action="signin-callback" />} />
          <Route path="/signout" render={() => <SignOutPage action="signout" />} />
          <Route path="/signout-callback" render={() => <SignOutPage action="signout-callback" />} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>    
  </BrowserRouter>
  </AuthProvider>
  );
};

export default App;
