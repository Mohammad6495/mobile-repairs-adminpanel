import {Column} from 'react-table'
import {IHeadline, IUser} from '../../../interfaces'

const columns: ReadonlyArray<Column<IHeadline>> = [
  {
    Header: 'عنوان',
    accessor: 'title',
  },
  {
    Header: 'تعداد ویدیو',
    accessor: 'eductionals',
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
