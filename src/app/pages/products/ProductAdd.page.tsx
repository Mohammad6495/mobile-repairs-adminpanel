import React, { useEffect, useState } from 'react'
import { PageTitle } from '../../../_metronic/layout/core'
import * as CourseInputs from '../../components/productInputs'
import useImageInput from '../../components/input/imageInput'
import { apiCaller } from '../../hooks/useApi'
import { ServiceAgent } from '../../services/serviceAgent'
import { ICategory, ICourse, IEductional, ITeacher } from '../../interfaces'
import { useLoadingContext } from '../../contexts/loading/loading'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { AiOutlinePlus } from 'react-icons/ai'
import { fileBaseUrl } from '../../services/SERVICE-CONSTANTS'
import { toast } from 'react-toastify'
import usePersianDatepickerInput from '../../components/input/PersianDatePickerInput.component'
import DateObject from 'react-date-object'
import moment from 'jalali-moment'
import persian from 'react-date-object/calendars/persian'
import persian_fa from 'react-date-object/locales/persian_fa'
import { toEnglishDigit } from '../../utils/persainDigitToEn'
const CourseAddPage = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const { handleCloseLoadingOverlay, handleOpenLoadingOverlay } = useLoadingContext()

    const [allCategory, setAllGategory] = useState<ICategory[]>([])
    const [allTeacher, setAllTeacher] = useState<ITeacher[]>([])
    const [allEductional, setAllEductional] = useState<IEductional[]>([])
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
    })
    const {
        renderEductionalListSelectList,
        selectedEductionalList,
        setSelectedEductionalList
    } = CourseInputs.useEductionalList({
        initialvalue: allEductional || []
    })
    const {
        renderTeacherListSelectList,
        selectedTeacherList,
        setSelectedTeacherList
    } = CourseInputs.useTeacherList({
        initialvalue: allTeacher || []
    })
    const [headeLine, setHeadeLine] = useState<string[]>([])

    const handleDeleteHeadLine = (index: number) => {
        const allHeadLineData = [...headeLine];
        allHeadLineData.splice(index, 1);
        setHeadeLine(allHeadLineData)
    }
    const handleInputChanges = (field: string, value: string, index: number) => {
        const updatedItems = [...headeLine];
        updatedItems[index] = value;
        setHeadeLine(updatedItems);
    };
    useEffect(() => {
        if (CourseDetail && allTeacher?.length !== 0 && allEductional?.length !== 0 && allCategory?.length !== 0) {
            const findCat = allCategory?.find(a => a.id == CourseDetail?.category?.id);
            const findEdu = allEductional?.find(a => a.id == CourseDetail?.eductional?.id);
            const findTeach = allTeacher?.filter(a => a.id == CourseDetail?.teacher);
            if (findCat) {
                setSelectedCategoryList({
                    label: findCat?.title,
                    value: findCat?.id
                })
            }
            if (findEdu) {
                setSelectedEductionalList({
                    label: findEdu?.name,
                    value: findEdu?.id
                })
            }
            if (findTeach) {
                const listUsageType = CourseDetail?.teacher
                const filteredUsageTypeList = allTeacher.filter((item: any) => {
                  return listUsageType?.some(type => item.id.includes(type.id as any));
                });
                 const filterData = filteredUsageTypeList.map(item => {
                    return {
                        label: item.name,
                        value: item.id
                    }
                 })
                setSelectedTeacherList(filterData as any)
            }
            if (CourseDetail?.headLines?.length !== 0) {
                setHeadeLine(CourseDetail?.headLines as string[])
            }
        }
    }, [CourseDetail, allCategory, allEductional, allTeacher])
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
    })
    const {
        Input: descriptionInput,
        Value: descriptionValue,
        validate: descriptionValidate,
    } = CourseInputs.useDescriptionInput({
        initialvalue: CourseDetail?.description || '',
        className: ' col-md-12  mt-2   pe-md-2 pe-0'
    })
    const {
        Input: periodTimeInput,
        Value: periodTimeValue,
        validate: periodTimeValidate,
    } = CourseInputs.usePeriodTime({
        initialvalue: CourseDetail?.periodTime || '',
        className: ' col-md-6  mt-2   pe-md-2 pe-0'
    })
    const {
        Input: dayHoldingInput,
        Value: dayHoldingValue,
        validate: dayHoldingValidate,
    } = CourseInputs.useDayHolding({
        initialvalue: CourseDetail?.dayHolding || '',
        className: ' col-md-6  mt-2   pe-md-2 pe-0'
    })
    const {
        Input: timeHoldingInput,
        Value: timeHoldingValue,
        validate: timeHoldingValidate,
    } = CourseInputs.useTimeHolding({
        initialvalue: CourseDetail?.timeHolding || '',
        className: ' col-md-6  mt-2   pe-md-2 pe-0'
    })
    const {
        Input: courseConditionsInput,
        Value: courseConditionsValue,
        validate: courseConditionsValidate,
    } = CourseInputs.useCourseConditions({
        initialvalue: CourseDetail?.courseConditions || '',
        className: ' col-md-6  mt-2   pe-md-2 pe-0'
    })
    const {
        isTrue: isAvaible,
        renderYesNoInput: isAvaibleInput
    } = CourseInputs.useYesNoInput({
        id: 'IsAvaible',
        initialvalue: isEditMode ? CourseDetail?.isAvailable : false,
        title: 'نمایش دوره :'
    })
    const {
        imageRef: CourseImageInputRef,
        renderer: CourseImageInputRenderer
    } = useImageInput({ initialValue: fileBaseUrl + CourseDetail?.image || '' });

    const { renderPersianDatepickerInput: StartDateUpsertDateInput, selectedDate: StartDateUpsertDate, setSelectedDate: setStartDateUpsertDate } = usePersianDatepickerInput({
        label: 'تاریخ شروع دوره',
        inputId: 'upsertData',
    });

    useEffect(() => {
        if (CourseDetail) {
            const now = moment(CourseDetail?.startTime);
            const jalaliNow = now.format('jYYYY/jMM/jDD');
            if (CourseDetail?.startTime) {
                const date = new DateObject({
                    date: jalaliNow,
                    calendar: persian,
                    locale: persian_fa,
                })
                setStartDateUpsertDate(date)
            }
        }
    }, [CourseDetail])
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
    const getAllTeacherApi = () => {
        apiCaller({
            api: ServiceAgent.teacher.request_getAllteachers,
            apiArguments: {
                search: undefined,
                pageSize: undefined,
                currentPage: undefined
            },
            onSuccess: (resp) => {
                if (resp?.status == 200 && resp?.data?.statusCode == 200) {
                    setAllTeacher(resp?.data?.data?.data)
                }
            },
            onStart: handleOpenLoadingOverlay,
            onEnd: handleCloseLoadingOverlay,
            onErrorMessage: 'دریافت لیست مدرسین با خطا مواجهه شد'
        })
    }
    const getAllEductionalApi = () => {
        apiCaller({
            api: ServiceAgent.eductional.request_getAlleductionals,
            apiArguments: {
                search: undefined,
                pageSize: undefined,
                currentPage: undefined
            },
            onSuccess: (resp) => {
                if (resp?.status == 200 && resp?.data?.statusCode == 200) {
                    setAllEductional(resp?.data?.data?.data)
                }
            },
            onStart: handleOpenLoadingOverlay,
            onEnd: handleCloseLoadingOverlay,
            onErrorMessage: 'دریافت لیست مدرسین با خطا مواجهه شد'
        })
    }

    useEffect(() => {
        getAllCategoryApi()
        getAllTeacherApi()
        getAllEductionalApi()
    }, [])


    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const v1 = await TitleValidate()
        const v2 = await priceValidate()
        const v3 = await periodTimeValidate()
        if (!selectedCategoryList?.value) {
            toast.error('لطفا دسته بندی دوره خود را وارد نمایید')
            return false
        }
        if (!selectedTeacherList?.length != 0 as any) {
            toast.error('لطفا اساتید دوره خود را وارد نمایید')
            return false
        }
        if (!selectedEductionalList?.value) {
            toast.error('لطفا آموزشگاه دوره خود را وارد نمایید')
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
                    courseConditions: courseConditionsValue,
                    dayHolding: dayHoldingValue,
                    eductional: selectedEductionalList?.value,
                    headLines: headeLine,
                    periodTime: periodTimeValue,
                    teacher: selectedTeacherList.map(item => item.value as any),
                    timeHolding: timeHoldingValue,
                    startTime: moment(toEnglishDigit(StartDateUpsertDate?.toString() as string ?? ''), 'jYYYY/jM/jD').locale('en').format('YYYY-MM-DDTHH:mm:ss.SSSSSSS') || ''
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

    const handleNewItemWorkExprience = () => {
        setHeadeLine(prev => [...prev, '']);
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
                        {periodTimeInput()}
                        {dayHoldingInput()}

                        {timeHoldingInput()}
                        {courseConditionsInput()}
                        {StartDateUpsertDateInput({ className: 'col-md-6 col-12 mt-2   pe-md-2 pe-0' })}
                        {renderCategoryListSelectList({ className: 'col-md-6  mt-2   pe-md-2 pe-0' })}
                        {renderEductionalListSelectList({ className: 'col-md-6  mt-2   pe-md-2 pe-0' })}
                        {renderTeacherListSelectList({ className: 'col-md-6  mt-2   pe-md-2 pe-0' })}
                        {isAvaibleInput({ className: 'col-md-6  mt-2   pe-md-2 pe-0' })}
                        {CourseImageInputRenderer({
                            id: 'CourseImage',
                            label: 'عکس دوره',
                            className: 'col-md-6  mt-2   pe-md-2 pe-0',
                            required: false,
                        })}
                        <div className='d-flex flex-column'>
                            <p>سرفصل های دوره :</p>
                            {
                                headeLine?.map((item, index) => (

                                    <div className='work-experience mb-2 position-relative'>

                                        <div className='d-flex flex-column mb-2'>
                                            <span className='mb-2'>سرفصل {index + 1} :</span>
                                            <div className='d-flex align-items-center'>
                                                <input className='form-control'
                                                    value={item}
                                                    key={index}
                                                    onChange={(e) => handleInputChanges('headLine', e.target.value, index)}
                                                />
                                                <Button
                                                    className='btn btn-danger btn-sm ms-2'
                                                    onClick={() => handleDeleteHeadLine(index)}
                                                >
                                                    <span>حذف</span>
                                                </Button>
                                            </div>
                                        </div>

                                    </div>
                                ))
                            }
                            <button
                                onClick={() => handleNewItemWorkExprience()}
                                type='button'
                                className='btn btn-success mt-2 mb-2 p-2'>
                                <span className='ms-2'><AiOutlinePlus /></span>
                                ایجاد سرفصل جدید
                            </button>
                        </div>
                    </div>
                    <button className='btn btn-primary' type='submit'>{isEditMode ? 'ویرایش' : 'ثبت'}</button>
                </form>
            </div>
        </>
    )
}

export default CourseAddPage