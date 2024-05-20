import { useState, useEffect } from 'react'
import { useTable, useFilters, usePagination } from 'react-table'
import { Button, Modal, Table } from 'react-bootstrap'
import { PageTitle } from '../../../_metronic/layout/core'
import { apiCaller } from '../../hooks/useApi'
import { ICourse } from '../../interfaces'
import { ServiceAgent } from '../../services/serviceAgent'
import { useLoadingContext } from '../../contexts/loading/loading'
import { convertFullDateAndTime } from '../../utils/dateUtils'
import { columns } from './dataTableService/_columns'
import { AiOutlineEdit } from 'react-icons/ai'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { useLocation, useNavigate } from 'react-router-dom'
import { LuArchiveRestore } from 'react-icons/lu'
import { useAuth } from '../../modules/auth'
import { toast } from 'react-toastify'
import { formatPrice } from '../../utils/utility'
import { fileBaseUrl } from '../../services/SERVICE-CONSTANTS'
import CustomerForBuyFilter from '../../components/filter-customer/CustomerForBuyFilter'
import { CiViewTimeline } from "react-icons/ci";


const CourseListPage = () => {
  const navigate = useNavigate()

  const { userInfo } = useAuth()

  ///states
  const [CourseListCartable, setCourseListCartable] = useState<ICourse[]>([])
  const { handleOpenLoadingOverlay, handleCloseLoadingOverlay } = useLoadingContext()
  const [search, setSerach] = useState<string>()
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [requestId, setRequestId] = useState<string>()
  const [pageSizeC, setPageSizeC] = useState<number>(15);
  const [totalRecords, setTotalRecords] = useState<any>()
  const [CourseIsFetch, setCourseIsFetch] = useState(false);
  const [showDeleteCourse, setShowDeleteCourse] = useState(false)

  const getAllListCatableData = () => {
    apiCaller({
      api: ServiceAgent.course.request_getAllProducts,
      apiArguments: {
        currentPage: currentPage + 1,
        pageSize: pageSizeC,
        search: search,
      },
      toastMessage: true,
      onStart: () => {
        setCourseIsFetch(true)
        if (!search)
          handleOpenLoadingOverlay()
      },
      onEnd: () => {
        setCourseIsFetch(false)
        if (!search)
          handleCloseLoadingOverlay()
      },
      onSuccess: (resp) => {
        if (resp.status == 200 && resp?.data?.statusCode == 200) {
          setCourseListCartable((resp?.data?.data?.data as ICourse[]))
          setTotalRecords(resp?.data.data?.totalRecords)
        }
      },
      onErrorMessage: 'دریافت لیست خریدارن با خطا مواجه شد .',
    })
  }


  useEffect(() => {
    if (!CourseListCartable || CourseListCartable?.length == 0) {
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
      data: CourseListCartable,
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
    document.title = 'پنل مدیریت - لیست دوره ها';
  }, [location?.pathname])

  const deleteHandleCourse = () => {
    if (requestId) {
      apiCaller({
        api: ServiceAgent.course.request_deleteProducts,
        apiArguments: requestId,
        onSuccess: (resp) => {
          if (resp?.status == 200 && resp?.data?.statusCode == 200) {
            setShowDeleteCourse(false)
            getAllListCatableData()
          }
        },
        onStart: handleOpenLoadingOverlay,
        onEnd: handleCloseLoadingOverlay,
        onSuccessMessage: 'حذف دوره با موفقیت انجام شد'
      })
    }
  }

  return (
    <>
      <PageTitle breadcrumbs={[]}>لیست دوره ها</PageTitle>
      <CustomerForBuyFilter searchCustomerHandle={searchCustomerHandle} />
      <div className={`card `}>
        {/* begin::Header */}
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bold fs-3 mb-1'>لیست دوره ها</span>
            <span className='text-muted mt-1 fw-semibold fs-7'>{totalRecords} دوره ها</span>
          </h3>
        </div>
        {/* end::Header */}
        {/* begin::Body */}
        <div className='card-body py-3'>
          {/* begin::Table container */}
          <div className='table-responsive'>
            {CourseIsFetch && (
              <div className='d-flex justify-content-center w-100'>
                <p>در حال بارگذاری ...</p>
              </div>
            )}
            {!CourseIsFetch && CourseListCartable?.length === 0 && (
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
                {!CourseIsFetch &&
                  CourseListCartable?.length > 0 &&
                  CourseListCartable.map((item) => (
                    <tr key={item.id} className='p-0 w-100 '>
                      <td style={{ verticalAlign: 'middle' }} className='  text-truncate '>
                        <div className='d-flex align-items-center px-3'>
                          <img className='rounded' style={{ width: '60px', height: '60px' }} src={fileBaseUrl + item?.image} />
                          <span className='ms-2'>{item?.title}</span>
                        </div>
                      </td>
                      <td style={{ verticalAlign: 'middle' }} className=' '>
                        {item.teacher}
                      </td>

                      <td style={{ verticalAlign: 'middle' }} className=' '>
                        {item?.isAvailable ? 'فعال' : 'غیر فعال'}
                      </td>
                      <td style={{ verticalAlign: 'middle' }} className=' '>
                        {formatPrice(item?.price)} تومان
                      </td>
                      <td style={{ verticalAlign: 'middle' }} className=' '>
                        {item.category?.title}
                      </td>
                      <td style={{ verticalAlign: 'middle' }} className=''>
                        <div className='d-flex justify-content-center flex-shrink-0'>
                          <div
                            onClick={() => navigate(`/headline-list/${item?.id}`)}
                            style={{
                              width: '40px',
                              height: '34px',
                            }}
                            title='سرفصل'
                            className='btn btn-icon btn-bg-primary btn-active-color-primary me-2'
                          >
                            <CiViewTimeline color='#fff' fontSize={22} />
                          </div>
                          <div
                            onClick={() => navigate(`/edit-course/${item?.id}`)}
                            style={{
                              width: '40px',
                              height: '34px',
                            }}
                            title='ویرایش'
                            className='btn btn-icon btn-bg-success btn-active-color-primary me-2'
                          >
                            <AiOutlineEdit color='#fff' fontSize={22} />
                          </div>
                          <div
                            onClick={() => {
                              setRequestId(item?.id);
                              setShowDeleteCourse(true)
                            }}
                            style={{
                              width: '40px',
                              height: '34px',
                            }}
                            title='حذف'
                            className='btn btn-icon btn-bg-danger btn-active-color-primary me-2'
                          >
                            <RiDeleteBin6Line color='#fff' fontSize={22} />
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
        {/* end::Table container */}
        <Modal
          onHide={() => setShowDeleteCourse(!showDeleteCourse)}
          show={showDeleteCourse}
          className='modal-lg'
          dialogClassName='p-3'
        >
          <Modal.Header closeButton>
            <h3>حذف دوره</h3>
          </Modal.Header>
          <Modal.Body>
            <div className='form-edit-Cartable'>
              <p>آیا میخواهید این دوره را حذف کنید؟</p>
              <div className='d-flex w-100 justify-content-end'>
                <button onClick={deleteHandleCourse} className='btn btn-primary mt-2 me-3'>
                  بلی
                </button>
                <button
                  className='btn btn-danger mt-2'
                  type='button'
                  onClick={() => {
                    setShowDeleteCourse(false)
                  }}
                >
                  خیر
                </button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
        <Modal
          onHide={() => setShowDeleteCourse(!showDeleteCourse)}
          show={showDeleteCourse}
          className='modal-lg'
          dialogClassName='p-3'
        >
          <Modal.Header closeButton>
            <h3>حذف دوره</h3>
          </Modal.Header>
          <Modal.Body>
            <div className='form-edit-Cartable'>
              <p>مطمئن هستید؟</p>
              <div className='d-flex w-100 justify-content-end'>
                <button onClick={deleteHandleCourse} className='btn btn-primary mt-2 me-3'>
                  بلی
                </button>
                <button
                  className='btn btn-danger mt-2'
                  type='button'
                  onClick={() => {
                    setShowDeleteCourse(false)
                  }}
                >
                  خیر
                </button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  )
}

export default CourseListPage;