import { Column } from 'react-table'
import { IUser } from '../../../interfaces'

const columns: ReadonlyArray<Column<IUser>> = [
  {
    Header: 'نام ونام خانوادگی',
    accessor: 'name',
  },
  {
    Header: 'شماره موبایل',
    accessor: 'phoneNumber',
  },
  {
    Header: 'نام کاربری',
    accessor: 'userName',
  },
  {
    Header: 'عملیات',
    accessor: 'id',
  },
]

export { columns }
