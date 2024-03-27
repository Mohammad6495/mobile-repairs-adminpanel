import { Column } from 'react-table'
import { ITeacher, IUser } from '../../../interfaces'

const columns: ReadonlyArray<Column<ITeacher>> = [
  {
    Header: 'نام اساتید',
    accessor: 'name',
  },
  {
    Header: 'عملیات',
    accessor: 'id',
  },
]

export { columns }
