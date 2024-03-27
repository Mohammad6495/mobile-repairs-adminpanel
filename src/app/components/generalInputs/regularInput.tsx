import useInputController from '../../hooks/useInput'
import * as Yup from 'yup'
import React, {CSSProperties} from 'react'
//////////
export const useGeneralInput = ({
  initialvalue,
  id,
  label = '',
  isRequired = false,
  tagType = 'input',
  row = undefined,
  className = '',
  isTypeValueNumber = false,
  inputStyle = {},
  type = ''
}: {
  initialvalue: string
  label: string
  className: string
  id?: string
  row: number | undefined,
  isRequired: boolean
  tagType: 'input' | 'textarea'
  inputStyle: CSSProperties
  isTypeValueNumber: boolean
  type: string
}) => {
  const uuid = React.useId()
  const {
    renderer: Input,
    inputValue: Value,
    inputError: Error,
    validateInput: validate,
    set_inputValue: setInputValue,
  } = useInputController({
    labelprops: {
      dir: 'rtl',
      className: 'mb-2 h5',
      children: label,
    },
    holderprops: {
      className:
        className + '   m-0 p-0 d-flex flex-column justify-content-start align-items-stretch',
    },
    inputprops: {
      inputTagType: tagType,
      rows: row,
      type: type,
      id: id ?? uuid,
      className: 'form-control px-3 py-2',
      style: {
        minWidth: '250px',
        ...inputStyle,
      },
      yupvalidationscheme: isRequired
        ? (isTypeValueNumber ? Yup.number().typeError("مقدار فیلد باید عدد باشد") : Yup.string()).required('پرکردن این فیلد الزامیست')
        : Yup.string(),
      initialvalue: initialvalue ?? '',
    },
  })

  //
  return {
    Input,
    Value,
    Error,
    validate,
    setInputValue,
  }
}
