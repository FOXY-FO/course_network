import React from "react"
import cs from "classnames"
import s from "./Pagination.module.scss"

const Pagination = ({ total, pageSize, currentPage, onPageChange }) => {
  let pagesCount = Math.ceil(total / pageSize)
  let paginationNumbers = []
  for (let i = 1; i <= pagesCount; i++) {
    paginationNumbers.push(i)
  }

  return (
    paginationNumbers.length && (
      <div className={s.pagination}>
        {paginationNumbers.map((number) => (
          <div key={number} className={s.itemWrapper}>
            <button
              className={cs(s.item, { [s.selected]: currentPage === number })}
              onClick={() => onPageChange(number)}
            >
              {number}
            </button>
          </div>
        ))}
      </div>
    )
  )
}

export default Pagination
