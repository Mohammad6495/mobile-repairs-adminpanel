import { useState, useEffect } from 'react'
import { useTable, useFilters, usePagination } from 'react-table'
import { Button, Modal, Table } from 'react-bootstrap'
import { PageTitle } from '../../../_metronic/layout/core'
import { apiCaller } from '../../hooks/useApi'
import { ICategory } from '../../interfaces'
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

const CategoryListPage = () => {
  const navigate = useNavigate()

  const { userInfo } = useAuth()

  ///states
  const [CategoryListCartable, setCategoryListCartable] = useState<ICategory[]>([])
  const { handleOpenLoadingOverlay, handleCloseLoadingOverlay } = useLoadingContext()
  const [search, setSerach] = useState<string>()
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [requestId, setRequestId] = useState<string>()
  const [pageSizeC, setPageSizeC] = useState<number>(15);
  const [totalRecords, setTotalRecords] = useState<any>()
  const [CategoryIsFetch, setCategoryIsFetch] = useState(false);
  const [showDeleteCategory, setShowDeleteCategory] = useState(false)
  const [showAddCategory, setShowAddCategory] = useState(false)
  const [categoryValue, setCategoryValue] = useState<ICategory>()

  const getAllListCatableData = () => {
    apiCaller({
      api: ServiceAgent.category.request_getAllcategorys,
      apiArguments: {
        currentPage: currentPage + 1,
        pageSize: pageSizeC,
        search: search,
      },
      toastMessage: true,
      onStart: () => {
        setCategoryIsFetch(true)
        if (!search)
          handleOpenLoadingOverlay()
      },
      onEnd: () => {
        setCategoryIsFetch(false)
        if (!search)
          handleCloseLoadingOverlay()
      },
      onSuccess: (resp) => {
        if (resp.status == 200 && resp?.data?.statusCode == 200) {
          setCategoryListCartable((resp?.data?.data?.data as ICategory[]))
          setTotalRecords(resp?.data?.data?.totalRecords)
        }
      },
      onErrorMessage: 'دریافت لیست خریدارن با خطا مواجه شد .',
    })
  }

  useEffect(() => {
    if (!CategoryListCartable || CategoryListCartable?.length == 0) {
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
      data: CategoryListCartable,
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
    document.title = 'پنل مدیریت - لیست دسته بندی';
  }, [location?.pathname])

  const {
    Input: titleInput,
    Value: titleValue,
    setInputValue: setTitleValue,
    validate: titleInputValid
  } = productInputs?.useTitleInput({
    initialvalue: categoryValue?.title || '',
    className: 'col-12'
  })

  const {
    isTrue: isAvailable,
    renderYesNoInput: isAvailableRender,
    setIsTrue: setIsAvailable
  } = productInputs?.useYesNoInput({
    id: 'isAvailable',
    initialvalue: categoryValue?.isAvailable || false,
    title: 'وضعیت نمایش'
  })

  const {
    imageRef: productImageInputRef,
    renderer: productImageInputRenderer,
    resetImage: productImageReset
  } = useImageInput({ initialValue: categoryValue?.image || '' });


  const deleteHandleCategory = () => {
    if (requestId) {
      apiCaller({
        api: ServiceAgent.category.request_removeCategory,
        apiArguments: requestId,
        onSuccess: (resp) => {
          if (resp?.status == 200 && resp?.data?.statusCode == 200) {
            setShowDeleteCategory(false)
            getAllListCatableData()
          }
        },
        onStart: handleOpenLoadingOverlay,
        onEnd: handleCloseLoadingOverlay,
        onSuccessMessage: 'حذف دوره با موفقیت انجام شد'
      })
    }
  }

  const {
    imageRef: CategryImageInputRef,
    renderer: CategryImageInputRenderer,
    resetImage,
    imageSrc: CategryImageInputSrc
  } = useImageInput({ initialValue: fileBaseUrl + categoryValue?.image || '' });
  const handleSubmit = async () => {
    const v1 = await titleInputValid();
    const formData = new FormData();
    if (categoryValue?.id) {
      formData.append('id', categoryValue?.id as any)
    }
    formData.append('title', titleValue as any)
    if (CategryImageInputRef?.current?.files?.[0]) {
      formData.append('image', CategryImageInputRef?.current?.files?.[0])
    }
    if (v1) {
      apiCaller({
        api: categoryValue?.id ? ServiceAgent.category.request_editCategory : ServiceAgent.category.request_createCategory,
        apiArguments: formData,
        onSuccess: (resp) => {
          if (resp?.status == 200 && resp?.data?.statusCode == 200) {
            setShowAddCategory(false)
            setIsAvailable(false)
            setTitleValue('')
            resetImage()
            getAllListCatableData()
          }
        },
        onStart: handleOpenLoadingOverlay,
        onEnd: handleCloseLoadingOverlay,
        onSuccessMessage: 'ثبت دسته بندی با موفقیت انجام شد'
      })
    }
  }

  useEffect(() => {
    if (!showAddCategory) {
      setCategoryValue(undefined)
      setIsAvailable(false)
      setTitleValue('')
      resetImage()
    }
  }, [showAddCategory])

  return (
    <>
      <PageTitle breadcrumbs={[]}>لیست دسته بندی</PageTitle>
      <CustomerForBuyFilter searchCustomerHandle={searchCustomerHandle} />
      <div className={`card `}>
        {/* begin::Header */}
        <div className='card-header align-items-center border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bold fs-3 mb-1'>لیست دسته بندی</span>
            <span className='text-muted mt-1 fw-semibold fs-7'>{totalRecords} دسته بندی</span>
          </h3>
          <Button onClick={() => {
            setShowAddCategory(!showAddCategory)
          }}><span className='me-1'>افزودن</span> <BsPlusSquare fontSize={20} /></Button>
        </div>
        {/* end::Header */}
        {/* begin::Body */}
        <div className='card-body py-3'>
          {/* begin::Table container */}
          <div className='table-responsive'>
            {CategoryIsFetch && (
              <div className='d-flex justify-content-center w-100'>
                <p>در حال بارگذاری ...</p>
              </div>
            )}
            {!CategoryIsFetch && CategoryListCartable?.length === 0 && (
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
                {!CategoryIsFetch &&
                  CategoryListCartable?.length > 0 &&
                  CategoryListCartable?.map((item) => (
                    <tr key={item.id} className='p-0 w-100 '>
                      <td style={{ verticalAlign: 'middle' }} className='  text-truncate '>
                        <div className='d-flex align-items-center px-3'>
                          <img className='rounded' style={{ width: '60px', height: '60px' }} src={fileBaseUrl + item?.image} />
                          <span className=''>{item?.title}</span>
                        </div>
                      </td>
                      <td style={{ verticalAlign: 'middle' }} className='  text-truncate '>
                        {item?.isAvailable ? 'فعال' : 'غیر فعال'}
                      </td>
                      <td style={{ verticalAlign: 'middle' }} className=''>
                        <div className='d-flex justify-content-center flex-shrink-0'>
                          <div
                            onClick={() => {
                              setCategoryValue(item)
                              setShowAddCategory(!showAddCategory)
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
                              setShowDeleteCategory(true)
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
          onHide={() => setShowDeleteCategory(!showDeleteCategory)}
          show={showDeleteCategory}
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
                <button onClick={deleteHandleCategory} className='btn btn-primary mt-2 me-3'>
                  بلی
                </button>
                <button
                  className='btn btn-danger mt-2'
                  type='button'
                  onClick={() => {
                    setShowDeleteCategory(false)
                  }}
                >
                  خیر
                </button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
        <Modal
          onHide={() => setShowAddCategory(!showAddCategory)}
          show={showAddCategory}
          className='modal-lg'
          dialogClassName='p-3'
        >
          <Modal.Header closeButton>
            <h3>افزودن دسته بندی</h3>
          </Modal.Header>
          <Modal.Body>
            <div className='form-edit-Cartable'>
              <form>
                {titleInput()}
                {CategryImageInputRenderer({
                  id: 'CategoryImage',
                  label: 'عکس دسته بندی',
                  className: 'col-md-6  mt-2   pe-md-2 pe-0',
                  required: false,
                })}
                {/* {isAvailableRender({ className: 'col-12 mt-2 mb-4' })} */}
                {/* {productImageInputRenderer({
                  id: 'productImage',
                  label: 'عکس دسته بندی',
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
                    setShowAddCategory(false)
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

export default CategoryListPage;