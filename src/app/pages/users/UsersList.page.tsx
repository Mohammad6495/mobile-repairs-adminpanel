import { useState, useEffect } from 'react'
import { useTable, useFilters, usePagination } from 'react-table'
import { Button, Table } from 'react-bootstrap'
import { PageTitle } from '../../../_metronic/layout/core'
import { apiCaller } from '../../hooks/useApi'
import { IUser } from '../../interfaces'
import { ServiceAgent } from '../../services/serviceAgent'
import { useLoadingContext } from '../../contexts/loading/loading'
import { columns } from './dataTableService/_columns'
import { useLocation, useNavigate } from 'react-router-dom'
import { fileBaseUrl } from '../../services/SERVICE-CONSTANTS'
import CustomerForBuyFilter from '../../components/filter-customer/CustomerForBuyFilter'
import { HiOutlineLogin } from 'react-icons/hi'

const UsersListPage = () => {
  const navigate = useNavigate()
  ///states
  const [UsersListCartable, setUsersListCartable] = useState<IUser[]>([])
  const { handleOpenLoadingOverlay, handleCloseLoadingOverlay } = useLoadingContext()
  const [search, setSerach] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageSizeC, setPageSizeC] = useState<number>(15);
  const [totalRecords, setTotalRecords] = useState<any>()
  const [UsersIsFetch, setUsersIsFetch] = useState(false);

  const getAllListCatableData = () => {
    apiCaller({
      api: ServiceAgent.users.request_getAllUsers,
      apiArguments: {
        currentPage: currentPage + 1,
        pageSize: pageSizeC,
        search: search,
      },
      toastMessage: true,
      onStart: () => {
        setUsersIsFetch(true)
        if(!search) {
          handleOpenLoadingOverlay()
        }
      },
      onEnd: () => {
        setUsersIsFetch(false)
        if(!search) {
          handleCloseLoadingOverlay()
        }
      },
      onSuccess: (resp) => {
        if (resp.status == 200 && resp?.data?.statusCode == 200) {
          setUsersListCartable((resp?.data?.data as IUser[]))
          setTotalRecords(resp?.data?.totalRecords)
        }
      },
      onErrorMessage: 'دریافت لیست خریدارن با خطا مواجه شد .',
    })
  }

  useEffect(() => {
    if (!UsersListCartable || UsersListCartable?.length == 0) {
      getAllListCatableData()
    }
  }, [])

  useEffect(() => {
    getAllListCatableData()
  }, [currentPage, pageSizeC, search])


  const totalPages = Math.ceil(totalRecords / pageSizeC);

  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index);

  // تعداد صفحاتی که می‌خواهید نمایش دهید
  const pagesToShow = 7;
  const halfPagesToShow = Math.floor(pagesToShow / 2);

  // محدوده‌ی صفحاتی که می‌خواهید نمایش دهید
  let startIndex = currentPage - halfPagesToShow;
  let endIndex = currentPage + halfPagesToShow;

  if (startIndex < 0) {
    startIndex = 0;
    endIndex = pagesToShow - 1;
  }

  if (endIndex >= totalPages) {
    endIndex = totalPages - 1;
    startIndex = Math.max(endIndex - pagesToShow + 1, 0);
  }

  //ReactTableConfigCartable
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    gotoPage,
    state: { pageIndex = currentPage, pageSize = pageSizeC },
  } = useTable<any>(
    {
      columns: columns,
      data: UsersListCartable,
      initialState: { pageIndex: currentPage, pageSize: pageSizeC } as any,
    },
    useFilters,
    usePagination
  ) as any


  const searchCustomerHandle = (searchValue: string): void => {
    setSerach(searchValue)
  }

  const location = useLocation()

  useEffect(() => {
    document.title = 'پنل مدیریت - لیست کاربران نرم افزار';
  }, [location?.pathname])


  const handleGoToAppUser = (id: string) => {
    apiCaller({
      api: ServiceAgent.users.request_GoToAppUser,
      apiArguments: id,
      onSuccess: (resp) => {
        if (resp?.status == 200 && resp?.data?.statusCode == 200) {
          window.open(`http://localhost:5173/?token=${resp?.data?.data}`, '_blank');
        }
      },
      onStart: () => {
        handleOpenLoadingOverlay()
      },
      onEnd: () => {
        handleCloseLoadingOverlay()
      },
    })
  }

  return (
    <>
      <PageTitle breadcrumbs={[]}>لیست کاربران نرم افزار</PageTitle>
      <CustomerForBuyFilter searchCustomerHandle={searchCustomerHandle} />
      <div className={`card `}>
        {/* begin::Header */}
        <div className='card-header align-items-center border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bold fs-3 mb-1'>لیست کاربران نرم افزار</span>
            <span className='text-muted mt-1 fw-semibold fs-7'>{totalRecords} کاربران نرم افزار</span>
          </h3>
        </div>
        {/* end::Header */}
        {/* begin::Body */}
        <div className='card-body py-3'>
          {/* begin::Table container */}
          <div className='table-responsive'>
            {UsersIsFetch && (
              <div className='d-flex justify-content-center w-100'>
                <p>در حال بارگذاری ...</p>
              </div>
            )}
            {!UsersIsFetch && UsersListCartable?.length === 0 && (
              <div className='d-flex justify-content-center w-100'>
                <p>رکوردی یافت نشد .</p>
              </div>
            )}
            {/* begin::Table */}
            <Table
              className='table text-center table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'
              {...getTableProps()}
              striped
              bordered
              hover
            >
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr className='fw-bold text-muted' {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th scope='col' {...column.getHeaderProps()}>
                        {column.render('Header')}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {!UsersIsFetch &&
                  UsersListCartable?.length > 0 &&
                  UsersListCartable.map((item) => (
                    <tr key={item.id} className='p-0 w-100 '>
                      <td style={{ verticalAlign: 'middle' }} className='  text-truncate '>
                        <div className='d-flex align-items-center px-3'>
                          {
                            item?.image &&
                            <img className='rounded' style={{ width: '60px', height: '60px' }} src={fileBaseUrl + item?.image} />
                          }
                          <span className='ms-2'>{item?.name}</span>
                        </div>
                      </td>
                      <td style={{ verticalAlign: 'middle' }} className='  text-truncate '>
                        {item?.phoneNumber || '---'}
                      </td>
                      <td style={{ verticalAlign: 'middle' }} className='  text-truncate '>
                        {item?.userName || '---'}
                      </td>
                      <td style={{ verticalAlign: 'middle' }} className=''>
                        <div className='d-flex justify-content-center flex-shrink-0'>
                          <div
                            onClick={() => handleGoToAppUser(item?.id as string)}
                            style={{
                              width: '40px',
                              height: '34px',
                            }}
                            title='ورود به حساب کاربر'
                            className='btn btn-icon btn-bg-success btn-active-color-primary me-2'
                          >
                            <HiOutlineLogin color='#fff' fontSize={22} />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
            <div className='w-100 d-flex justify-content-between align-items-center'>
              <div className='d-flex justify-content-start align-items-center'>
                {pageNumbers.slice(startIndex, endIndex + 1).map((pageNumber) => (
                  <Button
                    key={pageNumber}
                    onClick={() => {
                      setCurrentPage(pageNumber)
                      gotoPage(pageNumber)
                    }}
                    disabled={pageIndex === pageNumber}
                    className='btn-sm mx-1'
                  >
                    {pageNumber + 1}
                  </Button>
                ))}
                <select
                  value={pageSizeC}
                  onChange={(e) => {
                    setPageSizeC(Number(e.target.value))
                  }}
                  style={{
                    width: '110px',
                  }}
                  className='ms-3 form-select form-select-sm'
                >
                  {[10, 20, 50].map((pageSize) => (
                    <option key={pageSize} value={pageSize}>
                      نمایش {pageSize}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <span className='text-danger'>تعداد کل صفحات {pageNumbers?.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UsersListPage;