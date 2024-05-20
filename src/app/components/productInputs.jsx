import { useEffect, useState } from 'react'
import { useGeneralInput } from './generalInputs/regularInput'
import Select from "react-select";
import { colourStyles } from '../utils/reactSelectStyles';

export const useTitleInput = ({ className = '', initialvalue }) =>
  useGeneralInput({
    initialvalue,
    className,
    tagType: 'input',
    label: 'عنوان',
    isRequired: true,
  })
  export const useVideoTime = ({ className = '', initialvalue }) =>
  useGeneralInput({
    initialvalue,
    className,
    tagType: 'input',
    label: 'زمان ویدیو (دقیقه)',
    isRequired: true,
  })

export const usePriceInput = ({ className = '', initialvalue }) =>
  useGeneralInput({
    initialvalue,
    className,
    tagType: 'input',
    label: 'قیمت (تومان) :',
    isRequired: true,
  })

  export const useTeacherInput = ({ className = '', initialvalue }) =>
  useGeneralInput({
    initialvalue,
    className,
    tagType: 'input',
    label: 'نام استاد :',
    isRequired: true,
  })
export const useDescriptionInput = ({ className = '', initialvalue }) =>
  useGeneralInput({
    initialvalue,
    className,
    tagType: 'textarea',
    label: 'توضیحات :',
    inputStyle: {
      height: '150px'
    },
    isRequired: true,
  })

export const useYesNoInput = ({ title = '', id = '', initialvalue = false }) => {
  const [isTrue, setIsTrue] = useState(initialvalue)
  useEffect(() => {
    setIsTrue(initialvalue)
  }, [initialvalue])
  const toggleIsTrue = () => {
    setIsTrue(!isTrue)
  }
  const renderYesNoInput = ({ className = '' }) => {
    return (
      <div className={className + ' d-flex flex-column justify-content-start align-items-stretch'}>
        {/* <div className='h5'>{title}</div> */}
        <div className='m-0 p-0 d-flex flex-row justify-content-start align-items-center'>
          <label
            htmlFor={id}
            className='m-0 p-0 d-flex flex-row justify-content-start align-items-center'
          >
            {title}
            <input
              id={id}
              className='ms-2'
              style={{
                width: '20px',
                height: '20px',
                background: 'white',
                borderRadius: '5px',
                border: '2px solid #555',
              }}
              type='checkbox'
              checked={isTrue}
              onChange={toggleIsTrue}
            />
          </label>
        </div>
      </div>
    )
  }

  return { isTrue, renderYesNoInput, toggleIsTrue, setIsTrue }
}


export const useCategoryList = ({ initialvalue = [] }) => {
  const [selectedCategoryList, setSelectedCategoryList] =
    useState({
      label: initialvalue[0]?.name,
      value: initialvalue[0]?.id
    });
  const [
    selectedCategoryListError,
    set_selectedCategoryListError,
  ] = useState("");

  const handleCategoryListChange = (newValue, actionMeta) => {
    setSelectedCategoryList(newValue);
    if (newValue) {
      // set_selectedSatisfactionError('یکی از واحدها باید انتخاب شود')
    } else {
      set_selectedCategoryListError("");
    }
  };

  /////////////////
  const renderCategoryListSelectList = ({ className }) => {
    return (
      <div className={className}>
        <label style={{ fontSize: "15px" }} className="m-0 p-0 mb-2 h5">
          دسته بندی :
        </label>
        <Select
          noOptionsMessage={() => "گزینه دیگری وجود ندارد"}
          options={initialvalue.map(item => {
            return {
              value: item?.id,
              label: item?.title
            }
          })}
          value={selectedCategoryList}
          dir="rtl"
          isSearchable
          styles={colourStyles}
          className="w-100"
          onChange={handleCategoryListChange}
          placeholder=""
        />
        <div
          id="select-error"
          dir="rtl"
          style={{ color: "red", fontSize: ".8rem", height: "1rem" }}
          className="error mt-1"
        >
          {selectedCategoryListError
            ? selectedCategoryListError
            : ""}
        </div>
      </div>
    );
  };
  /////////
  return {
    renderCategoryListSelectList,
    selectedCategoryList: selectedCategoryList,
    setSelectedCategoryList: setSelectedCategoryList,
  };
};


