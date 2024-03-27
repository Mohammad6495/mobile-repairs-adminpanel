import { useEffect, useState } from 'react'
import { useGeneralInput } from './generalInputs/regularInput'
import Select from "react-select";
import { colourStyles } from '../utils/reactSelectStyles';

export const useTitleInput = ({ className = '', initialvalue }) =>
  useGeneralInput({
    initialvalue,
    className,
    tagType: 'input',
    label: 'عنوان دوره',
    isRequired: true,
  })

export const useCodeInput = ({ className = '', initialvalue }) =>
  useGeneralInput({
    initialvalue,
    className,
    tagType: 'input',
    label: 'کد دوره :',
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

export const useQuantityInput = ({ className = '', initialvalue }) =>
  useGeneralInput({
    initialvalue,
    className,
    tagType: 'input',
    label: 'تعداد :',
    isRequired: true,
  })
export const usePeriodTime = ({ className = '', initialvalue }) =>
  useGeneralInput({
    initialvalue,
    className,
    tagType: 'input',
    label: 'مدت زمان دوره :',
    isRequired: true,
  })

export const useDayHolding = ({ className = '', initialvalue }) =>
  useGeneralInput({
    initialvalue,
    className,
    tagType: 'input',
    label: 'روز های برگذاری :',
    isRequired: false,
  })
export const useTimeHolding = ({ className = '', initialvalue }) =>
  useGeneralInput({
    initialvalue,
    className,
    tagType: 'input',
    label: 'ساعت برگذاری :',
    isRequired: false,
  })
export const useCourseConditions = ({ className = '', initialvalue }) =>
  useGeneralInput({
    initialvalue,
    className,
    tagType: 'input',
    label: 'نوع آموزش :',
    isRequired: false,
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

export const useEductionalList = ({ initialvalue = [] }) => {
  const [selectedEductionalList, setSelectedEductionalList] =
    useState({
      label: initialvalue[0]?.name,
      value: initialvalue[0]?.id
    });
  const [
    selectedEductionalListError,
    set_selectedEductionalListError,
  ] = useState("");

  const handleEductionalListChange = (newValue, actionMeta) => {
    setSelectedEductionalList(newValue);
    if (newValue) {
      // set_selectedSatisfactionError('یکی از واحدها باید انتخاب شود')
    } else {
      set_selectedEductionalListError("");
    }
  };

  /////////////////
  const renderEductionalListSelectList = ({ className }) => {
    return (
      <div className={className}>
        <label style={{ fontSize: "15px" }} className="m-0 p-0 mb-2 h5">
          آموزشگاه :
        </label>
        <Select
          noOptionsMessage={() => "گزینه دیگری وجود ندارد"}
          options={initialvalue.map(item => {
            return {
              value: item?.id,
              label: item?.name
            }
          })}
          value={selectedEductionalList}
          dir="rtl"
          isSearchable
          styles={colourStyles}
          className="w-100"
          onChange={handleEductionalListChange}
          placeholder=""
        />
        <div
          id="select-error"
          dir="rtl"
          style={{ color: "red", fontSize: ".8rem", height: "1rem" }}
          className="error mt-1"
        >
          {selectedEductionalListError
            ? selectedEductionalListError
            : ""}
        </div>
      </div>
    );
  };
  /////////
  return {
    renderEductionalListSelectList,
    selectedEductionalList: selectedEductionalList,
    setSelectedEductionalList: setSelectedEductionalList,
  };
};

export const useTeacherList = ({ initialvalue = [] }) => {
  const [selectedTeacherList, setSelectedTeacherList] =
    useState(initialvalue);
  const [
    selectedTeacherListError,
    set_selectedTeacherListError,
  ] = useState("");

  const handleTeacherListChange = (newValue, actionMeta) => {
    setSelectedTeacherList(newValue);
    if (newValue) {
      // set_selectedSatisfactionError('یکی از واحدها باید انتخاب شود')
    } else {
      set_selectedTeacherListError("");
    }
  };

  /////////////////
  const renderTeacherListSelectList = ({ className }) => {
    return (
      <div className={className}>
        <label style={{ fontSize: "15px" }} className="m-0 p-0 mb-2 h5">
          مدرسین :
        </label>
        <Select
                  isMulti

          noOptionsMessage={() => "گزینه دیگری وجود ندارد"}
          options={initialvalue.map((item) => ({
            value: item?.id?.toString() ?? "",
            label: item.name,
          }))}
          value={selectedTeacherList}
          dir="rtl"
          isSearchable
          styles={colourStyles}
          className="w-100"
          onChange={handleTeacherListChange}
          placeholder=""
        />
        <div
          id="select-error"
          dir="rtl"
          style={{ color: "red", fontSize: ".8rem", height: "1rem" }}
          className="error mt-1"
        >
          {selectedTeacherListError
            ? selectedTeacherListError
            : ""}
        </div>
      </div>
    );
  };
  /////////
  return {
    renderTeacherListSelectList,
    selectedTeacherList: selectedTeacherList,
    setSelectedTeacherList: setSelectedTeacherList,
  };
};