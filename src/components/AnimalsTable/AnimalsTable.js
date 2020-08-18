import React, { useEffect, useMemo, useState, forwardRef, useRef } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getAnimals } from '../../Redux/Actions/animalActions';
import Navbar from '../Navbar';
import {
    useTable,
    usePagination,
    useSortBy,
    useFilters,
    useGroupBy,
    useExpanded,
    useRowSelect,
} from 'react-table';
import matchSorter from 'match-sorter';

const StyledTable = styled.div`
    padding: 1rem;
    table {
        border-spacing: 0;
        border: 1px solid black;
        tr {
            :last-child {
                td {
                    border-bottom: 0;
                }
            }
        }
        th,
        td {
            margin: 0;
            padding: 0.5rem;
            border-bottom: 1px solid black;
            border-right: 1px solid black;
            :last-child {
                border-right: 0;
            }
        }
        td {
            input {
                font-size: 1rem;
                padding: 0;
                margin: 0;
                border: 0;
            }
        }
    }
    .pagination {
        padding: 0.5rem;
    }
`;

const EditableCell = ({
    value: initialValue,
    row: { index },
    column: { id },
    updateData,
    editable,
}) => {
    // Keep and update the state of the cell
    const [value, setValue] = useState(initialValue);

    const onChange = (e) => {
        setValue(e.target.value);
    };

    // Update external data only on blur
    const onBlur = () => {
        updateData(index, id, value);
    };

    // Sync our state if the data is changed externally
    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    if (!editable) {
        return `${initialValue}`;
    }

    return <input value={value} onChange={onChange} onBlur={onBlur} />;
};

// Define a default UI for filtering
const DefaultColumnFilter = ({
    column: { filterValue, preFilteredRows, setFilter },
}) => {
    const count = preFilteredRows.length;

    return (
        <input
            value={filterValue || ''}
            onChange={(e) => setFilter(e.target.value || undefined)} // Set filter to this input's value or undefined, if no filter
            placeholder={`Search ${count} records`}
        />
    );
};

