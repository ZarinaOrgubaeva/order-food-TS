import { ChangeEvent, useState } from 'react'

const useClientSidePagination = () => {
    const [page, setPage] = useState(0)
    const [rowPage, setRowPage] = useState(2)
    const handleChangePage = (newPage: number) => {
        setPage(newPage)
    }
    const handleChangeRowPage = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setRowPage(+event.target.value)
    }
    const paginate = <T>(rows: T[]) => {
        return rows.slice(page * rowPage, page * rowPage + rowPage)
    }
    return {
        page,
        rowPage,
        paginate,
        handleChangePage,
        handleChangeRowPage,
    }
}
export default useClientSidePagination
