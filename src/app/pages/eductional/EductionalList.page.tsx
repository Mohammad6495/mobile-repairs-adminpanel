import { useState, useEffect } from 'react'
import { useTable, useFilters, usePagination } from 'react-table'
import { Button, Modal, Table } from 'react-bootstrap'
import { PageTitle } from '../../../_metronic/layout/core'
import { apiCaller } from '../../hooks/useApi'
import { IUser, IEductional } from '../../interfaces'
import { ServiceAgent } from '../../services/serviceAgent'
import { useLoadingContext } from '../../contexts/loading/loading'
import { columns } from './dataTableService/_columns'
import { useLocation, useNavigate } from 'react-router-dom'
import { fileBaseUrl } from '../../services/SERVICE-CONSTANTS'
import CustomerForBuyFilter from '../../components/filter-customer/CustomerForBuyFilter'
import { HiOutlineLogin } from 'react-icons/hi'
import { formatPrice } from '../../utils/utility'
import { GoInfo } from 'react-icons/go'
import { LiaEdit, LiaExchangeAltSolid } from 'react-icons/lia'
import * as orderInputs from '../../components/orderInput'
import { CgBlock, CgRemove, CgUnblock } from 'react-icons/cg'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { BsPlusSquare } from 'react-icons/bs'

