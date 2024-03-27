/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState} from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import {Link, useNavigate} from 'react-router-dom'
import {useFormik} from 'formik'
import {toAbsoluteUrl} from '../../../../_metronic/helpers'
import {useAuth} from '../core/Auth'
import {apiCaller} from '../../../hooks/useApi'
import {ServiceAgent} from '../../../services/serviceAgent'
import {toast} from 'react-toastify'

const loginSchema = Yup.object().shape({
  username: Yup.string().required('لطفا نام کاربری خود را وارد نمایید .'),
  password: Yup.string()
    .min(6, 'رمز عبور باید  حداقل 6 کاراکتر باشد .')
    .required('لطفا رمز عبور خود را وارد نمایید'),
})

// const initialValues = {
//   username: 'admin',
//   password: 'Admin@123',
// }

const initialValues = {
  username: '',
  password: '',
}

/*
  Formik+YUP+Typescript:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
  https://medium.com/@maurice.de.beijer/yup-validation-and-typescript-and-formik-6c342578a20e
*/

export function Login() {
  const [loading, setLoading] = useState(false)
  const {saveToken, saveUserInfo, setUserInfo} = useAuth()
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, {setStatus, setSubmitting}) => {
      apiCaller({
        api: ServiceAgent.authentication.request_login,
        apiArguments: {username: values.username, password: values.password},
        onStart: () => {
          setLoading(true)
        },
        onError: (resp) => {
          saveToken(undefined)
          saveUserInfo(undefined)
          setSubmitting(false)
          setLoading(false)
          if (resp && resp?.response && resp?.response?.status === 400) {
            if (resp?.response?.data?.errors?.[0]) toast.error(resp?.response?.data?.errors?.[0])
            else if (resp?.response?.data?.message) toast.error(resp?.response?.data?.message)
            else toast.error('رمز یا نام کاربری اشتباه میباشد .')
          } else toast.error('رمز یا نام کاربری اشتباه میباشد .')
        },
        onSuccess: (resp) => {
          if (resp.status == 200 && resp?.data?.statusCode == 200 && resp.data?.data?.token) {
            navigate('/dashboard')
            saveToken(resp.data?.data?.token)
            setUserInfo({...resp?.data?.data})
          }
        },
        onSuccessMessage: 'ورود با موفقیت انجام شد',
      })
    },
  })

  return (
    <form
      className='form w-100'
      onSubmit={formik.handleSubmit}
      noValidate
      id='kt_login_signin_form'
    >
      {/* begin::Heading */}
      <div className='text-center mb-10'>
        <h1 className='text-dark mb-3'>ورود به پنل مدیریت</h1>
      </div>
      {/* begin::Heading */}

      {formik.status ? (
        <div className='mb-lg-15 alert alert-danger'>
          <div className='alert-text font-weight-bold'>{formik.status}</div>
        </div>
      ) : null}

      {/* begin::Form group */}
      <div className='fv-row mb-10'>
        <label className='form-label fs-6 fw-bolder text-dark'>نام کاربری</label>
        <input
          {...formik.getFieldProps('username')}
          className={clsx(
            'form-control form-control-lg form-control-solid',
            {'is-invalid': formik.touched.username && formik.errors.username},
            {
              'is-valid': formik.touched.username && !formik.errors.username,
            }
          )}
          type='text'
          name='username'
          autoComplete='off'
        />
        {formik.touched.username && formik.errors.username && (
          <div className='fv-plugins-message-container'>
            <span role='alert'>{formik.errors.username}</span>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group */}
      <div className='fv-row mb-10'>
        <div className='d-flex justify-content-between mt-n5'>
          <div className='d-flex flex-row justify-content-start align-items-baseline mb-2 w-100'>
            {/* begin::Label */}
            <label className='form-label fw-bolder text-dark fs-6 mb-0'>رمز عبور</label>
            {/* end::Label */}
          </div>
        </div>
        <input
          type='password'
          autoComplete='off'
          {...formik.getFieldProps('password')}
          className={clsx(
            'form-control form-control-lg form-control-solid',
            {
              'is-invalid': formik.touched.password && formik.errors.password,
            },
            {
              'is-valid': formik.touched.password && !formik.errors.password,
            }
          )}
        />
        {formik.touched.password && formik.errors.password && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.password}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Action */}
      <div className='text-center'>
        <button
          type='submit'
          id='kt_sign_in_submit'
          className='btn btn-lg btn-primary w-100 mb-5'
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {!loading && <span className='indicator-label'>ادامه</span>}
          {loading && (
            <span className='indicator-progress' style={{display: 'block'}}>
              لطفا صبر کنید ...
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>
      </div>
      {/* end::Action */}
    </form>
  )
}
