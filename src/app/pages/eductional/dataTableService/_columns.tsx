import { Column } from 'react-table'
import { IEductional, IUser } from '../../../interfaces'

const columns: ReadonlyArray<Column<IEductional>> = [
  {
    Header: 'نام آموزشگاه',
    accessor: 'name',
  },
  {
    Header: 'درباره آموزشگاه',
    accessor: 'description',
  },
  {
    Header: 'عملیات',
    accessor: 'id',
  },
]

export { columns }
