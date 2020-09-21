import React, { useState } from "react"
import cs from "classnames"
import s from "./Pagination.module.scss"

const Pagination = ({ total, pageSize, currentPage, onPageChange }) => {
  let pagesCount = Math.ceil(total / pageSize)
  let paginationNumbers = []
  for (let i = 1; i <= pagesCount; i++) {
    paginationNumbers.push(i)
  }

  let portionsCount = Math.ceil(pagesCount / pageSize)
  let [activePortion, setActivePortion] = useState(
    Math.ceil(currentPage / pageSize)
  )
  let leftBound = (activePortion - 1) * pageSize + 1
  let rightBound = activePortion * pageSize

  return (
    paginationNumbers.length && (
      <div className={s.pagination}>
        {activePortion > 1 && (
          <div className={s.itemWrapper}>
            <button
              className={s.item}
              onClick={() => setActivePortion((prev) => prev - 1)}
            >
              Prev
            </button>
          </div>
        )}

        {paginationNumbers
          .filter((num) => num >= leftBound && num <= rightBound)
          .map((number) => (
            <div key={number} className={s.itemWrapper}>
              <button
                className={cs(s.item, { [s.selected]: currentPage === number })}
                onClick={() => onPageChange(number)}
              >
                {number}
              </button>
            </div>
          ))}

        {activePortion < portionsCount && (
          <div className={s.itemWrapper}>
            <button
              className={s.item}
              onClick={() => setActivePortion((prev) => prev + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>
    )
  )
}

export default Pagination
