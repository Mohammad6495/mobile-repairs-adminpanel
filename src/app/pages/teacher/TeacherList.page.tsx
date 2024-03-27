import { useState, useEffect } from 'react'
import { useTable, useFilters, usePagination } from 'react-table'
import { Button, Modal, Table } from 'react-bootstrap'
import { PageTitle } from '../../../_metronic/layout/core'
import { apiCaller } from '../../hooks/useApi'
import { IUser, ITeacher } from '../../interfaces'
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
import useImageInput from '../../components/input/imageInput'

const TeacherListPage = () => {
  const navigate = useNavigate()
  ///states
  const [TeacherListCartable, setTeacherListCartable] = useState<ITeacher[]>([])
  const { handleOpenLoadingOverlay, handleCloseLoadingOverlay } = useLoadingContext()
  const [search, setSerach] = useState<string>()
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageSizeC, setPageSizeC] = useState<number>(15);
  const [totalRecords, setTotalRecords] = useState<any>()
  const [UsersIsFetch, setUsersIsFetch] = useState(false);
  const [ShowAddTeacher, setShowAddTeacher] = useState<boolean>(false);
  const [requestId, setRequestId] = useState<string>()
  const [RemoveTeacher, setRemoveTeacher] = useState(false)

  const {
    useChangeStatusList,
    useTeacherName,
    useWorkExperience,
    useDescription
  } = orderInputs;


  const {
    renderChangeStatusListSelectList, selectedChangeStatusList, setSelectedChangeStatusList, changeListStatus
  } = useChangeStatusList()

  const {
    Input: TeacherNameInput,
    Value: TeacherNameInputValue,
    validate: TeacherNameInputValidation
  } = useTeacherName({
    className: 'col-12',
    initialvalue: requestId ? TeacherListCartable.find(a => a.id == requestId)?.name : ''
  })
  const {
    Input: WorkExperienceInput,
    Value: WorkExperienceInputValue,
    validate: WorkExperienceInputValidation
  } = useWorkExperience({
    className: 'col-12',
    initialvalue: requestId ? TeacherListCartable.find(a => a.id == requestId)?.workExperience : ''
  })
  const {
    Input: DescriptionInput,
    Value: DescriptionInputValue,
    validate: DescriptionInputValidation
  } = useDescription({
    className: 'col-12',
    initialvalue: requestId ? TeacherListCartable.find(a => a.id == requestId)?.description : ''
  })
  const {
    imageRef: teacherImageInputRef,
    renderer: teacherImageInputRenderer,
    resetImage: teacherImageReset
  } = useImageInput({ initialValue: requestId ? fileBaseUrl + TeacherListCartable.find(a => a.id == requestId)?.image : '' });
  const getAllListCatableData = () => {
    apiCaller({
      api: ServiceAgent.teacher.request_getAllteachers,
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
          setTeacherListCartable((resp?.data?.data?.data as ITeacher[]))
          setTotalRecords(resp?.data?.data?.totalRecords)
        }
      },
      onErrorMessage: 'دریافت لیست خریدارن با خطا مواجه شد .',
    })
  }

  useEffect(() => {
    if (!TeacherListCartable || TeacherListCartable?.length == 0) {
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
      data: TeacherListCartable,
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
    document.title = 'پنل مدیریت - لیست مدرسین';
  }, [location?.pathname])

  const removeTeacherHandle = () => {
    if (!requestId) {
      return false
    }
    apiCaller({
      api: ServiceAgent.teacher.request_removeteacher,
      apiArguments: requestId,
      onSuccess: (resp) => {
        if (resp?.status == 200 && resp?.data?.statusCode == 200) {
          setRequestId(undefined)
          setRemoveTeacher(!RemoveTeacher);
          getAllListCatableData()
        }
      },
      onStart: handleOpenLoadingOverlay,
      onEnd: handleCloseLoadingOverlay
    })
  }
  const AddTeacherHandle = async () => {
    const v1 = await TeacherNameInputValidation();
    const formData = new FormData();
    if (requestId) {
      formData.append('id', requestId as any)
    }
    formData.append('name', TeacherNameInputValue as any)
    formData.append('image', teacherImageInputRef?.current?.files?.[0])
    formData.append('description', DescriptionInputValue as any)
    formData.append('workExperience', WorkExperienceInputValue as any)
    if (v1) {
      apiCaller({
        api: requestId ? ServiceAgent.teacher.request_editteacher : ServiceAgent.teacher.request_createteacher,
        apiArguments:formData,
        onSuccess: (resp) => {
          if (resp?.status == 200 && resp?.data?.statusCode == 200) {
            setRequestId(undefined)
            setShowAddTeacher(!ShowAddTeacher);
            getAllListCatableData()
          }
        },
        onStart: handleOpenLoadingOverlay,
        onEnd: handleCloseLoadingOverlay
      })
    }
  }

  useEffect(() => {
    if (!ShowAddTeacher) {
      if (requestId) {
        setRequestId(undefined)
        teacherImageReset()
      }
    }
  }, [ShowAddTeacher])
  return (
    <>
      <PageTitle breadcrumbs={[]}>لیست مدرسین</PageTitle>
      <CustomerForBuyFilter searchCustomerHandle={searchCustomerHandle} />
      <div className={`card `}>
        {/* begin::Header */}
        <div className='card-header align-items-center border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bold fs-3 mb-1'>لیست مدرسین</span>
            <span className='text-muted mt-1 fw-semibold fs-7'>{totalRecords} مدرسین</span>
          </h3>
          <Button onClick={() => {
            setShowAddTeacher(!ShowAddTeacher)
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
            {!UsersIsFetch && TeacherListCartable?.length === 0 && (
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
                  TeacherListCartable?.length > 0 &&
                  TeacherListCartable.map((item) => (
                    <tr key={item.id} className='p-0 w-100 '>
                      <td className='  text-truncate '>
                        {item?.name}
                      </td>
                      <td className=''>
                        <div className='d-flex justify-content-center'>
                          <div className='d-flex justify-content-center flex-shrink-0'>
                            <div
                              onClick={() => {
                                setRequestId(item?.id)
                                setShowAddTeacher(!ShowAddTeacher)
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
                                setRemoveTeacher(true)
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
          onHide={() => setShowAddTeacher(!ShowAddTeacher)}
          show={ShowAddTeacher}
          className='modal-md'
          dialogClassName='p-3'
        >
          <Modal.Header closeButton>
            {
              requestId ?
                <h3>ویرایش اساتید</h3>
                :
                <h3>اساتید جدید</h3>

            }
          </Modal.Header>
          <Modal.Body>
            <div className='form-edit-Cartable'>
              {TeacherNameInput()}
              {WorkExperienceInput()}
              {DescriptionInput()}
              {teacherImageInputRenderer({
                id: 'teacherImage',
                label: 'عکس مدرس',
                className: 'col-md-12 mt-2 pe-md-2 pe-0',
                required: false,
              })}
              <div className='d-flex w-100 justify-content-end'>
                <button onClick={AddTeacherHandle} className='btn btn-primary mt-2 me-3'>
                  {requestId ? 'ویرایش' : 'ثبت'}
                </button>
                <button
                  className='btn btn-danger mt-2'
                  type='button'
                  onClick={() => {
                    setShowAddTeacher(false)
                  }}
                >
                  خیر
                </button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
        <Modal
          onHide={() => setRemoveTeacher(!RemoveTeacher)}
          show={RemoveTeacher}
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
                <button onClick={removeTeacherHandle} className='btn btn-primary mt-2 me-3'>
                  بلی
                </button>
                <button
                  className='btn btn-danger mt-2'
                  type='button'
                  onClick={() => {
                    setRemoveTeacher(false)
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

export default TeacherListPage;