import React from 'react';
import './quotebox.css';

const QuoteBox = ({quote, author}) => {
    return (
        <div className="quote__container">
            <h2>Twój cytat</h2>
            <p className="quote">{quote ? quote : "Najpierw wylosuj"}</p>
            <hr/>
            <p className="author">{author}</p>
        </div>
    )
}

export default QuoteBox