const CourseLevelList = [
  {label: 'مقدماتی', value: '0'},
  {label: 'متوسط', value: '1'},
  {label: 'پیشرفته', value: '2'},
]

export const useCourseLevelList = ({ initialvalue = [] }) => {
  const [selectedCourseLevelList, setSelectedCourseLevelList] =
    useState({
      label: initialvalue[0]?.name,
      value: initialvalue[0]?.id
    });
  const [
    selectedCourseLevelListError,
    set_selectedCourseLevelListError,
  ] = useState("");

  const handleCourseLevelListChange = (newValue, actionMeta) => {
    setSelectedCourseLevelList(newValue);
    if (newValue) {
      // set_selectedSatisfactionError('یکی از واحدها باید انتخاب شود')
    } else {
      set_selectedCourseLevelListError("");
    }
  };

  /////////////////
  const renderCourseLevelListSelectList = ({ className }) => {
    return (
      <div className={className}>
        <label style={{ fontSize: "15px" }} className="m-0 p-0 mb-2 h5">
          سطح آموزش :
        </label>
        <Select
          noOptionsMessage={() => "گزینه دیگری وجود ندارد"}
          options={CourseLevelList}
          value={selectedCourseLevelList}
          dir="rtl"
          isSearchable
          styles={colourStyles}
          className="w-100"
          onChange={handleCourseLevelListChange}
          placeholder=""
        />
        <div
          id="select-error"
          dir="rtl"
          style={{ color: "red", fontSize: ".8rem", height: "1rem" }}
          className="error mt-1"
        >
          {selectedCourseLevelListError
            ? selectedCourseLevelListError
            : ""}
        </div>
      </div>
    );
  };
  /////////
  return {
    renderCourseLevelListSelectList,
    selectedCourseLevelList: selectedCourseLevelList,
    setSelectedCourseLevelList: setSelectedCourseLevelList,
    CourseLevelList
  };
};
const CourseStatusList = [
  {label: 'در حال برگزاری', value: '0'},
  {label: 'شروع نشده', value: '1'},
  {label: 'پایان یافته', value: '2'},
]

export const useCourseStatusList = ({ initialvalue = [] }) => {
  const [selectedCourseStatusList, setSelectedCourseStatusList] =
    useState({
      label: initialvalue[0]?.name,
      value: initialvalue[0]?.id
    });
  const [
    selectedCourseStatusListError,
    set_selectedCourseStatusListError,
  ] = useState("");

  const handleCourseStatusListChange = (newValue, actionMeta) => {
    setSelectedCourseStatusList(newValue);
    if (newValue) {
      // set_selectedSatisfactionError('یکی از واحدها باید انتخاب شود')
    } else {
      set_selectedCourseStatusListError("");
    }
  };

  /////////////////
  const renderCourseStatusListSelectList = ({ className }) => {
    return (
      <div className={className}>
        <label style={{ fontSize: "15px" }} className="m-0 p-0 mb-2 h5">
          وضعیت دوره :
        </label>
        <Select
          noOptionsMessage={() => "گزینه دیگری وجود ندارد"}
          options={CourseStatusList}
          value={selectedCourseStatusList}
          dir="rtl"
          isSearchable
          styles={colourStyles}
          className="w-100"
          onChange={handleCourseStatusListChange}
          placeholder=""
        />
        <div
          id="select-error"
          dir="rtl"
          style={{ color: "red", fontSize: ".8rem", height: "1rem" }}
          className="error mt-1"
        >
          {selectedCourseStatusListError
            ? selectedCourseStatusListError
            : ""}
        </div>
      </div>
    );
  };
  /////////
  return {
    renderCourseStatusListSelectList,
    selectedCourseStatusList: selectedCourseStatusList,
    setSelectedCourseStatusList: setSelectedCourseStatusList,
    CourseStatusList
  };
};