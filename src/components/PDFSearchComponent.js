import React, { useState } from 'react';
import { useHistory } from "react-router-dom";


export default function PDFSearchComponent() {
    const [pdf, setPdfDoc] = useState('');
    let history = useHistory();


    function handleSearch(e) {
        e.preventDefault();
        history.push("/pdf/" + pdf);
        console.log(pdf)
    }

    return (
        <div>
            <h1>Collabanno</h1>
            <form onSubmit={handleSearch}>
                <input type="text" name="option" onChange={(e) => setPdfDoc(e.target.value)} />
                <button>Search</button>
            </form>
        </div>
    );

}