import React from 'react';


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
                <h1>Collabanno</h1>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.handleSearch}>
                    <input type="text" name="option" ref={(input) => this.input = input} />
                    <button>Search</button>
                </form>
            </div>
        );
    }
}