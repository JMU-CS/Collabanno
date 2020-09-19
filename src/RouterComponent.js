import React from "react";
import {
  BrowserRouter, Route, Link
} from 'react-router-dom';
import PDFSearchComponent from './components/PDFSearchComponent/PDFSearchComponent';
import App from './App';
import LandingPage from './containers/LandingPage';



const RouterComponent = () => (

  <BrowserRouter>
    <div className="container">
      <Route exact path="/" component={LandingPage}></Route>
      <Route path="/pdf/:input" component={App}></Route>
    </div>
  </BrowserRouter>
);


export default RouterComponent;