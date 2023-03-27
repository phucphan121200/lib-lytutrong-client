import React from 'react'

const Pagination = ({totalPost, postPerPage}) => {
    let page = []
    for (let i = 1; i <= Math.ceil(totalPost / postPerPage); i++) {
        page.push(i)
    }
    return (
        <div>
            {
                page.map((page, index) => {
                    return <button key={index}>{page}</button>
                })
            }
        </div>
    )
}

export default Pagination