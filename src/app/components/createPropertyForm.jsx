import React, {useState, useEffect, useRef, LegacyRef, MutableRefObject} from 'react'
import {Button} from 'react-bootstrap'
import {toast} from 'react-toastify'
import {useLoadingContext} from '../contexts/loading/loading'
import {apiCaller} from '../hooks/useApi'
import {ServiceAgent} from '../services/serviceAgent'
import {toBase64} from '../utils/toBase64'
import * as propertyInputHooks from './propertyInputs'
////////// COMPONENT
export const CreatePropertyForm = ({onSubmit = () => {}}) => {
  const {handleOpenLoadingOverlay, handleCloseLoadingOverlay} = useLoadingContext()
  /////////////// inputs
  const {TitleInput, TitleError, TitleValue, TitleValidate} = propertyInputHooks.useTitleInput({
    className: 'mt-3 col-xl-4 col-lg-12 col-md-4 col-12',
    initialvalue: '',
  })
  const {
    ProjectSupervisorInput,
    ProjectSupervisorError,
    ProjectSupervisorValue,
    ProjectSupervisorValidate,
  } = propertyInputHooks.useProjectSupervisorInput({
    className: 'mt-3 col-xl-4 col-lg-12 col-md-4 col-12 px-xl-3 px-lg-0 px-md-3 px-0',
    initialvalue: '',
  })

  const {FloorCountInput, FloorCountError, FloorCountValue, FloorCountValidate} =
    propertyInputHooks.useFloorCountInput({
      className: 'mt-3 col-xl-4 col-lg-12 col-md-4 col-12',
      initialvalue: '',
    })
  const {AddressInput, AddressError, AddressValue, AddressValidate} =
    propertyInputHooks.useAddressInput({
      className: 'mt-3 col-xl-6 col-lg-12 col-md-6 col-12 pe-xl-2 pe-lg-0 pe-md-2 pe-0',
      initialvalue: '',
    })
  const {DescriptionInput, DescriptionError, DescriptionValue, DescriptionValidate} =
    propertyInputHooks.useDescriptionInput({
      className: 'mt-3 col-xl-6 col-lg-12 col-md-6 col-12 ps-xl-2 ps-lg-0 ps-md-2 ps-0',
      initialvalue: '',
    })
  // const [selectedImage, setSelectedImage] = useState()
  const ref = useRef()
  const [imageSrc, setImageSrc] = useState()
  const onImageChange = async (event) => {
    const file = event.target.files?.[0]
    if (file) {
      const resp = await toBase64(file)
      setImageSrc(resp)
    } else {
      setImageSrc(undefined)
    }
  }
  /////// SUBMIT

  const handleSubmit = async (e) => {
    e.preventDefault()
    const isTValid = await TitleValidate()
    const isPSValid = await ProjectSupervisorValidate()
    const isflCountValid = await FloorCountValidate()
    const isAdrsValid = await AddressValidate()
    const isDescValid = await DescriptionValidate()

    if (isTValid && isPSValid && isflCountValid && isAdrsValid && isDescValid) {
      const fd = new FormData()
      fd.append('title', TitleValue)
      fd.append('address', AddressValue)
      fd.append('floorCount', FloorCountValue)
      fd.append('projectSupervisor', ProjectSupervisorValue)
      fd.append('description', DescriptionValue)
      fd.append('image', document.getElementById('imgInput').files?.[0] ?? '')
      apiCaller({
        api: ServiceAgent.property.request_createProperty,
        apiArguments: fd,
        onStart: handleOpenLoadingOverlay,
        onEnd: handleCloseLoadingOverlay,
        toastMessage: true,
        onErrorMessage: 'ساخت ملک با خطا مواجه شد .',
        onSuccess: (resp) => {
          if (resp.status == 200 && resp.data.statusCode == 200) {
            toast.success('ساخت ملک با موفقیت انجام شد .')
            onSubmit({
              title: TitleValue,
              address: AddressValue,
              floorCount: FloorCountValue,
              projectSupervisor: ProjectSupervisorValue,
              description: DescriptionValue,
              image: document.getElementById('imgInput').files?.[0] ?? '',
            })

            // navigate('/owners')
          }
        },
      })
    }
  }
  /////// RENDER
  return (
    <form
      onSubmit={handleSubmit}
      className='d-flex flex-row flex-wrap justify-content-start align-items-stretch'
    >
      {TitleInput()}
      {ProjectSupervisorInput()}
      {FloorCountInput()}
      {AddressInput()}
      {DescriptionInput()}
      <div className='mt-3 d-flex flex-column justify-content-start align-items-stretch'>
        <span className='h5'>آپلود عکس *</span>
        <div className='mt-2 d-flex flex-row justify-content-start align-items-stretch'>
          <label
            htmlFor='imgInput'
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
              document.getElementById('imgInput').value = ''
            }}
          >
            پاک کردن تصویر
          </Button>
        </div>
        <input id='imgInput' type='file' onChange={onImageChange} className='d-none' />
        <img
          src={imageSrc ?? ''}
          className='mt-3'
          style={{maxHeight: '50vh', maxWidth: '100%', display: imageSrc ? 'inline' : 'none'}}
        />
      </div>
      <div className='col-12 mt-5 d-flex flex-row justify-content-end align-items-center'>
        <Button variant='primary' type='submit' size='lg' style={{minWidth: '200px'}}>
          ایجاد ملک
        </Button>
      </div>
    </form>
  )
}
