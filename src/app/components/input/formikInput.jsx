import React, {useEffect, useState} from 'react'
import {useField} from 'formik'

export const TextInput = ({label, ...props}) => {
  const [field, meta] = useField(props)

  return (
    <div
      className={
        (props.holderClassName ? props.holderClassName : 'w-100') +
        ' formik_input-text m-0 p-0 d-flex flex-column justify-content-start align-items-stretch'
      }
    >
      <label dir='rtl' className={props.LabelClassName + ' mb-2'} htmlFor={props.id}>
        {label}
      </label>
      <input
        className={props.inputClassName + ' input-border text-input px-3 py-2'}
        {...field}
        {...props}
        onChange={(e) => {
          if (props?.set_value) {
            const val = e?.target?.value
            props?.set_value(val)
          }
          field.onChange(e)
        }}
      />
      <div
        dir='rtl'
        style={{color: 'red', fontSize: '.8rem', height: '1rem'}}
        className='error mt-1'
      >
        {meta.touched && meta.error ? meta.error : ''}
      </div>
    </div>
  )
}

export const TextInputWithMask = ({label, ...props}) => {
  const [field, meta] = useField(props)

  return (
    <div
      className={
        (props.holderClassName ? props.holderClassName : 'w-100') +
        ' formik_input-text m-0 p-0 d-flex flex-column justify-content-start align-items-stretch'
      }
    >
      <label dir='rtl' className={props.LabelClassName + ' mb-2'} htmlFor={props.id}>
        {label}
      </label>

      <input
        style={{border: '1px solid #333'}}
        className={props.inputClassName + ' input-border rounded text-input px-3 py-2'}
        {...field}
        {...props}
        onChange={(e) => {
          if (props?.set_value) {
            const val = e?.target?.value
            props?.set_value(val)
          }
          field.onChange(e)
        }}
        onKeyPress={(e) => {
          console.log(e)
          if (e.which < 48 || e.which > 57) {
            e.preventDefault()
          }
        }}
        maxLength={props?.maxLength ? props?.maxLength : '99999'}
      />

      {meta.touched && meta.error ? (
        <div dir='rtl' style={{color: 'red', fontSize: '.8rem'}} className='error'>
          {meta.error}
        </div>
      ) : null}
    </div>
  )
}

export const FileInput = ({form, field, setImgSrc, id}) => {
  // console.log(meta);
  return (
    <>
      <input
        id={id}
        name={field.name}
        type='file'
        accept='image/*'
        className='d-none'
        onChange={(e) => {
          form.setFieldValue(field.name, e.target.files[0])
        }}
      />
    </>
  )
}
