import {Column} from 'react-table'
import {IRequestCourse, IUser} from '../../../interfaces'

const columns: ReadonlyArray<Column<IRequestCourse>> = [
  {
    Header: 'شماره تلفن',
    accessor: 'phoneNumber',
  },
  {
    Header: 'حوزه علاقمندی',
    accessor: 'favoriotArea',
  },
  {
    Header: 'دوره انتخاب شده',
    accessor: 'course',
  },
  {
    Header: 'تاریخ ثبت',
    accessor: 'createdAt',
  },
  {
    Header: 'عملیات',
    accessor: 'id',
  },
]

export {columns}
