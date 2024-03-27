import useInputController from '../../hooks/useInput'
import * as Yup from 'yup'

interface Props {
  inputId: string
  label?: string
  holderClassName?: string
  validationErrorMessage?: string
  inputClassName?: string
  inputStyle?: React.CSSProperties | undefined
  onChange?: (event: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>) => void
}

const RegularInput = ({
  inputId,
  label,
  holderClassName,
  validationErrorMessage,
  inputClassName,
  inputStyle,
  onChange,
}: Props) => {
  const {
    renderer: questionTitleInput,
    inputValue,
    inputError,
    validateInput,
    set_inputValue,
  } = useInputController({
    labelprops: {
      dir: 'rtl',
      className: 'mb-2',
      children: label,
    },
    holderprops: {
      className:
        holderClassName + '  m-0 p-0 d-flex flex-column justify-content-start align-items-stretch',
    },
    inputprops: {
      inputTagType: 'input',
      id: inputId,
      className: inputClassName + '  px-3 py-2',
      style: inputStyle,
      yupvalidationscheme: Yup.string().required(validationErrorMessage),
      initialvalue: '',
      onChange: onChange,
    },
  })

  return <>{questionTitleInput()}</>
}
