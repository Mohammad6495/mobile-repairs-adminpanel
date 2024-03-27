import {Column} from 'react-table'
import {IFamiliarService, IUser} from '../../../interfaces'

const columns: ReadonlyArray<Column<IFamiliarService>> = [
  {
    Header: 'شماره تلفن',
    accessor: 'phoneNumber',
  },
  {
    Header: 'حوزه علاقمندی',
    accessor: 'favoriotArea',
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
