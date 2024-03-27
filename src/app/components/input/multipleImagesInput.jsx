import * as React from 'react'
import {useState, useEffect} from 'react'
import {Button} from 'react-bootstrap'
import {toBase64} from '../../utils/toBase64'
import fileImage from '../../../_metronic/assets/images/folder-document.svg'
/////
const SingleImageItem = ({src = '', style = {}, onDelete, index}) => {
  return (
    <div
      style={style}
      className='shadow p-3 rounded rounded-lg m-0 p-0 d-flex flex-column align-items-stretch '
    >
      <img src={src} className='mt-2' style={{maxWidth: '100%', maxHeight: '100%'}} />
      <span
        onClick={() => {
          onDelete(index)
        }}
        className='btn btn-sm btn-danger mt-2'
      >
        حذف
      </span>
    </div>
  )
}
const SingleFileItem = ({src = '', style = {}, onDelete, index}) => {
  return (
    <div
      style={style}
      className='shadow p-3 rounded rounded-lg m-0 p-0 d-flex flex-column align-items-stretch '
    >
      <img src={fileImage} className='mt-2' style={{maxWidth: '100%', maxHeight: '100%'}} />
      <span
        onClick={() => {
          onDelete(index)
        }}
        className='btn btn-sm btn-danger mt-2'
      >
        حذف
      </span>
    </div>
  )
}
/////
const requiredError = 'انتخاب عکس ملک الزامی میباشد .';

const useMultipleImageInput = ({ statusImage = false}) => {
  const [imageError, setImageError] = useState()
  const inputRef = React.useRef()
  const [imagesSources, setImagesSources] = useState([])
  const onInputChange = async (event, required) => {
    const files = event.target.files
    if (files.length > 0) {
      const sources = []
      for (const file of files) {
        const resp = await toBase64(file)
        sources.push(resp)
        if (sources.length == files.length) {
          if(statusImage) {
            setImagesSources(sources)
          }else {
            setImagesSources(prev => [...prev, file])
          }
        }
      }
      setImageError('')
    } else {
      setImagesSources([])
      if (required) showRequiredError()
    }
  }
  const handleDeleteImage = (indx) => {
    //////// DELETE FROM INPUT
    const dt = new DataTransfer()
    const {files} = inputRef.current
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      if (indx !== i) dt.items.add(file)
    }
    inputRef.current.files = dt.files
    //////// DELETE FROM STATE
    const imagesSrcs = [...imagesSources]
    imagesSrcs.splice(indx, 1)
    setImagesSources(imagesSrcs)
  }
  const showRequiredError = () => {
    setImageError(requiredError)
  }
  const hideRequiredError = () => {
    setImageError('')
  }
  const resetInput = () => {
    setImagesSources([])
    inputRef.current.value = ''
  }
  /////
  const renderer = ({
    id = '',
    label = '',
    className = '',
    required = false,
    disabled = false,
    text = '',
    isFile = false,
  }) => {
    return (
      <div className={className + ' d-flex flex-column justify-content-start align-items-stretch'}>
        <span className='h5'>{label}</span>
        <div className='mt-2 d-flex flex-row justify-content-start align-items-stretch'>
          <label
            htmlFor={id}
            style={{
              border:
                imagesSources && imagesSources?.length > 0 ? '1px solid #333' : '2px solid #333',
            }}
            className={(imagesSources ? '' : 'border-2') + ' btn btn-sm btn-outline-dark'}
          >
            انتخاب {text ? text : 'عکس'}
            <i className='bi bi-plus-circle-fill ms-3 fs-2' style={{color: '#333'}}></i>
          </label>
          <Button
            className='ms-2'
            style={{display: imagesSources && imagesSources?.length > 0 ? 'inline' : 'none'}}
            variant='danger'
            size='sm'
            onClick={() => {
              resetInput()
              if (required) showRequiredError()
            }}
          >
            پاک کردن تمام {text ? text : 'تصاویر'}
          </Button>
        </div>
        <div style={{height: '1rem', color: 'red', fontSize: '0.8rem'}} className='error mt-1'>
          {imageError ?? ''}
        </div>
        {!disabled && (
          <input
            id={id}
            type='file'
            ref={inputRef}
            onChange={(e) => {
              onInputChange(e, required)
            }}
            className='d-none'
            accept={isFile ? 'file/*' : 'image/*'}
            multiple
          />
        )}
        {imagesSources && isFile == false && imagesSources.length > 0 && (
          <div className='d-flex flex-row justify-content-start flex-wrap align-items-stretch gap-4'>
            {imagesSources.map((imgsrc, index) => (
              <SingleImageItem
                style={{width: '180px'}}
                key={index}
                src={imgsrc}
                index={index}
                onDelete={handleDeleteImage}
              />
            ))}
          </div>
        )}
        {imagesSources && isFile == true && imagesSources.length > 0 && (
          <div className='d-flex flex-row justify-content-start flex-wrap align-items-stretch gap-4'>
            {imagesSources.map((imgsrc, index) => (
              <SingleFileItem
                style={{width: '120px'}}
                key={index}
                src={imgsrc}
                index={index}
                onDelete={handleDeleteImage}
              />
            ))}
          </div>
        )}
        {/* <img
          src={imagesSources ?? ''}
          className='mt-3'
          style={{maxHeight: '50vh', maxWidth: '100%', display: imageSources ? 'inline' : 'none'}}
        /> */}
      </div>
    )
  }
  ///
  return {
    imageError,
    imagesSources,
    onInputChange,
    inputRef,
    renderer,
    showRequiredError,
    hideRequiredError,
    resetInput,
  }
}

export default useMultipleImageInput
