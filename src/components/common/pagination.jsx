import React from 'react';
import _ from 'lodash';

const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
    const pagesCount = Math.ceil(itemsCount / pageSize);
    if (pagesCount === 1) return null;
    const pages = _.range(1, pagesCount + 1);

    return (
        <>
            <ul className='pagination'>
                {pages.map(p => (
                    <li key={p} className={p === currentPage ? "page-item active" : "page-item"}><a href="#" className="page-link" onClick={() => onPageChange(p)}>{p}</a></li>

                ))}
            </ul>
        </>
    );
}

export default Pagination;