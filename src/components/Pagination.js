import React from "react";
import { useState } from "react";

const Pagination = ({ postsPerPage, totalPosts, Paginate }) => {
    const pageNumber = []
    const [Active, setActive] = useState(1)
    const [hover, setHover] = useState('')

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumber.push(i)
    }

    return (
        <div className='PageNumbers'>
            <ul className='Pagination'>
                {pageNumber.map(number => (
                    <button onClick={() => { Paginate(number); setActive(hover) }} onMouseOver={() => { setHover(number) }} key={number} className={Active === number ? 'page-item_active' : 'page-item'}>
                        {number}</button>))}
            </ul>
        </div>

    )
}

export default Pagination;