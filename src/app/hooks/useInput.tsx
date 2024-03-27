import {AxiosError, AxiosResponse} from 'axios'
import React, {useState, useEffect} from 'react'
import * as Yup from 'yup'
import {toEnglishDigit} from '../utils/persainDigitToEn'

interface InputAdditionalProps {
  yupvalidationscheme?: any
  inputTagType: 'input' | 'textarea'
  initialvalue?: string | number | readonly string[] | undefined
  validateOnChange?: boolean
}

interface Props {
  labelprops?: React.DetailedHTMLProps<
    React.LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  >
  holderprops?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
  inputprops?: (React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > &
    React.DetailedHTMLProps<
      React.TextareaHTMLAttributes<HTMLTextAreaElement>,
      HTMLTextAreaElement
    >) &
    InputAdditionalProps
}

const useInputController = ({
  labelprops = {className: ''},
  holderprops = {className: ''},
  inputprops = {
    yupvalidationscheme: null,
    onChange: undefined,
    inputTagType: 'input',
    initialvalue: '',
    validateOnChange: true,
  },
}: Props) => {
  useEffect(() => {
    set_inputValue(inputprops.initialvalue)
  }, [inputprops.initialvalue])
  const [inputValue, set_inputValue] = useState(inputprops.initialvalue)
  const [inputError, set_inputError] = useState<string | null>(null)

  const validate = async (value: any) => {
    if (inputprops?.yupvalidationscheme)
      return inputprops?.yupvalidationscheme
        ?.validate(value)
        .then((resp: any) => {
          set_inputError(null)
          return true
        })
        .catch((ex: any) => {
          set_inputError(ex.message)
          return false
        })
  }
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const {value, id} = e?.target
    set_inputValue(toEnglishDigit(value))
    if (inputprops.validateOnChange) validate(toEnglishDigit(value))
  }
  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement> | React.FocusEvent<HTMLTextAreaElement>
  ) => {
    const {value, id} = e?.target
    validate(value)
  }

  const getInputProps = () => {
    const clonedProps = JSON.parse(JSON.stringify(inputprops))
    if (inputprops.id == 'floorCount') {
      // console.log(inputprops)
    }
    if ('yupvalidationscheme' in inputprops) delete clonedProps.yupvalidationscheme
    if ('onChange' in inputprops) delete clonedProps.onChange
    if ('initialvalue' in inputprops) delete clonedProps.initialvalue
    if ('validateOnChange' in inputprops) delete clonedProps.validateOnChange
    delete clonedProps.inputTagType
    /////////////////////
    if (inputprops.onKeyDown) clonedProps.onKeyDown = inputprops.onKeyDown
    if (inputprops.onKeyPress) clonedProps.onKeyPress = inputprops.onKeyPress
    return clonedProps
  }

  const renderer = () => {
    return (
      <div {...holderprops}>
        <label {...labelprops} htmlFor={inputprops.id} />
        {inputprops.inputTagType === 'input' && (
          <input
            value={inputValue}
            {...getInputProps()}
            onChange={(e) => {
              if (inputprops?.onChange) {
                inputprops?.onChange(e)
              }
              handleChange(e)
            }}
            onBlur={(e) => {
              if (inputprops?.onBlur) {
                inputprops?.onBlur(e)
              }
              handleBlur(e)
            }}
          />
        )}
        {inputprops.inputTagType === 'textarea' && (
          <textarea
            {...getInputProps()}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              if (inputprops?.onChange) {
                inputprops?.onChange(e)
              }
              handleChange(e)
            }}
            onBlur={handleBlur}
            value={inputValue}
          />
        )}
        <div
          dir='rtl'
          style={{color: 'red', fontSize: '.8rem', height: '1rem'}}
          className='error mt-1'
        >
          {inputError ? inputError : ''}
        </div>
      </div>
    )
  }

  return {
    renderer,
    inputValue,
    inputError,
    set_inputValue,
    validateInput: async () => {
      const stat = await validate(inputValue)
      return stat
    },
  }
}

export default useInputController
