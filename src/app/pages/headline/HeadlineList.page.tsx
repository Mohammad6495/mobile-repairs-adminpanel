import { useState, useEffect } from 'react'
import { useTable, useFilters, usePagination } from 'react-table'
import { Button, Modal, Table } from 'react-bootstrap'
import { PageTitle } from '../../../_metronic/layout/core'
import { apiCaller } from '../../hooks/useApi'
import { ICourse, IEductional, IHeadline } from '../../interfaces'
import { ServiceAgent } from '../../services/serviceAgent'
import { useLoadingContext } from '../../contexts/loading/loading'
import { columns } from './dataTableService/_columns'
import { AiOutlineEdit } from 'react-icons/ai'
import { RiDeleteBin6Line, RiVideoAddFill } from 'react-icons/ri'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../modules/auth'
import CustomerForBuyFilter from '../../components/filter-customer/CustomerForBuyFilter'
import { BsPlusSquare } from 'react-icons/bs'
import * as productInputs from '../../components/productInputs'
import { locationSearchStringToObject } from '../../utils/queystringHelper'

const HeadlineListPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { id } = useParams()
  ///states
  const [HeadlineListCartable, setHeadlineListCartable] = useState<IHeadline[]>([])
  const { handleOpenLoadingOverlay, handleCloseLoadingOverlay } = useLoadingContext()
  const [search, setSerach] = useState<string>()
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [requestId, setRequestId] = useState<string>()
  const [pageSizeC, setPageSizeC] = useState<number>(15);
  const [totalRecords, setTotalRecords] = useState<any>()
  const [HeadlineIsFetch, setHeadlineIsFetch] = useState(false);
  const [showDeleteHeadline, setShowDeleteHeadline] = useState(false)
  const [showAddHeadline, setShowAddHeadline] = useState(false)
  const [showAddEductionalVideo, setShowAddEductionalVideo] = useState(false)
  const [HeadlineValue, setHeadlineValue] = useState<IHeadline>()
  const [EductionalValue, setEductionalValueVideo] = useState<IEductional>()
  const [eductionalVideos, setEductionalVideos] = useState<IEductional[]>([])
  const [CourseDetail, setCourseDetail] = useState<ICourse>()

  const getAllListCatableData = () => {
    apiCaller({
      api: ServiceAgent.headline.request_getAllheadlines,
      apiArguments: {
        currentPage: currentPage + 1,
        pageSize: pageSizeC,
        search: search,
        courseId: id
      },
      toastMessage: true,
      onStart: () => {
        setHeadlineIsFetch(true)
        if (!search)
          handleOpenLoadingOverlay()
      },
      onEnd: () => {
        setHeadlineIsFetch(false)
        if (!search)
          handleCloseLoadingOverlay()
      },
      onSuccess: (resp) => {
        if (resp.status == 200 && resp?.data?.statusCode == 200) {
          setHeadlineListCartable((resp?.data?.data?.data as IHeadline[]))
          setTotalRecords(resp?.data?.data?.totalRecords)
        }
      },
      onErrorMessage: 'دریافت لیست خریدارن با خطا مواجه شد .',
    })
  }

  useEffect(() => {
    if (!HeadlineListCartable || HeadlineListCartable?.length == 0) {
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
      data: HeadlineListCartable,
      initialState: { pageIndex: currentPage, pageSize: pageSizeC } as any,
    },
    useFilters,
    usePagination
  ) as any


  const searchCustomerHandle = (searchValue: string): void => {
    setSerach(searchValue)
  }


  useEffect(() => {
    document.title = 'پنل مدیریت - لیست سرفصل';
  }, [location?.pathname])

  const {
    Input: titleInput,
    Value: titleValue,
    setInputValue: setTitleValue,
    validate: titleInputValid
  } = productInputs?.useTitleInput({
    initialvalue: HeadlineValue?.title || '',
    className: 'col-12'
  })
  const {
    Input: titleEductionalInput,
    Value: titleEductionalValue,
    setInputValue: setTitleEductionalValue,
    validate: titleEductionalInputValid
  } = productInputs?.useTitleInput({
    initialvalue: EductionalValue?.title || '',
    className: 'col-12'
  })
  const {
    Input: descriptionInput,
    Value: descriptionValue,
    setInputValue: setDescriptionValue,
    validate: descriptionInputValid
  } = productInputs?.useDescriptionInput({
    initialvalue: HeadlineValue?.description || '',
    className: 'col-12'
  })
  const {
    Input: VideoTimeInput,
    Value: VideoTimeValue,
    setInputValue: setVideoTimeValue,
    validate: VideoTimeInputValid
  } = productInputs?.useVideoTime({
    initialvalue: EductionalValue?.videoTime || '',
    className: 'col-12'
  })

  const deleteHandleHeadline = () => {
    if (requestId) {
      apiCaller({
        api: ServiceAgent.headline.request_removeheadline,
        apiArguments: requestId,
        onSuccess: (resp) => {
          if (resp?.status == 200 && resp?.data?.statusCode == 200) {
            setShowDeleteHeadline(false)
            getAllListCatableData()
          }
        },
        onStart: handleOpenLoadingOverlay,
        onEnd: handleCloseLoadingOverlay,
        onSuccessMessage: 'حذف دوره با موفقیت انجام شد'
      })
    }
  }

  const handleSubmit = async () => {
    const v1 = await titleInputValid();
    const formData = new FormData();
    let apiObject: any = {
      title: titleValue,
      course: id,
      description: descriptionValue,
    }
    if (HeadlineValue?.id) {
      apiObject.id = HeadlineValue?.id
    }

    if (v1) {
      apiCaller({
        api: HeadlineValue?.id ? ServiceAgent.headline.request_editheadline : ServiceAgent.headline.request_createheadline,
        apiArguments: apiObject,
        onSuccess: (resp) => {
          if (resp?.status == 200 && resp?.data?.statusCode == 200) {
            setShowAddHeadline(false)
            setTitleValue('')
            setDescriptionValue('')
            getAllListCatableData()
          }
        },
        onStart: handleOpenLoadingOverlay,
        onEnd: handleCloseLoadingOverlay,
        onSuccessMessage: 'ثبت سرفصل با موفقیت انجام شد'
      })
    }
  }

  useEffect(() => {
    if (!showAddHeadline) {
      setHeadlineValue(undefined)
      setTitleValue('')
    }
  }, [showAddHeadline])


  const getDetailCourse = () => {
    apiCaller({
      api: ServiceAgent.course.request_getDetailProducts,
      apiArguments: id,
      onSuccess: (resp) => {
        if (resp?.status == 200 && resp?.data?.statusCode == 200) {
          setCourseDetail(resp?.data?.data)
        }
      },
      onStart: handleOpenLoadingOverlay,
      onEnd: handleCloseLoadingOverlay,
      onErrorMessage: 'عملیات دریافت اطلاعات با خطا مواجهه شد'
    })
  }

  useEffect(() => {
    if (id) {
      getDetailCourse()
    }
  }, [id])

  const handleGetEductionalVideo = () => {
    apiCaller({
      api: ServiceAgent.eductionalVideo.request_getAlleductionalVideos,
      apiArguments: {
        pageSize: 1000,
        currentPage: 1,
        headlineId: HeadlineValue?.id
      },
      onSuccess: (resp) => {
        if (resp?.status == 200 && resp?.data?.statusCode == 200) {
          setEductionalVideos(resp?.data?.data?.data)
        }
      },
      onStart: handleOpenLoadingOverlay,
      onEnd: handleCloseLoadingOverlay,
    })
  }

  useEffect(() => {
    if (HeadlineValue) {
      handleGetEductionalVideo()
    }
  }, [HeadlineValue])

  const handleCreateEductionVideo = () => {
    if (HeadlineValue) {
      apiCaller({
        api: !EductionalValue?.id ?
          ServiceAgent.eductionalVideo.request_createeductionalVideo :
          ServiceAgent.eductionalVideo.request_editeductionalVideo,
        apiArguments: {
          id: EductionalValue?.id ?? null,
          title: titleEductionalValue,
          headLine: HeadlineValue?.id,
          videoTime: VideoTimeValue
        },
        onSuccess: (resp) => {
          if (resp?.status == 200 && resp?.data?.statusCode == 200) {
            setTitleEductionalValue('');
            setEductionalValueVideo(undefined)
            setVideoTimeValue('');
            handleGetEductionalVideo()
          }
        },
        onStart: handleOpenLoadingOverlay,
        onEnd: handleCloseLoadingOverlay,
        onSuccessMessage: 'عملیات با موفقیت انجام شد'
      })
    }
  }

  const handleDeleteEductionaVideo = (id: string) => {
    apiCaller({
      api: ServiceAgent.eductionalVideo.request_removeeductionalVideo,
      apiArguments: id,
      onSuccess: (resp) => {
        if (resp?.status == 200 && resp?.data?.statusCode == 200) {
          handleGetEductionalVideo()
        }
      },
      onStart: handleOpenLoadingOverlay,
      onEnd: handleCloseLoadingOverlay,
      onSuccessMessage: 'حذف ویدیو با موفقیت انجام شده است'
    })
  }

  useEffect(() => {
    if (!showAddEductionalVideo) {
      setEductionalValueVideo(undefined)
    }
  }, [showAddEductionalVideo])
  return (
    <>
      <PageTitle breadcrumbs={[]}>لیست سرفصل دروه {CourseDetail?.title}</PageTitle>
      <CustomerForBuyFilter searchCustomerHandle={searchCustomerHandle} />
      <div className={`card `}>
        {/* begin::Header */}
        <div className='card-header align-items-center border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bold fs-3 mb-1'>لیست سرفصل دروه {CourseDetail?.title}</span>
            <span className='text-muted mt-1 fw-semibold fs-7'>{totalRecords} سرفصل</span>
          </h3>
          <Button onClick={() => {
            setShowAddHeadline(!showAddHeadline)
          }}><span className='me-1'>افزودن</span> <BsPlusSquare fontSize={20} /></Button>
        </div>
        {/* end::Header */}
        {/* begin::Body */}
        <div className='card-body py-3'>
          {/* begin::Table container */}
          <div className='table-responsive'>
            {HeadlineIsFetch && (
              <div className='d-flex justify-content-center w-100'>
                <p>در حال بارگذاری ...</p>
              </div>
            )}
            {!HeadlineIsFetch && HeadlineListCartable?.length === 0 && (
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
                {!HeadlineIsFetch &&
                  HeadlineListCartable?.length > 0 &&
                  HeadlineListCartable?.map((item) => (
                    <tr key={item.id} className='p-0 w-100 '>
                      <td style={{ verticalAlign: 'middle' }} className='  text-truncate '>
                        <span className=''>{item?.title}</span>
                      </td>
                      <td style={{ verticalAlign: 'middle' }} className='  text-truncate '>
                        {item?.eductionals?.length}
                      </td>
                      <td style={{ verticalAlign: 'middle' }} className='  text-truncate '>
                        {item?.isAvailable ? 'فعال' : 'غیر فعال'}
                      </td>
                      <td style={{ verticalAlign: 'middle' }} className=''>
                        <div className='d-flex justify-content-center flex-shrink-0'>
                          <div
                            onClick={() => {
                              setHeadlineValue(item)
                              setShowAddEductionalVideo(!showAddEductionalVideo)
                            }}
                            style={{
                              width: '40px',
                              height: '34px',
                            }}
                            title='افزورن ویدیو'
                            className='btn btn-icon btn-bg-primary btn-active-color-primary me-2'
                          >
                            <RiVideoAddFill color='#fff' fontSize={22} />
                          </div>
                          <div
                            onClick={() => {
                              setHeadlineValue(item)
                              setShowAddHeadline(!showAddHeadline)
                            }}
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
                              setRequestId(item?.id as string);
                              setShowDeleteHeadline(true)
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
          onHide={() => setShowDeleteHeadline(!showDeleteHeadline)}
          show={showDeleteHeadline}
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
                <button onClick={deleteHandleHeadline} className='btn btn-primary mt-2 me-3'>
                  بلی
                </button>
                <button
                  className='btn btn-danger mt-2'
                  type='button'
                  onClick={() => {
                    setShowDeleteHeadline(false)
                  }}
                >
                  خیر
                </button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
        <Modal
          onHide={() => setShowAddHeadline(!showAddHeadline)}
          show={showAddHeadline}
          className='modal-lg'
          dialogClassName='p-3'
        >
          <Modal.Header closeButton>
            <h3>افزودن سرفصل</h3>
          </Modal.Header>
          <Modal.Body>
            <div className='form-edit-Cartable'>
              <form>
                {titleInput()}
                {descriptionInput()}
              </form>
              <div className='d-flex w-100 justify-content-end'>
                <button onClick={handleSubmit} className='btn btn-primary mt-2 me-3'>
                  ثبت
                </button>
                <button
                  className='btn btn-danger mt-2'
                  type='button'
                  onClick={() => {
                    setShowAddHeadline(false)
                  }}
                >
                  خیر
                </button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
        <Modal
          onHide={() => setShowAddEductionalVideo(!showAddEductionalVideo)}
          show={showAddEductionalVideo}
          className='modal-lg'
          dialogClassName='p-3'
        >
          <Modal.Header closeButton>
            <h3>افزودن ویدیو</h3>
          </Modal.Header>
          <Modal.Body>
            <div className='form-edit-Cartable'>
              <form>
                {titleEductionalInput()}
                {VideoTimeInput()}
              </form>
              {
                eductionalVideos?.length != 0 &&
                <>
                  <h6>لیست ویدیو ها :</h6>
                  <hr />
                  <div className='d-flex flex-column w-100'>
                    {
                      eductionalVideos?.map((item, index) => (
                        <div key={item?.id} className='d-flex mb-2 align-items-center justify-content-between p-2 border rounded'>
                          <span>{index + 1} - {item?.title}</span>
                          <div className='d-flex align-items-center'>
                            <div
                              onClick={() => {
                                setEductionalValueVideo(item)
                              }}
                              style={{
                                width: '20px',
                                height: '22px',
                              }}
                              title='ویرایش'
                              className='btn btn-icon btn-bg-success btn-active-color-primary me-2'
                            >
                              <AiOutlineEdit color='#fff' fontSize={17} />
                            </div>
                            <div
                              onClick={() => handleDeleteEductionaVideo(String(item?.id))}
                              style={{
                                width: '20px',
                                height: '22px',
                              }}
                              title='حذف'
                              className='btn btn-icon btn-bg-danger btn-active-color-primary me-2'
                            >
                              <RiDeleteBin6Line color='#fff' fontSize={17} />
                            </div>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                  <hr />
                </>
              }
              <div className='d-flex w-100 justify-content-end'>
                <button onClick={handleCreateEductionVideo} className='btn btn-primary mt-2 me-3'>
                  {EductionalValue ? 'ویرایش' : 'ثبت'}
                </button>
                <button
                  className='btn btn-danger mt-2'
                  type='button'
                  onClick={() => {
                    setShowAddEductionalVideo(false)
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

export default HeadlineListPage;