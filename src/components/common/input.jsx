import React from 'react';

const Input = ({ name, label, value, type, error, onChange }) => {
    return (
        <>
            <div className="form-group">
                <label htmlFor="username" className='mt-3'>{label}</label>
                <input
                    id={name}
                    className='form-control'
                    type={type}
                    value={value}
                    name={name}
                    onChange={onChange}
                />
                {error && <div className="alert alert-danger small fw-semibold mt-1">{error}</div>}
            </div>
        </>
    );
}

export default Input;