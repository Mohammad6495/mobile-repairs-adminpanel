import { useState, useEffect } from 'react'
import { useTable, useFilters, usePagination } from 'react-table'
import { Button, Modal, Table } from 'react-bootstrap'
import { PageTitle } from '../../../_metronic/layout/core'
import { apiCaller } from '../../hooks/useApi'
import { IFamiliarService } from '../../interfaces'
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
import { BsPlusSquare } from 'react-icons/bs'
import * as productInputs from '../../components/productInputs'
import useImageInput from '../../components/input/imageInput'
import moment from 'jalali-moment'
const FamiliarServiceListPage = () => {
  const navigate = useNavigate()

  const { userInfo } = useAuth()

  ///states
  const [FamiliarServiceListCartable, setFamiliarServiceListCartable] = useState<IFamiliarService[]>([])
  const { handleOpenLoadingOverlay, handleCloseLoadingOverlay } = useLoadingContext()
  const [search, setSerach] = useState<string>()
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [requestId, setRequestId] = useState<string>()
  const [pageSizeC, setPageSizeC] = useState<number>(15);
  const [totalRecords, setTotalRecords] = useState<any>()
  const [FamiliarServiceIsFetch, setFamiliarServiceIsFetch] = useState(false);
  const [showDeleteFamiliarService, setShowDeleteFamiliarService] = useState(false)
  const [showAddFamiliarService, setShowAddFamiliarService] = useState(false)
  const [FamiliarServiceValue, setFamiliarServiceValue] = useState<IFamiliarService>()

  const getAllListCatableData = () => {
    apiCaller({
      api: ServiceAgent.familiarService.request_getAllfamiliarservices,
      apiArguments: {
        currentPage: currentPage + 1,
        pageSize: pageSizeC,
        search: search,
      },
      toastMessage: true,
      onStart: () => {
        setFamiliarServiceIsFetch(true)
        if (!search)
          handleOpenLoadingOverlay()
      },
      onEnd: () => {
        setFamiliarServiceIsFetch(false)
        if (!search)
          handleCloseLoadingOverlay()
      },
      onSuccess: (resp) => {
        if (resp.status == 200 && resp?.data?.statusCode == 200) {
          setFamiliarServiceListCartable((resp?.data?.data?.data as IFamiliarService[]))
          setTotalRecords(resp?.data?.data?.totalRecords)
        }
      },
      onErrorMessage: 'دریافت لیست خریدارن با خطا مواجه شد .',
    })
  }

  useEffect(() => {
    if (!FamiliarServiceListCartable || FamiliarServiceListCartable?.length == 0) {
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
      data: FamiliarServiceListCartable,
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
    document.title = 'پنل مدیریت - لیست آشنایی با خدمات';
  }, [location?.pathname])

  const {
    Input: titleInput,
    Value: titleValue,
    setInputValue: setTitleValue,
    validate: titleInputValid
  } = productInputs?.useTitleInput({
    initialvalue: FamiliarServiceValue?.phoneNumber || '',
    className: 'col-12'
  })



  const deleteHandleFamiliarService = () => {
    if (requestId) {
      apiCaller({
        api: ServiceAgent.familiarService.request_removefamiliarservice,
        apiArguments: requestId,
        onSuccess: (resp) => {
          if (resp?.status == 200 && resp?.data?.statusCode == 200) {
            setShowDeleteFamiliarService(false)
            getAllListCatableData()
          }
        },
        onStart: handleOpenLoadingOverlay,
        onEnd: handleCloseLoadingOverlay,
        onSuccessMessage: 'حذف آشنایی با خدمات با موفقیت انجام شد'
      })
    }
  }

  const handleSubmit = async () => {
    const v1 = await titleInputValid();
    const formData = new FormData();
    if (FamiliarServiceValue?.id) {
      formData.append('id', FamiliarServiceValue?.id as any)
    }
    formData.append('title', titleValue as any)

    if (v1) {
      apiCaller({
        api: FamiliarServiceValue?.id ? ServiceAgent.familiarService.request_editfamiliarservice : ServiceAgent.familiarService.request_createfamiliarservice,
        apiArguments: formData,
        onSuccess: (resp) => {
          if (resp?.status == 200 && resp?.data?.statusCode == 200) {
            setShowAddFamiliarService(false)
            setTitleValue('')
            getAllListCatableData()
          }
        },
        onStart: handleOpenLoadingOverlay,
        onEnd: handleCloseLoadingOverlay,
        onSuccessMessage: 'ثبت آشنایی با خدمات با موفقیت انجام شد'
      })
    }
  }

  useEffect(() => {
    if (!showAddFamiliarService) {
      setFamiliarServiceValue(undefined)
      setTitleValue('')
    }
  }, [showAddFamiliarService])

  return (
    <>
      <PageTitle breadcrumbs={[]}>لیست آشنایی با خدمات</PageTitle>
      <CustomerForBuyFilter searchCustomerHandle={searchCustomerHandle} />
      <div className={`card `}>
        {/* begin::Header */}
        <div className='card-header align-items-center border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bold fs-3 mb-1'>لیست آشنایی با خدمات</span>
            <span className='text-muted mt-1 fw-semibold fs-7'>{totalRecords} آشنایی با خدمات</span>
          </h3>
          {/* <Button onClick={() => {
            setShowAddFamiliarService(!showAddFamiliarService)
          }}><span className='me-1'>افزودن</span> <BsPlusSquare fontSize={20} /></Button> */}
        </div>
        {/* end::Header */}
        {/* begin::Body */}
        <div className='card-body py-3'>
          {/* begin::Table container */}
          <div className='table-responsive'>
            {FamiliarServiceIsFetch && (
              <div className='d-flex justify-content-center w-100'>
                <p>در حال بارگذاری ...</p>
              </div>
            )}
            {!FamiliarServiceIsFetch && FamiliarServiceListCartable?.length === 0 && (
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
                {!FamiliarServiceIsFetch &&
                  FamiliarServiceListCartable?.length > 0 &&
                  FamiliarServiceListCartable?.map((item) => (
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
                        {moment(item?.createdAt).format('jYYYY/jMM/jDD')}
                      </td>
                      <td style={{ verticalAlign: 'middle' }} className=''>
                        <div className='d-flex justify-content-center flex-shrink-0'>
                          {/* <div
                            onClick={() => {
                              setFamiliarServiceValue(item)
                              setShowAddFamiliarService(!showAddFamiliarService)
                            }}
                            style={{
                              width: '40px',
                              height: '34px',
                            }}
                            title='جزییات'
                            className='btn btn-icon btn-bg-success btn-active-color-primary me-2'
                          >
                            <AiOutlineEdit color='#fff' fontSize={22} />
                          </div> */}
                          <div
                            onClick={() => {
                              setRequestId(item?.id as string);
                              setShowDeleteFamiliarService(true)
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
          onHide={() => setShowDeleteFamiliarService(!showDeleteFamiliarService)}
          show={showDeleteFamiliarService}
          className='modal-lg'
          dialogClassName='p-3'
        >
          <Modal.Header closeButton>
            <h3>حذف آشنایی با خدمات</h3>
          </Modal.Header>
          <Modal.Body>
            <div className='form-edit-Cartable'>
              <p>آیا میخواهید این آشنایی با خدمات را حذف کنید؟</p>
              <div className='d-flex w-100 justify-content-end'>
                <button onClick={deleteHandleFamiliarService} className='btn btn-primary mt-2 me-3'>
                  بلی
                </button>
                <button
                  className='btn btn-danger mt-2'
                  type='button'
                  onClick={() => {
                    setShowDeleteFamiliarService(false)
                  }}
                >
                  خیر
                </button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
        <Modal
          onHide={() => setShowAddFamiliarService(!showAddFamiliarService)}
          show={showAddFamiliarService}
          className='modal-lg'
          dialogClassName='p-3'
        >
          <Modal.Header closeButton>
            <h3>افزودن آشنایی با خدمات</h3>
          </Modal.Header>
          <Modal.Body>
            <div className='form-edit-Cartable'>
              <form>
                {titleInput()}

                {/* {isAvailableRender({ className: 'col-12 mt-2 mb-4' })} */}
                {/* {productImageInputRenderer({
                  id: 'productImage',
                  label: 'عکس آشنایی با خدمات',
                  className: 'col-md-6 mt-2 pe-md-2 pe-0',
                  required: false,
                })} */}
              </form>
              <div className='d-flex w-100 justify-content-end'>
                <button onClick={handleSubmit} className='btn btn-primary mt-2 me-3'>
                  ثبت
                </button>
                <button
                  className='btn btn-danger mt-2'
                  type='button'
                  onClick={() => {
                    setShowAddFamiliarService(false)
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

export default FamiliarServiceListPage;