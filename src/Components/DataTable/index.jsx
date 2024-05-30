import PropTypes from 'prop-types'
import React, { Suspense } from 'react'
import { Table } from 'react-bootstrap'
import { Loader } from '../Loader'
import { UpDownArrowIcon } from '../../Assets/SVGs'


const CustomPagination = React.lazy(() => import('../CustomPagination'))

function DataTable({
  children,
  columns,
  sortEvent,
  isLoading,
  totalRecord,
  pagination,
  checkbox,
  pageChangeEvent,
  label,
  ...rest
}) {
  return (
    <div className={`data-table ${rest.className}`}>
      <h2 className='label' style={{ textAlign: 'left' }}>{label}</h2>
      <Table className='table-borderless' responsive='xl'>
        <thead>
          <tr>
            {columns?.map((column, index) => {
              return (
                <th key={index}>
                  <span onClick={column?.isSort ? () => sortEvent(column) : null}>
                    {column.name} {column?.isSort && <UpDownArrowIcon />}
                  </span>
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {children !== "0" && children}
          {totalRecord < 1 && (
            <tr>
              <td colSpan={columns.length + (checkbox ? 2 : 1)} className=''>
                No Record Found
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      {isLoading && <Loader />}
      {pagination && (
        <Suspense fallback={<div />}>
          <CustomPagination
            currentPage={pagination.currentPage}
            totalCount={totalRecord}
            pageSize={pagination.pageSize}
            onPageChange={pageChangeEvent}
          />
        </Suspense>
      )}
    </div>
  )
}
DataTable.propTypes = {
  children: PropTypes.node,
  columns: PropTypes.array,
  sortEvent: PropTypes.func,
  isLoading: PropTypes.bool,
  pagination: PropTypes.object,
  totalRecord: PropTypes.number,
  pageChangeEvent: PropTypes.func,
  checkbox: PropTypes.bool,
  component: PropTypes.object,
  label: PropTypes.string
}
export default DataTable
