import { useEffect, useState } from 'react'
import { PageTitle } from '../../../_metronic/layout/core'
import * as CourseInputs from '../../components/productInputs'
import useImageInput from '../../components/input/imageInput'
import { apiCaller } from '../../hooks/useApi'
import { ServiceAgent } from '../../services/serviceAgent'
import { ICategory, ICourse, IEductional, ITeacher } from '../../interfaces'
import { useLoadingContext } from '../../contexts/loading/loading'
import { useNavigate, useParams } from 'react-router-dom'
import { fileBaseUrl } from '../../services/SERVICE-CONSTANTS'
import { toast } from 'react-toastify'
import useVideoInput from '../../components/input/videoInput'

const CourseAddPage = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const { handleCloseLoadingOverlay, handleOpenLoadingOverlay } = useLoadingContext()

    const [allCategory, setAllGategory] = useState<ICategory[]>([])
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [CourseDetail, setCourseDetail] = useState<ICourse>()

    const getDetailCourse = () => {
        apiCaller({
            api: ServiceAgent.course.request_getDetailProducts,
            apiArguments: id,
            onSuccess: (resp) => {
                if (resp?.status == 200 && resp?.data?.statusCode == 200) {
                    setIsEditMode(true);
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

    const {
        renderCategoryListSelectList,
        selectedCategoryList,
        setSelectedCategoryList
    } = CourseInputs.useCategoryList({
        initialvalue: allCategory || []
    });
    const {
        renderCourseLevelListSelectList,
        selectedCourseLevelList,
        setSelectedCourseLevelList,
        CourseLevelList
    } = CourseInputs.useCourseLevelList({
        initialvalue: []
    });
    const {
        renderCourseStatusListSelectList,
        selectedCourseStatusList,
        setSelectedCourseStatusList,
        CourseStatusList
    } = CourseInputs.useCourseStatusList({
        initialvalue: []
    });

    useEffect(() => {
        if (CourseDetail && allCategory?.length !== 0) {
            const findCat = allCategory?.find(a => a.id == CourseDetail?.category?.id);
            if (findCat) {
                setSelectedCategoryList({
                    label: findCat?.title,
                    value: findCat?.id
                })
            }
        }
        if (CourseDetail) {
            const findCLevel = CourseLevelList.find(a => a.value == String(CourseDetail.courseLevel));
            const findCStatus = CourseStatusList.find(a => a.value == String(CourseDetail.courseStatus));
            if (findCLevel) {
                setSelectedCourseLevelList(findCLevel)
            }
            if (findCStatus) {
                setSelectedCourseStatusList(findCStatus)
            }
        }
    }, [CourseDetail, allCategory])

    const {
        Input: titleInput,
        Value: TitleValue,
        validate: TitleValidate,
    } = CourseInputs.useTitleInput({
        initialvalue: CourseDetail?.title || '',
        className: ' col-md-6  mt-2   pe-md-2 pe-0'
    })

    const {
        Input: priceInput,
        Value: priceValue,
        validate: priceValidate,
    } = CourseInputs.usePriceInput({
        initialvalue: CourseDetail?.price || '',
        className: ' col-md-6  mt-2   pe-md-2 pe-0'
    });
    const {
        Input: TeacherInputInput,
        Value: TeacherInputValue,
        validate: TeacherInputValidate,
    } = CourseInputs.useTeacherInput({
        initialvalue: CourseDetail?.teacher || '',
        className: ' col-md-6  mt-2   pe-md-2 pe-0'
    });

    const {
        Input: descriptionInput,
        Value: descriptionValue,
    } = CourseInputs.useDescriptionInput({
        initialvalue: CourseDetail?.description || '',
        className: ' col-md-12  mt-2   pe-md-2 pe-0'
    });
    const {
        isTrue: isAvaible,
        renderYesNoInput: isAvaibleInput
    } = CourseInputs.useYesNoInput({
        id: 'IsAvaible',
        initialvalue: isEditMode ? CourseDetail?.isAvailable : false,
        title: 'نمایش دوره :'
    })
    const {
        isTrue: isFree,
        renderYesNoInput: isFreeInput
    } = CourseInputs.useYesNoInput({
        id: 'IsFree',
        initialvalue: isEditMode ? CourseDetail?.isFree : false,
        title: 'رایگان؟ :'
    })
    const {
        imageRef: CourseImageInputRef,
        renderer: CourseImageInputRenderer
    } = useImageInput({ initialValue: fileBaseUrl + CourseDetail?.image || '' });

    const {
        VideoRef: CourseVideoInput,
        renderer: CourseVideoINputRendered
    } = useVideoInput({ initialValue: fileBaseUrl + CourseDetail?.video || '' });


    const getAllCategoryApi = () => {
        apiCaller({
            api: ServiceAgent.category.request_getAllcategorys,
            apiArguments: {
                search: undefined,
                pageSize: undefined,
                currentPage: undefined
            },
            onSuccess: (resp) => {
                if (resp?.status == 200 && resp?.data?.statusCode == 200) {
                    setAllGategory(resp?.data?.data?.data)
                }
            },
            onStart: handleOpenLoadingOverlay,
            onEnd: handleCloseLoadingOverlay,
            onErrorMessage: 'دریافت لیست دسته بندی با خطا مواجهه شد'
        })
    }

    useEffect(() => {
        getAllCategoryApi()
    }, [])


    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const v1 = await TitleValidate()
        const v2 = await priceValidate()
        const v3 = await TeacherInputValidate()
        if (!selectedCategoryList?.value) {
            toast.error('لطفا دسته بندی دوره خود را وارد نمایید')
            return false
        }
        if (v1 && v2 && v3) {
            apiCaller({
                api: id ? ServiceAgent.course.request_editProduct : ServiceAgent.course.request_createProduct,
                apiArguments: {
                    id: CourseDetail?.id,
                    category: selectedCategoryList?.value,
                    description: descriptionValue,
                    image: CourseImageInputRef?.current?.files?.[0],
                    isAvailable: isAvaible,
                    price: Number(priceValue),
                    title: TitleValue,
                    courseLevel: Number(selectedCourseLevelList?.value),
                    courseStatus: Number(selectedCourseStatusList?.value),
                    isFree: isFree,
                    teacher: TeacherInputValue,
                },
                onSuccess: (resp) => {
                    if (resp?.status == 200 && resp?.data?.statusCode == 200) {
                        navigate('/course-list')
                    }
                },
                onSuccessMessage: `${isEditMode ? 'ویرایش' : 'ثبت'} دوره با موفقیت انجام شد`
            })
        }
    }


    return (
        <>
            <PageTitle>{isEditMode ? 'ویرایش' : 'ثبت'} دوره جدید</PageTitle>
            <div className='text-right card w-100 m-0 p-3 d-flex flex-column justify-content-start align-items-stretch'>
                <form
                    onSubmit={handleSubmit}
                >
                    <div
                        className='d-flex flex-row flex-wrap justify-content-start align-items-stretch'
                    >
                        {titleInput()}
                        {priceInput()}
                        {descriptionInput()}
                        {TeacherInputInput()}
                        {renderCategoryListSelectList({ className: 'col-md-6  mt-2   pe-md-2 pe-0' })}
                        {renderCourseLevelListSelectList({ className: 'col-md-6  mt-2   pe-md-2 pe-0' })}
                        {renderCourseStatusListSelectList({ className: 'col-md-6  mt-2   pe-md-2 pe-0' })}
                        {isAvaibleInput({ className: 'col-md-6  mt-2   pe-md-2 pe-0' })}
                        {isFreeInput({ className: 'col-md-6  mt-2   pe-md-2 pe-0' })}
                        {CourseImageInputRenderer({
                            id: 'CourseImage',
                            label: 'عکس دوره',
                            className: 'col-md-6  mt-2   pe-md-2 pe-0',
                            required: false,
                        })}
                        {
                            CourseVideoINputRendered({
                                id: 'CourseVideo',
                                label: 'ویدیو معرفی',
                                className: 'col-md-6  mt-2   pe-md-2 pe-0',
                                required: false,
                            })
                        }

                    </div>
                    <button className='btn btn-primary' type='submit'>{isEditMode ? 'ویرایش' : 'ثبت'}</button>
                </form>
            </div>
        </>
    )
}

export default CourseAddPage