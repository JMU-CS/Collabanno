import React, { Component }from 'react';
import PDFComponent from './components/annotatorFiles/Annotate';
import socketIOClient from "socket.io-client";

const ENDPOINT_ADDRESS = "localhost:8000"

let DEFAULT = "./Mypdf.pdf";


export default class App extends Component {

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