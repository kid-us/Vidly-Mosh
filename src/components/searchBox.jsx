import React from 'react';

const SearchBox = ({ value, onChange }) => {
    return (
        <div>
            <input
                type="search"
                name="search"
                className='form-control my-3'
                placeholder='Search...'
                value={value}
                onChange={e => onChange(e.currentTarget.value)}
            />
        </div>
    );
}

export default SearchBox;