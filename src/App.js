import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import PDFComponent from './Annotate'
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



class App extends Component {
  

  constructor() {
    super();

    this.state = {
      endpoint: ENDPOINT_ADDRESS,
      VIEWER:  document.getElementById('viewer'),
      color: 'white',
      socket: socketIOClient(ENDPOINT_ADDRESS)

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

  ///

  render() {
    // testing for socket connections

    const socket = socketIOClient(this.state.endpoint);
    socket.on('change color', (col) => {
      document.body.style.backgroundColor = col
    })

    return (
      <div style={{ textAlign: "center" }}>
        <button onClick={() => this.send()}>Change Color</button>

        // adding the two buttons, also, remove all of the comments in the JSX section.
        <button id="blue" onClick={() => this.setColor('blue')}>Blue</button>
        <button id="red" onClick={() => this.setColor('red')}>Red</button>

        <PDFComponent />


      </div>
    )
  }
}
export default App;