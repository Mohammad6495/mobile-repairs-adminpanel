import * as React from 'react'
import { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { fileBaseUrl } from '../../services/SERVICE-CONSTANTS'
import { toBase64 } from '../../utils/toBase64'

/////
const requiredError = 'انتخاب ویدیو ملک الزامی میباشد .'
const useVideoInput = ({ initialValue = '' }) => {
  const [VideoError, setVideoError] = useState()
  const VideoRef = React.useRef<any>(null)
  const [VideoSrc, setVideoSrc] = useState(initialValue ? initialValue : '')
  useEffect(() => {
    if (initialValue) {
      setVideoSrc(initialValue)
    }
  }, [initialValue])
  const onVideoChange = async (event, required) => {
    const file = event.target.files?.[0]
    if (file) {
      const resp = await toBase64(file)
      setVideoSrc(resp as any)
      setVideoError('' as any)
    } else {
      setVideoSrc(undefined as any)
      if (required) showRequiredError()
    }
  }
  const showRequiredError = () => {
    setVideoError(requiredError as any)
  }
  const hideRequiredError = () => {
    setVideoError('' as any)
  }

  const resetVideo = () => {
    setVideoSrc('')
  }

  /////
  const renderer = ({ id = '', label = '', className = '', required = false }) => {
    return (
      <div className={className + ' d-flex flex-column justify-content-start align-items-stretch'}>
        <span className='h5'>{label}</span>
        <div className='mt-2 d-flex flex-row justify-content-start align-items-stretch'>
          <label
            htmlFor={id}
            style={{ border: VideoSrc ? '1px solid #333' : '2px solid #333' }}
            className={(VideoSrc ? '' : 'border-2') + ' btn btn-sm btn-outline-dark'}
          >
            {VideoSrc ? (
              <>
                تغییر ویدیو
                <i className='bi bi-arrow-counterclockwise ms-3 fs-2'></i>
              </>
            ) : (
              <>
                انتخاب ویدیو
                <i className='bi bi-plus-circle-fill ms-3 fs-2' style={{ color: '#333' }}></i>
              </>
            )}
          </label>
          <Button
            className='ms-2'
            style={{ display: VideoSrc ? 'inline' : 'none' }}
            variant='danger'
            size='sm'
            onClick={() => {
              setVideoSrc('')
              VideoRef.current.value = ''
              if (required) showRequiredError()
            }}
          >
            پاک کردن ویدیو
          </Button>
        </div>
        <div style={{ height: '1rem', color: 'red', fontSize: '0.8rem' }} className='error mt-1'>
          {VideoError ?? ''}
        </div>
        <input
          id={id}
          type='file'
          ref={VideoRef}
          onChange={(e) => {
            onVideoChange(e, required)
          }}
          className='d-none'
          accept='/*'
        />
        <video controls style={{ maxHeight: '50vh', maxWidth: '100%', display: VideoSrc ? 'block' : 'none' }}>
          <source src={VideoSrc ?? ''} type='video/mp4' />
        </video>
      </div>
    )
  }
  ///
  return {
    VideoError,
    VideoSrc,
    onVideoChange,
    VideoRef,
    renderer,
    showRequiredError,
    hideRequiredError,
    resetVideo
  }
}

export default useVideoInput
