// @flow

import React, { Component } from "react";
import socketIOClient from "socket.io-client";


import URLSearchParams from "url-search-params";

import {
  PdfLoader,
  PdfAnnotator,
  Tip,
  Highlight,
  Popup,
  AreaHighlight
} from "react-pdf-annotator";

import testHighlights from "./test-highlights";

import Spinner from "./Spinner";
import Sidebar from "./Sidebar";

import type { T_Highlight, T_NewHighlight } from "./types";

import "./style/App.css";

type T_ManuscriptHighlight = T_Highlight;

type Props = {};

type State = {
  highlights: Array<T_ManuscriptHighlight>
};

const ENDPOINT_ADDRESS = "localhost:8000"
let socket;


const getNextId = () => String(Math.random()).slice(2);

const parseIdFromHash = () => window.location.hash.slice("#highlight-".length);

const resetHash = () => {
  window.location.hash = "";
};

const HighlightPopup = ({ comment }) =>
  comment.text ? (
    <div className="Highlight__popup">
      {comment.emoji} {comment.text}
    </div>
  ) : null;

let DEFAULT_URL = "./canon.pdf";

const searchParams = new URLSearchParams(window.location.search);
let url = searchParams.get("url") || DEFAULT_URL;

class PDFComponent extends Component<Props, State> {
  state = {
    highlights: testHighlights[url] ? [...testHighlights[url]] : [],
    pdf: ''
  };

  state: State;
  constructor(props) {
    super(props);
    url = this.props.pdf;
    console.log(url);
    console.log("Constructor PDFComponent");
    socket = this.props.socket;
    socket.emit("create", url);
    const { highlights } = this.state;
    socket.on('add highlight', (highlight) => {
      console.log('adding highlight from server',highlight)
      this.addHighlight(highlight);
    })
    socket.on('remove highlights', () => {
      console.log("Remove Highlight from the server");
      this.actualResetHighlights();
    })
    socket.on('syncup', highlights => {
      console.log('got syncup message from server', highlights)
      highlights.forEach(highlight => this.addHighlight(highlight))
    })
  }

  resetHighlights = () => {
    this.actualResetHighlights();
    socket.emit('remove highlights', {
      room: url
    });
  };

  actualResetHighlights = () => {
    this.setState({
      highlights: []
    });
  }
  componentWillReceiveProps(nextProps) {
    console.log("Updtate Every Time");
    url = nextProps.pdf;
    console.log(url)
    this.setState({ 
      pdf: nextProps.pdf
    });  
    socket.emit('pdf-url', this.state.pdf)
    console.log(this.state.pdf);
  }



  scrollViewerTo = (highlight: any) => {};

  scrollToHighlightFromHash = () => {
    const highlight = this.getHighlightById(parseIdFromHash());

    if (highlight) {
      this.scrollViewerTo(highlight);
    }
  };

  componentDidMount() {
    window.addEventListener(
      "hashchange",
      this.scrollToHighlightFromHash,
      false
    );
  }

  getHighlightById(id: string) {
    const { highlights } = this.state;

    return highlights.find(highlight => highlight.id === id);
  }

  addHighlight(highlight: T_NewHighlight) {
    const { highlights } = this.state;

    console.log("Saving highlight", highlight);

    this.setState({
      highlights: [{ ...highlight, id: getNextId() }, ...highlights]
    });  
  }

  send(highlight: T_NewHighlight) {
    this.addHighlight(highlight);
    console.log('send highlight to server', highlight)
    let room = url;
    socket.emit('add highlight', {
      highlight: highlight,
      room: room
    });
  }

  updateHighlight(highlightId: string, position: Object, content: Object) {
    console.log("Updating highlight", highlightId, position, content);

    this.setState({
      highlights: this.state.highlights.map(h => {
        return h.id === highlightId
          ? {
              ...h,
              position: { ...h.position, ...position },
              content: { ...h.content, ...content }
            }
          : h;
      })
    });
  }

  render() {
    const { highlights } = this.state;
    
    return (
      <div className="App" style={{ display: "flex", height: "100vh" }}>
        <Sidebar
          highlights={highlights}
          resetHighlights={this.resetHighlights}
        />
        <div
          style={{
            height: "100vh",
            width: "75vw",
            overflowY: "scroll",
            position: "relative"
          }}
        >
          <PdfLoader url={url} beforeLoad={<Spinner />}>
            {pdfDocument => (
              <PdfAnnotator
                pdfDocument={pdfDocument}
                enableAreaSelection={event => event.altKey}
                onScrollChange={resetHash}
                scrollRef={scrollTo => {
                  this.scrollViewerTo = scrollTo;

                  this.scrollToHighlightFromHash();
                }}
                url={url}
                onSelectionFinished={(
                  position,
                  content,
                  hideTipAndSelection,
                  transformSelection
                ) => (
                  <Tip
                    onOpen={transformSelection}
                    onConfirm={comment => {
                      this.send({ content, position, comment });

                      hideTipAndSelection();
                    }}
                  />
                )}
                highlightTransform={(
                  highlight,
                  index,
                  setTip,
                  hideTip,
                  viewportToScaled,
                  screenshot,
                  isScrolledTo
                ) => {
                  const isTextHighlight = !Boolean(
                    highlight.content && highlight.content.image
                  );

                  const component = isTextHighlight ? (
                    <Highlight
                      isScrolledTo={isScrolledTo}
                      position={highlight.position}
                      comment={highlight.comment}
                    />
                  ) : (
                    <AreaHighlight
                      highlight={highlight}
                      onChange={boundingRect => {
                        this.updateHighlight(
                          highlight.id,
                          { boundingRect: viewportToScaled(boundingRect) },
                          { image: screenshot(boundingRect) }
                        );
                      }}
                    />
                  );

                  return (
                    <Popup
                      popupContent={<HighlightPopup {...highlight} />}
                      onMouseOver={popupContent =>
                        setTip(highlight, highlight => popupContent)
                      }
                      onMouseOut={hideTip}
                      key={index}
                      children={component}
                    />
                  );
                }}
                highlights={highlights}
              />
            )}
          </PdfLoader>
        </div>
      </div>
    );
  }
}

export default PDFComponent;
