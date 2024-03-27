import { useEffect, useState } from 'react'
import { useGeneralInput } from './generalInputs/regularInput'
import Select from 'react-select'
import { colourStyles } from '../utils/reactSelectStyles'


export const useTeacherName = ({ className = '', initialvalue }) =>
  useGeneralInput({
    initialvalue,
    className,
    tagType: 'input',
    label: 'نام اساتید :',
    isRequired: true,
  })
  export const useEductionalName = ({ className = '', initialvalue }) =>
  useGeneralInput({
    initialvalue,
    className,
    tagType: 'input',
    label: 'نام آموزشگاه :',
    isRequired: true,
  })
  export const useWorkExperience = ({ className = '', initialvalue }) =>
  useGeneralInput({
    initialvalue,
    className,
    tagType: 'input',
    label: 'سابقه کاری :',
    isRequired: false,
  })
  export const useDescription = ({ className = '', initialvalue }) =>
  useGeneralInput({
    initialvalue,
    className,
    row: 4,
    tagType: 'textarea',
    label: 'توضیحات مدرس :',
    isRequired: false,
  })

  export const useEductionalDescription = ({ className = '', initialvalue }) =>
  useGeneralInput({
    initialvalue,
    className,
    row: 4,
    tagType: 'textarea',
    label: 'درباره آموزشگاه :',
    isRequired: false,
  })



const changeListStatus = [
  { value: 0, label: 'در انتظار تایید' },
  { value: 1, label: 'در حال ارسال' },
  { value: 2, label: 'تحویل شده' },
  { value: 3, label: 'لغو سفارش' },
  { value: 4, label: 'در حال آماده سازی' },
]
export const useChangeStatusList = () => {
  const [selectedChangeStatusList, setSelectedChangeStatusList] = useState({
    label: changeListStatus[0]?.label,
    value: changeListStatus[0]?.value,
  })
  const [selectedChangeStatusListError, set_selectedChangeStatusListError] = useState('')

  const handleChangeStatusListChange = (newValue, actionMeta) => {
    setSelectedChangeStatusList(newValue)
    if (newValue) {
      // set_selectedSatisfactionError('یکی از واحدها باید انتخاب شود')
    } else {
      set_selectedChangeStatusListError('')
    }
  }

  /////////////////
  const renderChangeStatusListSelectList = ({ className }) => {
    return (
      <div className={className}>
        <label style={{ fontSize: '15px' }} className='m-0 p-0 mb-2 h5'>
          وضعیت سفارش :
        </label>
        <Select
          noOptionsMessage={() => 'گزینه دیگری وجود ندارد'}
          options={changeListStatus}
          value={selectedChangeStatusList}
          dir='rtl'
          isSearchable
          styles={colourStyles}
          className='w-100'
          onChange={handleChangeStatusListChange}
          placeholder=''
        />
        <div
          id='select-error'
          dir='rtl'
          style={{ color: 'red', fontSize: '.8rem', height: '1rem' }}
          className='error mt-1'
        >
          {selectedChangeStatusListError ? selectedChangeStatusListError : ''}
        </div>
      </div>
    )
  }
  /////////
  return {
    renderChangeStatusListSelectList,
    selectedChangeStatusList: selectedChangeStatusList,
    setSelectedChangeStatusList: setSelectedChangeStatusList,
    changeListStatus
  }
}
