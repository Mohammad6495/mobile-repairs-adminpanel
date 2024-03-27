import { useState, useEffect } from 'react'
import { useTable, useFilters, usePagination } from 'react-table'
import { Button, Modal, Table } from 'react-bootstrap'
import { PageTitle } from '../../../_metronic/layout/core'
import { apiCaller } from '../../hooks/useApi'
import { IRequestCourse } from '../../interfaces'
import { ServiceAgent } from '../../services/serviceAgent'
import { useLoadingContext } from '../../contexts/loading/loading'
import { convertFullDateAndTime } from '../../utils/dateUtils'
import { columns } from './dataTableService/_columns'
import { AiOutlineEdit, AiOutlineInfo } from 'react-icons/ai'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { useLocation, useNavigate } from 'react-router-dom'
import { LuArchiveRestore } from 'react-icons/lu'
import { useAuth } from '../../modules/auth'
import { toast } from 'react-toastify'
import { formatPrice } from '../../utils/utility'
import { fileBaseUrl } from '../../services/SERVICE-CONSTANTS'
import CustomerForBuyFilter from '../../components/filter-customer/CustomerForBuyFilter'
import { BsPlusSquare } from 'react-icons/bs'
import * as productInputs from '../../components/productInputs'
import useImageInput from '../../components/input/imageInput'
import moment from 'jalali-moment'
const RequestCourseListPage = () => {
  const navigate = useNavigate()

  const { userInfo } = useAuth()

  ///states
  const [RequestCourseListCartable, setRequestCourseListCartable] = useState<IRequestCourse[]>([])
  const { handleOpenLoadingOverlay, handleCloseLoadingOverlay } = useLoadingContext()
  const [search, setSerach] = useState<string>()
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [requestId, setRequestId] = useState<string>()
  const [pageSizeC, setPageSizeC] = useState<number>(15);
  const [totalRecords, setTotalRecords] = useState<any>()
  const [RequestCourseIsFetch, setRequestCourseIsFetch] = useState(false);
  const [showDeleteRequestCourse, setShowDeleteRequestCourse] = useState(false)
  const [showAddRequestCourse, setShowAddRequestCourse] = useState(false)
  const [RequestCourseValue, setRequestCourseValue] = useState<IRequestCourse>()

  const getAllListCatableData = () => {
    apiCaller({
      api: ServiceAgent.requestCourse.request_getAllrequestCourses,
      apiArguments: {
        currentPage: currentPage + 1,
        pageSize: pageSizeC,
        search: search,
      },
      toastMessage: true,
      onStart: () => {
        setRequestCourseIsFetch(true)
        if (!search)
          handleOpenLoadingOverlay()
      },
      onEnd: () => {
        setRequestCourseIsFetch(false)
        if (!search)
          handleCloseLoadingOverlay()
      },
      onSuccess: (resp) => {
        if (resp.status == 200 && resp?.data?.statusCode == 200) {
          setRequestCourseListCartable((resp?.data?.data?.data as IRequestCourse[]))
          setTotalRecords(resp?.data?.data?.totalRecords)
        }
      },
      onErrorMessage: 'دریافت لیست خریدارن با خطا مواجه شد .',
    })
  }

  useEffect(() => {
    if (!RequestCourseListCartable || RequestCourseListCartable?.length == 0) {
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
      data: RequestCourseListCartable,
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
    document.title = 'پنل مدیریت - لیست درخواست ها';
  }, [location?.pathname])

  const {
    Input: titleInput,
    Value: titleValue,
    setInputValue: setTitleValue,
    validate: titleInputValid
  } = productInputs?.useTitleInput({
    initialvalue: RequestCourseValue?.phoneNumber || '',
    className: 'col-12'
  })



  const deleteHandleRequestCourse = () => {
    if (requestId) {
      apiCaller({
        api: ServiceAgent.requestCourse.request_removerequestCourse,
        apiArguments: requestId,
        onSuccess: (resp) => {
          if (resp?.status == 200 && resp?.data?.statusCode == 200) {
            setShowDeleteRequestCourse(false)
            getAllListCatableData()
          }
        },
        onStart: handleOpenLoadingOverlay,
        onEnd: handleCloseLoadingOverlay,
        onSuccessMessage: 'حذف درخواست ها با موفقیت انجام شد'
      })
    }
  }

  const handleSubmit = async () => {
    const v1 = await titleInputValid();
    const formData = new FormData();
    if (RequestCourseValue?.id) {
      formData.append('id', RequestCourseValue?.id as any)
    }
    formData.append('title', titleValue as any)

    if (v1) {
      apiCaller({
        api: RequestCourseValue?.id ? ServiceAgent.requestCourse.request_editrequestCourse : ServiceAgent.requestCourse.request_createrequestCourse,
        apiArguments: formData,
        onSuccess: (resp) => {
          if (resp?.status == 200 && resp?.data?.statusCode == 200) {
            setShowAddRequestCourse(false)
            setTitleValue('')
            getAllListCatableData()
          }
        },
        onStart: handleOpenLoadingOverlay,
        onEnd: handleCloseLoadingOverlay,
        onSuccessMessage: 'ثبت درخواست ها با موفقیت انجام شد'
      })
    }
  }

  useEffect(() => {
    if (!showAddRequestCourse) {
      setRequestCourseValue(undefined)
      setTitleValue('')
    }
  }, [showAddRequestCourse])

  return (
    <>
      <PageTitle breadcrumbs={[]}>لیست درخواست ها</PageTitle>
      <CustomerForBuyFilter searchCustomerHandle={searchCustomerHandle} />
      <div className={`card `}>
        {/* begin::Header */}
        <div className='card-header align-items-center border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bold fs-3 mb-1'>لیست درخواست ها</span>
            <span className='text-muted mt-1 fw-semibold fs-7'>{totalRecords} درخواست ها</span>
          </h3>
          {/* <Button onClick={() => {
            setShowAddRequestCourse(!showAddRequestCourse)
          }}><span className='me-1'>افزودن</span> <BsPlusSquare fontSize={20} /></Button> */}
        </div>
        {/* end::Header */}
        {/* begin::Body */}
        <div className='card-body py-3'>
          {/* begin::Table container */}
          <div className='table-responsive'>
            {RequestCourseIsFetch && (
              <div className='d-flex justify-content-center w-100'>
                <p>در حال بارگذاری ...</p>
              </div>
            )}
            {!RequestCourseIsFetch && RequestCourseListCartable?.length === 0 && (
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
                {!RequestCourseIsFetch &&
                  RequestCourseListCartable?.length > 0 &&
                  RequestCourseListCartable?.map((item) => (
                    <tr key={item.id} className='p-0 w-100 '>
                      <td style={{ verticalAlign: 'middle' }} className='  text-truncate '>
                        <div className='d-flex align-items-center px-3'>
                          <span className=''>{item?.phoneNumber}</span>
                        </div>
                      </td>
                      <td style={{ verticalAlign: 'middle' }} className='  text-truncate '>
                        {item?.favoriotArea}
                      </td>
                      <td style={{ verticalAlign: 'middle' }} className='  text-truncate '>
                        {item?.course?.title}
                      </td>
                      <td style={{ verticalAlign: 'middle' }} className='  text-truncate '>
                        {moment(item?.createdAt).format('jYYYY/jMM/jDD')}                      </td>
                      <td style={{ verticalAlign: 'middle' }} className=''>
                        <div className='d-flex justify-content-center flex-shrink-0'>
                          <div
                            onClick={() => {
                              setRequestCourseValue(item)
                              setShowAddRequestCourse(!showAddRequestCourse)
                            }}
                            style={{
                              width: '40px',
                              height: '34px',
                            }}
                            title='جزییات'
                            className='btn btn-icon btn-bg-primary btn-active-color-primary me-2'
                          >
                            <AiOutlineInfo color='#fff' fontSize={26} />
                          </div>
                          <div
                            onClick={() => {
                              setRequestId(item?.id as string);
                              setShowDeleteRequestCourse(true)
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
          onHide={() => setShowDeleteRequestCourse(!showDeleteRequestCourse)}
          show={showDeleteRequestCourse}
          className='modal-lg'
          dialogClassName='p-3'
        >
          <Modal.Header closeButton>
            <h3>حذف درخواست ها</h3>
          </Modal.Header>
          <Modal.Body>
            <div className='form-edit-Cartable'>
              <p>آیا میخواهید این درخواست ها را حذف کنید؟</p>
              <div className='d-flex w-100 justify-content-end'>
                <button onClick={deleteHandleRequestCourse} className='btn btn-primary mt-2 me-3'>
                  بلی
                </button>
                <button
                  className='btn btn-danger mt-2'
                  type='button'
                  onClick={() => {
                    setShowDeleteRequestCourse(false)
                  }}
                >
                  خیر
                </button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
        <Modal
          onHide={() => setShowAddRequestCourse(!showAddRequestCourse)}
          show={showAddRequestCourse}
          className='modal-lg'
          dialogClassName='p-3'
        >
          <Modal.Header closeButton>
            <h3>جزئیات درخواست</h3>
          </Modal.Header>
          <Modal.Body>
            <div className='form-edit-Cartable'>
              <div className='d-flex flex-wrap my-2'>
                <div className='col-4'>
                  <div className='d-flex align-items-center'>
                    <span>شماره تماس : </span> <span>{RequestCourseValue?.phoneNumber}</span>
                  </div>
                </div>
                <div className='col-4'>
                  <div className='d-flex align-items-center'>
                    <span>تاریخ ثبت : </span> <span>{moment(RequestCourseValue?.createdAt).format('jYYYY/jMM/jDD')}</span>
                  </div>
                </div>
                <div className='col-4'>
                  <div className='d-flex align-items-center'>
                    <span>حوزه علاقه مندی : </span> <span>{RequestCourseValue?.favoriotArea}</span>
                  </div>
                </div>
                <div className='col-12 mt-4'>
                  <h6>جزئیات دوره</h6>
                  <div className='d-flex flex-wrap'>
                    <div className='col-4'>
                      <div className='d-flex align-items-center'>
                        <span>نام دوره : </span> <span>{RequestCourseValue?.course?.title}</span>
                      </div>
                    </div>
                    <div className='col-4'>
                      <div className='d-flex align-items-center'>
                        <span>قیمت دوره : </span> <span>{formatPrice(RequestCourseValue?.course?.price)} تومان</span>
                      </div>
                    </div>
                    <div className='col-4'>
                      <div className='d-flex align-items-center'>
                        <span>نام مدرسین : </span> <span>{RequestCourseValue?.course?.teacher?.map(item => item?.name + ' , ')}</span>
                      </div>
                    </div>
                    <div className='col-4 mt-2'>
                      <div className='d-flex align-items-center'>
                        <span>دسته بندی دوره : </span> <span>{RequestCourseValue?.course?.category?.title}</span>
                      </div>
                    </div>
                    <div className='col-4 mt-2'>
                      <div className='d-flex align-items-center'>
                        <span>آموزشگاه : </span> <span>{RequestCourseValue?.course?.eductional?.name}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='d-flex w-100 justify-content-end'>
                {/* <button onClick={handleSubmit} className='btn btn-primary mt-2 me-3'>
                  ثبت
                </button> */}
                <button
                  className='btn btn-danger mt-2'
                  type='button'
                  onClick={() => {
                    setShowAddRequestCourse(false)
                  }}
                >
                  بستن
                </button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  )
}

export default RequestCourseListPage;