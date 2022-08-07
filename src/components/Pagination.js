import React from "react";
import { useState } from "react";

const Pagination = ({ postsPerPage, totalPosts, Paginate }) => {
    const pageNumber = []
    const [Active] = useState('page-item')

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumber.push(i)
    }

    return (
        <div className='PageNumbers'>
            <ul className='Pagination'>
                {pageNumber.map(number => (
                    <button onClick={() => Paginate(number)} key={number} className={Active}>
                        {number}</button>))}
            </ul>
        </div>

    )
}

export default Pagination;