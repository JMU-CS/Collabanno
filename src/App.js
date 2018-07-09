import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import {
  BrowserRouter, Route, Link
} from 'react-router-dom';
import PDFComponent from './annotatorFiles/Annotate';
import PDFSearchComponent from './PDFSearchComponent';
//import PDFJS from 'pdfjs-dist';
//import { Document, Page } from 'react-pdf';

import {
  PdfLoader,
  PdfAnnotator,
  Tip,
  Highlight,
  Popup,
  AreaHighlight
} from "react-pdf-annotator";

const ENDPOINT_ADDRESS = "localhost:8000"

let DEFAULT = "./Mypdf.pdf";

const RouterComponent = () => (
  <BrowserRouter>
    <div className="container">
      <Route exact path="/" component={PDFSearchComponent}></Route>
      <Route path="/pdf/:input" component={App}></Route>
      <Link to={{
        pathname: '/pdf/canon.pdf',
        state: { pdf: "./canon.pdf" }
      }}>Canon PDF</Link>
      <Link to={{
        pathname: '/pdf/Mypdf.pdf',
        state: { pdf: "./Mypdf.pdf" }
      }}>Research</Link>
    </div>
  </BrowserRouter>
);

class App extends Component {

  constructor({ match }) {
    super();
    let pdf = DEFAULT;
    console.log(window.location.href);
    const FILE_PREFIX = '/pdf/';
    if (window.location.href.includes(FILE_PREFIX)) {
      let pdfPathIndex = window.location.href.indexOf(FILE_PREFIX) + FILE_PREFIX.length
      if (window.location.href.substring(pdfPathIndex).includes("http://") ||
        window.location.href.substring(pdfPathIndex).includes("https://")) {
        pdf = '/proxy/' + window.location.href.substring(pdfPathIndex)
      } else {
        pdf = window.location.href.substring(pdfPathIndex)
      }
      console.log(pdf);
    }

    // let acutal = match.params.input;
    // if (acutal != undefined) {
    //   pdf = acutal;
    // }

    this.state = {
      endpoint: ENDPOINT_ADDRESS,
      VIEWER: document.getElementById('viewer'),
      color: 'white',
      socket: socketIOClient(ENDPOINT_ADDRESS),
      pdf: pdf
    };
  }

  // sending sockets
  send = () => {
    this.state.socket.emit('change color', this.state.color) // change 'red' to this.state.color
  }

  ///

  // adding the function
  setColor = (color) => {
    this.setState({ color })
  }

  render() {
    // testing for socket connections
    let { pdf } = this.state
    const socket = this.state.socket;//socketIOClient(this.state.endpoint);

    socket.on('change color', (col) => {
      document.body.style.backgroundColor = col
    });
    console.log(this.state.pdf)
    console.log(pdf)
    return (
      <div style={{ textAlign: "center" }}>
        <PDFComponent socket={socket} pdf={pdf} />

      </div>
    )
  }
}
export default RouterComponent;