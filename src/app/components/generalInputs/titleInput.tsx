import useInputController from '../../hooks/useInput'
import * as Yup from 'yup'
import React from 'react'
//////////
export const useTitle = ({initialValue, id}: {initialValue: string; id: string}) => {
  const uuid = React.useId()
  const {
    renderer: TitleInput,
    inputValue: TitleValue,
    inputError: TitleError,
    validateInput: validateTitle,
    set_inputValue: setTitleInputValue,
  } = useInputController({
    labelprops: {
      dir: 'rtl',
      className: 'mb-2 h5',
      children: 'عنوان',
    },
    holderprops: {
      className: '  m-0 p-0 d-flex flex-column justify-content-start align-items-stretch',
    },
    inputprops: {
      inputTagType: 'input',
      id: id ?? uuid,
      className: 'form-control  px-3 py-2',
      style: {
        minWidth: '250px',
      },
      yupvalidationscheme: Yup.string().required('پرکردن این فیلد الزامیست'),
      initialvalue: initialValue ?? '',
    },
  })

  //
  return {
    TitleInput,
    TitleValue,
    TitleError,
    validateTitle,
    setTitleInputValue,
  }
}
