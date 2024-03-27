/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from 'react'
import noUiSlider from 'nouislider'
import { useLayout } from '../../core'
import { KTSVG } from '../../../helpers'
import { DefaultTitle } from './page-title/DefaultTitle'
import { ThemeModeSwitcher, UserMenu } from '../../../partials'
import { useAuth } from '../../../../app/modules/auth'
import { FaRegUserCircle } from 'react-icons/fa'
import { HiUserCircle } from 'react-icons/hi2'
import { fileBaseUrl } from '../../../../app/services/SERVICE-CONSTANTS'
import userImageDefaultProfile from '../../../../_metronic/assets/images/userProfile.png'

const HeaderToolbar = () => {
  const { classes } = useLayout()
  const [status, setStatus] = useState<string>('1')
  const { userInfo } = useAuth()

  useEffect(() => {
    const rangeSlider = document.querySelector('#kt_toolbar_slider')
    const rangeSliderValueElement = document.querySelector('#kt_toolbar_slider_value')

    if (!rangeSlider || !rangeSliderValueElement) {
      return
    }

    // @ts-ignore
    noUiSlider.create(rangeSlider, {
      start: [5],
      connect: [true, false],
      step: 1,
      format: {
        to: function (value) {
          const val = +value
          return Math.round(val).toString()
        },
        from: function (value) {
          return value
        },
      },
      range: {
        min: [1],
        max: [10],
      },
    })

    // @ts-ignore
    rangeSlider.noUiSlider.on('update', function (values, handle) {
      rangeSliderValueElement.innerHTML = values[handle]
    })

    const handle = rangeSlider.querySelector('.noUi-handle')
    if (handle) {
      handle.setAttribute('tabindex', '0')
    }

    // @ts-ignore
    handle.addEventListener('click', function () {
      // @ts-ignore
      this.focus()
    })

    // @ts-ignore
    handle.addEventListener('keydown', function (event) {
      // @ts-ignore
      const value = Number(rangeSlider.noUiSlider.get())
      // @ts-ignore
      switch (event.which) {
        case 37:
          // @ts-ignore
          rangeSlider.noUiSlider.set(value - 1)
          break
        case 39:
          // @ts-ignore
          rangeSlider.noUiSlider.set(value + 1)
          break
      }
    })
    return () => {
      // @ts-ignore
      rangeSlider.noUiSlider.destroy()
    }
  }, [])

  return (
    <div className='toolbar d-flex align-items-stretch'>
      {/* begin::Toolbar container */}
      <div
        className={`${classes.headerContainer.join(
          ' '
        )} py-6 py-lg-0 d-flex  flex-row align-items-stretch justify-content-between`}
      >
        <DefaultTitle />
        <div className='d-flex align-items-stretch overflow-auto pt-3 pt-lg-0'>
          {/* begin::Action wrapper */}
          <div className='d-flex align-items-center'>
            {/* begin::Separartor */}
            <div className='bullet bg-secondary h-35px w-1px mx-5'></div>
            {/* end::Separartor */}
          </div>
          {/* end::Action wrapper */}

          {/* begin::Action wrapper */}
          <div className='d-flex align-items-center'>
            {/* begin::Actions */}
            {/* begin::Theme mode */}
            <div className='d-flex align-items-center'>
              <ThemeModeSwitcher toggleBtnClass='btn btn-sm btn-icon btn-icon-muted btn-active-icon-primary' />
            </div>
            <div>
              <span><img style={{ width: '45px', height: '45px', borderRadius: '50%', cursor: 'pointer' }}  src={userInfo?.image ? fileBaseUrl + userInfo?.image : userImageDefaultProfile} /></span>
              <span className='ms-2'>{userInfo?.nikname}</span>
            </div>
            {/* end::Theme mode */}
            {/* end::Actions */}
          </div>
          {/* end::Action wrapper */}
        </div>
        {/* end::Toolbar container */}
      </div>
    </div>
  )
}

export { HeaderToolbar }
