import React, { Component } from "react";
import {
  BrowserRouter, Route, Link
} from 'react-router-dom';
import PDFSearchComponent from './components/PDFSearchComponent';
import App from './components/App'


const RouterComponent = () => (
  <BrowserRouter>
    <div className="container">
      <Route exact path="/" component={PDFSearchComponent}></Route>
      <Route path="/pdf/:input" component={App}></Route>
    </div>
  </BrowserRouter>
);


export default RouterComponent;