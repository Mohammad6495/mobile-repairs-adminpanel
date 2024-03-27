import {Column} from 'react-table'
import {ICourse, IUser} from '../../../interfaces'

const columns: ReadonlyArray<Column<ICourse>> = [
  {
    Header: 'عنوان دوره',
    accessor: 'title',
  },

  {
    Header: 'نام اساتید',
    accessor: 'teacher',
  },
  
  {
    Header: 'نام آموزشگاه',
    accessor: 'eductional',
  },
  {
    Header: 'وضعیت نمایش',
    accessor: 'isAvailable',
  },
  {
    Header: 'قیمت',
    accessor: 'price',
  },
  {
    Header: 'دسته بندی',
    accessor: 'category',
  },
  {
    Header: 'عملیات',
    accessor: 'id',
  },
]

export {columns}
