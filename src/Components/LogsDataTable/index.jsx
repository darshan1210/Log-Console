import React, { useEffect, useMemo, useState } from 'react'
import DataTable from '../DataTable'
import PropTypes from 'prop-types';

import { LogsColums } from '../../Utils/constant'
import { Button } from 'react-bootstrap';
import LogListRow from '../LogConsoleListRow';

const LogDataTable = ({ TableData }) => {
    const [mainData, setMainPage] = useState(TableData?.slice(0, 10))
    const [rowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const Totaldata = TableData?.length
    const [columns] = useState(LogsColums)
    const [sortConfig, setSortConfig] = useState({ key: null, direction: null });


    const sortedData = useMemo(() => {
        let sortableItems = [...TableData];
        if (sortConfig.key !== null) {
            sortableItems.sort((a, b) => {
                const valueA = a[sortConfig.key];
                const valueB = b[sortConfig.key];

                if (typeof valueA === 'string' && typeof valueB === 'string') {
                    return sortConfig.direction === 'ascending' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
                } else {
                    return sortConfig.direction === 'ascending' ? valueA - valueB : valueB - valueA;
                }
            });
        }
        return sortableItems;
    }, [TableData, sortConfig]);

    const currentItems = useMemo(() => {
        const indexOfLastItem = currentPage * rowsPerPage;
        const indexOfFirstItem = indexOfLastItem - rowsPerPage;
        return sortedData.slice(indexOfFirstItem, indexOfLastItem);
    }, [sortedData, currentPage, rowsPerPage]);


    useEffect(() => {
        setMainPage(currentItems);
    }, [currentItems]);



    function handleSort(key) {
        let direction = 'ascending';
        if (sortConfig.key === key?.internal && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key: key?.internal, direction });
    }

    function handlePageEvent(page) {
        setCurrentPage(page);
    }
    const totalPages = useMemo(() => {
        return Math.ceil(Totaldata / rowsPerPage);
    }, [Totaldata, rowsPerPage]);

    function exportCSV(logs) {
        if (!logs || !logs.length) {
            return;
        }

        const csvHeaders = Object.keys(logs[0]).join(',');
        const csvRows = logs.map(log => {
            return Object.values(log).map(value => {
                const escapedValue = typeof value === 'string' ? value.replace(/"/g, '""') : value;
                return `"${escapedValue}"`;
            }).join(',');
        });

        const csvString = `${csvHeaders}\n${csvRows.join('\n')}`;
        const blob = new Blob([csvString], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('hidden', '');
        a.setAttribute('href', url);
        a.setAttribute('download', 'logs.csv');
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    return (
        <>

            <div>
                {TableData?.length && <div className='ExportCSV-btn'>
                    <Button variant="outline-primary" onClick={() => { exportCSV(TableData) }}>
                        Esporta
                    </Button>
                </div>}
                <div className='ms-5'>
                    <strong>{TableData?.length}</strong> risultati <span>{`(${totalPages} pagine)`}</span>
                </div>
                <DataTable
                    columns={columns}
                    sortEvent={handleSort}
                    totalRecord={mainData && (Totaldata || 0)}
                    pageChangeEvent={handlePageEvent}
                    pagination={{ currentPage: currentPage, pageSize: rowsPerPage }}
                >
                    {mainData && mainData?.map((Log, index) => {
                        return (
                            <LogListRow
                                key={Log.log_id}
                                index={index}
                                Log={Log}
                            />
                        )
                    })}
                </DataTable>
            </div>
        </>
    )
}


LogDataTable.propTypes = {
    TableData: PropTypes.object,
};

export default LogDataTable
