import React from 'react';
import socketIOClient from "socket.io-client";

const ENDPOINT_ADDRESS = "localhost:8000"
const socket = socketIOClient(ENDPOINT_ADDRESS);

export default class PDFSearchComponent extends React.Component {
    state = {
        error: undefined
    };
    handleSearch = (e) => {
        e.preventDefault();
        let pdf = this.input.value;
        this.props.history.push("/pdf/" + pdf);
        console.log(pdf)
    }

    render() {
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.handleSearch}>
                    <input type="text" name="option" ref={(input) => this.input = input} />
                    <button>Search</button>
                </form>
            </div>
        );
    }
}