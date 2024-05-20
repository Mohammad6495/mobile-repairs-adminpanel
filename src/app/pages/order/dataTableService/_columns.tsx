import {Column} from 'react-table'
import {ICategory, IUser} from '../../../interfaces'

const columns: ReadonlyArray<Column<ICategory>> = [
  {
    Header: 'عنوان',
    accessor: 'title',
  },
  {
    Header: 'وضعیت نمایش',
    accessor: 'isAvailable',
  },
  {
    Header: 'عملیات',
    accessor: 'id',
  },
]

export {columns}