const EductionalListPage = () => {
  const navigate = useNavigate()
  ///states
  const [EductionalListCartable, setEductionalListCartable] = useState<IEductional[]>([])
  const { handleOpenLoadingOverlay, handleCloseLoadingOverlay } = useLoadingContext()
  const [search, setSerach] = useState<string>()
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageSizeC, setPageSizeC] = useState<number>(15);
  const [totalRecords, setTotalRecords] = useState<any>()
  const [UsersIsFetch, setUsersIsFetch] = useState(false);
  const [ShowAddEductional, setShowAddEductional] = useState<boolean>(false);
  const [requestId, setRequestId] = useState<string>()
  const [RemoveEductional, setRemoveEductional] = useState(false)

  const {
    useChangeStatusList,
    useEductionalName,
    useEductionalDescription
  } = orderInputs;


  const {
    renderChangeStatusListSelectList, selectedChangeStatusList, setSelectedChangeStatusList, changeListStatus
  } = useChangeStatusList()

  const {
    Input: EductionalNameInput,
    Value: EductionalNameInputValue,
    validate: EductionalNameInputValidation
  } = useEductionalName({
    className: 'col-12',
    initialvalue: requestId ? EductionalListCartable.find(a => a.id == requestId)?.name : ''
  })

  const {
    Input: EductionalDescriptionInput,
    Value: EductionalDescriptionInputValue,
    validate: EductionalDescriptionInputValidation
  } = useEductionalDescription({
    className: 'col-12 mt-3',
    initialvalue: requestId ? EductionalListCartable.find(a => a.id == requestId)?.description : ''
  })

  const getAllListCatableData = () => {
    apiCaller({
      api: ServiceAgent.eductional.request_getAlleductionals,
      apiArguments: {
        currentPage: currentPage + 1,
        pageSize: pageSizeC,
        search: search,
      },
      toastMessage: true,
      onStart: () => {
        setUsersIsFetch(true)
      },
      onEnd: () => {
        setUsersIsFetch(false)
      },
      onSuccess: (resp) => {
        if (resp.status == 200 && resp?.data?.statusCode == 200) {
          setEductionalListCartable((resp?.data?.data?.data as IEductional[]))
          setTotalRecords(resp?.data?.data?.totalRecords)
        }
      },
      onErrorMessage: 'دریافت لیست خریدارن با خطا مواجه شد .',
    })
  }

  useEffect(() => {
    if (!EductionalListCartable || EductionalListCartable?.length == 0) {
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
      data: EductionalListCartable,
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
    document.title = 'پنل مدیریت - لیست آموزشگاه';
  }, [location?.pathname])

  const removeEductionalHandle = () => {
    if (!requestId) {
      return false
    }
    apiCaller({
      api: ServiceAgent.eductional.request_removeeductional,
      apiArguments: requestId,
      onSuccess: (resp) => {
        if (resp?.status == 200 && resp?.data?.statusCode == 200) {
          setRequestId(undefined)
          setRemoveEductional(!RemoveEductional);
          getAllListCatableData()
        }
      },
      onStart: handleOpenLoadingOverlay,
      onEnd: handleCloseLoadingOverlay
    })
  }
  const AddEductionalHandle = async () => {
    const v1 = await EductionalNameInputValidation()
    if (v1) {
      apiCaller({
        api: requestId ? ServiceAgent.eductional.request_editeductional : ServiceAgent.eductional.request_createeductional,
        apiArguments: {
          id: requestId || '',
          name: EductionalNameInputValue,
          description: EductionalDescriptionInputValue
        },
        onSuccess: (resp) => {
          if (resp?.status == 200 && resp?.data?.statusCode == 200) {
            setRequestId(undefined)
            setShowAddEductional(!ShowAddEductional);
            getAllListCatableData()
          }
        },
        onStart: handleOpenLoadingOverlay,
        onEnd: handleCloseLoadingOverlay
      })
    }
  }
  useEffect(() => {
    if (!ShowAddEductional) {
      if (requestId) {
        setRequestId(undefined)
      }
    }
  }, [ShowAddEductional])
  return (
    <>
      <PageTitle breadcrumbs={[]}>لیست آموزشگاه</PageTitle>
      <CustomerForBuyFilter searchCustomerHandle={searchCustomerHandle} />
      <div className={`card `}>
        {/* begin::Header */}
        <div className='card-header align-items-center border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bold fs-3 mb-1'>لیست آموزشگاه</span>
            <span className='text-muted mt-1 fw-semibold fs-7'>{totalRecords} آموزشگاه</span>
          </h3>
          <Button onClick={() => {
            setShowAddEductional(!ShowAddEductional)
          }}><span className='me-1'>افزودن</span> <BsPlusSquare fontSize={20} /></Button>
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
            {!UsersIsFetch && EductionalListCartable?.length === 0 && (
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
                  EductionalListCartable?.length > 0 &&
                  EductionalListCartable.map((item) => (
                    <tr key={item.id} className='p-0 w-100 '>
                      <td className='  text-truncate '>
                        {item?.name}
                      </td>
                      <td className='  text-truncate '>
                        {item?.description}
                      </td>
                      <td className=''>
                        <div className='d-flex justify-content-center'>
                          <div className='d-flex justify-content-center flex-shrink-0'>
                            <div
                              onClick={() => {
                                setRequestId(item?.id)
                                setShowAddEductional(!ShowAddEductional)
                              }}
                              style={{
                                width: '30px',
                                height: '27px',
                              }}
                              title='ویرایش'
                              className='btn btn-icon btn-bg-success btn-active-color-success me-2'
                            >
                              <LiaEdit color='#fff' fontSize={20} />
                            </div>
                          </div>

                          <div className='d-flex justify-content-center flex-shrink-0'>
                            <div
                              onClick={() => {
                                setRequestId(item?.id)
                                setRemoveEductional(true)
                              }}
                              style={{
                                width: '30px',
                                height: '27px',
                              }}
                              title='حذف'
                              className='btn btn-icon btn-bg-danger btn-active-color-danger me-2'
                            >
                              <RiDeleteBin6Line color='#fff' fontSize={20} />
                            </div>
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
        <Modal
          onHide={() => setShowAddEductional(!ShowAddEductional)}
          show={ShowAddEductional}
          className='modal-md'
          dialogClassName='p-3'
        >
          <Modal.Header closeButton>
            {
              requestId ?
                <h3>ویرایش آموزشگاه</h3>
                :
                <h3>آموزشگاه جدید</h3>

            }
          </Modal.Header>
          <Modal.Body>
            <div className='form-edit-Cartable'>
              {EductionalNameInput()}
              {EductionalDescriptionInput()}
              <div className='d-flex w-100 justify-content-end'>
                <button onClick={AddEductionalHandle} className='btn btn-primary mt-2 me-3'>
                  {requestId ? 'ویرایش' : 'ثبت'}
                </button>
                <button
                  className='btn btn-danger mt-2'
                  type='button'
                  onClick={() => {
                    setShowAddEductional(false)
                  }}
                >
                  خیر
                </button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
        <Modal
          onHide={() => setRemoveEductional(!RemoveEductional)}
          show={RemoveEductional}
          className='modal-mb'
          dialogClassName='p-3'
        >
          <Modal.Header closeButton>
            <h3>حذف مدرسین</h3>
          </Modal.Header>
          <Modal.Body>
            <div className='form-edit-Cartable'>
              <p>آیا میخواهید این مدرسین را حذف نمایید؟</p>
              <div className='d-flex w-100 justify-content-end'>
                <button onClick={removeEductionalHandle} className='btn btn-primary mt-2 me-3'>
                  بلی
                </button>
                <button
                  className='btn btn-danger mt-2'
                  type='button'
                  onClick={() => {
                    setRemoveEductional(false)
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

export default EductionalListPage;