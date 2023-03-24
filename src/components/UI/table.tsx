import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TablePagination from '@mui/material/TablePagination'
import useClientSidePagination from '../../hooks/useClientSidePagination'
import { Column } from '../../common/utils/types'

type Props<T> = {
    columns: Column<T>[]
    rows: T[]
    getUniqueId: (val: T) => string
}

export const AppTable = <T,>({ columns, rows, getUniqueId }: Props<T>) => {
    const { page, rowPage, handleChangePage, handleChangeRowPage, paginate } =
        useClientSidePagination()

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                            <TableCell
                                key={`header - ${column.key}`}
                                align={column.align || 'left'}
                                style={
                                    column.minWidth
                                        ? {
                                              minWidth: column.minWidth,
                                          }
                                        : {}
                                }
                            >
                                {column.header}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {paginate(rows).map((row, rowIndex) => {
                        return (
                            <TableRow hover key={getUniqueId(row)}>
                                {columns.map((column) => {
                                    if (column.render) {
                                        return column.render(row)
                                    }

                                    const value = column.index
                                        ? rowIndex + 1
                                        : // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                          //@ts-ignore
                                          row[column.key]
                                    return (
                                        <TableCell
                                            key={`row - ${column.key}`}
                                            align={column.align}
                                        >
                                            {value}
                                        </TableCell>
                                    )
                                })}
                            </TableRow>
                        )
                    })}
                </TableBody>
                <TablePagination
                    rowsPerPageOptions={[2, 4]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowPage}
                    page={page}
                    onPageChange={(e, newPage) => handleChangePage(newPage)}
                    onRowsPerPageChange={handleChangeRowPage}
                />
            </Table>
        </TableContainer>
    )
}
