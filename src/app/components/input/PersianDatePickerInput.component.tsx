import DatePicker from 'react-multi-date-picker'
import persian from 'react-date-object/calendars/persian'
import persian_fa from 'react-date-object/locales/persian_fa'
import {useState} from 'react'
import DateObject from 'react-date-object'
import { useEffect } from 'react'

const usePersianDatepickerInput = ({
  initialValue = new DateObject(),
  onChange = (d) => {},
  label,
  inputId,
}: {
  initialValue?: DateObject
  onChange?: (d: DateObject) => void
  label?: string
  inputId: string
}) => {
  /////////////
  const [selectedDate, setSelectedDate] = useState<DateObject | DateObject[] | null | undefined>(
    initialValue ?? null
  )
  const handleChange = (sd: DateObject) => {
    onChange(sd)
    setSelectedDate(sd)
  }

  /////////////
  const renderPersianDatepickerInput = ({className = ''}: {className: string}) => (
    <div
      dir='rtl'
      className={className + ' d-flex flex-column justify-content-start align-items-stretch'}
    >
      <label htmlFor={inputId} style={{ fontSize: '14px'}} className='h5'>
        {label}
      </label>
      <DatePicker
        calendar={persian}
        locale={persian_fa}
        calendarPosition='bottom-right'
        minDate={new Date("02-01-2015")}
        inputClass='form-control  px-3 py-2'
        inputMode='text'
        id={inputId}
        value={selectedDate}
        onChange={handleChange}
      />
      <div
        dir='rtl'
        style={{color: 'red', fontSize: '.8rem', height: '1rem'}}
        className='error mt-1'
      >
        {/* {inputError ? inputError : ''} */}
      </div>
    </div>
  )

  return {renderPersianDatepickerInput, selectedDate, setSelectedDate}
}

export default usePersianDatepickerInput
