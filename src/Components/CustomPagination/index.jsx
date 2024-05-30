import React from 'react'
import PropTypes from 'prop-types'
import { Pagination } from 'react-bootstrap'
import { usePagination, DOTS } from './usePagination'
import { LeftLongIcon, RightLogIcon } from '../../Assets/SVGs';


function CustomPagination({ className, currentPage, totalCount, pageSize, onPageChange }) {
  const siblingCount = 1
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  })

  if (currentPage < 0 || paginationRange && (paginationRange.length < 2)) {
    return null
  }

  const onNext = () => {
    onPageChange(currentPage + 1)
  }

  const onPrevious = () => {
    onPageChange(currentPage - 1)
  }
  const lastPage = paginationRange && paginationRange[paginationRange.length - 1]
  return (
    <Pagination className={className}>
      <Pagination.Prev onClick={onPrevious} disabled={currentPage === 1}>
        <LeftLongIcon />
      </Pagination.Prev>
      {paginationRange && paginationRange.map((page, index) => {
        if (page === DOTS) {
          return <Pagination.Ellipsis disabled key={index} />
        }
        return (
          <Pagination.Item key={index} active={page === currentPage} onClick={() => onPageChange(page)}>
            {page}
          </Pagination.Item>
        )
      })}
      <Pagination.Next onClick={onNext} disabled={currentPage === lastPage}>
        <RightLogIcon />
      </Pagination.Next>
    </Pagination>
  )
}
CustomPagination.propTypes = {
  className: PropTypes.string,
  currentPage: PropTypes.number,
  totalCount: PropTypes.number,
  pageSize: PropTypes.number,
  onPageChange: PropTypes.func
}
export default CustomPagination
