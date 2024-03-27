import * as React from 'react'
import {useState, useEffect} from 'react'
import {Button} from 'react-bootstrap'
import {fileBaseUrl} from '../../services/SERVICE-CONSTANTS'
import {toBase64} from '../../utils/toBase64'

/////
const requiredError = 'انتخاب عکس ملک الزامی میباشد .'
const useImageInput = ({initialValue = ''}) => {
  const [imageError, setImageError] = useState()
  const imageRef = React.useRef<any>(null)
  const [imageSrc, setImageSrc] = useState(initialValue ? initialValue : '')
  useEffect(() => {
    if (initialValue) {
      setImageSrc(initialValue)
    }
  }, [initialValue])
  const onImageChange = async (event, required) => {
    const file = event.target.files?.[0]
    if (file) {
      const resp = await toBase64(file)
      setImageSrc(resp as any)
      setImageError('' as any)
    } else {
      setImageSrc(undefined as any)
      if (required) showRequiredError()
    }
  }
  const showRequiredError = () => {
    setImageError(requiredError as any)
  }
  const hideRequiredError = () => {
    setImageError('' as any)
  }

  const resetImage = () => {
    setImageSrc('')
  }
  /////
  const renderer = ({id = '', label = '', className = '', required = false}) => {
    return (
      <div className={className + ' d-flex flex-column justify-content-start align-items-stretch'}>
        <span className='h5'>{label}</span>
        <div className='mt-2 d-flex flex-row justify-content-start align-items-stretch'>
          <label
            htmlFor={id}
            style={{border: imageSrc ? '1px solid #333' : '2px solid #333'}}
            className={(imageSrc ? '' : 'border-2') + ' btn btn-sm btn-outline-dark'}
          >
            {imageSrc ? (
              <>
                تغییر عکس
                <i className='bi bi-arrow-counterclockwise ms-3 fs-2'></i>
              </>
            ) : (
              <>
                انتخاب عکس
                <i className='bi bi-plus-circle-fill ms-3 fs-2' style={{color: '#333'}}></i>
              </>
            )}
          </label>
          <Button
            className='ms-2'
            style={{display: imageSrc ? 'inline' : 'none'}}
            variant='danger'
            size='sm'
            onClick={() => {
              setImageSrc('')
              imageRef.current.value = ''
              if (required) showRequiredError()
            }}
          >
            پاک کردن تصویر
          </Button>
        </div>
        <div style={{height: '1rem', color: 'red', fontSize: '0.8rem'}} className='error mt-1'>
          {imageError ?? ''}
        </div>
        <input
          id={id}
          type='file'
          ref={imageRef}
          onChange={(e) => {
            onImageChange(e, required)
          }}
          className='d-none'
          accept='image/*'
        />
        <img
          src={imageSrc ?? ''}
          className='mt-3'
          style={{maxHeight: '50vh', maxWidth: '100%', display: imageSrc ? 'inline' : 'none'}}
        />
      </div>
    )
  }
  ///
  return {
    imageError,
    imageSrc,
    onImageChange,
    imageRef,
    renderer,
    showRequiredError,
    hideRequiredError,
    resetImage
  }
}

export default useImageInput
