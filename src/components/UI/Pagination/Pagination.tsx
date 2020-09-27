import React, { FC, useState } from "react"
import cn from "classnames"
import s from "./Pagination.module.scss"

type TProps = {
  total: number
  pageSize: number
  currentPage: number
  onPageChange: (page: number) => void
}

const Pagination: FC<TProps> = ({
  total,
  pageSize,
  currentPage,
  onPageChange,
}) => {
  let pagesCount = Math.ceil(total / pageSize)
  let paginationNumbers: number[] = []
  for (let i = 1; i <= pagesCount; i++) {
    paginationNumbers.push(i)
  }

  let portionsCount = Math.ceil(pagesCount / pageSize)
  let [activePortion, setActivePortion] = useState(
    Math.ceil(currentPage / pageSize)
  )
  let leftBound = (activePortion - 1) * pageSize + 1
  let rightBound = activePortion * pageSize

  return paginationNumbers.length ? (
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
              className={cn(s.item, { [s.selected]: currentPage === number })}
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
  ) : null
}

export default Pagination
