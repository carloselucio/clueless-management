import React from "react";
import { useEffect, useState } from 'react';
import {BsFillCaretLeftFill, BsFillCaretRightFill} from "react-icons/bs";

const Pagination = ({jobsPerPage, totalJobs, paginate}) => {
    let [cur, setCur] = useState(1)

    const pageNumbers = [];

    for (let i=1; i<= Math.ceil(totalJobs/jobsPerPage); i++) {
        pageNumbers.push(i);
    }

    const movePages = (page) => {
        paginate(page);
        setCur(page);
    }
    
    return (
        <>
            <nav className="bg-white px-6 pr-7 py-1 rounded-md shadow-md">
                <ul className="inline-flex justify-center">
                    <li onClick={() => cur===1 ? movePages(cur) : movePages(cur-1)} className="bg-gray-100 px-5 m-1 rounded-md text-gray-600 text-sm font-bold hover:bg-gray-200 flex items-center page-control"><BsFillCaretLeftFill/></li>
                    {pageNumbers.map(number => (
                        <li onClick={() => movePages(number)} key={number} className={`bg-gray-100 m-1 rounded-md text-gray-600 text-sm font-bold hover:bg-gray-200 page-item border-2 border-gray-100 ${cur === number && 'border-gray-400'}`}>
                            <a href='#' className="px-5 rounded-md">
                            {number}
                            </a>
                        </li>
                    ))}
                    <li onClick={() => cur<pageNumbers.length ? movePages(cur+1) : movePages(cur)} className="bg-gray-100 px-5 m-1 rounded-md text-gray-600 text-sm font-bold hover:bg-gray-200 flex items-center page-control"><BsFillCaretRightFill/></li>
                </ul>
            </nav>
        </>
    )
}

export default Pagination

// className={`bg-gray-100 px-5 m-1 rounded-md text-gray-600 text-sm font-bold hover:bg-gray-200 page-item ${cur === number && 'border-2'}`}

// className="bg-gray-100 px-5 m-1 rounded-md text-gray-600 text-sm font-bold hover:bg-gray-200 page-item"