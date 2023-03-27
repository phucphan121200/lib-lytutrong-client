import React from 'react'
import "./loadingPage.css"

const LoadingPage = () => {
  return (
    <div className='body'>
        <div className='bookshelf-wrapper'>
            <ul className='books-list'>
                <li className='book-item first'></li>
                <li className='book-item second'></li>
                <li className='book-item third'></li>
                <li className='book-item fourth'></li>
                <li className='book-item fifth'></li>
                <li className='book-item sixth'></li>
            </ul>
            <div className='shelf'></div>
        </div>
    </div>
  )
}

export default LoadingPage