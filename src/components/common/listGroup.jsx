import React from 'react';

const ListGroup = ({ items, textProperty, valueProperty, onGenreSelect, activeGenre }) => {
    return (
        <ul className="list-group">
            {items.map(item =>
                <li
                    key={item[valueProperty]}
                    style={{ cursor: 'pointer' }}
                    className={item === activeGenre ? "list-group-item py-3 active" : "list-group-item py-3"}
                    onClick={() => onGenreSelect(item)}
                >
                    {item[textProperty]}
                </li>
            )}
        </ul>
    );
};

ListGroup.defaultProps = {
    textProperty: "name",
    valueProperty: "_id"
};

export default ListGroup 