// Custom filter UI for selecting a unique option from a list
const SelectColumnFilter = ({
    column: { filterValue, setFilter, preFilteredRows, id },
}) => {
    // Calculate options for filtering using preFilteredRows
    const options = useMemo(() => {
        const options = new Set();
        preFilteredRows.forEach((row) => {
            options.add(row.values[id]);
        });
        return [...options.values()];
    }, [id, preFilteredRows]);

    // Render a multi-select box
    return (
        <select
            value={filterValue}
            onChange={(e) => {
                setFilter(e.target.value || undefined);
            }}
        >
            <option value=''>All</option>
            {options.map((option, i) => (
                <option key={i} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
};

// Between or number range filter
const NumberRangeColumnFilter = ({
    column: { filterValue = [], preFilteredRows, setFilter, id },
}) => {
    console.log(preFilteredRows);
    const [min, max] = useMemo(() => {
        let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
        let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
        preFilteredRows.forEach((row) => {
            min = Math.min(row.values[id], min);
            max = Math.max(row.values[id], max);
        });
        return [min, max];
    }, [id, preFilteredRows]);

    return (
        <div
            style={{
                display: 'flex',
            }}
        >
            <input
                value={filterValue[0] || ''}
                type='number'
                onChange={(e) => {
                    setFilter((old = []) => [
                        e.target.value
                            ? parseInt(e.target.value, 10)
                            : undefined,
                        old[1],
                    ]);
                }}
                placeholder={`Min (${min})`}
            />
            to
            <input
                value={filterValue[1] || ''}
                type='number'
                onChange={(e) => {
                    setFilter((old = []) => [
                        old[0],
                        e.target.value
                            ? parseInt(e.target.value, 10)
                            : undefined,
                    ]);
                }}
                placeholder={`Max (${max})`}
            />
        </div>
    );
};

const fuzzyTextFilterFn = (rows, id, filterValue) => {
    return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
};

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val) => !val;

const Table = ({ columns, data, updateData, skipReset }) => {
    const filterTypes = useMemo(
        () => ({
            // Add new fuzzyTextFilterFn filter type
            fuzzyText: fuzzyTextFilterFn,
            // or override the default text filter to use "startWith"
            text: (rows, id, filterValue) => {
                return rows.filter((row) => {
                    const rowValue = row.values[id];
                    return rowValue !== undefined
                        ? String(rowValue)
                              .toLowerCase()
                              .startsWith(String(filterValue).toLowerCase)
                        : true;
                });
            },
        }),
        []
    );

    const defaultColumn = useMemo(
        () => ({
            Filter: DefaultColumnFilter,
            Cell: EditableCell,
        }),
        []
    );
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page, // Instead of using 'rows', we'll use page,
        // which has only the rows for the active page

        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: {
            pageIndex,
            pageSize,
            sortBy,
            groupBy,
            expanded,
            filters,
            selectedRowIds,
        },
    } = useTable(
        {
            columns,
            data,
            defaultColumn,
            filterTypes,
            updateData,
            // We also need to pass this so the page doesn't change when we edit the data.
            autoResetPage: !skipReset,
            autoResetSelectedRows: !skipReset,
            disableMultiSort: true,
        },
        useFilters,
        useGroupBy,
        useSortBy,
        useExpanded,
        usePagination,
        useRowSelect,
        // (hooks) => {
        //     hooks.visibleColumns.push((columns) => {
        //         return [
        //             {
        //                 id: 'selection',
        //                 groupByBoundaty: true,
        //                 Header: ({ getToggleAllRowsSelectedProps }) => (
        //                     <div>
        //                         <IndeterminateCheckbox
        //                             {...getToggleAllRowsSelectedProps()}
        //                         />
        //                     </div>
        //                 ),
        //                 // The cell can use the individual row's getToggleRowSelectedProps method
        //                 // to the render a checkbox
        //                 Cell: ({ row }) => (
        //                     <div>
        //                         <IndeterminateCheckbox
        //                             {...row.getToggleRowSelectedProps()}
        //                         />
        //                     </div>
        //                 ),
        //             },
        //             ...columns,
        //         ];
        //     });
        // }
    );

    // Render the UI for your table
    return (
        <>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}>
                                    <div>
                                        {column.canGroupBy ? (
                                            // If the column can be grouped, let's add a toggle
                                            <span
                                                {...column.getGroupByToggleProps()}
                                            >
                                                {column.isGrouped
                                                    ? '🛑 '
                                                    : '👊 '}
                                            </span>
                                        ) : null}
                                        <span
                                            {...column.getSortByToggleProps()}
                                        >
                                            {column.render('Header')}
                                            {/* Add a sort direction indicator */}
                                            {column.isSorted
                                                ? column.isSortedDesc
                                                    ? ' 🔽'
                                                    : ' 🔼'
                                                : ''}
                                        </span>
                                    </div>
                                    {/* Render the columns filter UI */}
                                    <div>
                                        {column.canFilter
                                            ? column.render('Filter')
                                            : null}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return (
                                        <td {...cell.getCellProps()}>
                                            {cell.isGrouped ? (
                                                // If it's a grouped cell, add an expander and row count
                                                <>
                                                    <span
                                                        {...row.getToggleRowExpandedProps()}
                                                    >
                                                        {row.isExpanded
                                                            ? '👇'
                                                            : '👉'}
                                                    </span>{' '}
                                                    {cell.render('Cell', {
                                                        editable: false,
                                                    })}{' '}
                                                    ({row.subRows.length})
                                                </>
                                            ) : cell.isAggregated ? (
                                                // If the cell is aggregated, use the Aggregated
                                                // renderer for cell
                                                cell.render('Aggregated')
                                            ) : cell.isPlaceholder ? null : ( // For cells with repeated values, render null
                                                // Otherwise, just render the regular cell
                                                cell.render('Cell', {
                                                    editable: true,
                                                })
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            {/*
        Pagination can be built however you'd like.
        This is just a very basic UI implementation:
      */}
            <div className='pagination'>
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {'<<'}
                </button>{' '}
                <button
                    onClick={() => previousPage()}
                    disabled={!canPreviousPage}
                >
                    {'<'}
                </button>{' '}
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                    {'>'}
                </button>{' '}
                <button
                    onClick={() => gotoPage(pageCount - 1)}
                    disabled={!canNextPage}
                >
                    {'>>'}
                </button>{' '}
                <span>
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{' '}
                </span>
                <span>
                    | Go to page:{' '}
                    <input
                        type='number'
                        defaultValue={pageIndex + 1}
                        onChange={(e) => {
                            const page = e.target.value
                                ? Number(e.target.value) - 1
                                : 0;
                            gotoPage(page);
                        }}
                        style={{ width: '100px' }}
                    />
                </span>{' '}
                <select
                    value={pageSize}
                    onChange={(e) => {
                        setPageSize(Number(e.target.value));
                    }}
                >
                    {[10, 20, 30, 40, 50].map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
            <pre>
                <code>
                    {JSON.stringify(
                        {
                            pageIndex,
                            pageSize,
                            pageCount,
                            canNextPage,
                            canPreviousPage,
                            sortBy,
                            groupBy,
                            expanded: expanded,
                            filters,
                            selectedRowIds: selectedRowIds,
                        },
                        null,
                        2
                    )}
                </code>
            </pre>
        </>
    );
};

const filterGreaterThan = (rows, id, filterValue) => {
    return rows.filter((row) => {
        const rowValue = row.values[id];
        return rowValue >= filterValue;
    });
};

// This is an autoRemove method on the filter function that
// when given the new filter value and returns true, the filter
// will be automatically removed. Normally this is just an undefined
// check, but here, we want to remove the filter if it's not a number
filterGreaterThan.autoRemove = (val) => typeof val !== 'number';

// This is a custom aggregator that
// takes in an array of leaf values and
// returns the rounded median
const roundedMedian = (leafValues) => {
    let min = leafValues[0] || 0;
    let max = leafValues[0] || 0;

    leafValues.forEach((value) => {
        min = Math.min(min, value);
        max = Math.max(max, value);
    });

    return Math.round((min + max) / 2);
};

const IndeterminateCheckbox = forwardRef(({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
        <>
            <input type='checkbox' ref={resolvedRef} {...rest} />
        </>
    );
});

const AnimalsTable = ({ getAnimals, animal, currentUser }) => {
    useEffect(() => {
        !!currentUser ? getAnimals(currentUser.uid) : console.log('no user');
    }, [getAnimals, currentUser]);

    const { animals } = animal;

    const { loading } = animal;

    const columns = useMemo(
        () => [
            {
                Header: 'Name',
                accessor: 'col1',
                filter: 'fuzzyText',
                aggregate: 'uniqueCount',
                Aggregated: ({ value }) => `${value} Names`,
            },
            {
                Header: 'Gender',
                accessor: 'col2',
                Filter: SelectColumnFilter,
                filter: 'includes',
            },

            {
                Header: 'Father',
                accessor: 'col3',
                aggregate: 'count',
                Aggregated: ({ value }) => `${value} Names`,
            },
            {
                Header: 'Mother',
                accessor: 'col4',
                aggregate: 'count',
                Aggregated: ({ value }) => `${value} Names`,
            },
            {
                Header: 'Birthday',
                accessor: 'col5',
                filter: 'fuzzyText',
                aggregate: 'sum',
                Aggregated: ({ value }) => `${value} (total)`,
            },
        ],
        []
    );

    const animalsData = useMemo(
        () =>
            animals.map((animal) => ({
                col1: animal.name,
                col2: animal.gender,
                col3: animal.parents.father,
                col4: animal.parents.mother,
                col5:
                    animal.bday.seconds >= 0
                        ? new Date(animal.bday.seconds * 1000)
                              .toISOString()
                              .substr(0, 10)
                        : animal.bday,
            })),
        [animals]
    );

    const [data, setData] = useState([]);
    useEffect(() => setData(animalsData), [animalsData]);
    const [originalData] = useState(data);

    // We need to keep the table from resetting the pageIndex when we
    // Update data. So we can keep track of that flag with a ref.
    const skipResetRef = useRef(false);

    // When our cell renderer calls updateMyData, we'll use
    // the rowIndex, columnId and new value to update the
    // original data
    const updateData = (rowIndex, columnId, value) => {
        // We also turn on the flag to not reset the page
        skipResetRef.current = true;
        // console.table( animals)
        setData((old) =>
            old.map((row, index) => {
                if (index === rowIndex) {
                    console.log({
                        ...row,
                        [columnId]: value,
                    })
                    return {
                        ...row,
                        [columnId]: value,
                    };
                }
                return row;
            })
        );
    };

    // After data changes, we turn the flag back off
    // so that if data actually changes when we're not
    // editing it, the page is reset
    useEffect(() => {
        skipResetRef.current = false;
    }, [data]);

    return (
        <>
            <Navbar />
            <StyledTable>
                <Table
                    columns={columns}
                    data={data}
                    updateData={updateData}
                    skipReset={skipResetRef.current}
                />
            </StyledTable>
        </>
    );
};

const mapStateToProps = (state) => ({
    animal: state.animal,
    currentUser: state.user.currentUser,
});

const mapDispatchToProps = {
    getAnimals,
};

export default connect(mapStateToProps, mapDispatchToProps)(AnimalsTable);
