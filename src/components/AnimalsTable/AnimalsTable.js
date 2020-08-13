import React, { useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { getAnimals } from "../../Redux/Actions/animalActions";
import Navbar from "../Navbar/Navbar";
import { useTable } from "react-table";
import "./AnimalsTable.css";

const AnimalsTable = ({ getAnimals, animal, currentUser }) => {
    useEffect(() => {
        !!currentUser ? getAnimals(currentUser.uid) : console.log("no user");
    }, [getAnimals, currentUser]);

    const { animals } = animal;

    const data = useMemo(
        () =>
            animals.map((animal) => ({
                col1: animal.name,
                col2: animal.parents.father,
                col3: animal.parents.mother,
                col4: animal.parents.bday,
            })),
        [animals]
    );

    const columns = useMemo(
        () => [
            {
                Header: "Name",
                accessor: "col1",
            },
            {
                Header: "Father",
                accessor: "col2",
            },
            {
                Header: "Mother",
                accessor: "col3",
            },
            {
                Header: "Birthday",
                accessor: "col4",
            },
        ],
        []
    );
    const tableInstance = useTable({ columns, data });

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance;

    return (
        <>
            <Navbar />
            <div className="container">
                <table {...getTableProps()} className="animalsTable">
                    <thead>
                        {
                            // Loop over the header rows
                            headerGroups.map((headerGroup) => (
                                // Apply the header row props
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {
                                        // Loop over the headers in each row
                                        headerGroup.headers.map((column) => (
                                            // Apply the header cell props
                                            <th {...column.getHeaderProps()}>
                                                {
                                                    // Render the header
                                                    column.render("Header")
                                                }
                                            </th>
                                        ))
                                    }
                                </tr>
                            ))
                        }
                    </thead>
                    {/* Apply the table body props */}
                    <tbody {...getTableBodyProps()}>
                        {
                            // Loop over the table rows
                            rows.map((row) => {
                                // Prepare the row for display
                                prepareRow(row);
                                return (
                                    // Apply the row props
                                    <tr {...row.getRowProps()}>
                                        {
                                            // Loop over the rows cells
                                            row.cells.map((cell) => {
                                                // Apply the cell props
                                                return (
                                                    <td
                                                        {...cell.getCellProps()}
                                                    >
                                                        {
                                                            // Render the cell contents
                                                            cell.render("Cell")
                                                        }
                                                    </td>
                                                );
                                            })
                                        }
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
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
